import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import { DiagnosticoView } from "./DiagnosticoView";

export const metadata: Metadata = pageMetadata("/diagnostico", "es");

export default function DiagnosticoPage() {
  return (
    <>
      <ListingJsonLd path="/diagnostico" lang="es" />
      <DiagnosticoView />
    </>
  );
}
