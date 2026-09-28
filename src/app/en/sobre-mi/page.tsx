import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";

// La pagina es la misma: las vistas sacan el idioma del contexto, que a su vez
// lo saca de la URL. Aqui solo cambia el metadata.
export { default } from "@/app/sobre-mi/page";

export const metadata: Metadata = {
  title: "About us",
  description:
    "A team of industrial engineers with plant-floor experience and AI automation. Automation and AI development on GoHighLevel and HubSpot.",
  alternates: alternates("/sobre-mi", "en"),
};
