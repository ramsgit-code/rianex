import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";

// La pagina es la misma: las vistas sacan el idioma del contexto, que a su vez
// lo saca de la URL. Aqui solo cambia el metadata.
export { default } from "@/app/blog/page";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides on AI automation, GoHighLevel and HubSpot.",
  alternates: alternates("/blog", "en"),
};
