import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Testimonials } from "@/components/sections/Testimonials";
import { Marquee } from "@/components/Marquee";
import { JsonLd } from "@/components/JsonLd";
import { prisma } from "@/lib/prisma";
import { content } from "@/lib/content";

export const revalidate = 60;

const SITE_URL = "https://www.rianex.es";

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rianex",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  description:
    "Automatización y desarrollo con IA, integración de GoHighLevel y HubSpot, y migraciones de CRM a GoHighLevel.",
  email: "hola@rianex.es",
  areaServed: "ES",
  knowsAbout: [
    "Automatización comercial",
    "Inteligencia artificial",
    "GoHighLevel",
    "HubSpot",
    "Migración de CRM",
    "CRM",
    "Lead qualification",
    "Agentes de IA",
  ],
  founder: { "@type": "Person", name: "Ramiro Pérez" },
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
      where: { approved: true },
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
      <Faq />
    </>
  );
}
