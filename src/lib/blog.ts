import * as fs from "fs";
import * as path from "path";
import { parseBlogFile, type BlogFrontmatter, type LinkPolicy } from "@/lib/blog-schema";
import type { Lang } from "@/lib/i18n";

// Fuente unica del blog publico: los .mdx del repositorio.
//
// Antes cada ruta (listado, articulo, sitemap, RSS, llms.txt) consultaba la
// base por su cuenta y se tragaba el error. Cuando una consulta fallaba y otra
// no, el listado enseñaba articulos que daban 404, el sitemap mandaba a Google
// a esos 404 y llms.txt decia que el blog estaba vacio. Leyendo del repositorio
// en el build todas las rutas ven exactamente el mismo lote, y un articulo que
// no cumple el contrato rompe el despliegue en vez de publicarse a medias.

// El castellano es el original. La traduccion al ingles de un articulo vive en
// blog-en con el mismo nombre de fichero; un articulo sin traducir solo existe
// en castellano (y /en/blog/<slug> redirige al original, ver next.config.mjs).
const BLOG_DIRS: Record<Lang, string> = {
  es: path.join(process.cwd(), "src/content/blog"),
  en: path.join(process.cwd(), "src/content/blog-en"),
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  cluster: BlogFrontmatter["cluster"];
  author: string;
  linkPolicy: LinkPolicy;
  publishedAt: Date;
  /** Igual a publishedAt si el articulo no se ha revisado. */
  updatedAt: Date;
  video: { src: string; poster: string; duration: string } | null;
};

const cache: Partial<Record<Lang, BlogPost[]>> = {};

/** Articulos publicados en un idioma, del mas reciente al mas antiguo. */
export function getAllPosts(lang: Lang = "es"): BlogPost[] {
  const cached = cache[lang];
  if (cached) return cached;

  const BLOG_DIR = BLOG_DIRS[lang];
  if (!fs.existsSync(BLOG_DIR)) return (cache[lang] = []);

  // Una traduccion sin original no se publica: el original manda.
  const originales =
    lang === "es" ? null : new Set(getAllPosts("es").map((p) => p.slug));

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { frontmatter, content } = parseBlogFile(raw, file);
      return { file, frontmatter, content };
    })
    .filter(({ frontmatter }) => !frontmatter.draft)
    .filter(({ file }) => !originales || originales.has(file.replace(/\.mdx$/, "")))
    .map(({ file, frontmatter, content }) => ({
      slug: file.replace(/\.mdx$/, ""),
      title: frontmatter.title,
      description: frontmatter.description,
      content,
      tags: frontmatter.tags,
      cluster: frontmatter.cluster,
      author: frontmatter.author,
      linkPolicy: frontmatter.linkPolicy,
      publishedAt: new Date(`${frontmatter.date}T00:00:00Z`),
      updatedAt: new Date(`${frontmatter.updated ?? frontmatter.date}T00:00:00Z`),
      video:
        frontmatter.video && frontmatter.videoPoster && frontmatter.videoDuration
          ? { src: frontmatter.video, poster: frontmatter.videoPoster, duration: frontmatter.videoDuration }
          : null,
    }))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  cache[lang] = posts;
  return posts;
}

export function getPost(slug: string, lang: Lang = "es"): BlogPost | null {
  return getAllPosts(lang).find((p) => p.slug === slug) ?? null;
}

/** Si el articulo tiene version en el otro idioma (para el hreflang). */
export function hasTranslation(slug: string): boolean {
  return getPost(slug, "es") !== null && getPost(slug, "en") !== null;
}

/**
 * Articulos relacionados para el pie de cada articulo. Primero los que
 * comparten mas etiquetas, despues los del mismo cluster y, a igualdad, los
 * revisados mas recientemente. Reparte enlaces internos a los articulos que
 * solo se enlazaban desde el listado.
 */
export function getRelatedPosts(post: BlogPost, max = 3, lang: Lang = "es"): BlogPost[] {
  const tags = new Set(post.tags.map((t) => t.toLowerCase()));
  return getAllPosts(lang)
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      comunes: p.tags.filter((t) => tags.has(t.toLowerCase())).length,
      mismoCluster: p.cluster === post.cluster ? 1 : 0,
    }))
    .sort(
      (a, b) =>
        b.comunes - a.comunes ||
        b.mismoCluster - a.mismoCluster ||
        b.p.updatedAt.getTime() - a.p.updatedAt.getTime()
    )
    .slice(0, max)
    .map(({ p }) => p);
}

/**
 * Preguntas de la seccion "## Preguntas frecuentes" (en ingles, "## Frequently
 * asked questions"; cada una un "###"), para
 * el FAQPage del articulo. Los enlaces se quedan en texto: el schema no los
 * necesita y Google muestra la respuesta sin formato.
 */
export function getPostFaqs(post: BlogPost): { q: string; a: string }[] {
  const section = post.content.split(/^## (?:Preguntas frecuentes|Frequently asked questions)\s*$/m)[1];
  if (!section) return [];
  const body = section.split(/^## /m)[0];
  return body
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [q, ...rest] = block.split("\n");
      // Cada respuesta es un parrafo. Sin cortar ahi, la ultima se llevaba
      // el parrafo de cierre del articulo (la llamada a la consultoria).
      const a = rest
        .join("\n")
        .trim()
        .split(/\n\s*\n/)[0]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/\*\*/g, "")
        .replace(/\s+/g, " ")
        .trim();
      return { q: q.trim(), a };
    })
    .filter((f) => f.q && f.a);
}
