import type { Metadata } from "next";
import { ServiciosView } from "./ServiciosView";
import { JsonLd } from "@/components/JsonLd";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Sistemas de automatización comercial en Go High Level: cualificación de leads, embudos de captación, booking SDR, propuestas automáticas, CRM y agentes de IA a medida.",
  alternates: { canonical: "/servicios" },
};

const SITE_URL = "https://www.rianex.es";

export default function ServiciosPage() {
  const items = content.es.servicios.items;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: item.title,
        description: item.problem,
        provider: { "@type": "ProfessionalService", name: "Rianex" },
        url: `${SITE_URL}/servicios#${item.slug}`,
      },
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServiciosView />
    </>
  );
}
