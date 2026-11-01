"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Label } from "@/components/ui/Label";

export function SolucionesView() {
  const { c, localize } = useLang();
  const s = c.soluciones;

  return (
    <PageShell tag={s.tag} title={s.title} description={s.description} wide>
      <div className="grid grid-cols-1 border-l-2 border-t-[6px] border-ink border-t-accent md:grid-cols-2">
        {s.items.map((item) => (
          <article key={item.title} className="flex flex-col border-b-2 border-r-2 border-ink bg-white p-7 sm:p-9">
            <span className="tag">{item.sector}</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold uppercase leading-[0.95] text-foreground">
              <Link href={localize(`/soluciones/${item.slug}`)} className="hover:text-accent-text">
                {item.title}
              </Link>
            </h2>

            <Label className="mt-6">{s.problemLabel.replace(":", "")}</Label>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{item.pain}</p>

            <Label className="mt-5">{s.solutionLabel.replace(":", "")}</Label>
            <p className="mt-2 flex-1 text-[15px] leading-relaxed text-foreground">{item.solution}</p>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-5">
              <Link href={localize(`/soluciones/${item.slug}`)} className="inline-flex items-center gap-1.5 font-semibold text-foreground underline decoration-accent decoration-[3px] underline-offset-4 hover:text-accent-text">
                {s.more}
                <ArrowRight size={16} aria-hidden />
              </Link>
              {"reference" in item && item.reference && (
                <span className="text-sm text-muted">
                  {s.caseLabel} <span className="font-semibold text-foreground-muted">{item.reference}</span>
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Link href={localize("/casos-de-exito")} className="btn-secondary">
          {s.link}
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </PageShell>
  );
}
