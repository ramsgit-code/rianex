import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import { SobreMiView } from "./SobreMiView";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Grupo de ingenieros industriales con experiencia en plantas industriales y automatización con IA. Automatización y desarrollo con IA sobre GoHighLevel y HubSpot.",
  alternates: alternates("/sobre-mi", "es"),
};

export default function SobreMiPage() {
  return <SobreMiView />;
}
