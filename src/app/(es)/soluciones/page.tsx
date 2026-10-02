import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SolucionesView } from "./SolucionesView";

export const metadata: Metadata = pageMetadata("/soluciones", "es");

export default function SolucionesPage() {
  return <SolucionesView />;
}
