"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";

// Casos propios en producción. Hospital Capilar es de Growth4U: fuera.
export function Cases() {
  const { lang, c, localize } = useLang();
  const k = home[lang].cases;
  const items = c.cases.items.filter((i) => i.slug !== "hospital-capilar");

  return (
    <section id="casos" className="relative bg-ink text-background">
      <div className="section-wide">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-balance font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">
              {k.title}
            </h2>
            <p className="mt-4 text-lg text-background/75">{k.lead}</p>
          </div>
          <Link href={localize("/casos-de-exito")} className="btn-tape self-start sm:self-auto">
            {k.cta}
            <ArrowRight size={17} aria-hidden />
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-px bg-background/15 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug} className="bg-ink">
              <Link
                href={localize(`/casos-de-exito/${item.slug}`)}
                className="group flex h-full flex-col p-6 transition-colors hover:bg-[#1F2226] sm:p-8"
              >
                <span aria-hidden className="block h-2 w-full bg-go" />
                <p className="mt-6 font-display text-[13px] font-bold uppercase tracking-[0.08em] text-background/60">
                  {item.sector}
                </p>
                <h3 className="mt-2 font-display text-3xl font-extrabold uppercase leading-none">{item.client}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{item.tag}</p>
                <p className="mt-5 line-clamp-4 text-[15px] leading-relaxed text-background/75">{item.solution}</p>
                <p className="mt-auto flex items-end justify-between gap-4 pt-8">
                  <span>
                    <span className="block font-display text-4xl font-extrabold tabular-nums text-accent">{item.metric}</span>
                    <span className="mt-1 block max-w-[22ch] text-sm text-background/70">{item.metricLabel}</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold underline-offset-4 group-hover:underline">
                    {k.read}
                    <ArrowUpRight size={15} aria-hidden />
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
