import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";

// La pagina es la misma: las vistas sacan el idioma del contexto, que a su vez
// lo saca de la URL. Aqui solo cambia el metadata.
export { default } from "@/app/testimonios/page";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Real feedback from clients running sales automation systems on Go High Level.",
  alternates: alternates("/testimonios", "en"),
};

export const revalidate = 60;
