"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Square } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";

// "Para quién trabajamos": perfiles, señales de encaje, sectores y las
// empresas reales (solo casos propios: Hospital Capilar es de Growth4U y no
// va en los logos de la home). Termina con la llamada a la consultoría.

const LOGO_SIZE: Record<string, { w: number; h: number; cls: string }> = {
  "eventos-barcelona": { w: 435, h: 117, cls: "h-7" },
  "tribeca-media": { w: 800, h: 800, cls: "h-10" },
  growth4u: { w: 339, h: 64, cls: "h-[18px]" },
};

type Chip = { name: string; href?: string };

function Chips({ items, localize }: { items: Chip[]; localize: (p: string) => string }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {items.map((it) => (
        <li key={it.name}>
          {it.href ? (
            <Link
              href={localize(it.href)}
              className="inline-flex items-center gap-1 border-2 border-ink bg-white px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              {it.name}
              <ArrowUpRight size={14} aria-hidden />
            </Link>
          ) : (
            <span className="inline-flex border border-border bg-white px-3 py-1.5 text-sm font-medium text-foreground">
              {it.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Audience() {
  const { lang, c, localize } = useLang();
  const a = home[lang].audience;
  const clients = c.cases.items.filter((i) => i.slug !== "hospital-capilar");

  return (
    <section id="para-quien" className="relative scroll-mt-20">
      <div className="tape" />
      <div className="section-wide">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <h2 className="section-title lg:col-span-5">{a.title}</h2>
          <p className="measure text-pretty text-lg leading-relaxed text-foreground-muted lg:col-span-7 lg:self-end">
            {a.lead}
          </p>
        </div>

        {/* Quién nos llama */}
        <h3 className="mt-14 font-display text-[13px] font-bold uppercase tracking-[0.08em] text-foreground">
          {a.profilesTitle}
        </h3>
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {a.profiles.map((p, i) => (
            <li key={p.name} className="card">
              <span className="font-mono text-xs text-accent-text">0{i + 1}</span>
              <p className="mt-2 font-display text-2xl font-extrabold uppercase leading-[0.95] text-foreground">{p.name}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">{p.line}</p>
            </li>
          ))}
        </ul>

        {/* Encaje y sectores */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="border-2 border-ink bg-white p-6 sm:p-8 lg:col-span-5">
            <p className="font-display text-2xl font-extrabold uppercase leading-tight">{a.fitTitle}</p>
            <ul className="mt-5 flex flex-col gap-3">
              {a.fit.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[16px] text-foreground">
                  <Square size={16} className="mt-1 shrink-0" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-8 lg:col-span-7">
            <div>
              <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-foreground">
                {a.sectorsTitle}
              </h3>
              <Chips items={a.sectors} localize={localize} />
            </div>
            <div>
              <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-foreground">
                {a.alsoTitle}
              </h3>
              <Chips items={a.also} localize={localize} />
            </div>
          </div>
        </div>

        {/* Empresas reales */}
        <h3 className="mt-14 font-display text-[13px] font-bold uppercase tracking-[0.08em] text-foreground">
          {a.clientsTitle}
        </h3>
        <ul className="mt-4 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
          {clients.map((cl) => {
            const size = LOGO_SIZE[cl.slug] ?? { w: 400, h: 120, cls: "h-8" };
            return (
              <li key={cl.slug} className="bg-white">
                <Link
                  href={localize(`/casos-de-exito/${cl.slug}`)}
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-background"
                >
                  <span className="flex h-12 items-center">
                    <Image
                      src={cl.logo}
                      alt={cl.client}
                      width={size.w}
                      height={size.h}
                      className={`${size.cls} w-auto max-w-[180px] object-contain`}
                    />
                  </span>
                  <span className="mt-4 font-display text-[12px] font-bold uppercase tracking-[0.08em] text-muted">
                    {cl.sector}
                  </span>
                  {/* Sin la cifra: la da la banda de casos, justo debajo. */}
                  <span className="mt-1 font-semibold text-foreground">{cl.tag}</span>
                  <span className="mt-auto inline-flex items-center gap-1 self-start pt-5 text-sm font-semibold underline decoration-accent decoration-[3px] underline-offset-4">
                    {a.clientCta}
                    <ArrowUpRight size={14} aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Llamada a la consultoría */}
        <div className="mt-12 flex flex-col gap-6 bg-accent p-7 text-ink sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-4xl font-extrabold uppercase leading-[0.95] sm:text-5xl">{a.cta.title}</p>
            <p className="measure mt-3 text-pretty text-lg leading-relaxed text-ink/85">{a.cta.text}</p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-2">
            <Link href={localize("/diagnostico")} className="btn-primary">
              {a.cta.button}
              <ArrowRight size={17} aria-hidden />
            </Link>
            <span className="text-sm font-medium">{a.cta.note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
