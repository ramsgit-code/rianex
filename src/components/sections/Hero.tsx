"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";
import { ProcessBoard } from "@/components/sections/ProcessBoard";

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
          <h1 className="font-display text-[clamp(3rem,12vw,5.25rem)] lg:text-[clamp(3.5rem,5.6vw,5.25rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.015em] text-foreground">
            <span className="block">{h.title[0]}</span>
            <span className="mt-2 inline-block bg-accent px-2 pb-1 sm:px-2.5">{h.title[1]}</span>
          </h1>

          <p className="measure mt-7 text-pretty text-lg leading-relaxed text-foreground-muted">
            {h.lead}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={localize("/diagnostico")} className="btn-primary">
              {h.ctaPrimary}
              <ArrowRight size={17} aria-hidden />
            </Link>
            <Link href="#servicios" className="btn-secondary">
              {h.ctaSecondary}
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">{h.note}</p>
        </div>

        <div className="lg:col-span-6 xl:col-span-7">
          <ProcessBoard tasks={h.tasks} lanes={h.lanes} label={h.boardLabel} hoursLabel={h.hoursLabel} />
        </div>
      </div>

      {/* banda de prueba: resultado real de un caso propio */}
      <div className="bg-ink text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:gap-12 lg:px-12">
          <dl className="flex flex-col gap-4 sm:flex-row sm:gap-10">
            {h.proof.map((p) => (
              <div key={p.metric} className="flex items-baseline gap-3">
                <dt className="font-display text-4xl font-extrabold tabular-nums text-accent">{p.metric}</dt>
                <dd className="max-w-[16rem] text-sm leading-snug text-background/80">
                  {p.label} <span className="font-semibold text-background">· {h.proofClient}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-background/15 pt-5 lg:ml-auto lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
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
                  alt={logo.alt}
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
