"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { RAMIRO } from "@/lib/seo";
import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

function Checklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-foreground-muted">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent-text">
            <Check size={12} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function SobreMiView() {
  const { c } = useLang();
  const a = c.sobreMi;

  return (
    <PageShell tag={a.tag} title={a.title} wide>
      <Reveal className="flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-start">
        <Image
          src={RAMIRO.photo}
          alt={RAMIRO.name}
          width={200}
          height={200}
          className="h-24 w-24 shrink-0 rounded-full border border-ink/[0.08] object-cover sm:h-28 sm:w-28"
          priority
        />
        <div className="flex flex-col gap-5">
          {a.intro.map((p) => (
            <p key={p} className="text-lg leading-relaxed text-foreground-muted">
              {p}
            </p>
          ))}
          <a
            href={RAMIRO.linkedin}
            target="_blank"
            rel="me noopener noreferrer"
            className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-accent-text hover:text-ink"
          >
            {a.linkedin}
            <ArrowRight size={15} />
          </a>
        </div>
      </Reveal>

      {/* pilares: ingeniería industrial / plantas / IA */}
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {a.pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06} className="h-full">
            <div className="card h-full">
              <h2 className="font-display text-lg font-semibold text-foreground">
                {p.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {p.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* especialidades tecnicas + como trabajamos, lado a lado en escritorio */}
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="tag">{a.specialtiesLabel}</p>
          <Checklist items={a.specialties} />
        </Reveal>
        <Reveal delay={0.06}>
          <p className="tag">{a.principlesLabel}</p>
          <Checklist items={a.principles} />
        </Reveal>
      </div>

      {/* stack técnico */}
      <div className="mt-16">
        <p className="mb-4 text-xs uppercase tracking-wider text-muted">
          {a.stackLabel}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {a.stack.map((tech, i) => (
            <Reveal as="span" key={tech} delay={i * 0.03}>
              <span className="inline-flex items-center rounded-lg border border-ink/[0.08] bg-ink/[0.03] px-3 py-1.5 text-sm text-foreground-muted">
                {tech}
              </span>
            </Reveal>
          ))}
        </div>
      </div>

      {/* cierre: cta al diagnostico */}
      <Reveal delay={0.1}>
        <div className="glass mt-16 flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              {a.ctaTitle}
            </h2>
            <p className="mt-1.5 text-sm text-foreground-muted">{a.ctaSubtitle}</p>
          </div>
          <Link href="/diagnostico" className="btn-primary shrink-0">
            {a.ctaButton}
            <ArrowRight size={16} />
          </Link>
        </div>
      </Reveal>
    </PageShell>
  );
}
