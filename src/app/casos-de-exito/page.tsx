import type { Metadata } from "next";
import { CasosView } from "./CasosView";

export const metadata: Metadata = {
  title: "Casos de éxito",
  description:
    "Casos de éxito de sistemas de IA implementados en negocios, sobre GoHighLevel: reto, solución y resultado.",
  alternates: { canonical: "/casos-de-exito" },
};

export default function CasosPage() {
  return <CasosView />;
}
