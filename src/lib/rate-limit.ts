import { NextRequest, NextResponse } from "next/server";

// Limitador de peticiones por IP con ventana deslizante de un minuto.
//
// En Vercel cada invocacion puede caer en una instancia distinta, asi que un
// contador en memoria no limita nada en cuanto la funcion escala. Si hay un
// Redis de Upstash configurado (las variables que inyectan tanto Vercel KV como
// la integracion de Upstash), el contador vive ahi y es global. Si no, se cae a
// un Map en memoria que solo sirve para desarrollo local.

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const WINDOW_SECONDS = 60;

export function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// ─── Fallback en memoria (solo desarrollo) ───────────────────────────────────

const memory = new Map<string, number[]>();
let lastSweep = Date.now();

// Sin esto las claves de IPs que ya no vuelven se quedan para siempre y el mapa
// crece sin techo en un proceso de larga vida.
function sweepMemory(now: number) {
  if (now - lastSweep < WINDOW_SECONDS * 1000) return;
  lastSweep = now;
  for (const [key, hits] of memory) {
    if (hits.every((t) => now - t >= WINDOW_SECONDS * 1000)) memory.delete(key);
  }
}

function hitMemory(key: string, max: number): boolean {
  const now = Date.now();
  sweepMemory(now);
  const hits = (memory.get(key) ?? []).filter(
    (t) => now - t < WINDOW_SECONDS * 1000
  );
  hits.push(now);
  memory.set(key, hits);
  return hits.length > max;
}

// ─── Contador en Redis (produccion) ──────────────────────────────────────────

// INCR sobre una clave con TTL: la primera peticion de la ventana crea la clave
// y le pone caducidad, el resto solo incrementan. Si Redis falla dejamos pasar
// la peticion: preferimos servir de mas antes que tirar el formulario entero.
async function hitRedis(key: string, max: number): Promise<boolean> {
  try {
    const res = await fetch(`${REDIS_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(WINDOW_SECONDS), "NX"],
      ]),
      cache: "no-store",
    });

    if (!res.ok) return false;

    const body = (await res.json()) as { result?: number }[];
    const count = Number(body?.[0]?.result ?? 0);
    return count > max;
  } catch (err) {
    console.error("[rate-limit] Redis no disponible, se deja pasar", err);
    return false;
  }
}

// ─── API publica ─────────────────────────────────────────────────────────────

/**
 * Devuelve una respuesta 429 si la IP ha superado `maxPerMinute` en el ultimo
 * minuto, o null si puede seguir. `bucket` separa contadores por endpoint para
 * que el formulario y el tracker no compartan cupo.
 */
export async function rateLimit(
  req: NextRequest,
  maxPerMinute = 5,
  bucket = "default"
): Promise<NextResponse | null> {
  const key = `rl:${bucket}:${clientIp(req)}`;

  const limited =
    REDIS_URL && REDIS_TOKEN
      ? await hitRedis(key, maxPerMinute)
      : hitMemory(key, maxPerMinute);

  if (!limited) return null;

  return NextResponse.json(
    { ok: false, error: "Too many requests" },
    { status: 429, headers: { "Retry-After": String(WINDOW_SECONDS) } }
  );
}
