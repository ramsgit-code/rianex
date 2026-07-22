"use client";

import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";

export function CasosView() {
  const { c } = useLang();
  const cs = c.casos;
  const s = c.servicios;

  return (
    <>
      <PageShell tag={cs.tag} title={cs.title} description={cs.description} wide>
        {/* construido sobre Go High Level */}
        <Reveal>
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/gohighlevel-icon.png"
              alt="Go High Level"
              className="h-5 w-5 rounded"
            />
            <span className="text-sm text-foreground-muted">
              {s.builtOn}{" "}
              <span className="font-medium text-foreground">Go High Level</span>
            </span>
          </div>
        </Reveal>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {c.cases.items.map((item, i) => (
            <li key={item.client}>
              <Reveal delay={i * 0.06} className="h-full">
                <article className="card flex h-full flex-col">
                  <div className="flex h-8 items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.logo}
                      alt={item.client}
                      className="h-7 w-auto max-w-[150px] object-contain opacity-85"
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex max-w-full items-center rounded-full border border-accent/20 bg-accent/[0.06] px-2.5 py-1 text-[11px] font-medium leading-tight text-accent">
                      {item.tag}
                    </span>
                    <span className="text-xs text-muted">{item.sector}</span>
                  </div>

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

        {/* servicios — qué construyo en cada caso */}
        <div id="servicios" className="mt-20 scroll-mt-28 sm:mt-24">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {s.title}
            </h2>
            <p className="mt-3 max-w-xl text-foreground-muted">{s.description}</p>
          </Reveal>

          <ol className="mt-8 flex flex-col gap-4 sm:gap-6">
            {s.items.map((item, i) => (
              <li key={item.slug} id={item.slug} className="scroll-mt-28">
                <Reveal delay={i * 0.04}>
                  <ServiceCard item={item} i={i} s={s} />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </PageShell>
    </>
  );
}
