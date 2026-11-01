"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";

// La oferta en dos pasos. El primero (gratis) va sobre cinta amarilla: es la
// acción principal de toda la web.
export function Offer() {
  const { lang, localize } = useLang();
  const o = home[lang].offer;

  return (
    <section id="oferta" className="relative">
      <div className="tape" />
      <div className="section-wide">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <h2 className="section-title lg:col-span-5">{o.title}</h2>
          <p className="measure text-pretty text-lg leading-relaxed text-foreground-muted lg:col-span-6 lg:col-start-7 lg:self-end">
            {o.lead}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2">
          {o.steps.map((step, i) => {
            const free = i === 0;
            return (
              <article
                key={step.name}
                className={`flex flex-col p-7 sm:p-10 ${
                  free ? "bg-accent text-ink" : "border-2 border-ink bg-white lg:border-l-0"
                }`}
              >
                <div className="flex items-center justify-between gap-4 font-display text-[13px] font-bold uppercase tracking-[0.08em]">
                  <span>{step.kicker}</span>
                  <span className={free ? "bg-ink px-2 py-1 text-accent" : "border-2 border-ink px-2 py-0.5"}>
                    {step.price}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-4xl font-extrabold uppercase leading-[0.95] sm:text-5xl">
                  {step.name}
                </h3>
                <p className={`measure mt-5 text-pretty leading-relaxed ${free ? "text-ink/85" : "text-foreground-muted"}`}>
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
