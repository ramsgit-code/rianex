"""Bot de Telegram para monitorizar rianex-server.

Comandos: /status, /contenedores, /vaultwarden, /help
Alertas automaticas: disco lleno, temperatura alta, RAM critica,
contenedor caido/unhealthy, Vaultwarden sin responder.

Reusa la API del dashboard (localhost:8090) como fuente de metricas.
El primer chat que envie /start queda registrado como propietario;
el bot ignora a cualquier otro chat.
"""
import json
import os
import time
import urllib.parse
import urllib.request

TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]
API = f"https://api.telegram.org/bot{TOKEN}"
DASHBOARD = os.environ.get("DASHBOARD_URL", "http://localhost:8090")
STATE_FILE = "/data/state.json"

ALERT_EVERY = 60          # segundos entre chequeos de alertas
ALERT_COOLDOWN = 3600     # no repetir la misma alerta en 1h
THRESHOLDS = {"disk": 90, "temp": 80, "mem": 92}


def load_state():
    try:
        with open(STATE_FILE) as f:
            return json.load(f)
    except (OSError, ValueError):
        return {"chat_id": None, "offset": 0, "alerted": {}}


def save_state(state):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(state, f)


def tg(method, **params):
    data = urllib.parse.urlencode(params).encode()
    req = urllib.request.Request(f"{API}/{method}", data=data)
    with urllib.request.urlopen(req, timeout=35) as r:
        return json.load(r)


def send(chat_id, text):
    try:
        tg("sendMessage", chat_id=chat_id, text=text, parse_mode="HTML")
    except Exception as e:
        print("sendMessage fallo:", e, flush=True)


def get_json(path):
    with urllib.request.urlopen(DASHBOARD + path, timeout=10) as r:
        return json.load(r)


def fmt_status():
    s = get_json("/api/stats")
    up = int(time.time() - s["boot_time"])
    d, rem = divmod(up, 86400)
    h, m = divmod(rem, 3600)
    temp = f"{s['temp_c']:.0f} °C" if s.get("temp_c") else "n/d"
    vw = "✅ operativo" if s.get("vaultwarden", {}).get("alive") else "🔴 caído"
    return (
        f"🖥 <b>{s['hostname']}</b>\n"
        f"⏱ Encendido: {d} d {h} h {m // 60} min\n"
        f"🧠 CPU: <b>{s['cpu_percent']:.0f}%</b> · carga {s['load'][0]:.2f}\n"
        f"💾 RAM: <b>{s['mem']['percent']:.0f}%</b> "
        f"({s['mem']['used'] / 1e9:.1f}/{s['mem']['total'] / 1e9:.1f} GB)\n"
        f"💿 Disco: <b>{s['disk']['percent']:.0f}%</b> "
        f"({s['disk']['used'] / 1e9:.1f}/{s['disk']['total'] / 1e9:.1f} GB)\n"
        f"🌡 Temperatura: <b>{temp}</b>\n"
        f"🔐 Vaultwarden: {vw}"
    )


def fmt_containers():
    d = get_json("/api/docker")
    lines = ["📦 <b>Contenedores</b>"]
    for c in sorted(d["containers"], key=lambda x: (x["status"] != "running", x["name"])):
        if c["status"] == "running":
            icon = "🟡" if c["health"] == "unhealthy" else "🟢"
            extra = f" · {c['mem_bytes'] / 1e6:.0f} MB" if c["mem_bytes"] else ""
        else:
            icon, extra = "🔴", f" · {c['status']}"
        lines.append(f"{icon} <b>{c['name']}</b>{extra}")
    return "\n".join(lines)


def fmt_vaultwarden():
    s = get_json("/api/stats")
    alive = s.get("vaultwarden", {}).get("alive")
    d = get_json("/api/docker")
    cont = next((c for c in d["containers"] if c["name"] == "vaultwarden"), None)
    health = cont["health"] or cont["status"] if cont else "no encontrado"
    return (
        f"🔐 <b>Vaultwarden</b>\n"
        f"Servicio web: {'✅ responde' if alive else '🔴 no responde'}\n"
        f"Contenedor: {health}\n"
        f"Backup: cron diario a las 3:30"
    )


