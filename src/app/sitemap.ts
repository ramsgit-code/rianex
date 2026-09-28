import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { ES_ONLY_ROUTES } from "@/lib/i18n";

const BASE_URL = "https://www.rianex.es";

// Prioridad por ruta. Lo que no aparezca hereda el valor por defecto.
const PRIORITY: Record<string, number> = {
  "/": 1.0,
  "/diagnostico": 0.9,
  "/servicios": 0.9,
  "/casos-de-exito": 0.9,
  "/soluciones": 0.8,
  "/blog": 0.7,
  "/testimonios": 0.6,
  "/sobre-mi": 0.6,
};

const CHANGE_FREQ: Record<string, "yearly" | "monthly" | "weekly"> = {
  "/": "monthly",
  "/diagnostico": "yearly",
  "/servicios": "monthly",
  "/casos-de-exito": "monthly",
  "/soluciones": "monthly",
  "/blog": "weekly",
  "/testimonios": "monthly",
  "/sobre-mi": "yearly",
};

async function getBlogSlugs(): Promise<{ slug: string; date: Date }[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, publishedAt: true, updatedAt: true },
      orderBy: { publishedAt: "desc" },
    });
    return posts.map((p) => ({ slug: p.slug, date: p.publishedAt ?? p.updatedAt }));
  } catch {
    return [];
  }
}

/**
 * Entrada bilingue: la URL castellana como principal y el hreflang apuntando a
 * las dos. Google exige que la referencia sea reciproca, y declararla tambien
 * en el sitemap ahorra tener que rastrear cada pagina para descubrirla.
 */
function bilingual(path: string, lastModified: Date): MetadataRoute.Sitemap[number] {
  const es = `${BASE_URL}${path === "/" ? "" : path}`;
  const en = `${BASE_URL}/en${path === "/" ? "" : path}`;

  return {
    url: es,
    lastModified,
    changeFrequency: CHANGE_FREQ[path] ?? "monthly",
    priority: PRIORITY[path] ?? 0.7,
    alternates: { languages: { "es-ES": es, en } },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getBlogSlugs();

  const staticPages = Object.keys(PRIORITY).map((path) => bilingual(path, now));

  const blogPages = posts.map((p) => bilingual(`/blog/${p.slug}`, new Date(p.date)));

  // Los textos legales solo existen en castellano, asi que van sin hreflang.
  const legalPages = ES_ONLY_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...staticPages, ...blogPages, ...legalPages];
}
