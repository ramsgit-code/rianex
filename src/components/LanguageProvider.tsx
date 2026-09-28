"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { content, type Content } from "@/lib/content";
import { langFromPathname, localizePath, type Lang } from "@/lib/i18n";

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
    otherLangHref: localizePath(pathname, lang === "es" ? "en" : "es"),
    localize: (path: string) => localizePath(path, lang),
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