HELP = (
    "🤖 <b>Rianex Server Bot</b>\n"
    "/status — CPU, RAM, disco, temperatura\n"
    "/contenedores — estado de los contenedores\n"
    "/vaultwarden — estado del gestor de contraseñas\n"
    "\nAlertas automáticas activas: disco &gt;90%, RAM &gt;92%, "
    "temperatura &gt;80 °C, contenedores caídos, Vaultwarden sin responder."
)


def check_alerts(state):
    """Devuelve lista de (clave, mensaje). La clave evita repetir la misma alerta."""
    alerts = []
    try:
        s = get_json("/api/stats")
        if s["disk"]["percent"] >= THRESHOLDS["disk"]:
            alerts.append(("disk", f"🚨 Disco al {s['disk']['percent']:.0f}%"))
        if s["mem"]["percent"] >= THRESHOLDS["mem"]:
            alerts.append(("mem", f"🚨 RAM al {s['mem']['percent']:.0f}%"))
        if s.get("temp_c") and s["temp_c"] >= THRESHOLDS["temp"]:
            alerts.append(("temp", f"🌡🚨 Temperatura a {s['temp_c']:.0f} °C"))
        if not s.get("vaultwarden", {}).get("alive"):
            alerts.append(("vaultwarden", "🔐🚨 Vaultwarden no responde"))
        d = get_json("/api/docker")
        for c in d["containers"]:
            if c["name"] == "hello-world" or c["image"].startswith("hello-world"):
                continue
            if c["status"] == "exited" and c["name"] == "unruffled_visvesvaraya":
                continue  # resto del hello-world de prueba
            if c["status"] != "running":
                alerts.append((f"cont:{c['name']}", f"📦🚨 Contenedor <b>{c['name']}</b> está {c['status']}"))
            elif c["health"] == "unhealthy":
                alerts.append((f"health:{c['name']}", f"📦⚠️ Contenedor <b>{c['name']}</b> unhealthy"))
    except Exception as e:
        alerts.append(("dashboard", f"⚠️ No puedo leer las métricas del dashboard: {e}"))
    return alerts


def handle(state, chat_id, text):
    cmd = text.split("@")[0].strip().lower()
    if state["chat_id"] is None and cmd == "/start":
        state["chat_id"] = chat_id
        save_state(state)
        send(chat_id, "✅ Bot vinculado a este chat. Te avisaré si algo va mal.\n\n" + HELP)
        return
    if state["chat_id"] != chat_id:
        return  # ignora a desconocidos
    try:
        if cmd == "/status":
            send(chat_id, fmt_status())
        elif cmd == "/contenedores":
            send(chat_id, fmt_containers())
        elif cmd == "/vaultwarden":
            send(chat_id, fmt_vaultwarden())
        else:
            send(chat_id, HELP)
    except Exception as e:
        send(chat_id, f"⚠️ Error consultando métricas: {e}")


def main():
    state = load_state()
    print("bot arrancado; chat vinculado:", state["chat_id"], flush=True)
    last_alert_check = 0.0
    while True:
        # alertas
        now = time.time()
        if state["chat_id"] and now - last_alert_check >= ALERT_EVERY:
            last_alert_check = now
            active = check_alerts(state)
            for key, msg in active:
                last = state["alerted"].get(key, 0)
                if now - last >= ALERT_COOLDOWN:
                    send(state["chat_id"], msg)
                    state["alerted"][key] = now
                    save_state(state)
            # aviso de recuperacion
            active_keys = {k for k, _ in active}
            for key in list(state["alerted"]):
                if key not in active_keys and state["alerted"][key]:
                    send(state["chat_id"], f"✅ Resuelto: {key}")
                    del state["alerted"][key]
                    save_state(state)

        # mensajes entrantes (long polling)
        try:
            updates = tg("getUpdates", offset=state["offset"] + 1, timeout=25)
            for u in updates.get("result", []):
                state["offset"] = u["update_id"]
                save_state(state)
                msg = u.get("message") or {}
                if msg.get("text"):
                    handle(state, msg["chat"]["id"], msg["text"])
        except Exception as e:
            print("getUpdates fallo:", e, flush=True)
            time.sleep(5)


if __name__ == "__main__":
    main()
