import type { Metadata } from "next";
import { CasosView } from "./CasosView";

export const metadata: Metadata = {
  title: "Casos y servicios",
  description:
    "Casos reales y los servicios de IA que construyo en cada proyecto, sobre Go High Level.",
};

export default function CasosPage() {
  return <CasosView />;
}
