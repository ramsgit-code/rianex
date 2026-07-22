"""Recolección de métricas del host para el bot, sin depender del dashboard.

Lee /proc y /sys del host (montados en /host/*) y el socket de Docker.
Corre en el contenedor del bot (network_mode: host) con esos bind mounts.
"""
import glob
import os
import time
import urllib.request

import psutil
import docker

if os.path.exists("/host/proc"):
    psutil.PROCFS_PATH = "/host/proc"
ROOT_FS = "/host/root" if os.path.exists("/host/root") else "/"
SYS = "/host/sys" if os.path.exists("/host/sys") else "/sys"
RAPL = f"{SYS}/class/powercap/intel-rapl:0"

BASE_WATTS = float(os.environ.get("BASE_WATTS", "8"))
PRICE_EUR_KWH = float(os.environ.get("PRICE_EUR_KWH", "0.15"))


def _energy_uj():
    try:
        with open(f"{RAPL}/energy_uj") as f:
            return int(f.read().strip())
    except OSError:
        return None


try:
    with open(f"{RAPL}/max_energy_range_uj") as f:
        MAX_ENERGY_UJ = int(f.read().strip())
except OSError:
    MAX_ENERGY_UJ = None


def _temp_c():
    best = None
    for zone in glob.glob("/sys/class/thermal/thermal_zone*/temp"):
        try:
            with open(zone) as f:
                t = int(f.read().strip()) / 1000.0
            if 0 < t < 130 and (best is None or t > best):
                best = t
        except OSError:
            continue
    return best


def host_metrics():
    """Métricas puntuales del host (toma ~1s por el muestreo de CPU/energía)."""
    e1 = _energy_uj()
    t0 = time.time()
    cpu = psutil.cpu_percent(interval=1.0)
    e2 = _energy_uj()
    dt = time.time() - t0

    power = None
    if e1 is not None and e2 is not None and dt > 0:
        delta = e2 - e1
        if delta < 0 and MAX_ENERGY_UJ:
            delta += MAX_ENERGY_UJ
        if delta >= 0:
            watts = round(delta / 1e6 / dt + BASE_WATTS, 1)
            kwh_day = watts * 24 / 1000
            power = {
                "watts": watts,
                "kwh_day": round(kwh_day, 2),
                "eur_month": round(kwh_day * 30 * PRICE_EUR_KWH, 2),
                "price_eur_kwh": PRICE_EUR_KWH,
            }

    mem = psutil.virtual_memory()
    disk = psutil.disk_usage(ROOT_FS)
    return {
        "cpu_percent": cpu,
        "mem": {"used": mem.total - mem.available, "total": mem.total,
                "percent": round((mem.total - mem.available) / mem.total * 100, 1)},
        "disk": {"used": disk.used, "total": disk.total, "percent": disk.percent},
        "temp_c": _temp_c(),
        "load": list(os.getloadavg()),
        "power": power,
        "boot_time": psutil.boot_time(),
        "hostname": os.uname().nodename,
        "nproc": len(psutil.pids()),
    }


def host_containers():
    out = []
    try:
        client = docker.from_env()
        for c in client.containers.list(all=True):
            out.append({
                "name": c.name,
                "status": c.status,
                "health": c.attrs["State"].get("Health", {}).get("Status", ""),
                "mem_bytes": None,
            })
    except Exception:
        pass
    return out


def _alive(url):
    try:
        with urllib.request.urlopen(url, timeout=3) as r:
            return r.status == 200
    except Exception:
        return False


def vaultwarden_alive():
    return _alive("http://127.0.0.1:8082/alive")
