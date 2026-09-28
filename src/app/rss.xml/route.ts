import { prisma } from "@/lib/prisma";

const BASE_URL = "https://www.rianex.es";

export const revalidate = 3600;

function escapar(texto: string) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  let posts: {
    slug: string;
    title: string;
    description: string;
    author: string;
    publishedAt: Date | null;
    updatedAt: Date;
  }[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        title: true,
        description: true,
        author: true,
        publishedAt: true,
        updatedAt: true,
      },
    });
  } catch {
    // Sin base de datos se sirve un feed vacio pero valido, que es mejor que
    // devolver un 500 a un lector de feeds: los agresivos castigan el error.
  }

  const items = posts
    .map((p) => {
      const fecha = (p.publishedAt ?? p.updatedAt).toUTCString();
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
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
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
