"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

export function ServiciosView() {
  const { c } = useLang();
  const s = c.servicios;

  return (
    <>
      <PageShell tag={s.tag} title={s.title} description={s.description} wide>
        <ol className="flex flex-col gap-6">
          {s.items.map((item, i) => (
            <li key={item.slug} id={item.slug} className="scroll-mt-28">
              <Reveal delay={i * 0.05}>
                <article className="card grid grid-cols-1 gap-8 !p-7 md:grid-cols-[1.1fr_1fr] md:!p-9">
                  {/* izquierda */}
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="font-display text-2xl font-bold text-accent/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-2xl font-semibold text-foreground">
                        {item.title}
                      </h2>
                    </div>
                    <p className="mb-5 text-accent">{item.tagline}</p>
                    <p className="mb-3 text-sm leading-relaxed text-foreground-muted">
                      <span className="text-muted">{s.problemLabel} </span>
                      {item.problem}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground-muted">
                      <span className="text-muted">{s.forWhoLabel} </span>
                      {item.forWho}
                    </p>
                    <Link
                      href="/diagnostico"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
                    >
                      {s.cta}
                      <ArrowRight size={15} />
                    </Link>
                  </div>

                  {/* derecha: entregables */}
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                    <ul className="flex flex-col gap-3">
                      {item.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2.5 text-sm text-foreground-muted"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                            <Check size={12} />
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </PageShell>
    </>
  );
}
