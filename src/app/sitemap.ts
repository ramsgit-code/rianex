import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SERVICIO_SLUGS } from "@/lib/servicios";
import { SECTOR_SLUGS } from "@/lib/sectores";
import { CASO_SLUGS } from "@/lib/casos";
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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = Object.keys(PRIORITY).map((path) => bilingual(path, now));

  const servicePages = SERVICIO_SLUGS.map((slug) => ({
    ...bilingual(`/servicios/${slug}`, now),
    priority: 0.8,
  }));

  const sectorPages = SECTOR_SLUGS.map((slug) => ({
    ...bilingual(`/soluciones/${slug}`, now),
    priority: 0.8,
  }));

  const casePages = CASO_SLUGS.map((slug) => ({
    ...bilingual(`/casos-de-exito/${slug}`, now),
    priority: 0.8,
  }));

  const toolPages = [
    { ...bilingual("/herramientas/calculadora-fuga-de-leads", now), priority: 0.8 },
  ];

  // Los articulos solo existen en castellano, asi que van sin hreflang.
  const blogPages = getAllPosts().map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Los textos legales solo existen en castellano, asi que van sin hreflang.
  const legalPages = ES_ONLY_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...staticPages, ...servicePages, ...sectorPages, ...casePages, ...toolPages, ...blogPages, ...legalPages];
}
