"use client";

import { Check } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { DiagnosticForm } from "@/components/DiagnosticForm";

export function DiagnosticoView() {
  const { c } = useLang();
  const d = c.diagnostico;

  return (
    <PageShell tag={d.tag} title={d.title} description={d.description} wide>
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
        <ul className="flex flex-col gap-4">
          {d.bullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-foreground-muted"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent-text">
                <Check size={12} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="card lg:sticky lg:top-24">
          <DiagnosticForm />
        </div>
      </div>
    </PageShell>
  );
}
