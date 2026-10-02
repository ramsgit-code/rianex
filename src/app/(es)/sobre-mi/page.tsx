import type { Metadata } from "next";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { SobreMiView } from "./SobreMiView";

export const metadata: Metadata = pageMetadata("/sobre-mi", "es");

// La persona detras de Rianex, como entidad: es lo que permite a buscadores y
// asistentes de IA unir la web, los articulos (que firma) y los perfiles
// externos en una sola ficha. Los perfiles van en sameAs cuando existan.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${SITE_URL}/sobre-mi`,
  mainEntity: {
    "@type": "Person",
    name: "Ramiro Pérez Rodero",
    jobTitle: "Ingeniero industrial",
    description:
      "Ingeniero industrial con experiencia en plantas industriales. Automatización y desarrollo con IA sobre GoHighLevel y HubSpot.",
    url: `${SITE_URL}/sobre-mi`,
    email: "hola@rianex.es",
    address: { "@type": "PostalAddress", addressLocality: "Ávila", addressCountry: "ES" },
    worksFor: { "@type": "ProfessionalService", name: "Rianex", url: SITE_URL },
    knowsAbout: [
      "Automatización con IA",
      "Agentes de IA",
      "GoHighLevel",
      "HubSpot",
      "Migración de CRM",
      "Integraciones por API",
      "Ingeniería industrial",
    ],
  },
};

export default function SobreMiPage() {
  return (
    <>
      <JsonLd data={personJsonLd} />
      <SobreMiView />
    </>
  );
}
