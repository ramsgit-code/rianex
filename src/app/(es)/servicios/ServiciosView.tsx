"use client";

import Link from "next/link";
import {
  Filter,
  Workflow,
  Network,
  ArrowLeftRight,
  Code,
  FileText,
  Database,
  Bot,
  Check,
  ArrowRight,
} from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

const icons: Record<string, typeof Workflow> = {
  "automatizacion-procesos-ia": Workflow,
  "integracion-gohighlevel-hubspot": Network,
  "migracion-a-gohighlevel": ArrowLeftRight,
  "desarrollo-ia-a-medida": Code,
  "agente-ia-whatsapp": Bot,
  "implementacion-crm-gohighlevel": Database,
  "embudo-de-captacion": Filter,
  "generador-de-propuestas": FileText,
};

export function ServiciosView() {
  const { c, localize } = useLang();
  const s = c.servicios;

  return (
    <PageShell tag={s.tag} title={s.title} description={s.description} wide>
      <div className="flex flex-col gap-16">
        {s.groups.map((group, g) => (
          <section key={group.title}>
            <Reveal>
              <div className="mb-6 max-w-2xl">
                <span className="font-mono text-xs text-accent-text">
                  0{g + 1}
                </span>
                <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground">
                  {group.title}
                </h2>
                <p className="mt-2 leading-relaxed text-foreground-muted">
                  {group.desc}
                </p>
              </div>
            </Reveal>
            <div className="flex flex-col gap-6">
              {group.slugs
                .map((slug) => s.items.find((item) => item.slug === slug))
                .filter((item) => item !== undefined)
                .map((item, i) => {
                  const Icon = icons[item.slug] ?? Workflow;
                  return (
                    <Reveal key={item.slug} delay={i * 0.05}>
                      <article
                        id={item.slug}
                        className="card grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-start"
                      >
                        <div>
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/[0.08] text-accent-text">
                            <Icon size={20} />
                          </span>
                          <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                            <Link
                              href={localize(`/servicios/${item.slug}`)}
                              className="hover:text-accent-text"
                            >
                              {item.title}
                            </Link>
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                            {item.tagline}
                          </p>
                          <Link
                            href={localize(`/servicios/${item.slug}`)}
                            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text hover:text-ink"
                          >
                            {s.more}
                            <ArrowRight size={15} />
                          </Link>
                        </div>

                        <div className="flex flex-col gap-5">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                              {s.problemLabel}
                            </p>
                            <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                              {item.problem}
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                              {s.forWhoLabel}
                            </p>
                            <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                              {item.forWho}
                            </p>
                          </div>
                          <ul className="flex flex-col gap-2.5">
                            {item.deliverables.map((d) => (
                              <li
                                key={d}
                                className="flex items-start gap-2.5 text-sm text-foreground-muted"
                              >
                                <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent-text">
                                  <Check size={10} />
                                </span>
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
