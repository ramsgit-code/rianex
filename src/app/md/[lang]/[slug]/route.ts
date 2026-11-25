import { getAllPosts, getPost } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";

// Version Markdown de cada articulo, para asistentes y agentes de IA que leen
// mejor el texto plano que el HTML. Se publica en /blog/<slug>.md y
// /en/blog/<slug>.md (rewrite en next.config.mjs), cada articulo la anuncia con
// <link rel="alternate" type="text/markdown"> y llms.txt lo explica.
//
// La canonica sigue siendo la pagina HTML: va en la cabecera Link, para que un
// buscador no la trate como contenido duplicado. Los .mdx del blog son
// Markdown puro (sin componentes), asi que el cuerpo sale tal cual; solo los
// enlaces internos pasan a absolutos, porque fuera de la web no tienen base.

export const dynamic = "force-static";
export const dynamicParams = false;

const LANGS: Lang[] = ["es", "en"];

export function generateStaticParams() {
  return LANGS.flatMap((lang) => getAllPosts(lang).map((p) => ({ lang, slug: p.slug })));
}

const dia = (d: Date) => d.toISOString().slice(0, 10);

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const post = LANGS.includes(lang as Lang) ? getPost(slug, lang as Lang) : null;
  if (!post) return new Response("Not found", { status: 404 });

  const en = lang === "en";
  const url = `${SITE_URL}${en ? "/en" : ""}/blog/${slug}`;
  const ficha = [
    `- URL: ${url}`,
    `- ${en ? "Author" : "Autor"}: ${post.author} (Rianex, ${SITE_URL})`,
    `- ${en ? "Published" : "Publicado"}: ${dia(post.publishedAt)}`,
    ...(post.updatedAt.getTime() !== post.publishedAt.getTime()
      ? [`- ${en ? "Updated" : "Actualizado"}: ${dia(post.updatedAt)}`]
      : []),
  ];
  const cuerpo = post.content.trim().replace(/\]\(\//g, `](${SITE_URL}/`);
  const md = `# ${post.title}\n\n> ${post.description}\n\n${ficha.join("\n")}\n\n${cuerpo}\n`;

  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${url}>; rel="canonical"`,
    },
  });
}
