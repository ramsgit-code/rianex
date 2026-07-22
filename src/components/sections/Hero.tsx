"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  LayoutGrid,
  Workflow,
  FileText,
  ListChecks,
  Magnet,
  CalendarCheck,
} from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { LOGOS } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { Typewriter } from "@/components/Typewriter";
import { AgentChat } from "@/components/sections/AgentChat";

const Hero3D = dynamic(
  () => import("@/components/Hero3D").then((m) => m.Hero3D),
  { ssr: false }
);

const clientLogos = [
  { src: LOGOS.hospitalCapilar, alt: "Hospital Capilar", h: "h-6 sm:h-9" },
  { src: LOGOS.eventosBarcelona, alt: "EB Eventos Barcelona", h: "h-6 sm:h-9" },
  { src: LOGOS.growth4u, alt: "Growth4U", h: "h-3.5 sm:h-5" },
  { src: LOGOS.tribeca, alt: "Tribeca Media", h: "h-8 sm:h-11" },
];

const offeringIcons = [
  Workflow,
  Magnet,
  LayoutGrid,
  Bot,
  ListChecks,
  CalendarCheck,
  FileText,
];

export function Hero() {
  const { c } = useLang();
  const h = c.hero;
  const spotRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(520px circle at ${x}px ${y}px, rgba(232,255,0,0.07), transparent 45%)`;
    }
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 md:pt-44 md:pb-20"
    >
      {/* spotlight que sigue el cursor */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0 z-0 hidden md:block"
      />
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />

      <div className="section-wide relative z-10 !py-0">
        {/* primera pantalla: titular + objeto 3D + clientes (abajo) */}
        <div className="flex min-h-[calc(100svh-7rem)] flex-col sm:min-h-[calc(100svh-8rem)] md:min-h-[calc(100svh-10rem)]">
          <div className="flex flex-1 flex-col justify-center gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <Reveal>
                <span className="tag uppercase tracking-wider">{h.eyebrow}</span>
              </Reveal>

              <Reveal delay={0.05}>
                <h1
                  aria-label={`${h.titlePre}${h.titleHighlight}${h.titlePost}`}
                  className="max-w-2xl text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl sm:leading-[1.05] lg:text-6xl"
                >
                  {h.titlePre}
                  <Typewriter text={h.titleHighlight} className="gradient-text" />
                  {h.titlePost}
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
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
                  <Link href="/casos-de-exito" className="btn-secondary">
                    {h.ctaSecondary}
                  </Link>
                </div>
                <p className="mt-4 text-sm text-muted">{h.note}</p>
              </Reveal>
            </div>

            {/* objeto 3D interactivo (solo escritorio, para mantener el móvil ligero) */}
            <Reveal delay={0.12} className="hidden md:flex md:justify-center">
              <div className="relative h-[380px] w-[380px] lg:h-[460px] lg:w-[460px]">
                <Hero3D />
              </div>
            </Reveal>
          </div>

          {/* clientes — anclados al fondo de la primera pantalla */}
          <Reveal delay={0.16}>
            <div className="mt-10 border-t border-white/[0.08] pt-7 sm:mt-14 sm:pt-8">
              <p className="mb-5 text-xs uppercase tracking-wider text-muted">
                {h.logosLabel}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-5 sm:justify-start sm:gap-x-10 sm:gap-y-6">
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
        </div>

        {/* métricas — franja única compacta, sin tarjetas */}
        <Reveal delay={0.2}>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/[0.08] pt-7 sm:mt-12 sm:grid-cols-4 sm:gap-y-8 sm:divide-x sm:divide-white/[0.08] sm:pt-8">
            {c.metrics.map((s) => (
              <div key={s.label} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <p className="font-display text-2xl font-semibold tracking-tight text-accent sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm leading-snug text-foreground-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* qué hago con IA — lista de servicios + agente IA dinámico */}
        <Reveal delay={0.24}>
          <div id="que-hago" className="mt-20 scroll-mt-28 sm:mt-24">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {h.offeringTitle}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
              <ul className="grid grid-cols-1 gap-x-12">
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

              {/* agente IA dinámico (cicla conversaciones: agenda / cualifica / propuesta) */}
              <div className="flex justify-center lg:justify-end">
                <AgentChat />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
