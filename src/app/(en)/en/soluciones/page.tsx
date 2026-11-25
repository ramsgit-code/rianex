import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import { SolucionesView } from "@/app/(es)/soluciones/SolucionesView";

export const metadata: Metadata = pageMetadata("/soluciones", "en");

// La vista es la misma (saca el idioma de la URL); el JSON-LD va en ingles.
export default function SolucionesPageEn() {
  return (
    <>
      <ListingJsonLd path="/soluciones" lang="en" />
      <SolucionesView />
    </>
  );
}
