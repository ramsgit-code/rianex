import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// La pagina es la misma: las vistas sacan el idioma del contexto, que a su vez
// lo saca de la URL. Aqui solo cambia el metadata.
export { default } from "@/app/(es)/casos-de-exito/page";

export const metadata: Metadata = pageMetadata("/casos-de-exito", "en");
