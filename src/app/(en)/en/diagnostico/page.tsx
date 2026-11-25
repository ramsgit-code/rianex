import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import { DiagnosticoView } from "@/app/(es)/diagnostico/DiagnosticoView";

export const metadata: Metadata = pageMetadata("/diagnostico", "en");

// La vista es la misma (saca el idioma de la URL); el JSON-LD va en ingles.
export default function DiagnosticoPageEn() {
  return (
    <>
      <ListingJsonLd path="/diagnostico" lang="en" />
      <DiagnosticoView />
    </>
  );
}
