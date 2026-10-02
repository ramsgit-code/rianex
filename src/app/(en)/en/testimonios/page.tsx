import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// La pagina es la misma: las vistas sacan el idioma del contexto, que a su vez
// lo saca de la URL. Aqui solo cambia el metadata.
export { default } from "@/app/(es)/testimonios/page";

export const metadata: Metadata = pageMetadata("/testimonios", "en");

export const revalidate = 60;
