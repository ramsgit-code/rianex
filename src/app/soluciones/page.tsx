import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import { SolucionesView } from "./SolucionesView";

export const metadata: Metadata = {
  title: "Soluciones",
  description:
    "El mismo enfoque de automatización con IA, ajustado al ciclo de venta de clínicas, empresas de eventos, academias y servicios profesionales.",
  alternates: alternates("/soluciones", "es"),
};

export default function SolucionesPage() {
  return <SolucionesView />;
}
