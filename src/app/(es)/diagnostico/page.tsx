import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { DiagnosticoView } from "./DiagnosticoView";

export const metadata: Metadata = pageMetadata("/diagnostico", "es");

export default function DiagnosticoPage() {
  return <DiagnosticoView />;
}
