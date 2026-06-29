"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { LOGOS } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

const clientLogos = [
  { src: LOGOS.hospitalCapilar, alt: "Hospital Capilar", h: "h-9" },
  { src: LOGOS.eventosBarcelona, alt: "EB Eventos Barcelona", h: "h-9" },
  { src: LOGOS.growth4u, alt: "Growth4U", h: "h-5" },
];

export function Hero() {
  const { c } = useLang();
  const h = c.hero;

  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />

      <div className="section-wide relative !py-0">
        <Reveal>
          <h1 className="max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl">
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

        {/* qué construyo */}
        <Reveal delay={0.18}>
          <div className="mt-14">
            <p className="mb-3 text-xs uppercase tracking-wider text-muted">
              {h.offeringTitle}
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {h.offering.map((o) => (
                <li
                  key={o}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-foreground-muted backdrop-blur-md"
                >
                  <Check size={13} className="text-accent" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* métricas */}
        <Reveal delay={0.22}>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {c.metrics.map((s) => (
              <div
                key={s.label}
                className="card !p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="font-display text-3xl font-semibold tracking-tight text-foreground">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
