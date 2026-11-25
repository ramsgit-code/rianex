"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { content, type Content } from "@/lib/content";
import { EN_PREFIX, langFromPathname, localizePath, type Lang } from "@/lib/i18n";

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  c: Content;
  /** Ruta equivalente en el otro idioma, para el enlace del selector. */
  otherLangHref: string;
  /**
   * Pasa una ruta interna al idioma activo. Sin esto, navegar desde
   * /en/servicios por un enlace a "/soluciones" devolveria al visitante al
   * castellano a mitad de sesion.
   */
  localize: (path: string) => string;
};

/**
 * Destino del selector de idioma. Las landings de campaña solo existen en
 * castellano: desde ahi el selector lleva a la portada inglesa en vez de a
 * una URL que da 404.
 */
function otherLangHref(pathname: string, lang: Lang): string {
  if (lang === "en") return localizePath(pathname, "es");
  // Un articulo sin traducir redirige solo al original (next.config.mjs).
  return pathname.startsWith("/l/") ? EN_PREFIX : localizePath(pathname, "en");
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // El idioma sale de la URL, no de localStorage. Antes el ingles era estado
  // de cliente: no tenia direccion propia, asi que Google no podia indexarlo
  // ni se podia compartir un enlace en ingles.
  const lang = langFromPathname(pathname);

  const setLang = (l: Lang) => {
    if (l === lang) return;
    router.push(localizePath(pathname, l));
  };

  // El <html lang> se sirve como "es" porque el layout raiz es comun a los dos
  // idiomas. En las paginas inglesas se corrige al hidratar; el hreflang del
  // <head>, que es lo que Google usa para el idioma, si va bien desde el HTML.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value: LangContextValue = {
    lang,
    setLang,
    toggle: () => setLang(lang === "es" ? "en" : "es"),
    c: content[lang] as unknown as Content,
    otherLangHref: otherLangHref(pathname, lang),
    localize: (path: string) => {
      // Las landings de campaña solo existen en castellano.
      if (path.startsWith("/l/")) return path;
      // Anclas de la home ("/#para-quien") en el idioma activo.
      const [route, hash] = path.split("#");
      const base = localizePath(route || "/", lang);
      return hash ? `${base}#${hash}` : base;
    },
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  }
  return ctx;
}
