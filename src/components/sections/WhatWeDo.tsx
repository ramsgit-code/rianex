"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";

// "Qué hacemos": la oferta en tres pasos. El primero (gratis) va sobre cinta
// amarilla: es la acción principal de toda la web.
export function WhatWeDo() {
  const { lang, localize } = useLang();
  const o = home[lang].whatWeDo;

  return (
    <section id="que-hacemos" className="relative scroll-mt-20">
      <div className="tape" />
      <div className="section-wide">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <h2 className="section-title lg:col-span-5">{o.title}</h2>
          <p className="measure text-pretty text-lg leading-relaxed text-foreground-muted lg:col-span-7 lg:self-end">
            {o.lead}
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 lg:grid-cols-3">
          {o.steps.map((step, i) => {
            const free = i === 0;
            return (
              <li
                key={step.name}
                className={`flex flex-col p-7 sm:p-9 ${
                  free
                    ? "bg-accent text-ink"
                    : "border-2 border-t-0 border-ink bg-white lg:border-l-0 lg:border-t-2"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 font-display text-[13px] font-bold uppercase tracking-[0.08em]">
                  <span>{step.kicker}</span>
                  <span className={free ? "bg-ink px-2 py-1 text-accent" : "border-2 border-ink px-2 py-0.5"}>
                    {step.chip}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-4xl font-extrabold uppercase leading-[0.95]">
                  {step.name}
                </h3>
                <p className={`mt-5 text-pretty leading-relaxed ${free ? "text-ink/85" : "text-foreground-muted"}`}>
                  {step.desc}
                </p>
                <ul className="mt-7 flex flex-col gap-3 border-t-2 border-ink pt-6">
                  {step.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-[15px] font-medium">
                      <Check size={18} className="mt-0.5 shrink-0" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
                {step.cta && (
                  <Link href={localize("/diagnostico")} className="btn-primary mt-9 self-start">
                    {step.cta}
                    <ArrowRight size={17} aria-hidden />
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
