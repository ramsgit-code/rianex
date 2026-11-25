"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { RAMIRO } from "@/lib/seo";
import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";
import { TRAYECTORIA } from "@/lib/trayectoria";

function Checklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-foreground-muted">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ink bg-accent text-accent-text">
            <Check size={12} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function SobreMiView() {
  const { c, lang } = useLang();
  const a = c.sobreMi;
  const t = TRAYECTORIA[lang];

  return (
    <PageShell tag={a.tag} title={a.title} wide>
      <Reveal className="flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-start">
        <Image
          src={RAMIRO.photo}
          alt={RAMIRO.name}
          width={200}
          height={200}
          className="h-24 w-24 shrink-0 rounded-full border border-border object-cover sm:h-28 sm:w-28"
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
            className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-foreground underline decoration-accent decoration-[3px] underline-offset-4 hover:text-accent-text"
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
              <h2 className="font-display text-2xl font-extrabold uppercase leading-none text-foreground">
                {p.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {p.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* trayectoria: de donde viene el metodo (Nissan, UCAV, Michelin) */}
      <section className="mt-16" aria-labelledby="trayectoria">
        <h2 id="trayectoria" className="font-display text-4xl font-extrabold uppercase leading-[0.95] text-foreground">
          {t.title}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-foreground-muted">{t.lead}</p>
        <ol className="mt-8 flex flex-col border-t-2 border-ink">
          {t.items.map((p) => (
            <li key={p.org} className="grid gap-2 border-b border-border py-5 md:grid-cols-[14rem_1fr] md:gap-8">
              <div>
                <p className="font-display text-xl font-extrabold uppercase leading-tight text-foreground">{p.org}</p>
                <p className="mt-1 text-xs text-muted">{p.role}</p>
              </div>
              <p className="text-sm leading-relaxed text-foreground-muted">{p.desc}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-foreground-muted">
          <span className="font-semibold text-foreground">{t.education.title}: </span>
          {t.education.items.join(" · ")}
        </p>
      </section>

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
        <p className="mb-4 font-display text-[12px] font-bold uppercase tracking-[0.08em] text-foreground">
          {a.stackLabel}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {a.stack.map((tech, i) => (
            <Reveal as="span" key={tech} delay={i * 0.03}>
              <span className="inline-flex items-center border border-border bg-white px-3 py-1.5 text-sm text-foreground-muted">
                {tech}
              </span>
            </Reveal>
          ))}
        </div>
      </div>

    </PageShell>
  );
}
