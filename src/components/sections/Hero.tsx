"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { LOGOS } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { Typewriter } from "@/components/Typewriter";

const Hero3D = dynamic(
  () => import("@/components/Hero3D").then((m) => m.Hero3D),
  { ssr: false }
);

const clientLogos: {
  src: string;
  alt: string;
  h: string;
  href?: string;
  label?: string;
}[] = [
  { src: LOGOS.hospitalCapilar, alt: "Hospital Capilar", h: "h-6 sm:h-9", href: "https://hospitalcapilar.com" },
  { src: LOGOS.eventosBarcelona, alt: "EB Eventos Barcelona", h: "h-6 sm:h-9", href: "https://www.eventosbarcelona.com" },
  { src: LOGOS.growth4u, alt: "Growth4U", h: "h-3.5 sm:h-5", href: "https://growth4u.io" },
  {
    src: LOGOS.tribeca,
    alt: "Tribeca Media",
    h: "h-8 sm:h-11",
    href: "https://www.tribecamedia.com",
    label: "Tribeca Media",
  },
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
      className="relative overflow-hidden pt-20 pb-10 sm:pt-36 md:pt-44 md:pb-20"
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
                {clientLogos.map((logo) => {
                  const inner = (
                    <span className="flex flex-col items-center gap-1.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className={`${logo.h} w-auto object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
                        loading="lazy"
                      />
                      {logo.label && (
                        <span className="text-[10px] uppercase tracking-wider text-muted transition-colors group-hover:text-foreground-muted">
                          {logo.label}
                        </span>
                      )}
                    </span>
                  );
                  return logo.href ? (
                    <a
                      key={logo.alt}
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={logo.alt}
                      className="group inline-flex"
                    >
                      {inner}
                    </a>
                  ) : (
                    <span key={logo.alt} className="group inline-flex">
                      {inner}
                    </span>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
