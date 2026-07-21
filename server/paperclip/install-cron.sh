#!/usr/bin/env bash
# Añade (idempotente) las entradas de cron de Paperclip: arranque al reiniciar
# y guardián cada 5 min. No toca el resto del crontab.
set -e
DIR="$HOME/workspace/rianex/services/paperclip"
tmp="$(mktemp)"
crontab -l 2>/dev/null | grep -v RIANEX_PAPERCLIP > "$tmp" || true
echo "@reboot sleep 20 && bash $DIR/start.sh # RIANEX_PAPERCLIP" >> "$tmp"
echo "*/5 * * * * bash $DIR/guard.sh # RIANEX_PAPERCLIP" >> "$tmp"
crontab "$tmp"
rm -f "$tmp"
crontab -l | grep RIANEX_PAPERCLIP
