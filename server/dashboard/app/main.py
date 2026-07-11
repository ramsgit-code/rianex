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
}
current: dict = {}
containers_cache: list = []
vaultwarden_cache: dict = {"alive": False, "checked_at": 0}
_prev_docker_cpu: dict = {}


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
    prev_t = time.time()
    while True:
        time.sleep(SAMPLE_EVERY)
        now = time.time()
        net = psutil.net_io_counters()
        dt = now - prev_t
        rx_kbps = (net.bytes_recv - prev_net.bytes_recv) / dt / 1024
        tx_kbps = (net.bytes_sent - prev_net.bytes_sent) / dt / 1024
        prev_net, prev_t = net, now

        cpu = psutil.cpu_percent()
        percore = psutil.cpu_percent(percpu=True)
        mem = psutil.virtual_memory()
        swap = psutil.swap_memory()
        disk = psutil.disk_usage(ROOT_FS)
        load1, load5, load15 = os.getloadavg()

        snapshot = {
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

        with lock:
            containers_cache = result
            vaultwarden_cache.update({"alive": alive, "checked_at": int(time.time())})
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
        })


@app.get("/api/docker")
def api_docker():
    with lock:
        return JSONResponse({"containers": containers_cache})


@app.get("/")
def index():
    return FileResponse(os.path.join(os.path.dirname(__file__), "static", "index.html"))
