import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";

// La pagina es la misma: las vistas sacan el idioma del contexto, que a su vez
// lo saca de la URL. Aqui solo cambia el metadata.
export { default } from "@/app/servicios/page";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI process automation, GoHighLevel and HubSpot integrations, migrations to GoHighLevel, custom development and AI agents.",
  alternates: alternates("/servicios", "en"),
};
