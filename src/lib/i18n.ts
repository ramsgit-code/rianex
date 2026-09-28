import type { Metadata } from "next";

// El castellano vive en la raiz (/servicios) y el ingles cuelga del prefijo
// /en (/en/servicios). Se mantienen los mismos slugs en los dos idiomas: las
// URLs en castellano ya estan indexadas y no se tocan, y el hreflang es lo que
// le dice a Google que son la misma pagina en otro idioma.

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "es";
export const EN_PREFIX = "/en";

/** Rutas publicas traducidas, sin prefijo de idioma. */
export const TRANSLATED_ROUTES = [
  "/",
  "/servicios",
  "/soluciones",
  "/casos-de-exito",
  "/testimonios",
  "/blog",
  "/sobre-mi",
  "/diagnostico",
] as const;

/** Rutas que solo existen en castellano (textos legales). */
export const ES_ONLY_ROUTES = ["/privacidad", "/cookies"] as const;

export function langFromPathname(pathname: string): Lang {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`)
    ? "en"
    : "es";
}

/** Quita el prefijo de idioma: /en/servicios -> /servicios */
export function stripLang(pathname: string): string {
  if (langFromPathname(pathname) !== "en") return pathname;
  return pathname.slice(EN_PREFIX.length) || "/";
}

/** Misma pagina en el idioma pedido. */
export function localizePath(pathname: string, target: Lang): string {
  const base = stripLang(pathname);
  if (target === "es") return base;
  return base === "/" ? EN_PREFIX : `${EN_PREFIX}${base}`;
}

/**
 * Bloque `alternates` para el metadata de una pagina: canonical del idioma que
 * se esta sirviendo y hreflang reciproco hacia el otro. Google necesita que la
 * referencia sea mutua, si solo apunta una de las dos se ignora.
 */
export function alternates(path: string, lang: Lang): Metadata["alternates"] {
  const es = path;
  const en = localizePath(path, "en");

  return {
    canonical: lang === "es" ? es : en,
    languages: {
      "es-ES": es,
      en,
      // Quien no encaje en ningun idioma concreto aterriza en castellano, que
      // es el mercado principal.
      "x-default": es,
    },
  };
}
