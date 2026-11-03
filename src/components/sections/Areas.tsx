"use client";

import Link from "next/link";
import { ArrowUpRight, Square } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";

// "Resultados que entregamos": los servicios agrupados por resultado,
// como el cómo. Cada enlace lleva a la página del servicio (URLs intactas).
export function Areas() {
  const { lang, c, localize } = useLang();
  const a = home[lang].areas;
  const titleOf = (slug: string) => c.servicios.items.find((s) => s.slug === slug)?.title ?? slug;

  return (
    <section id="que-automatizamos" className="relative bg-white">
      <div className="tape" />
      <div className="section-wide">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 className="section-title">{a.title}</h2>
            <p className="measure mt-5 text-pretty text-lg leading-relaxed text-foreground-muted">{a.lead}</p>

            <div className="mt-10 border-2 border-ink p-6 lg:sticky lg:top-28">
              <p className="font-display text-lg font-bold uppercase leading-tight">{a.test.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {a.test.items.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[15px] text-foreground">
                    <Square size={16} className="mt-1 shrink-0" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="lg:col-span-8">
            {a.items.map((area) => (
              <li key={area.name} className="grid grid-cols-1 gap-5 border-t-2 border-ink py-8 first:pt-6 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8 lg:first:border-t-0 lg:first:pt-0">
                <div>
                  <h3 className="font-display text-3xl font-extrabold uppercase leading-[0.95] text-foreground">
                    {area.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{area.line}</p>
                </div>
                <div>
                  <ul className="flex flex-col gap-2">
                    {area.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-3 text-[17px] leading-snug text-foreground">
                        <span aria-hidden className="mt-2 h-2 w-2 shrink-0 bg-accent ring-1 ring-ink" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {area.slugs.map((slug) => (
                      <Link
                        key={slug}
                        href={localize(`/servicios/${slug}`)}
                        className="group inline-flex items-center gap-1.5 border border-border bg-background px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-ink hover:bg-accent"
                      >
                        {titleOf(slug)}
                        <ArrowUpRight size={15} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
