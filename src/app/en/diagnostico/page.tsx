import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";

// La pagina es la misma: las vistas sacan el idioma del contexto, que a su vez
// lo saca de la URL. Aqui solo cambia el metadata.
export { default } from "@/app/diagnostico/page";

export const metadata: Metadata = {
  title: "Free diagnosis",
  description:
    "A 30-minute diagnosis. We review your sales process and tell you what to automate, integrate or migrate first.",
  alternates: alternates("/diagnostico", "en"),
};
