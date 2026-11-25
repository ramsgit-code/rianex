// robots.txt escrito como texto: MetadataRoute.Robots no admite la linea
// Content-Signal, que declara para que se puede usar el contenido.
//
// El "*" ya deja pasar a cualquier bot por defecto (no hay bloqueo implicito).
// Las entradas nombradas son redundantes a proposito: algunos crawlers de IA
// solo respetan una regla con su user-agent exacto en vez de heredar el
// wildcard, y para Rianex interesa estar tanto en el entrenamiento como en las
// respuestas en vivo (a diferencia de un medio que quiere lo segundo pero no lo
// primero), asi que se permiten todos sin distincion.
//
// Content-Signal (politica de Cloudflare, borrador en el IETF) dice lo mismo
// de forma explicita: buscar, citar en respuestas y entrenar. Google ha dicho
// que no lo usa; cuesta una linea por grupo.
//
// /md/ es la ruta interna de la version Markdown de los articulos; la publica
// es /blog/<slug>.md (ver next.config.mjs), que si se rastrea.

export const dynamic = "force-static";

const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

const DISALLOW = ["/api/", "/admin/", "/md/"];
const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=yes";

const grupo = (userAgent: string) =>
  [
    `User-Agent: ${userAgent}`,
    `Content-Signal: ${CONTENT_SIGNAL}`,
    "Allow: /",
    ...DISALLOW.map((ruta) => `Disallow: ${ruta}`),
  ].join("\n");

export function GET() {
  const body = [
    ...["*", ...AI_BOTS].map(grupo),
    ["Host: https://www.rianex.es", "Sitemap: https://www.rianex.es/sitemap.xml"].join("\n"),
  ].join("\n\n");
  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
