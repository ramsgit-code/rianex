import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { Solution } from "@/components/sections/Solution";
import { VideoDemo } from "@/components/sections/VideoDemo";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Process } from "@/components/sections/Process";
import { SocialProof } from "@/components/sections/SocialProof";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  alternates: { canonical: "https://ramiroperez.com" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué es un sistema de cualificación de leads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un sistema de cualificación de leads es un proceso automatizado que filtra y puntúa a los potenciales clientes según criterios como presupuesto, urgencia y tipo de necesidad, antes de que el equipo comercial hable con ellos. Permite dedicar tiempo solo a los leads con intención real de compra.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué herramientas utiliza Ramiro Perez para la automatización comercial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ramiro Perez trabaja principalmente con Go High Level (GHL) como CRM y plataforma de automatización, junto con WhatsApp Business API para comunicaciones y secuencias de nurturing. También integra formularios multi-paso, sistemas de lead scoring y generadores automáticos de propuestas comerciales.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto tiempo tarda en implementarse un sistema de automatización comercial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depende de la complejidad del sistema. Un Lead Qualification System básico puede estar operativo en 2-3 semanas. Un sistema completo con propuestas automáticas y automatización de WhatsApp puede llevar entre 4 y 6 semanas, incluyendo la fase de diagnóstico, diseño, implementación y formación.",
      },
    },
    {
      "@type": "Question",
      name: "¿Para qué tipo de negocios es adecuada la automatización comercial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Es especialmente útil para negocios con 10 o más leads al mes que tienen un proceso comercial repetible: clínicas, academias, empresas de eventos, consultoras y agencias. Cualquier negocio donde el equipo pierde tiempo en seguimientos manuales, propuestas lentas o leads sin cualificar.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué es Go High Level y para qué sirve en ventas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go High Level (GHL) es una plataforma CRM todo-en-uno que centraliza la gestión de leads, automatizaciones de email y WhatsApp, pipelines de ventas y generación de propuestas. Permite automatizar todo el proceso comercial desde la captación hasta el cierre, sin necesidad de múltiples herramientas separadas.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <Problems />
      <Solution />
      <VideoDemo />
      <Services />
      <CaseStudies />
      <Process />
      <SocialProof />
      <FinalCTA />
    </>
  );
}
