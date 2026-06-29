"use client";

import { useLang } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

export function Process() {
  const { c } = useLang();

  return (
    <section className="relative">
      <div className="section-wide">
        <ol className="grid grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-2 sm:gap-y-8 sm:divide-y-0 lg:grid-cols-4 lg:gap-y-0">
          {c.process.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.08}
              className="flex items-start gap-3.5 py-3.5 sm:flex-col sm:gap-2 sm:py-0 sm:px-6 sm:first:pl-0 lg:border-l lg:border-white/[0.06] lg:first:border-l-0"
            >
              <span className="font-display text-2xl font-bold leading-none text-accent/50 sm:text-3xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
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
