"use client";

import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

export function CasosView() {
  const { c } = useLang();
  const cs = c.casos;

  return (
    <>
      <PageShell tag={cs.tag} title={cs.title} description={cs.description} wide>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {c.cases.items.map((item, i) => (
            <li key={item.client}>
              <Reveal delay={i * 0.06} className="h-full">
                <article className="card flex h-full flex-col">
                  <div className="flex h-10 items-center justify-between gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.logo}
                      alt={item.client}
                      className="h-7 w-auto max-w-[150px] object-contain opacity-85"
                      loading="lazy"
                    />
                    <span className="inline-flex shrink-0 items-center rounded-full border border-accent/20 bg-accent/[0.06] px-2.5 py-0.5 text-xs text-accent">
                      {item.tag}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-muted">{item.sector}</p>

                  {/* métrica destacada */}
                  <p className="mt-6 font-display text-5xl font-semibold tracking-tight text-accent">
                    {item.metric}
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {item.metricLabel}
                  </p>

                  <div className="mt-5 flex flex-1 flex-col gap-2 border-t border-white/[0.08] pt-5">
                    <p className="text-sm leading-relaxed text-foreground-muted">
                      {item.challenge}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground">
                      {item.solution}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </PageShell>
    </>
  );
}
