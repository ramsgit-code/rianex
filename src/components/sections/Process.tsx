"use client";

import { useLang } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

export function Process() {
  const { c } = useLang();

  return (
    <section className="relative">
      <div className="section-wide">
        <Reveal>
          <p className="tag">{c.process.tag}</p>
          <h2 className="section-title max-w-2xl">{c.process.title}</h2>
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {c.process.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.08}
              className="flex items-start gap-4 py-5 sm:flex-col sm:gap-3 sm:px-6 sm:py-0 sm:first:pl-0 lg:border-l lg:border-white/[0.06] lg:first:border-l-0"
            >
              <span className="font-display text-3xl font-bold leading-none text-accent/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
