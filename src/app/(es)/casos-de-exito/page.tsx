import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import { CasosView } from "./CasosView";

export const metadata: Metadata = pageMetadata("/casos-de-exito", "es");

export default function CasosPage() {
  return (
    <>
      <ListingJsonLd path="/casos-de-exito" lang="es" />
      <CasosView />
    </>
  );
}
