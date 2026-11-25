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
 * Fecha del ultimo cambio real de contenido de cada seccion. Antes todas las
 * paginas salian con la fecha del despliegue: cada build marcaba la web entera
 * como modificada, y Google deja de fiarse del lastmod cuando no coincide con
 * cambios de verdad (tambien del de los articulos, que si es bueno).
 *
 * Se actualiza a mano, en el mismo PR que cambia el contenido de la seccion.
 * Las fichas de una seccion comparten fecha: es menos fino que una por pagina,
 * pero no miente.
 */
const LASTMOD = {
  home: "2026-11-25",
  servicios: "2026-11-25",
  soluciones: "2026-11-24",
  casos: "2026-11-24",
  diagnostico: "2026-11-18",
  testimonios: "2026-11-01",
  sobreMi: "2026-11-01",
  calculadora: "2026-11-24",
  legal: "2026-10-02",
} as const;

const STATIC_LASTMOD: Record<string, string> = {
  "/": LASTMOD.home,
  "/diagnostico": LASTMOD.diagnostico,
  "/servicios": LASTMOD.servicios,
  "/casos-de-exito": LASTMOD.casos,
  "/soluciones": LASTMOD.soluciones,
  "/testimonios": LASTMOD.testimonios,
  "/sobre-mi": LASTMOD.sobreMi,
};

const day = (iso: string) => new Date(`${iso}T00:00:00Z`);

/**
 * Pagina bilingue: una entrada por idioma, cada una con el hreflang hacia las
 * dos. Google exige que la referencia sea reciproca. La URL inglesa lleva su
 * propio <loc>: antes solo salia como alternativa de la castellana y, sin
 * enlaces internos, era la unica forma de descubrirla.
 */
function bilingual(path: string, lastModified: Date, priority?: number): MetadataRoute.Sitemap {
  const es = `${BASE_URL}${path === "/" ? "" : path}`;
  const en = `${BASE_URL}/en${path === "/" ? "" : path}`;
  const base = {
    lastModified,
    changeFrequency: CHANGE_FREQ[path] ?? ("monthly" as const),
    alternates: { languages: { "es-ES": es, en, "x-default": es } },
  };
  const p = priority ?? PRIORITY[path] ?? 0.7;

  return [
    { url: es, ...base, priority: p },
    // El mercado principal es el castellano: la inglesa va un punto por debajo.
    { url: en, ...base, priority: Math.round((p - 0.1) * 10) / 10 },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  // El listado del blog cambia cuando se publica o se revisa un articulo.
  const blogLastmod = posts.reduce((max, p) => (p.updatedAt > max ? p.updatedAt : max), day("2026-10-02"));

  const staticPages = Object.keys(PRIORITY).flatMap((path) =>
    bilingual(path, path === "/blog" ? blogLastmod : day(STATIC_LASTMOD[path]))
  );

  const servicePages = SERVICIO_SLUGS.flatMap((slug) =>
    bilingual(`/servicios/${slug}`, day(LASTMOD.servicios), 0.8)
  );

  const sectorPages = SECTOR_SLUGS.flatMap((slug) =>
    bilingual(`/soluciones/${slug}`, day(LASTMOD.soluciones), 0.8)
  );

  const casePages = CASO_SLUGS.flatMap((slug) =>
    bilingual(`/casos-de-exito/${slug}`, day(LASTMOD.casos), 0.8)
  );

  const toolPages = bilingual("/herramientas/calculadora-fuga-de-leads", day(LASTMOD.calculadora), 0.8);

  // Los articulos solo existen en castellano, asi que van sin hreflang.
  const blogPages = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Los textos legales solo existen en castellano, asi que van sin hreflang.
  const legalPages = ES_ONLY_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: day(LASTMOD.legal),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...staticPages, ...servicePages, ...sectorPages, ...casePages, ...toolPages, ...blogPages, ...legalPages];
}
