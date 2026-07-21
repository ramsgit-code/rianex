"""Rianex Server Dashboard — API de metricas del sistema + Docker + Vaultwarden.

Corre con network_mode: host y /proc del host montado en /host/proc para
leer metricas reales de la maquina, no del contenedor.
"""
import os
import glob
import threading
import time
import urllib.request
from collections import deque

import docker
import psutil
from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse

if os.path.exists("/host/proc"):
    psutil.PROCFS_PATH = "/host/proc"
ROOT_FS = "/host/root" if os.path.exists("/host/root") else "/"
SYS = "/host/sys" if os.path.exists("/host/sys") else "/sys"
RAPL = f"{SYS}/class/powercap/intel-rapl:0"

# consumo: RAPL mide solo el paquete de la CPU; el resto (placa, RAM, SSD, red)
# se estima con una base fija configurable
BASE_WATTS = float(os.environ.get("BASE_WATTS", "8"))
PRICE_EUR_KWH = float(os.environ.get("PRICE_EUR_KWH", "0.15"))

HISTORY_LEN = 150  # 150 muestras x 2s = 5 min
SAMPLE_EVERY = 2
DOCKER_EVERY = 8

app = FastAPI(title="Rianex Server Dashboard")
lock = threading.Lock()

history = {
    "t": deque(maxlen=HISTORY_LEN),
    "cpu": deque(maxlen=HISTORY_LEN),
    "mem": deque(maxlen=HISTORY_LEN),
    "rx_kbps": deque(maxlen=HISTORY_LEN),
    "tx_kbps": deque(maxlen=HISTORY_LEN),
    "watts": deque(maxlen=HISTORY_LEN),
    "io_r_kbps": deque(maxlen=HISTORY_LEN),
    "io_w_kbps": deque(maxlen=HISTORY_LEN),
}
current: dict = {}
containers_cache: list = []
vaultwarden_cache: dict = {"alive": False, "checked_at": 0}
paperclip_cache: dict = {"alive": False, "bootstrap": None, "checked_at": 0}
_prev_docker_cpu: dict = {}

PAPERCLIP_URL = os.environ.get("PAPERCLIP_URL", "http://100.72.30.94:3100")


def read_energy_uj():
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


def read_temp_c():
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


def sampler():
    psutil.cpu_percent()
    psutil.cpu_percent(percpu=True)
    prev_net = psutil.net_io_counters()
    prev_io = psutil.disk_io_counters()
    prev_energy = read_energy_uj()
    prev_t = time.time()
    while True:
        time.sleep(SAMPLE_EVERY)
        now = time.time()
        net = psutil.net_io_counters()
        dt = now - prev_t
        rx_kbps = (net.bytes_recv - prev_net.bytes_recv) / dt / 1024
        tx_kbps = (net.bytes_sent - prev_net.bytes_sent) / dt / 1024
        prev_net = net

        io = psutil.disk_io_counters()
        io_r_kbps = io_w_kbps = 0.0
        if io and prev_io:
            io_r_kbps = (io.read_bytes - prev_io.read_bytes) / dt / 1024
            io_w_kbps = (io.write_bytes - prev_io.write_bytes) / dt / 1024
        prev_io = io

        pkg_watts = None
        energy = read_energy_uj()
        if energy is not None and prev_energy is not None:
            delta = energy - prev_energy
            if delta < 0 and MAX_ENERGY_UJ:  # el contador da la vuelta
                delta += MAX_ENERGY_UJ
            if delta >= 0:
                pkg_watts = delta / 1e6 / dt
        prev_energy = energy
        prev_t = now

        cpu = psutil.cpu_percent()
        percore = psutil.cpu_percent(percpu=True)
        mem = psutil.virtual_memory()
        swap = psutil.swap_memory()
        disk = psutil.disk_usage(ROOT_FS)
        load1, load5, load15 = os.getloadavg()

        total_watts = round(pkg_watts + BASE_WATTS, 1) if pkg_watts is not None else None
        power = None
        if total_watts is not None:
            kwh_day = total_watts * 24 / 1000
            power = {
                "pkg_watts": round(pkg_watts, 1),
                "base_watts": BASE_WATTS,
                "total_watts": total_watts,
                "kwh_day": round(kwh_day, 2),
                "eur_month": round(kwh_day * 30 * PRICE_EUR_KWH, 2),
                "price_eur_kwh": PRICE_EUR_KWH,
            }

        snapshot = {
            "power": power,
            "nproc": len(psutil.pids()),
            "net_total": {"rx": net.bytes_recv, "tx": net.bytes_sent},
            "cpu_percent": cpu,
            "cpu_percore": percore,
            "cpu_count": len(percore),
            "mem": {"total": mem.total, "used": mem.total - mem.available,
                    "percent": round((mem.total - mem.available) / mem.total * 100, 1)},
            "swap": {"total": swap.total, "used": swap.used, "percent": swap.percent},
            "disk": {"total": disk.total, "used": disk.used, "percent": disk.percent},
            "load": [load1, load5, load15],
            "temp_c": read_temp_c(),
            "boot_time": psutil.boot_time(),
            "hostname": os.uname().nodename,
        }
        with lock:
            current.update(snapshot)
            history["t"].append(int(now))
            history["cpu"].append(round(cpu, 1))
            history["mem"].append(snapshot["mem"]["percent"])
            history["rx_kbps"].append(round(rx_kbps, 1))
            history["tx_kbps"].append(round(tx_kbps, 1))
            history["watts"].append(total_watts)
            history["io_r_kbps"].append(round(io_r_kbps, 1))
            history["io_w_kbps"].append(round(io_w_kbps, 1))


