"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Linkedin, Mail } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { RIANEX_LINKEDIN } from "@/lib/seo";

const EMAIL = "hola@rianex.es";

export function Footer() {
  const { c, lang, localize } = useLang();
  const pathname = usePathname();
  const year = new Date().getFullYear();
  // ni en /diagnostico ni en la home (que ya cierra con su propio bloque)
  // repetimos la llamada a la consultoría
  const showCta = !["/diagnostico", "/en/diagnostico", "/", "/en"].includes(pathname);

  return (
    <footer className="relative bg-ink text-background">
      {showCta && (
        <div className="bg-accent text-ink">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
            <p className="max-w-2xl text-balance font-display text-4xl font-extrabold uppercase leading-[0.92] md:text-5xl">
              {c.pageCta.title}
            </p>
            <Link href={localize("/diagnostico")} className="btn-primary shrink-0">
              {c.footer.cta}
              <ArrowUpRight size={17} aria-hidden />
            </Link>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-14 sm:px-8 sm:pb-12 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/logos/rianex-mark.png"
              alt="Rianex"
              width={1145}
              height={253}
              className="h-7 w-auto"
            />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-background/70">{c.footer.tagline}</p>
            <div className="mt-6 flex flex-col gap-3 text-[15px]">
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2.5 text-background hover:text-accent">
                <Mail size={16} aria-hidden className="text-accent" />
                {EMAIL}
              </a>
              <a
                href={RIANEX_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-background hover:text-accent"
              >
                <Linkedin size={16} aria-hidden className="text-accent" />
                {lang === "en" ? "Follow Rianex on LinkedIn" : "Sigue a Rianex en LinkedIn"}
              </a>
            </div>
          </div>

          {/* Mapa de la web en el pie: cada servicio a un clic desde cualquier
              pagina, para la gente y para los rastreadores. */}
          <nav className="grid grid-cols-1 gap-10 text-[15px] sm:grid-cols-[2fr_1fr] lg:col-span-8">
            <div>
              <p className="border-b-2 border-accent pb-2 font-display text-[13px] font-bold uppercase tracking-[0.08em] text-background">
                {c.footer.servicesLabel}
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {c.servicios.items.map((s) => (
                  <li key={s.slug}>
                    <Link href={localize(`/servicios/${s.slug}`)} className="text-background/70 transition-colors hover:text-accent">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="border-b-2 border-accent pb-2 font-display text-[13px] font-bold uppercase tracking-[0.08em] text-background">
                {c.footer.pagesLabel}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.footer.links.map((l) => (
                  <li key={l.href}>
                    <Link href={localize(l.href)} className="text-background/70 transition-colors hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-background/15 pt-6 text-xs text-background/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Rianex · {c.footer.rights}</p>
          <div className="flex items-center gap-5">
            <Link href="/privacidad" className="hover:text-accent">
              {lang === "en" ? "Privacy policy" : "Política de privacidad"}
            </Link>
            <Link href="/cookies" className="hover:text-accent">
              {lang === "en" ? "Cookie policy" : "Política de cookies"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
