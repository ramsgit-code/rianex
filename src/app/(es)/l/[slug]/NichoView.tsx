import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { content } from "@/lib/content";
import { NICHOS } from "@/lib/nichos";
import {
  CasesSection,
  CloseSection,
  FaqSection,
  FlowSection,
  FormSection,
  H2,
  Hero,
  LandingFooter,
  LandingHeader,
  ProofBand,
  StartSteps,
  casosDe,
} from "@/components/landing/Partes";

// Landing de campaña de un nicho (/l/<nicho>): agencias de marketing, eventos,
// clínicas, inmobiliarias y negocios con cita. Para Meta, LinkedIn y outbound:
// quien llega se reconoce en el titular, en sus problemas y en el caso.
//
// Orden: titular → prueba → ¿te suena? (problemas) → qué automatizamos →
// así funciona → cuidado (datos de salud, solo clínicas) → servicios y cómo
// empezamos → casos → formulario → preguntas → cierre amarillo.

export function NichoView({ slug }: { slug: string }) {
  const n = NICHOS[slug];
  const casos = casosDe(n.cases);
  const servicios = n.services
    .map((s) => content.es.servicios.items.find((i) => i.slug === s))
    .filter((x) => x !== undefined);

  return (
    <div className="bg-background">
      <LandingHeader />
      <Hero h1={n.h1} lead={n.lead} outcomes={n.outcomes} video={n.video} flow={n.flow} />
      <ProofBand casos={casos} line={n.proofLine} />

      {/* ¿Te suena? */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <H2>{n.painsTitle}</H2>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {n.pains.map((p) => (
            <li key={p.title} className="flex flex-col border border-border bg-white">
              <span aria-hidden className="block h-2 w-full bg-stop" />
              <div className="p-5">
                <p className="font-display text-xl font-extrabold uppercase leading-[0.95] text-foreground">{p.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{p.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Qué automatizamos */}
      <section className="bg-white">
        <div className="tape" />
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <H2>Qué automatizamos</H2>
          <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {n.automations.map((a, i) => (
              <li key={a.title} className="flex flex-col border border-border bg-background">
                <span aria-hidden className="block h-2 w-full bg-go" />
                <div className="p-5">
                  <span className="font-mono text-xs text-accent-text">0{i + 1}</span>
                  <p className="mt-1 font-display text-xl font-extrabold uppercase leading-[0.95] text-foreground">{a.title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{a.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Así funciona (en el titular si no hay vídeo) */}
      {n.video && <FlowSection flow={n.flow} white={false} />}

      {/* Lo delicado del sector (datos de salud en clínicas) */}
      {n.care && (
        <section className={n.video ? "bg-white" : ""}>
          <div className="tape" />
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-16">
            <H2>{n.care.title}</H2>
            <ul className="mt-7 flex flex-col gap-3">
              {n.care.items.map((x) => (
                <li key={x} className="flex items-start gap-3 text-[16px] leading-relaxed text-foreground">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-go-text" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Servicios que lo componen y cómo empezamos */}
      <section>
        <div className="tape" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:px-12">
          <div>
            <H2>Con qué lo hacemos</H2>
            <ul className="mt-7 flex flex-col gap-3">
              {servicios.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="group flex items-start justify-between gap-4 border border-border bg-white p-4 transition-colors hover:border-ink"
                  >
                    <span>
                      <span className="block font-semibold text-foreground">{s.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-foreground-muted">{s.tagline}</span>
                    </span>
                    <ArrowUpRight size={16} aria-hidden className="mt-1 shrink-0 text-muted group-hover:text-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <H2>Cómo empezamos</H2>
            <StartSteps timeline={n.timeline} />
          </div>
        </div>
      </section>

      <CasesSection casos={casos} />
      <FormSection landing={slug} />
      <FaqSection faqs={n.faqs} />
      <CloseSection />
      <LandingFooter />
    </div>
  );
}
