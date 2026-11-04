// Asistentes de IA que mandan visitas a la web.
//
// Se reconocen por el referrer o, cuando el asistente no lo pasa, por el
// utm_source que añade a sus enlaces (ChatGPT pone utm_source=chatgpt.com).
// Es un minimo: parte de las visitas desde una app de IA llegan sin ninguno
// de los dos y se cuentan como directas.

const AI_SOURCES: { name: string; pattern: RegExp }[] = [
  { name: "ChatGPT", pattern: /chatgpt\.com|chat\.openai\.com|openai\.com/i },
  { name: "Perplexity", pattern: /perplexity/i },
  { name: "Gemini", pattern: /gemini\.google\.com|bard\.google\.com/i },
  { name: "Copilot", pattern: /copilot\.microsoft\.com|copilot\.cloud\.microsoft|bing\.com\/chat/i },
  { name: "Claude", pattern: /claude\.ai/i },
  { name: "DeepSeek", pattern: /deepseek/i },
  { name: "Grok", pattern: /grok\.com/i },
  { name: "Meta AI", pattern: /meta\.ai/i },
];

/** Nombre del asistente de IA que aparece en el texto, o null. */
export function aiSource(text: string | null | undefined): string | null {
  if (!text) return null;
  return AI_SOURCES.find((s) => s.pattern.test(text))?.name ?? null;
}

/**
 * Lo que se guarda como referrer de una visita: el referrer real o, si no hay,
 * el utm_source del enlace, para no perder las visitas que ChatGPT manda sin
 * referrer.
 */
export function visitReferrer(referrer: string, search: string): string | null {
  if (referrer) return referrer;
  const utm = new URLSearchParams(search).get("utm_source");
  return utm ? `utm_source=${utm}` : null;
}
