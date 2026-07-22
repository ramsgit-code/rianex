# Paperclip — orquestación de agentes de IA

Instancia self-hosted de [Paperclip](https://paperclip.ing) que corre en este
servidor. Orquesta agentes de IA (con Claude Code como runtime) organizados como
una empresa (CEO, directora, etc.).

## Cómo corre

- **Node 22** en `~/.local/node` (sin root).
- Paquete `paperclipai` con **PostgreSQL embebido** (sin base de datos aparte).
- Escucha en la IP de Tailscale, **puerto 3100**, modo privado autenticado.
- Persistencia por **cron**: `@reboot` arranca y un guardián lo revive si se cae.

## Ficheros

| Fichero | Qué hace |
|---|---|
| `start.sh` | Arranca Paperclip en segundo plano si no está corriendo |
| `guard.sh` | Guardián (cron cada 5 min): si el health falla, lo rearranca |
| `install-cron.sh` | Instala las entradas de cron (idempotente) |
| `set-budget.sh` | Fija el límite de gasto con parada automática (hard stop) |
| `package.json` | Fija la versión de `paperclipai` |

## NO se versiona (ver `.gitignore`)

- `.pcenv` — token de board (credencial).
- `data/` — BD embebida, claves, tokens, API keys, backups.
- `node_modules/` — dependencias.

## Uso rápido

```bash
# arrancar / rearrancar
bash start.sh

# fijar límite de 20 al mes con parada automática
PAPERCLIP_API_KEY=<token_board> bash set-budget.sh 20 calendar_month_utc
```
