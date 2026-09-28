import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";

// La pagina es la misma: las vistas sacan el idioma del contexto, que a su vez
// lo saca de la URL. Aqui solo cambia el metadata.
export { default } from "@/app/soluciones/page";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "The same AI automation approach, tuned to the sales cycle of clinics, event companies, training academies and professional services.",
  alternates: alternates("/soluciones", "en"),
};
