import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { OfertasView } from "./OfertasView";

export const metadata: Metadata = pageMetadata("/ofertas", "es");

export default function OfertasPage() {
  return <OfertasView lang="es" />;
}
