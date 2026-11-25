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
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ink bg-accent text-accent-text">
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

      {/* Que pasa en la consultoria y preguntas frecuentes. Antes la pagina
          solo tenia las cuatro lineas de arriba y el formulario (83 palabras). */}
      <section className="mt-20">
        <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] text-foreground">
          {d.howTitle}
        </h2>
        <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {d.how.map((step, i) => (
            <li key={step.title} className="card">
              <span className="font-display text-sm font-bold text-accent-text">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{step.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] text-foreground">
          {d.faqTitle}
        </h2>
        <div className="mt-6 flex flex-col divide-y divide-ink border-y-2 border-ink">
          {d.faq.map((f) => (
            <div key={f.q} className="py-5">
              <h3 className="text-lg font-semibold text-foreground">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
