import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Guias } from "@/components/sections/Guias";
import { Testimonials } from "@/components/sections/Testimonials";
import { Marquee } from "@/components/Marquee";
import { JsonLd } from "@/components/JsonLd";
import { prisma } from "@/lib/prisma";
import { testimoniosPublicos } from "@/lib/testimonios";
import { content } from "@/lib/content";
import { pageMetadata, RAMIRO, RIANEX_LINKEDIN } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/", "es");

export const revalidate = 60;

const SITE_URL = "https://www.rianex.es";

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rianex",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  description:
    "Automatización de procesos con IA para empresas: Claude, n8n, Make y Zapier conectados a su CRM (GoHighLevel o HubSpot), agentes de IA para WhatsApp y web, y el proceso comercial automatizado con Clay, Instantly y Valley.",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Empresas que quieren automatizar procesos con IA",
    geographicArea: ["España", "Latinoamérica"],
  },
  email: "hola@rianex.es",
  sameAs: [RIANEX_LINKEDIN],
  areaServed: ["ES", "Latinoamérica"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ávila",
    addressCountry: "ES",
  },
  logo: `${SITE_URL}/logos/rianex-mark.png`,
  knowsAbout: [
    "Automatización de procesos con IA",
    "Automatización de procesos",
    "Agentes de IA",
    "Automatización comercial",
    "Outbound B2B",
    "n8n",
    "Make",
    "Zapier",
    "Claude",
    "Clay",
    "Instantly",
    "Inteligencia artificial",
    "GoHighLevel",
    "HubSpot",
    "Migración de CRM",
    "CRM",
    "Lead qualification",
  ],
  founder: {
    "@type": "Person",
    name: RAMIRO.name,
    jobTitle: "Ingeniero industrial",
    sameAs: [RAMIRO.linkedin],
    url: `${SITE_URL}/sobre-mi`,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rianex",
  url: SITE_URL,
  inLanguage: "es-ES",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: content.es.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

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

export default async function Home() {
  const testimonials = await getTestimonials();

  return (
    <>
      <JsonLd data={businessJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Hero />
      <Capabilities />
      <Marquee />
      <Testimonials items={testimonials} />
      <Pricing />
      {/* pasos: ocultos en móvil (home light), visibles en escritorio */}
      <div className="hidden sm:block">
        <Process />
      </div>
      <Guias />
      <Faq />
    </>
  );
}
