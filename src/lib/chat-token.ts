import { createHmac, timingSafeEqual } from "crypto";

// Token del chat de precualificación. Lo emite /api/leads al guardar una
// solicitud y lo exige /api/chat: sin una solicitud enviada no hay chat, así
// que el endpoint no sirve de ChatGPT gratis ni para crear notas en contactos
// ajenos. Lleva solo el id de la solicitud y la caducidad.

const TTL_MS = 2 * 60 * 60 * 1000; // 2 horas

function secret(): string | null {
  return process.env.CHAT_TOKEN_SECRET || process.env.NEXTAUTH_SECRET || null;
}

/** El chat solo existe si hay clave de Anthropic y secreto para firmar. */
export function chatEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY && secret());
}

function sign(data: string, key: string): string {
  return createHmac("sha256", key).update(data).digest("base64url");
}

export function createChatToken(submissionId: string): string | null {
  const key = secret();
  if (!key) return null;
  const data = Buffer.from(JSON.stringify({ sid: submissionId, exp: Date.now() + TTL_MS })).toString("base64url");
  return `${data}.${sign(data, key)}`;
}

/** Devuelve el id de la solicitud si el token es válido y no ha caducado. */
export function verifyChatToken(token: unknown): string | null {
  const key = secret();
  if (!key || typeof token !== "string") return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = Buffer.from(sign(data, key));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const { sid, exp } = JSON.parse(Buffer.from(data, "base64url").toString());
    if (typeof sid !== "string" || typeof exp !== "number" || exp < Date.now()) return null;
    return sid;
  } catch {
    return null;
  }
}
