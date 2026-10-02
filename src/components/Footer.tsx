"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

const EMAIL = "hola@rianex.es";

export function Footer() {
  const { c, lang, localize } = useLang();
  const pathname = usePathname();
  const year = new Date().getFullYear();
  // en /diagnostico no repetimos el CTA de diagnóstico
  const showCta = pathname !== "/diagnostico";

  return (
    <footer className="relative mt-16 border-t border-ink/[0.08]">
      <div className="mx-auto max-w-5xl px-6 pb-28 pt-14 sm:pb-14">
        <div className="glass relative overflow-hidden rounded-3xl px-6 py-10 text-center md:px-10 md:py-14">
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[26rem] -translate-x-1/2 rounded-full bg-accent/12 blur-[100px]" />
          <div className="relative">
            <div className="flex justify-center">
              <Image
                src="/logos/rianex-mark-dark.png"
                alt="Rianex"
                width={1145}
                height={253}
                className="h-7 w-auto"
              />
            </div>
            <p className="mx-auto mt-2 max-w-sm text-sm text-foreground-muted">
              {c.footer.tagline}
            </p>
            {showCta && (
              <Link href={localize("/diagnostico")} className="btn-primary mt-6">
                {c.footer.cta}
                <ArrowUpRight size={16} />
              </Link>
            )}
            <div className="mt-6">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 text-sm text-foreground-muted transition-colors hover:text-accent-text"
              >
                <Mail size={15} className="text-accent-text" />
                {EMAIL}
              </a>
            </div>
          </div>
        </div>

        {/* Mapa de la web en el pie: cada servicio a un clic desde cualquier
            pagina, para la gente y para los rastreadores. */}
        <nav className="mt-10 grid grid-cols-1 gap-8 text-sm sm:grid-cols-[2fr_1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              {c.footer.servicesLabel}
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {c.servicios.items.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={localize(`/servicios/${s.slug}`)}
                    className="text-foreground-muted transition-colors hover:text-accent-text"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              {c.footer.pagesLabel}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {c.footer.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={localize(l.href)}
                    className="text-foreground-muted transition-colors hover:text-accent-text"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="mt-10 flex flex-col items-center gap-2 text-center text-xs text-muted">
          <div className="flex items-center gap-4">
            <Link href="/privacidad" className="transition-colors hover:text-accent-text">
              {lang === "en" ? "Privacy policy" : "Política de privacidad"}
            </Link>
            <span aria-hidden>·</span>
            <Link href="/cookies" className="transition-colors hover:text-accent-text">
              {lang === "en" ? "Cookie policy" : "Política de cookies"}
            </Link>
          </div>
          <p>© {year} Rianex · {c.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
