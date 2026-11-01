"use client";

import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";

// Cómo trabajamos: una línea de producción. Las estaciones cuelgan de una
// cinta amarilla; la primera (la consultoría gratuita) va marcada en grafito.
export function Process() {
  const { lang } = useLang();
  const m = home[lang].method;

  return (
    <section id="como-trabajamos" className="relative">
      <div className="tape" />
      <div className="section-wide">
        <h2 className="section-title">{m.title}</h2>

        <ol className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          {/* raíl: horizontal en escritorio, vertical en móvil */}
          <span aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-1.5 bg-accent md:left-0 md:top-[7px] md:h-1.5 md:w-full" />
          {m.steps.map((step, i) => (
            <li key={step.name} className="relative pl-10 md:pl-0 md:pt-12">
              <span
                aria-hidden
                className={`absolute left-0 top-0.5 h-5 w-5 border-[3px] border-ink md:top-0 ${i === 0 ? "bg-ink" : "bg-background"}`}
              />
              <p className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-accent-text">
                {step.time}
              </p>
              <h3 className="mt-2 font-display text-2xl font-extrabold uppercase leading-none text-foreground">
                {step.name}
              </h3>
              <p className="mt-3 max-w-[28ch] text-[15px] leading-relaxed text-foreground-muted">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
