"use client";

import Link from "next/link";
import { ArrowRight, Bot, LayoutGrid, Workflow, FileText } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { LOGOS } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

const clientLogos = [
  { src: LOGOS.hospitalCapilar, alt: "Hospital Capilar", h: "h-9" },
  { src: LOGOS.eventosBarcelona, alt: "EB Eventos Barcelona", h: "h-9" },
  { src: LOGOS.growth4u, alt: "Growth4U", h: "h-5" },
];

const offeringIcons = [Bot, LayoutGrid, Workflow, FileText];

export function Hero() {
  const { c } = useLang();
  const h = c.hero;

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 md:pt-44 md:pb-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />

      <div className="section-wide relative !py-0">
        <Reveal>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl sm:leading-[1.05] md:text-7xl">
            {h.titlePre}
            <span className="gradient-text">{h.titleHighlight}</span>
            {h.titlePost}
          </h1>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
            {h.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/diagnostico" className="btn-primary">
              {h.ctaPrimary}
              <ArrowRight size={16} />
            </Link>
            <Link href="/servicios" className="btn-secondary">
              {h.ctaSecondary}
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">{h.note}</p>
        </Reveal>

        {/* clientes */}
        <Reveal delay={0.15}>
          <div className="mt-14 border-t border-white/[0.08] pt-8">
            <p className="mb-5 text-xs uppercase tracking-wider text-muted">
              {h.logosLabel}
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
              {clientLogos.map((logo) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.h} w-auto object-contain opacity-60 transition-opacity duration-300 hover:opacity-100`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* qué construyo — lista ligera con iconos */}
        <Reveal delay={0.18}>
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {h.offeringTitle}
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
              {h.offering.map((o, i) => {
                const Icon = offeringIcons[i % offeringIcons.length];
                return (
                  <li
                    key={o}
                    className="flex items-center gap-3.5 border-b border-white/[0.06] py-3.5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/[0.08] text-accent">
                      <Icon size={18} />
                    </span>
                    <span className="text-[15px] font-medium text-foreground">
                      {o}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        {/* métricas — franja única, sin tarjetas */}
        <Reveal delay={0.22}>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/[0.08] pt-8 sm:grid-cols-4 sm:divide-x sm:divide-white/[0.08]">
            {c.metrics.map((s) => (
              <div key={s.label} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <p className="font-display text-3xl font-semibold tracking-tight text-accent">
                  {s.value}
                </p>
                <p className="mt-1 text-sm leading-snug text-foreground-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
