"use client";

import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

export function SobreMiView() {
  const { c } = useLang();
  const a = c.sobreMi;

  return (
    <PageShell tag={a.tag} title={a.title}>
      <Reveal className="flex max-w-2xl flex-col gap-5">
        {a.intro.map((p) => (
          <p key={p} className="text-lg leading-relaxed text-foreground-muted">
            {p}
          </p>
        ))}
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

      {/* stack técnico */}
      <div className="mt-10">
        <p className="mb-4 text-xs uppercase tracking-wider text-muted">
          {a.stackLabel}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {a.stack.map((tech, i) => (
            <Reveal as="span" key={tech} delay={i * 0.03}>
              <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-foreground-muted">
                {tech}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
