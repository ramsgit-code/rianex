import type { Metadata } from "next";
import { CalculadoraView, CALCULADORA_COPY, CALCULADORA_PATH } from "./CalculadoraView";
import { translatedMetadata } from "@/lib/seo";

const t = CALCULADORA_COPY.es;

export const metadata: Metadata = translatedMetadata(CALCULADORA_PATH, "es", t.seoTitle, t.metaDescription);

export default function CalculadoraPage() {
  return <CalculadoraView lang="es" />;
}
