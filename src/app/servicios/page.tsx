import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageCTA } from "@/components/layout/PageCTA";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Lead Qualification, Proposal Automation y WhatsApp + CRM en Go High Level.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageShell
        tag="Servicios"
        title="Tres sistemas en Go High Level"
        description="Cada uno resuelve una parte del proceso comercial. Se pueden implementar juntos o por separado."
      >
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug} id={s.slug} className="scroll-mt-28">
              <Reveal delay={i * 0.06} className="h-full">
                <div className="card flex h-full flex-col">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {s.title}
                  </h2>
                  <p className="mb-5 mt-1 text-sm text-accent">{s.tagline}</p>
                  <p className="mb-3 text-sm leading-relaxed text-foreground-muted">
                    <span className="text-muted">Problema: </span>
                    {s.problem}
                  </p>
                  <p className="mb-5 text-sm leading-relaxed text-foreground-muted">
                    <span className="text-muted">Para quien: </span>
                    {s.forWho}
                  </p>
                  <ul className="mb-6 flex flex-1 flex-col gap-2">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 text-sm text-foreground-muted"
                      >
                        <ArrowRight
                          size={15}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/diagnostico"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
                  >
                    Solicitar diagnostico
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </PageShell>
      <PageCTA />
    </>
  );
}
