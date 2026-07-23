"use client";

import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

export function CasosView() {
  const { c, lang } = useLang();
  const cs = c.casos;
  const s = c.servicios;
  const en = lang === "en";

  const L = {
    reto: en ? "Challenge" : "Reto",
    solucion: en ? "Solution" : "Solución",
    resultado: en ? "Result" : "Resultado",
  };

  return (
    <PageShell tag={cs.tag} title={cs.title} description={cs.description} wide>
      {/* construido sobre Go High Level */}
      <Reveal>
        <div className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md">
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

      <div className="flex flex-col gap-6">
        {c.cases.items.map((item, i) => (
          <Reveal key={item.client} delay={i * 0.06}>
            <article className="card grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-center md:gap-10">
              {/* contenido del caso */}
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.logo}
                    alt={item.client}
                    className="h-7 w-auto max-w-[150px] object-contain opacity-90"
                    loading="lazy"
                  />
                  <span className="text-xs text-muted">{item.sector}</span>
                </div>

                <span className="mt-4 inline-flex max-w-full items-center rounded-full border border-accent/20 bg-accent/[0.06] px-2.5 py-1 text-[11px] font-medium leading-tight text-accent">
                  {item.tag}
                </span>

                <div className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {L.reto}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-foreground-muted">
                    {item.challenge}
                  </p>
                </div>

                <div className="mt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-accent/80">
                    {L.solucion}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-foreground">
                    {item.solution}
                  </p>
                </div>
              </div>

              {/* resultado destacado */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-accent/20 bg-accent/[0.05] p-8 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  {L.resultado}
                </p>
                <p className="mt-2 font-display text-6xl font-semibold tracking-tight text-accent">
                  {item.metric}
                </p>
                <p className="mt-2 text-sm leading-snug text-foreground-muted">
                  {item.metricLabel}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
