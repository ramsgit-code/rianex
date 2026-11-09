import { Check } from "lucide-react";
import { content } from "@/lib/content";
import { getServicio } from "@/lib/servicios";
import { SERVICIO_VIDEO } from "@/lib/servicio-media";
import { LANDINGS } from "@/lib/landings";
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

// Landing de campaña de un servicio (/l/<servicio>). Para Google Ads de
// búsqueda, donde alguien ya busca la solución. Las de Meta y LinkedIn, que
// segmentan por público, van mejor a las de nicho (NichoView).
//
// Orden: titular con lo que consigues y vídeo (o el ejemplo paso a paso) →
// prueba → es para ti si → así funciona → qué incluye y cómo empezamos →
// casos → formulario → preguntas → cierre amarillo.

export function LandingView({ slug }: { slug: string }) {
  const l = LANDINGS[slug];
  const base = content.es.servicios.items.find((i) => i.slug === slug)!;
  const d = getServicio(slug, "es")!;
  const video = SERVICIO_VIDEO[slug];
  const casos = casosDe(d.cases, d.caseFocus);

  return (
    <div className="bg-background">
      <LandingHeader />
      <Hero h1={l.h1} lead={l.lead} outcomes={d.outcomes} video={video} flow={d.flow} />
      <ProofBand casos={casos} />

      {/* Es para ti si */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <H2>Es para ti si…</H2>
        <ul className={`mt-8 grid grid-cols-1 gap-4 ${d.fit.length % 3 === 0 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {d.fit.map((x) => (
            <li key={x} className="card flex items-start gap-3">
              <Check size={18} className="mt-0.5 shrink-0 text-go-text" aria-hidden />
              <span className="leading-relaxed text-foreground">{x}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-foreground-muted">
          <span className="font-semibold text-foreground">El problema:</span> {base.problem}
        </p>
      </section>

      {/* Así funciona (en el titular si no hay vídeo) */}
      {video && <FlowSection flow={d.flow} />}

      {/* Qué incluye y cómo empezamos */}
      <section className={video ? "" : "bg-white"}>
        <div className="tape" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:px-12">
          <div>
            <H2>Qué incluye</H2>
            <ul className="mt-7 flex flex-col gap-3">
              {base.deliverables.map((x) => (
                <li key={x} className="flex items-start gap-3 text-[17px] text-foreground">
                  <span className="mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center bg-go text-white">
                    <Check size={11} aria-hidden />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <H2>Cómo empezamos</H2>
            <StartSteps timeline={d.timeline} />
          </div>
        </div>
      </section>

      <CasesSection casos={casos} />
      <FormSection landing={slug} />
      <FaqSection faqs={d.faqs.slice(0, 4)} />
      <CloseSection />
      <LandingFooter />
    </div>
  );
}
