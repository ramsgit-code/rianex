"use client";

import { useLang } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

export function Pricing() {
  const { c } = useLang();
  const p = c.pricing;

  return (
    <section className="relative">
      <div className="section-wide">
        <Reveal>
          <p className="tag">{p.tag}</p>
          <h2 className="section-title max-w-2xl">{p.title}</h2>
          <p className="mt-3 max-w-xl text-foreground-muted">{p.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {p.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.06} className="h-full">
              <div className="card h-full">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {tier.name}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">
                  {tier.range}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {tier.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-sm text-muted">{p.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
