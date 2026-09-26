import { MetadataRoute } from "next";

// El "*" de abajo ya deja pasar a cualquier bot por defecto (no hay bloqueo
// implícito). Estas entradas nombradas son redundantes a propósito: algunos
// crawlers de IA solo respetan una regla con su user-agent exacto en vez de
// heredar el wildcard, y para Rianex interesa estar tanto en el entrenamiento
// como en las respuestas en vivo (a diferencia de un medio que quiere lo
// segundo pero no lo primero), así que se permiten todos sin distinción.
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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/admin/"],
      })),
    ],
    sitemap: "https://www.rianex.es/sitemap.xml",
    host: "https://www.rianex.es",
  };
}
