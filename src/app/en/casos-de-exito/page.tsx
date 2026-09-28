import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";

// La pagina es la misma: las vistas sacan el idioma del contexto, que a su vez
// lo saca de la URL. Aqui solo cambia el metadata.
export { default } from "@/app/casos-de-exito/page";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Real AI systems built on GoHighLevel: the challenge, what we built and the result.",
  alternates: alternates("/casos-de-exito", "en"),
};