def docker_sampler():
    global containers_cache
    client = docker.from_env()
    while True:
        result = []
        try:
            for c in client.containers.list(all=True):
                item = {
                    "name": c.name,
                    "image": c.image.tags[0] if c.image.tags else c.attrs["Config"]["Image"],
                    "status": c.status,
                    "health": c.attrs["State"].get("Health", {}).get("Status", ""),
                    "started_at": c.attrs["State"].get("StartedAt", ""),
                    "cpu_percent": None,
                    "mem_bytes": None,
                }
                if c.status == "running":
                    try:
                        s = c.stats(stream=False, one_shot=True)
                        total = s["cpu_stats"]["cpu_usage"]["total_usage"]
                        ncpu = s["cpu_stats"].get("online_cpus") or 1
                        now = time.time()
                        prev = _prev_docker_cpu.get(c.id)
                        if prev:
                            dt_ns = (now - prev[1]) * 1e9
                            if dt_ns > 0:
                                item["cpu_percent"] = round(
                                    max(0.0, (total - prev[0]) / dt_ns) * 100, 1)
                        _prev_docker_cpu[c.id] = (total, now)
                        mem_stats = s.get("memory_stats", {})
                        usage = mem_stats.get("usage")
                        if usage is not None:
                            usage -= mem_stats.get("stats", {}).get("inactive_file", 0)
                            item["mem_bytes"] = max(0, usage)
                    except Exception:
                        pass
                result.append(item)
        except Exception:
            pass

        alive = False
        try:
            with urllib.request.urlopen("http://127.0.0.1:8082/alive", timeout=3) as r:
                alive = r.status == 200
        except Exception:
            alive = False

        pc_alive = False
        pc_bootstrap = None
        try:
            import json as _json
            with urllib.request.urlopen(f"{PAPERCLIP_URL}/api/health", timeout=3) as r:
                pc_alive = r.status == 200
                body = _json.loads(r.read().decode())
                pc_bootstrap = body.get("bootstrapStatus")
        except Exception:
            pc_alive = False

        with lock:
            containers_cache = result
            vaultwarden_cache.update({"alive": alive, "checked_at": int(time.time())})
            paperclip_cache.update({"alive": pc_alive, "bootstrap": pc_bootstrap,
                                    "checked_at": int(time.time())})
        time.sleep(DOCKER_EVERY)


@app.on_event("startup")
def start_threads():
    threading.Thread(target=sampler, daemon=True).start()
    threading.Thread(target=docker_sampler, daemon=True).start()


@app.get("/api/stats")
def api_stats():
    with lock:
        return JSONResponse({
            **current,
            "history": {k: list(v) for k, v in history.items()},
            "vaultwarden": dict(vaultwarden_cache),
            "paperclip": dict(paperclip_cache),
        })


@app.get("/api/docker")
def api_docker():
    with lock:
        return JSONResponse({"containers": containers_cache})


@app.get("/")
def index():
    return FileResponse(os.path.join(os.path.dirname(__file__), "static", "index.html"))
