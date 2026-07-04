// Traducción gratuita vía el endpoint público de Google (sin API key).
// Uso server-side. Si falla, devuelve el texto original (fallback seguro).

async function translateChunk(text: string, from: string, to: string): Promise<string> {
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx" +
    `&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    // no cachear
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`translate ${res.status}`);
  const data = (await res.json()) as unknown;
  // data[0] = array de segmentos; cada segmento[0] = texto traducido
  const segments = (data as [[string][]])[0];
  return segments.map((s) => s[0]).join("");
}

// Trocea por líneas para respetar el límite del endpoint (~5000 chars).
function chunkByLines(text: string, max = 4000): string[] {
  const lines = text.split("\n");
  const chunks: string[] = [];
  let cur = "";
  for (const line of lines) {
    if ((cur + "\n" + line).length > max && cur) {
      chunks.push(cur);
      cur = line;
    } else {
      cur = cur ? cur + "\n" + line : line;
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

export async function translate(
  text: string | null | undefined,
  from: string = "es",
  to: string = "en"
): Promise<string | null> {
  if (!text || !text.trim()) return null;
  try {
    const chunks = chunkByLines(text);
    const out: string[] = [];
    for (const ch of chunks) {
      out.push(await translateChunk(ch, from, to));
    }
    return out.join("\n");
  } catch {
    // fallback: devolvemos el original para no dejar el campo vacío
    return text;
  }
}
