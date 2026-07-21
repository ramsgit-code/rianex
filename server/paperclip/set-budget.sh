#!/usr/bin/env bash
# Fija un limite de gasto en Paperclip con PARADA AUTOMATICA (hard stop).
#
# Requiere un token de board (se genera en la web de Paperclip:
#   ajustes -> API / tokens). Uso:
#
#   PAPERCLIP_API_KEY=pcp_xxx  bash set-budget.sh [IMPORTE_EUR] [WINDOW]
#
#   IMPORTE_EUR  limite en euros           (por defecto 20)
#   WINDOW       calendar_month_utc | lifetime  (por defecto lifetime = tope total)
#
set -euo pipefail
DIR="$HOME/workspace/rianex/services/paperclip"
DATA="$DIR/data"
API="${PAPERCLIP_API_BASE:-http://100.72.30.94:3100}"
BIN="$DIR/node_modules/.bin/paperclipai"
export PATH="$HOME/.local/node/bin:$PATH"

EUR="${1:-20}"
WINDOW="${2:-lifetime}"
CENTS=$(( EUR * 100 ))

if [ -z "${PAPERCLIP_API_KEY:-}" ]; then
  echo "ERROR: falta PAPERCLIP_API_KEY (token de board de Paperclip)." >&2
  exit 1
fi

common=(--data-dir "$DATA" --api-base "$API" --api-key "$PAPERCLIP_API_KEY")

# 1) Descubrir la empresa
CID=$("$BIN" company list "${common[@]}" --json 2>/dev/null \
      | python3 -c 'import json,sys; d=json.load(sys.stdin); print((d[0] if isinstance(d,list) else d.get("companies",[{}])[0]).get("id",""))')
if [ -z "$CID" ]; then
  echo "ERROR: no encuentro ninguna empresa. ¿Creaste ya tu cuenta de CEO?" >&2
  exit 1
fi
echo "Empresa: $CID · limite: ${EUR} EUR (${CENTS} cents) · ventana: ${WINDOW}"

# 2) Numero de presupuesto (mensual)
"$BIN" budget company:update -C "$CID" "${common[@]}" \
  --payload-json "{\"budgetMonthlyCents\": $CENTS}" >/dev/null
echo "  ✓ presupuesto fijado"

# 3) Politica con PARADA AUTOMATICA al llegar al limite (+ aviso al 80%)
"$BIN" budget policy:upsert -C "$CID" "${common[@]}" --payload-json \
  "{\"scopeType\":\"company\",\"scopeId\":\"$CID\",\"metric\":\"billed_cents\",\"windowKind\":\"$WINDOW\",\"amount\":$CENTS,\"warnPercent\":80,\"hardStopEnabled\":true,\"notifyEnabled\":true,\"isActive\":true}" >/dev/null
echo "  ✓ parada automatica activada (hard stop)"

# 4) Verificar
echo "=== overview ==="
"$BIN" budget overview -C "$CID" "${common[@]}" 2>/dev/null | sed "s/\x1b\[[0-9;]*m//g" | head -20
