"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Label } from "@/components/ui/Label";

const LOGO_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/logos/hospital-capilar-dark.png": { width: 396, height: 117 },
  "/logos/eventos-barcelona-dark.png": { width: 435, height: 117 },
  "/logos/growth4u-dark.png": { width: 339, height: 64 },
  "/logos/tribeca-dark.png": { width: 800, height: 800 },
};

export function CasosView() {
  const { c, lang, localize } = useLang();
  const cs = c.casos;
  const en = lang === "en";

  const L = {
    reto: en ? "Challenge" : "Reto",
    solucion: en ? "Solution" : "Solución",
    leer: en ? "Read the full case study" : "Leer el caso completo",
  };

  return (
    <PageShell tag={cs.tag} title={cs.title} description={cs.description} wide>
      <div className="border-t-[6px] border-accent">
        {c.cases.items.map((item) => {
          const dim = LOGO_DIMENSIONS[item.logo] ?? { width: 300, height: 90 };
          return (
            <article key={item.client} className="grid grid-cols-1 gap-8 border-b-2 border-ink py-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-4">
                  <Image
                    src={item.logo}
                    alt={item.client}
                    width={dim.width}
                    height={dim.height}
                    className="h-8 w-auto max-w-[160px] object-contain"
                  />
                  <span className="tag mb-0">{item.sector}</span>
                </div>

                <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] text-foreground">
                  <Link href={localize(`/casos-de-exito/${item.slug}`)} className="hover:text-accent-text">
                    {item.client}
                  </Link>
                </h2>
                {/* resumen "respuesta primero": una frase con sector, proceso y resultado, citable tal cual por buscadores de IA */}
                <p className="mt-2 text-lg font-medium leading-snug text-foreground">
                  {item.tag}: {item.metric} {item.metricLabel}.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label>{L.reto}</Label>
                    <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{item.challenge}</p>
                  </div>
                  <div>
                    <Label>{L.solucion}</Label>
                    <p className="mt-2 text-[15px] leading-relaxed text-foreground">{item.solution}</p>
                  </div>
                </div>

                {item.stack.length > 0 && (
                  <div className="mt-6">
                    <Label>{cs.stackLabel}</Label>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {item.stack.map((tool) => (
                        <li key={tool} className="border border-border bg-white px-2.5 py-1 text-[13px] text-foreground-muted">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between bg-ink p-7 text-background lg:col-span-4">
                <span aria-hidden className="block h-2 w-full bg-go" />
                <div className="mt-8">
                  <p className="font-display text-7xl font-extrabold leading-none tabular-nums text-accent">{item.metric}</p>
                  <p className="mt-3 text-[15px] leading-snug text-background/80">{item.metricLabel}</p>
                </div>
                <Link href={localize(`/casos-de-exito/${item.slug}`)} className="btn-tape mt-8 self-start">
                  {L.leer}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Control: lo que diferencia un caso de una demo. Sale de los casos publicados. */}
      <section className="mt-16">
        <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] text-foreground">{cs.control.title}</h2>
        <p className="measure mt-4 text-lg leading-relaxed text-foreground-muted">{cs.control.lead}</p>
        <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {cs.control.items.map((item) => (
            <li key={item.title} className="flex flex-col border border-border bg-white">
              <span aria-hidden className="block h-2 w-full bg-go" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-extrabold uppercase leading-none text-foreground">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">{item.desc}</p>
                <Link
                  href={item.href}
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold underline decoration-accent decoration-[3px] underline-offset-4 hover:text-accent-text"
                >
                  {item.label}
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
