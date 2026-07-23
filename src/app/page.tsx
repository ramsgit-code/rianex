import { Hero } from "@/components/sections/Hero";
import { Results } from "@/components/sections/Results";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Marquee } from "@/components/Marquee";
import { JsonLd } from "@/components/JsonLd";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

const SITE_URL = "https://rianex.vercel.app";

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rianex",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  description:
    "Automatización comercial con IA: captación, cualificación y cierre de clientes en Go High Level (WhatsApp, Telegram, correo y CRM).",
  email: "ramiroperez12@hotmail.com",
  areaServed: "ES",
  knowsAbout: [
    "Automatización comercial",
    "Inteligencia artificial",
    "Go High Level",
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
      <Hero />
      <Results />
      <Capabilities />
      <Marquee />
      <Testimonials items={testimonials} />
      {/* pasos: ocultos en móvil (home light), visibles en escritorio */}
      <div className="hidden sm:block">
        <Process />
      </div>
    </>
  );
}
