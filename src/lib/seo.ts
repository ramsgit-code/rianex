import type { Metadata } from "next";
import { alternates, localizePath, type Lang } from "@/lib/i18n";

// Title, description y tarjeta social de cada pagina, en los dos idiomas.
//
// Antes cada pagina declaraba solo title y description, y la tarjeta social
// la heredaba del layout raiz: compartir /servicios o /en/servicios en
// LinkedIn enseñaba "Rianex — Automatización y desarrollo con IA", en
// castellano y siempre igual. Aqui cada pagina lleva la suya y en su idioma.
//
// Los titles llevan la busqueda a la que responde la pagina y caben en la
// SERP (unos 60 caracteres contando el " | Rianex" que añade el layout).

export const SITE_URL = "https://www.rianex.es";
const BRAND = "Rianex";
const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: BRAND };

type PageCopy = { title: string; description: string };

const PAGES: Record<string, Record<Lang, PageCopy>> = {
  "/": {
    es: {
      title: "Automatización con IA, GoHighLevel y HubSpot",
      description:
        "Automatización y desarrollo con IA para empresas. Integramos GoHighLevel y HubSpot con tus herramientas y migramos tu CRM a GoHighLevel con todo tu histórico.",
    },
    en: {
      title: "AI automation, GoHighLevel and HubSpot",
      description:
        "AI automation and development for businesses. We integrate GoHighLevel and HubSpot with your tools and migrate your CRM to GoHighLevel with its full history.",
    },
  },
  "/servicios": {
    es: {
      title: "Servicios de automatización con IA y GoHighLevel",
      description:
        "Automatización de procesos con IA, integración de GoHighLevel y HubSpot, migraciones a GoHighLevel, desarrollo a medida y agentes de IA.",
    },
    en: {
      title: "AI automation and GoHighLevel services",
      description:
        "AI process automation, GoHighLevel and HubSpot integrations, migrations to GoHighLevel, custom development and AI agents.",
    },
  },
  "/casos-de-exito": {
    es: {
      title: "Casos de éxito de automatización con IA",
      description:
        "Sistemas de IA en producción sobre GoHighLevel: −32% de coste por paciente en una clínica y −85% de tiempo de respuesta en una empresa de eventos.",
    },
    en: {
      title: "AI automation case studies",
      description:
        "AI systems running on GoHighLevel: −32% cost per patient at a clinic and −85% response time at an events company. Challenge, build and result.",
    },
  },
  "/soluciones": {
    es: {
      title: "Automatización para clínicas, eventos y academias",
      description:
        "El mismo enfoque de automatización con IA, ajustado al ciclo de venta de clínicas, empresas de eventos, academias y servicios profesionales.",
    },
    en: {
      title: "Automation for clinics, events and academies",
      description:
        "The same AI automation approach, tuned to the sales cycle of clinics, event companies, training academies and professional services.",
    },
  },
  "/blog": {
    es: {
      title: "Blog de automatización con IA y GoHighLevel",
      description:
        "Guías prácticas sobre automatización con IA, agentes, GoHighLevel y HubSpot: costes, migraciones, integraciones, RGPD y casos reales.",
    },
    en: {
      title: "AI automation and GoHighLevel blog",
      description:
        "Practical guides on AI automation, agents, GoHighLevel and HubSpot: costs, migrations, integrations, GDPR and real cases. Articles in Spanish.",
    },
  },
  "/testimonios": {
    es: {
      title: "Testimonios y opiniones de clientes",
      description:
        "Opiniones reales de clientes con sistemas de automatización comercial en GoHighLevel: clínicas, empresas de eventos y agencias.",
    },
    en: {
      title: "Client testimonials and reviews",
      description:
        "Real feedback from clients running sales automation systems on GoHighLevel: clinics, event companies and agencies.",
    },
  },
  "/sobre-mi": {
    es: {
      title: "Sobre Rianex: ingeniería y automatización con IA",
      description:
        "Ingenieros industriales con experiencia en plantas industriales y automatización con IA. Automatización y desarrollo con IA sobre GoHighLevel y HubSpot.",
    },
    en: {
      title: "About Rianex: engineering and AI automation",
      description:
        "Industrial engineers with plant-floor experience and AI automation. Automation and AI development on GoHighLevel and HubSpot.",
    },
  },
  "/diagnostico": {
    es: {
      title: "Diagnóstico gratuito de automatización con IA",
      description:
        "Diagnóstico gratuito de 30 minutos. Analizamos tu proceso comercial y te decimos qué automatizar, integrar o migrar primero.",
    },
    en: {
      title: "Free AI automation assessment",
      description:
        "A free 30-minute assessment. We review your sales process and tell you what to automate, integrate or migrate first.",
    },
  },
};

/** Metadata completo de una pagina traducida: title, canonical, hreflang y tarjeta social. */
export function pageMetadata(path: keyof typeof PAGES, lang: Lang): Metadata {
  const { title, description } = PAGES[path][lang];
  const localized = localizePath(path, lang);
  const url = `${SITE_URL}${localized === "/" ? "" : localized}`;
  const fullTitle = `${title} | ${BRAND}`;

  return {
    // absolute: el title ya lleva la marca, que el template no la duplique.
    title: { absolute: fullTitle },
    description,
    alternates: alternates(path, lang),
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_ES" : "en_US",
      alternateLocale: lang === "es" ? "en_US" : "es_ES",
      url,
      siteName: BRAND,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/** Metadata base de cada layout raiz: lo que hereda una pagina que no declara el suyo. */
export function rootMetadata(lang: Lang): Metadata {
  const home = pageMetadata("/", lang);
  return {
    ...home,
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${PAGES["/"][lang].title} | ${BRAND}`,
      template: `%s | ${BRAND}`,
    },
    // Sin canonical: una pagina que no declare el suyo heredaria el de la
    // home. Cada pagina declara el suyo con pageMetadata.
    alternates: {
      // Para que lectores de feeds y agregadores descubran el RSS solos.
      types: { "application/rss+xml": `${SITE_URL}/rss.xml` },
    },
    robots: { index: true, follow: true },
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}
