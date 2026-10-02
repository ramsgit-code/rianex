import * as fs from "fs";
import * as path from "path";
import { parseBlogFile, type BlogFrontmatter, type LinkPolicy } from "@/lib/blog-schema";

// Fuente unica del blog publico: los .mdx del repositorio.
//
// Antes cada ruta (listado, articulo, sitemap, RSS, llms.txt) consultaba la
// base por su cuenta y se tragaba el error. Cuando una consulta fallaba y otra
// no, el listado enseñaba articulos que daban 404, el sitemap mandaba a Google
// a esos 404 y llms.txt decia que el blog estaba vacio. Leyendo del repositorio
// en el build todas las rutas ven exactamente el mismo lote, y un articulo que
// no cumple el contrato rompe el despliegue en vez de publicarse a medias.

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

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
};

let cache: BlogPost[] | null = null;

/** Articulos publicados, del mas reciente al mas antiguo. */
export function getAllPosts(): BlogPost[] {
  if (cache) return cache;

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { frontmatter, content } = parseBlogFile(raw, file);
      return { file, frontmatter, content };
    })
    .filter(({ frontmatter }) => !frontmatter.draft)
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
    }))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  cache = posts;
  return posts;
}

export function getPost(slug: string): BlogPost | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}
