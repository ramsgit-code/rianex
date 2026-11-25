import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import { CasosView } from "@/app/(es)/casos-de-exito/CasosView";

export const metadata: Metadata = pageMetadata("/casos-de-exito", "en");

// La vista es la misma (saca el idioma de la URL); el JSON-LD va en ingles.
export default function CasosPageEn() {
  return (
    <>
      <ListingJsonLd path="/casos-de-exito" lang="en" />
      <CasosView />
    </>
  );
}
