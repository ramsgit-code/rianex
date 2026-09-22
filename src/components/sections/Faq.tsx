"use client";

import { ChevronDown } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

export function Faq() {
  const { c } = useLang();
  const f = c.faq;

  return (
    <section className="relative">
      <div className="section-wide max-w-3xl lg:max-w-3xl">
        <Reveal>
          <p className="tag">{f.tag}</p>
          <h2 className="section-title">{f.title}</h2>
        </Reveal>

        <div className="mt-8 flex flex-col gap-3">
          {f.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="card group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-foreground">
                  {item.q}
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
