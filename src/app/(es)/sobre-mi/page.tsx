import type { Metadata } from "next";
import { ORGANIZATION_ID, pageMetadata, PERSON_ID, RAMIRO, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { SobreMiView } from "./SobreMiView";

export const metadata: Metadata = pageMetadata("/sobre-mi", "es");

// La persona detras de Rianex, como entidad: es lo que permite a buscadores y
// asistentes de IA unir la web, los articulos (que firma) y los perfiles
// externos en una sola ficha.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${SITE_URL}/sobre-mi`,
  mainEntity: {
    "@type": "Person",
    "@id": PERSON_ID,
    name: RAMIRO.name,
    image: `${SITE_URL}${RAMIRO.photo}`,
    sameAs: [RAMIRO.linkedin],
    jobTitle: "Ingeniero industrial",
    description:
      "Ingeniero industrial. Fundador de Rianex (automatización con IA, captación y software a medida) y responsable de proyecto en la transformación digital de la cadena de suministro de Nissan. Profesor de Industria 4.0 en el máster de la UCAV.",
    hasOccupation: [
      { "@type": "Occupation", name: "Fundador de Rianex" },
      { "@type": "Occupation", name: "Business Analyst y jefe de proyecto, cadena de suministro de Nissan" },
      { "@type": "Occupation", name: "Profesor de Industria 4.0, Máster en Ingeniería Industrial (UCAV)" },
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Universidad de Valladolid" },
      { "@type": "CollegeOrUniversity", name: "Universidad Europea" },
    ],
    url: `${SITE_URL}/sobre-mi`,
    email: "hola@rianex.es",
    address: { "@type": "PostalAddress", addressLocality: "Ávila", addressCountry: "ES" },
    worksFor: { "@type": "ProfessionalService", "@id": ORGANIZATION_ID, name: "Rianex", url: SITE_URL },
    knowsAbout: [
      "Automatización con IA",
      "Agentes de IA",
      "GoHighLevel",
      "HubSpot",
      "Migración de CRM",
      "Integraciones por API",
      "Ingeniería industrial",
      "Cadena de suministro",
      "Migración de ERP",
      "Industria 4.0",
      "Desarrollo de software a medida",
      "Prospección B2B",
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
