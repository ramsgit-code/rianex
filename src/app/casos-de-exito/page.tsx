import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import { CasosView } from "./CasosView";

export const metadata: Metadata = {
  title: "Casos de éxito",
  description:
    "Casos de éxito de sistemas de IA implementados en negocios, sobre GoHighLevel: reto, solución y resultado.",
  alternates: alternates("/casos-de-exito", "es"),
};

export default function CasosPage() {
  return <CasosView />;
}
