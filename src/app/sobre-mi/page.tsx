import type { Metadata } from "next";
import { SobreMiView } from "./SobreMiView";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Especialistas en sistemas de captación y automatización comercial con Go High Level.",
};

export default function SobreMiPage() {
  return <SobreMiView />;
}
