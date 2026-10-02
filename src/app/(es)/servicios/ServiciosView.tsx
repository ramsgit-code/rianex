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

const icons = [Workflow, Network, ArrowLeftRight, Code, Bot, Database, Filter, FileText];

export function ServiciosView() {
  const { c } = useLang();
  const s = c.servicios;

  return (
    <PageShell tag={s.tag} title={s.title} description={s.description} wide>
      <div className="flex flex-col gap-6">
        {s.items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={item.slug} delay={i * 0.05}>
              <article id={item.slug} className="card grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-start">
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/[0.08] text-accent-text">
                    <Icon size={20} />
                  </span>
                  <h2 className="mt-4 font-display text-xl font-semibold text-foreground">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                    {item.tagline}
                  </p>
                  <Link
                    href="/diagnostico"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text hover:text-ink"
                  >
                    {s.cta}
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
                      <li key={d} className="flex items-start gap-2.5 text-sm text-foreground-muted">
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
    </PageShell>
  );
}
