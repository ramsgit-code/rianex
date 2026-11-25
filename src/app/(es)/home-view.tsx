import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Services } from "@/components/sections/Services";
import { Audience } from "@/components/sections/Audience";
import { Cases } from "@/components/sections/Cases";
import { Close } from "@/components/sections/Close";
import { Faq } from "@/components/sections/Faq";
import { Guias } from "@/components/sections/Guias";
import { Testimonials } from "@/components/sections/Testimonials";
import { Marquee } from "@/components/Marquee";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localizePath } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { testimoniosPublicos } from "@/lib/testimonios";
import { content } from "@/lib/content";
import { ORGANIZATION_ID, PERSON_ID, RAMIRO, RIANEX_PERFILES } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";



const SITE_URL = "https://www.rianex.es";

// Textos del JSON-LD que cambian con el idioma. Antes /en servia el de la
// home castellana entero, preguntas frecuentes incluidas.
const LD = {
  es: {
    alternateName: "Rianex, agencia de automatización con IA",
    serviceType: "Agencia de automatización con IA",
    description:
      "Agencia de automatización con IA para empresas B2B: automatiza los procesos y el proceso comercial, construye software a medida y audita sistemas de IA antes de que escalen. Consultoría gratuita de 30 minutos y ofertas cerradas con precio publicado.",
    audienceType: "Empresas que quieren automatizar procesos con IA",
    geographicArea: ["España", "Latinoamérica"],
    place: "Rianex, Ávila (España)",
    catalog: "Servicios de automatización con IA",
    jobTitle: "Ingeniero industrial",
    inLanguage: "es-ES",
    prefix: "",
  },
  en: {
    alternateName: "Rianex, AI automation agency",
    serviceType: "AI automation agency",
    description:
      "AI automation agency for B2B companies: automates processes and the sales process, builds custom software and audits AI systems before they scale. A free 30-minute consultation and fixed-price offers with published prices.",
    audienceType: "Companies that want to automate processes with AI",
    geographicArea: ["Spain", "Latin America"],
    place: "Rianex, Ávila (Spain)",
    catalog: "AI automation services",
    jobTitle: "Industrial engineer",
    inLanguage: "en",
    prefix: "/en",
  },
} as const;

const businessJsonLd = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORGANIZATION_ID,
  name: "Rianex",
  alternateName: LD[lang].alternateName,
  url: SITE_URL,
  serviceType: LD[lang].serviceType,
  image: `${SITE_URL}/og/general/${lang}`,
  slogan: "AI Workflow & Business Automation",
  description: LD[lang].description,
  audience: {
    "@type": "BusinessAudience",
    audienceType: LD[lang].audienceType,
    geographicArea: [...LD[lang].geographicArea],
  },
  email: "hola@rianex.es",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hola@rianex.es",
    url: `${SITE_URL}${LD[lang].prefix}/diagnostico`,
    availableLanguage: ["es", "en"],
  },
  sameAs: RIANEX_PERFILES,
  areaServed: ["ES", "Latinoamérica"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ávila",
    addressRegion: "Castilla y León",
    addressCountry: "ES",
  },
  location: {
    "@type": "Place",
    name: LD[lang].place,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ávila",
      addressRegion: "Castilla y León",
      addressCountry: "ES",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: LD[lang].catalog,
    url: `${SITE_URL}${LD[lang].prefix}/servicios`,
  },
  logo: `${SITE_URL}/logos/rianex-mark.png`,
  knowsAbout: [
    "AI Workflow Automation",
    "Business Automation",
    "Automatización de flujos de trabajo con IA",
    "Automatización empresarial",
    "Agencia de automatización con IA",
    "Consultoría de IA",
    "Adopción de IA en la empresa",
    "Formación en IA para empresas",
    "Asesoramiento en IA",
    "Automatización de procesos con IA",
    "Automatización de procesos",
    "Agentes de IA",
    "Automatización comercial",
    "Outbound B2B",
    "Prospección B2B",
    "Go to Market",
    "Agentes de voz",
    "Meta Ads",
    "n8n",
    "Make",
    "Zapier",
    "Claude",
    "Clay",
    "Instantly",
    "Lemlist",
    "Vapi",
    "Inteligencia artificial",
    "GoHighLevel",
    "HubSpot",
    "Migración de CRM",
    "CRM",
    "Lead qualification",
    "Desarrollo de software a medida",
    "Auditoría de sistemas de IA",
    "Outbound en LinkedIn",
    "Cold calling",
    "Industria y logística",
  ],
  founder: {
    "@type": "Person",
    "@id": PERSON_ID,
    name: RAMIRO.name,
    jobTitle: LD[lang].jobTitle,
    sameAs: [RAMIRO.linkedin],
    url: `${SITE_URL}${LD[lang].prefix}/sobre-mi`,
  },
});

const websiteJsonLd = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Rianex",
  url: `${SITE_URL}${LD[lang].prefix}`,
  inLanguage: LD[lang].inLanguage,
  publisher: { "@id": ORGANIZATION_ID },
});

const faqJsonLd = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: LD[lang].inLanguage,
  mainEntity: content[lang].faq.items.map((item: { q: string; a: string }) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: testimoniosPublicos,
      orderBy: { createdAt: "desc" },
      take: 6,
      select: { id: true, name: true, company: true, role: true, quote: true, roleEn: true, quoteEn: true, imageUrl: true },
    });
  } catch {
    return [];
  }
}

/** La home en un idioma: la usan / y /en, cada una con su JSON-LD. */
export async function HomeView({ lang }: { lang: Lang }) {
  const testimonials = await getTestimonials();

  return (
    <>
      <JsonLd data={businessJsonLd(lang)} />
      <JsonLd data={websiteJsonLd(lang)} />
      <JsonLd data={faqJsonLd(lang)} />
      {/* Qué hacemos → qué servicios damos → para quién → prueba → cierre */}
      <Hero />
      <WhatWeDo />
      <Services />
      {/* Ofertas cerradas: trabajos con alcance, plazo y precio publicados. */}
      <section className="relative">
        <div className="tape" />
        <div className="section-wide">
          <h2 className="section-title">{lang === "es" ? "Ofertas cerradas" : "Fixed-price offers"}</h2>
          <p className="measure mt-4 text-lg leading-relaxed text-foreground-muted">
            {lang === "es"
              ? "Ocho trabajos con alcance, plazo y precio de partida publicados: auditorías de agentes y del gasto en IA, un clasificador de correo con IA, outbound en LinkedIn, radar de contenido, señales de compra y aplicaciones internas. Desde 1.500 € + IVA."
              : "Eight pieces of work with published scope, timeline and starting price: agent and AI spend audits, an AI email classifier, LinkedIn outbound, a content radar, buying signals and internal apps. From €1,500 + VAT."}
          </p>
          <Link href={localizePath("/ofertas", lang)} className="btn-tape mt-8">
            {lang === "es" ? "Ver las ofertas" : "See the offers"}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>
      <Audience />
      <Marquee />
      <Cases />
      <Testimonials items={testimonials} />
      <Guias />
      <Faq />
      <Close />
    </>
  );
}
