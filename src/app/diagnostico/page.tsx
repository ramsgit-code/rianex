import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import { DiagnosticoView } from "./DiagnosticoView";

export const metadata: Metadata = {
  title: "Diagnóstico gratuito",
  description:
    "Diagnóstico de 30 minutos. Analizo tu proceso comercial y te digo qué automatizar, integrar o migrar primero.",
  alternates: alternates("/diagnostico", "es"),
};

export default function DiagnosticoPage() {
  return <DiagnosticoView />;
}
