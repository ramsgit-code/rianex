import { tarjetaSocial } from "@/lib/og-card";
import { SERVICIO_SLUGS, getServicio } from "@/lib/servicios";
import { SECTOR_SLUGS, getSector } from "@/lib/sectores";
import { CASO_SLUGS, getCaso } from "@/lib/casos";
import { LANGS, type Lang } from "@/lib/i18n";

// Imagen social de cada ficha de servicio, sector y caso, en su idioma:
// /og/p/<es|en>/<servicios|soluciones|casos-de-exito>/<slug>. Antes todas
// compartian /og.png, que ademas llevaba un mensaje que la web ya no usa.

export const dynamic = "force-static";
export const dynamicParams = false;

const SECCIONES = {
  servicios: { slugs: SERVICIO_SLUGS, get: getServicio, etiqueta: { es: "Servicio", en: "Service" } },
  soluciones: { slugs: SECTOR_SLUGS, get: getSector, etiqueta: { es: "Soluciones por sector", en: "Solutions by industry" } },
  "casos-de-exito": { slugs: CASO_SLUGS, get: getCaso, etiqueta: { es: "Caso de éxito", en: "Case study" } },
} as const;

type Seccion = keyof typeof SECCIONES;

export function generateStaticParams() {
  return LANGS.flatMap((lang) =>
    (Object.keys(SECCIONES) as Seccion[]).flatMap((seccion) =>
      SECCIONES[seccion].slugs.map((slug) => ({ lang, seccion, slug }))
    )
  );
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lang: string; seccion: string; slug: string }> }
) {
  const { lang, seccion, slug } = await params;
  const s = SECCIONES[seccion as Seccion];
  const l = (lang === "en" ? "en" : "es") as Lang;
  const d = s?.get(slug, l);
  // Los servicios no tienen h1 propio: su titular es el seoTitle.
  const titulo = d ? ("h1" in d ? d.h1 : d.seoTitle) : "Rianex";
  return tarjetaSocial(titulo, s ? s.etiqueta[l] : "Rianex");
}
