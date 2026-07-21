#!/usr/bin/env bash
# Arranca Paperclip en segundo plano si no está ya corriendo.
export PATH="$HOME/.local/node/bin:$PATH"
DIR="$HOME/workspace/rianex/services/paperclip"
DATA="$DIR/data"
cd "$DIR" || exit 1
# ¿ya corriendo?
if pgrep -f "paperclipai run --data-dir" >/dev/null 2>&1; then
  exit 0
fi
nohup "$DIR/node_modules/.bin/paperclipai" run --data-dir "$DATA" >> "$DATA/paperclip.log" 2>&1 &
