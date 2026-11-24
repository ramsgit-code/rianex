"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";
import { ProcessBoard } from "@/components/sections/ProcessBoard";
import { EmailCta } from "@/components/EmailCta";

// Versiones claras de los logos (la banda es grafito).
// Solo casos propios de Rianex: Hospital Capilar es de Growth4U y no va aquí.
const clientLogos = [
  { src: "/logos/eventos-barcelona.png", alt: "Eventos Barcelona", h: "h-7 sm:h-8", w: 435, height: 117, href: "https://www.eventosbarcelona.com" },
  { src: "/logos/tribeca.png", alt: "Tribeca Media", h: "h-9 sm:h-10", w: 800, height: 800, href: "https://www.tribecamedia.com" },
  { src: "/logos/growth4u.png", alt: "Growth4U", h: "h-4 sm:h-[18px]", w: 339, height: 64, href: "https://growth4u.io" },
];

export function Hero() {
  const { lang, localize } = useLang();
  const h = home[lang].hero;

  return (
    <section className="relative pt-[4.5rem] sm:pt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 pb-12 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:pb-14 lg:pt-14">
        <div className="lg:col-span-6 xl:col-span-5 xl:pt-2">
          <h1 className="font-display text-[clamp(2.25rem,9.5vw,4.25rem)] lg:text-[clamp(2.75rem,4.6vw,4.25rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.015em] text-foreground">
            <span className="block">{h.title[0]}</span>
            <span className="mt-2 inline-block bg-accent px-2 pb-1 sm:px-2.5">{h.title[1]}</span>
          </h1>

          <p className="measure mt-7 text-pretty text-lg leading-relaxed text-foreground-muted">
            {h.lead}
          </p>

          {/* Captura progresiva: el email llega ya escrito al paso 1 del diagnóstico */}
          <div className="mt-8">
            <EmailCta
              button={h.ctaPrimary}
              placeholder={h.emailPlaceholder}
              label={h.emailLabel}
              origin="hero"
            />
          </div>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <span>{h.note}</span>
            <Link href="#servicios" className="font-semibold text-foreground underline underline-offset-4 hover:text-accent-text">
              {h.ctaSecondary}
            </Link>
          </p>
        </div>

        <div className="lg:col-span-6 xl:col-span-7">
          <ProcessBoard tasks={h.tasks} lanes={h.lanes} label={h.boardLabel} hoursLabel={h.hoursLabel} />
        </div>
      </div>

      {/* banda de prueba: cifras de casos propios, cada una con la objeción que responde */}
      <div className="bg-ink text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-12">
          <h2 className="sr-only">{h.proofTitle}</h2>
          <ul className="grid grid-cols-2 gap-px bg-background/15 lg:grid-cols-4">
            {h.proof.map((p) => (
              <li key={p.tag} className="bg-ink">
                <Link
                  href={localize(p.href)}
                  className="group flex h-full flex-col gap-2 px-3 py-4 sm:px-5"
                >
                  <span className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-background/60">
                    {p.tag}
                  </span>
                  <span className="font-display text-3xl font-extrabold tabular-nums text-accent sm:text-4xl">{p.metric}</span>
                  <span className="text-sm leading-snug text-background/80">{p.label}</span>
                  <span className="mt-auto pt-1 text-sm font-semibold text-background underline-offset-4 group-hover:underline">
                    {p.client} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-background/15 pt-6">
            <span className="sr-only">{h.logosLabel}</span>
            {clientLogos.map((logo) => (
              <a
                key={logo.alt}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.alt}
                className="opacity-70 transition-opacity hover:opacity-100"
              >
                <Image
                  src={logo.src}
                  alt={`Logotipo de ${logo.alt}`}
                  width={logo.w}
                  height={logo.height}
                  className={`${logo.h} w-auto object-contain`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
