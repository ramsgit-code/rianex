"use client";

import { useLang } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

export function Results() {
  const { c } = useLang();
  const r = c.results;

  return (
    <section className="relative">
      <div className="section-wide">
        <Reveal>
          <p className="tag">{r.tag}</p>
          <h2 className="section-title max-w-2xl">{r.title}</h2>
          <p className="mt-3 max-w-xl text-foreground-muted">{r.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {c.metrics.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="h-full">
              <div className="card h-full !p-6">
                <p className="font-display text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-foreground-muted">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
