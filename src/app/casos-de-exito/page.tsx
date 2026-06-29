import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageCTA } from "@/components/layout/PageCTA";
import { Reveal } from "@/components/Reveal";
import { TransformationShowcase } from "@/components/sections/TransformationShowcase";

export const metadata: Metadata = {
  title: "Casos reales",
  description: "Sistemas implementados en negocios reales con Go High Level.",
};

const cases = [
  {
    client: "Hospital Capilar",
    sector: "Salud · Madrid",
    challenge: "Llamadas a candidatos sin criterio previo.",
    solution: "Formulario, scoring y pipeline en Go High Level.",
    result: "40% menos tiempo en llamadas iniciales.",
    tag: "Lead Qualification",
  },
  {
    client: "Eventos Barcelona",
    sector: "Eventos · Barcelona",
    challenge: "Propuestas que tardaban 1-3 dias.",
    solution: "Intake + propuesta automatica en GHL.",
    result: "Propuesta lista en 8 minutos.",
    tag: "Proposal Automation",
  },
  {
    client: "Growth4U",
    sector: "Marketing · Captacion",
    challenge: "Captacion manual, sin cualificacion de leads.",
    solution: "Funnel de captacion + scoring en Go High Level.",
    result: "Proyecto en curso.",
    tag: "Lead Qualification",
  },
];

export default function CasosPage() {
  return (
    <>
      <PageShell
        tag="Casos reales"
        title="Sistemas que funcionan hoy"
        description="Negocios reales. Go High Level como base de cada implementacion."
        wide
      >
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {cases.map((c, i) => (
            <li key={c.client}>
              <Reveal delay={i * 0.06} className="h-full">
                <div className="card flex h-full flex-col">
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-display text-lg font-semibold text-foreground">
                        {c.client}
                      </h2>
                      <p className="text-xs text-muted">{c.sector}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center rounded-full border border-accent/20 bg-accent/[0.06] px-2.5 py-0.5 text-xs text-accent">
                      {c.tag}
                    </span>
                  </div>
                  <p className="mb-2 text-sm leading-relaxed text-foreground-muted">
                    {c.challenge}
                  </p>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-foreground-muted">
                    {c.solution}
                  </p>
                  <p className="border-t border-white/[0.08] pt-4 font-display text-lg font-semibold text-accent">
                    {c.result}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Link
          href="#transformaciones"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
        >
          Ver videos antes / despues
          <ArrowRight size={15} />
        </Link>
      </PageShell>

      <TransformationShowcase />
      <PageCTA />
    </>
  );
}
