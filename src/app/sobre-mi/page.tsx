import type { Metadata } from "next";
import { SobreMiView } from "./SobreMiView";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Grupo de ingenieros industriales con experiencia en plantas industriales y automatización con IA. Automatización y desarrollo con IA sobre GoHighLevel y HubSpot.",
  alternates: { canonical: "/sobre-mi" },
};

export default function SobreMiPage() {
  return <SobreMiView />;
}
