import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import { SolucionesView } from "./SolucionesView";

export const metadata: Metadata = pageMetadata("/soluciones", "es");

export default function SolucionesPage() {
  return (
    <>
      <ListingJsonLd path="/soluciones" lang="es" />
      <SolucionesView />
    </>
  );
}
