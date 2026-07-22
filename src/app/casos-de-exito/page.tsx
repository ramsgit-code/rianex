import type { Metadata } from "next";
import { CasosView } from "./CasosView";

export const metadata: Metadata = {
  title: "Casos reales",
  description:
    "Casos reales de sistemas de IA implementados en negocios, sobre Go High Level: reto, solución y resultado.",
};

export default function CasosPage() {
  return <CasosView />;
}
