import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { OfertasView } from "@/app/(es)/ofertas/OfertasView";

export const metadata: Metadata = pageMetadata("/ofertas", "en");

export default function OfertasPageEn() {
  return <OfertasView lang="en" />;
}
