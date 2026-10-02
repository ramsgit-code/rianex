import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CasosView } from "./CasosView";

export const metadata: Metadata = pageMetadata("/casos-de-exito", "es");

export default function CasosPage() {
  return <CasosView />;
}
