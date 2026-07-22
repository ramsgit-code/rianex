import type { Metadata } from "next";
import { SobreMiView } from "./SobreMiView";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Grupo de ingenieros industriales con experiencia en plantas industriales y automatización con IA. Sistemas de IA de extremo a extremo sobre Go High Level.",
};

export default function SobreMiPage() {
  return <SobreMiView />;
}
