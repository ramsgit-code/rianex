import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://www.rianex.es";

export const dynamic = "force-static";

function escapar(texto: string) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((p) => {
      const fecha = p.publishedAt.toUTCString();
      return `    <item>
      <title>${escapar(p.title)}</title>
      <link>${BASE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${p.slug}</guid>
      <description>${escapar(p.description)}</description>
      <author>${escapar(p.author)}</author>
      <pubDate>${fecha}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog de Rianex</title>
    <link>${BASE_URL}/blog</link>
    <description>Automatización de procesos con IA, agentes a medida, integraciones de CRM y desarrollo con IA para negocios.</description>
    <language>es-ES</language>
    <lastBuildDate>${(posts[0]?.publishedAt ?? new Date()).toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
