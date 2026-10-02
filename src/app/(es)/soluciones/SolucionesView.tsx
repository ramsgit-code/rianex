"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

export function SolucionesView() {
  const { c } = useLang();
  const s = c.soluciones;

  return (
    <PageShell tag={s.tag} title={s.title} description={s.description} wide>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {s.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05} className="h-full">
            <article className="card flex h-full flex-col">
              <span className="tag w-fit">{item.sector}</span>
              <h2 className="font-display text-lg font-semibold text-foreground">
                {item.title}
              </h2>

              <div className="mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  {s.problemLabel}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                  {item.pain}
                </p>
              </div>

              <div className="mt-4 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  {s.solutionLabel}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                  {item.solution}
                </p>
              </div>

              <div className="mt-5 border-t border-ink/[0.08] pt-4">
                <span className="text-xs text-muted">
                  {s.caseLabel} <span className="font-medium text-foreground-muted">{item.reference}</span>
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 text-center">
          <Link
            href="/casos-de-exito"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text hover:text-ink"
          >
            {s.link}
            <ArrowRight size={15} />
          </Link>
        </div>
      </Reveal>
    </PageShell>
  );
}
