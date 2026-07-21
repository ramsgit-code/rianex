#!/usr/bin/env bash
# Guardián: si el health check falla, (re)arranca Paperclip.
# Se ejecuta desde cron cada pocos minutos y en @reboot.
code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 8 http://100.72.30.94:3100/api/health 2>/dev/null || true)
if [ "$code" != "200" ]; then
  bash "$HOME/workspace/rianex/services/paperclip/start.sh"
fi
