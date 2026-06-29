"use client";

import { Check } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

export function SobreMiView() {
  const { c } = useLang();
  const a = c.sobreMi;

  return (
    <>
      <PageShell tag={a.tag} title={a.title}>
        <Reveal className="flex max-w-2xl flex-col gap-5">
          {a.intro.map((p) => (
            <p key={p} className="text-lg leading-relaxed text-foreground-muted">
              {p}
            </p>
          ))}
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal delay={0.05} className="h-full">
            <div className="card h-full">
              <p className="mb-4 text-xs uppercase tracking-wider text-muted">
                {a.specialtiesLabel}
              </p>
              <ul className="flex flex-col gap-3">
                {a.specialties.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-sm text-foreground-muted"
                  >
                    <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <div className="card h-full">
              <p className="mb-4 text-xs uppercase tracking-wider text-muted">
                {a.principlesLabel}
              </p>
              <ul className="flex flex-col gap-3">
                {a.principles.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-sm text-foreground-muted"
                  >
                    <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </PageShell>
    </>
  );
}
