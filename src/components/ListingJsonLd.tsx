import { JsonLd } from "@/components/JsonLd";
import { getAllPosts } from "@/lib/blog";
import { CASOS } from "@/lib/casos";
import { content } from "@/lib/content";
import { SECTORES } from "@/lib/sectores";
import { ORGANIZATION_ID, SITE_URL } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";

// JSON-LD de los listados y de las paginas sin ficha propia: migas de pan y,
// donde hay una lista, sus elementos. Antes /blog, /casos-de-exito,
// /soluciones, /diagnostico y /testimonios no llevaban datos estructurados.

type Ruta = "/blog" | "/casos-de-exito" | "/soluciones" | "/diagnostico" | "/testimonios";

const NOMBRE: Record<Ruta, Record<Lang, string>> = {
  "/blog": { es: "Blog", en: "Blog" },
  "/casos-de-exito": { es: "Casos de éxito", en: "Case studies" },
  "/soluciones": { es: "Soluciones por sector", en: "Solutions by industry" },
  "/diagnostico": { es: "Consultoría gratuita", en: "Free assessment" },
  "/testimonios": { es: "Testimonios", en: "Testimonials" },
};

function elementos(path: Ruta, lang: Lang): { name: string; url: string }[] {
  const pre = `${SITE_URL}${lang === "en" ? "/en" : ""}`;
  if (path === "/blog") {
    // En ingles, solo los articulos traducidos: son los que viven bajo /en/blog.
    return getAllPosts(lang).map((p) => ({ name: p.title, url: `${pre}/blog/${p.slug}` }));
  }
  if (path === "/casos-de-exito") {
    return Object.entries(CASOS).map(([slug, c]) => ({ name: c[lang].h1, url: `${pre}/casos-de-exito/${slug}` }));
  }
  if (path === "/soluciones") {
    return Object.entries(SECTORES).map(([slug, s]) => ({ name: s[lang].h1, url: `${pre}/soluciones/${slug}` }));
  }
  return [];
}

export function ListingJsonLd({ path, lang }: { path: Ruta; lang: Lang }) {
  const pre = `${SITE_URL}${lang === "en" ? "/en" : ""}`;
  const url = `${pre}${path}`;
  const name = NOMBRE[path][lang];
  const items = elementos(path, lang);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: pre || SITE_URL },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };

  const page = {
    "@context": "https://schema.org",
    "@type": items.length ? "CollectionPage" : "WebPage",
    "@id": `${url}#page`,
    url,
    name,
    inLanguage: lang === "en" ? "en" : "es-ES",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": ORGANIZATION_ID },
    ...(items.length
      ? {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: items.length,
            itemListElement: items.map((it, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: it.name,
              url: it.url,
            })),
          },
        }
      : {}),
  };

  // Preguntas frecuentes de la pagina, si las tiene.
  const faq =
    path === "/diagnostico"
      ? content[lang].diagnostico.faq
      : path === "/soluciones"
        ? content[lang].soluciones.faq
        : [];

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={page} />
      {faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
    </>
  );
}
