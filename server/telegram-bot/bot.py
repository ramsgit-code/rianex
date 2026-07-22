"""Bot de Telegram para monitorizar rianex-server.

Comandos: /status, /contenedores, /vaultwarden, /paperclip, /help
Alertas automaticas: disco lleno, temperatura alta, RAM critica,
contenedor caido/unhealthy, Vaultwarden sin responder, Paperclip sin
responder, aprobaciones pendientes y umbrales de presupuesto (80%/100%).

Metricas del sistema via la API del dashboard (localhost:8090).
Datos de Paperclip (coste, agentes, aprobaciones, actividad) via su API
autenticada con un token de board (variables PAPERCLIP_* del entorno).
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

# Paperclip (opcional): si hay token, el bot muestra coste/aprobaciones/actividad.
PC_BASE = os.environ.get("PAPERCLIP_API_BASE", "http://100.72.30.94:3100")
PC_KEY = os.environ.get("PAPERCLIP_API_KEY", "")
PC_COMPANY = os.environ.get("PAPERCLIP_COMPANY_ID", "")

ALERT_EVERY = 60          # segundos entre chequeos de alertas
ALERT_COOLDOWN = 3600     # no repetir la misma alerta en 1h
THRESHOLDS = {"disk": 90, "temp": 80, "mem": 92}
DIGEST_HOUR = int(os.environ.get("DIGEST_HOUR", "9"))  # hora local del resumen diario


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


# ---------- Paperclip (API autenticada con token de board) ----------

def pc_enabled():
    return bool(PC_KEY and PC_COMPANY)


def pc_get(path):
    req = urllib.request.Request(
        f"{PC_BASE}/api/companies/{PC_COMPANY}{path}",
        headers={"Authorization": f"Bearer {PC_KEY}"})
    with urllib.request.urlopen(req, timeout=10) as r:
        return json.load(r)


def _eur(cents):
    return f"{(cents or 0) / 100:.2f} €"


# Traduce acciones del log de actividad a texto legible.
_ACTION_ES = {
    "run.succeeded": "completó una tarea",
    "run.failed": "falló en una tarea",
    "run.started": "empezó a trabajar",
    "issue.created": "creó una tarea",
    "issue.updated": "actualizó una tarea",
    "issue.status_changed": "cambió el estado de una tarea",
    "issue.completed": "terminó una tarea",
    "approval.created": "pidió tu aprobación",
    "approval.approved": "recibió aprobación",
    "approval.rejected": "fue rechazada una propuesta",
    "comment.created": "dejó un comentario",
    "agent.paused": "fue pausado",
    "agent.resumed": "se reanudó",
    "budget.policy_upserted": "se actualizó el presupuesto",
    "budget.incident_opened": "alcanzó el límite de presupuesto",
}


def _humaniza(action):
    if action in _ACTION_ES:
        return _ACTION_ES[action]
    return action.replace("_", " ").replace(".", " · ")


def fmt_paperclip():
    if not pc_enabled():
        # sin token: estado basico via dashboard
        s = get_json("/api/stats")
        pc = s.get("paperclip", {})
        estado = "✅ operativo" if pc.get("alive") else "🔴 no responde"
        return (f"🤖 <b>Paperclip</b>\nServicio: {estado}\n"
                f"(token no configurado — sin datos de coste/agentes)")
    try:
        d = pc_get("/dashboard")
    except Exception as e:
        return f"🤖 <b>Paperclip</b>\n⚠️ No puedo leer los datos: {e}"

    costs = d.get("costs", {})
    spend = costs.get("monthSpendCents", 0)
    budget = costs.get("monthBudgetCents", 0)
    util = costs.get("monthUtilizationPercent", 0)
    ag = d.get("agents", {})
    tk = d.get("tasks", {})
    pend = d.get("pendingApprovals", 0)

    lines = [
        "🤖 <b>Paperclip</b>",
        f"💰 Gasto este mes: <b>{_eur(spend)}</b> de {_eur(budget)} ({util:.0f}%)",
        f"🧩 Agentes: {ag.get('active', 0)} activos · {ag.get('paused', 0)} en pausa"
        + (f" · ⚠️ {ag['error']} con error" if ag.get("error") else ""),
        f"📋 Tareas: {tk.get('open', 0)} abiertas · {tk.get('inProgress', 0)} en curso"
        + (f" · ⛔ {tk['blocked']} bloqueadas" if tk.get("blocked") else ""),
    ]
    if pend:
        lines.append(f"✋ <b>{pend} tarea(s) esperando tu aprobación</b>")
        try:
            appr = pc_get("/approvals")
            items = appr if isinstance(appr, list) else appr.get("items", appr.get("data", []))
            for a in items[:3]:
                t = a.get("title") or a.get("summary") or a.get("id", "")[:8]
                lines.append(f"   • {t}")
        except Exception:
            pass
    else:
        lines.append("✋ Aprobaciones pendientes: 0")

    # ultimas novedades de los agentes
    try:
        act = pc_get("/activity")
        items = act if isinstance(act, list) else act.get("items", act.get("data", []))
        agent_acts = [a for a in items if a.get("actorType") == "agent"][:4]
        if agent_acts:
            lines.append("\n📣 <b>Últimas novedades</b>")
            for a in agent_acts:
                when = (a.get("createdAt") or "")[11:16]
                lines.append(f"   {when} · un agente {_humaniza(a.get('action', ''))}")
    except Exception:
        pass

    lines.append(f"\n🔗 http://rianex-server.tail254060.ts.net:3100")
    return "\n".join(lines)


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
    "/paperclip — estado de Paperclip (agentes de IA)\n"
    "\nAlertas automáticas activas: disco &gt;90%, RAM &gt;92%, "
    "temperatura &gt;80 °C, contenedores caídos, Vaultwarden sin responder, "
    "Paperclip sin responder."
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
        if not s.get("paperclip", {}).get("alive"):
            alerts.append(("paperclip", "🤖🚨 Paperclip no responde"))
        d = get_json("/api/docker")

        # Paperclip: aprobaciones pendientes y umbrales de presupuesto
        if pc_enabled():
            try:
                pcd = pc_get("/dashboard")
                pend = pcd.get("pendingApprovals", 0)
                if pend:
                    alerts.append(("pc_approvals",
                                   f"✋🤖 Tienes <b>{pend}</b> tarea(s) de Paperclip esperando tu aprobación.\n"
                                   f"Mira /paperclip o entra en http://rianex-server.tail254060.ts.net:3100"))
                util = pcd.get("costs", {}).get("monthUtilizationPercent", 0)
                spend = pcd.get("costs", {}).get("monthSpendCents", 0)
                budget = pcd.get("costs", {}).get("monthBudgetCents", 0)
                if util >= 100:
                    alerts.append(("pc_budget_100",
                                   f"💰🛑 Paperclip alcanzó el límite de presupuesto "
                                   f"({_eur(spend)} de {_eur(budget)}). Los agentes se han parado."))
                elif util >= 80:
                    alerts.append(("pc_budget_80",
                                   f"💰⚠️ Paperclip al {util:.0f}% del presupuesto del mes "
                                   f"({_eur(spend)} de {_eur(budget)})."))
                if pcd.get("agents", {}).get("error"):
                    alerts.append(("pc_agent_error",
                                   f"🤖⚠️ {pcd['agents']['error']} agente(s) de Paperclip en estado de error."))
            except Exception:
                pass
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
        elif cmd == "/paperclip":
            send(chat_id, fmt_paperclip())
        else:
            send(chat_id, HELP)
    except Exception as e:
        send(chat_id, f"⚠️ Error consultando métricas: {e}")


def fmt_digest():
    """Resumen diario: estado del servidor + Paperclip."""
    partes = ["☀️ <b>Resumen diario · rianex-server</b>\n"]
    try:
        partes.append(fmt_status())
    except Exception:
        pass
    if pc_enabled():
        partes.append("")
        try:
            partes.append(fmt_paperclip())
        except Exception:
            pass
    return "\n".join(partes)


def main():
    state = load_state()
    print("bot arrancado; chat vinculado:", state["chat_id"], flush=True)
    last_alert_check = 0.0
    while True:
        # resumen diario (una vez al dia, a la hora local configurada)
        lt = time.localtime()
        hoy = time.strftime("%Y-%m-%d", lt)
        if (state["chat_id"] and lt.tm_hour == DIGEST_HOUR
                and state.get("last_digest") != hoy):
            send(state["chat_id"], fmt_digest())
            state["last_digest"] = hoy
            save_state(state)

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
