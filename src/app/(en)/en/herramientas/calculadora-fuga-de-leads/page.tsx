import type { Metadata } from "next";
import { CalculadoraView, CALCULADORA_COPY, CALCULADORA_PATH } from "@/app/(es)/herramientas/calculadora-fuga-de-leads/CalculadoraView";
import { translatedMetadata } from "@/lib/seo";

const t = CALCULADORA_COPY.en;

export const metadata: Metadata = translatedMetadata(CALCULADORA_PATH, "en", t.seoTitle, t.metaDescription);

export default function CalculadoraPage() {
  return <CalculadoraView lang="en" />;
}
