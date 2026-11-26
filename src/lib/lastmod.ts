import type { Lang } from "@/lib/i18n";

/**
 * Fecha del ultimo cambio real de contenido de cada seccion. La usan el
 * sitemap (lastmod), el JSON-LD (dateModified) y la linea «Actualizado el…»
 * de las fichas: las tres tienen que decir lo mismo.
 *
 * Antes todas las paginas salian con la fecha del despliegue: cada build
 * marcaba la web entera como modificada, y Google deja de fiarse del lastmod
 * cuando no coincide con cambios de verdad (tambien del de los articulos, que
 * si es bueno).
 *
 * Se actualiza a mano, en el mismo PR que cambia el contenido de la seccion.
 * Las fichas de una seccion comparten fecha: es menos fino que una por pagina,
 * pero no miente.
 */
export const LASTMOD = {
  home: "2026-11-25",
  servicios: "2026-11-26",
  soluciones: "2026-11-26",
  ofertas: "2026-11-26",
  casos: "2026-11-26",
  diagnostico: "2026-11-25",
  testimonios: "2026-11-25",
  sobreMi: "2026-11-25",
  calculadora: "2026-11-24",
  legal: "2026-11-25",
} as const;

/** «25 de noviembre de 2026» / «25 November 2026». */
export function formatDate(iso: string, lang: Lang): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
