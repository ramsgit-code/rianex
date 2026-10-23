"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

// Guias del blog enlazadas desde la home. La primera es el pilar de
// "automatizacion de procesos con IA", que concentra la mayoria de las
// impresiones en Search Console: enlazarlo desde la pagina con mas autoridad
// del sitio es la señal interna mas fuerte que le podemos dar.
//
// Los articulos solo existen en castellano, asi que en /en se enlaza la
// version en castellano y se avisa en el titulo.

const DESTACADA = {
  href: "/blog/automatizar-procesos-con-ia-por-donde-empezar",
  es: {
    title: "Automatización de procesos con IA: por dónde empezar",
    desc: "Las cuatro condiciones que tiene que cumplir el primer proceso, qué medir antes y el orden que funciona, con un caso real.",
  },
  en: {
    title: "AI process automation: where to start",
    desc: "The four conditions your first process must meet, what to measure first and the order that works, with a real case.",
  },
};

const GUIAS = [
  {
    href: "/blog/medir-un-proceso-antes-de-automatizarlo",
    es: "Cómo medir un proceso antes de automatizarlo",
    en: "How to measure a process before automating it",
  },
  {
    href: "/blog/que-es-gohighlevel",
    es: "Qué es GoHighLevel y cuándo compensa",
    en: "What GoHighLevel is and when it pays off",
  },
  {
    href: "/blog/automatizar-recepcion-clinica",
    es: "Automatizar la recepción de una clínica",
    en: "Automating a clinic's front desk",
  },
];

export function Guias() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section className="relative">
      <div className="section-wide max-w-3xl lg:max-w-3xl">
        <Reveal>
          <p className="tag">{en ? "Guides (in Spanish)" : "Guías"}</p>
          <h2 className="section-title">
            {en ? "Before you automate anything" : "Antes de automatizar nada"}
          </h2>
        </Reveal>

        <Reveal delay={0.04}>
          <Link href={DESTACADA.href} className="card group mt-8 block">
            <p className="flex items-start justify-between gap-4 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-accent-text">
              {DESTACADA[lang].title}
              <ArrowUpRight size={18} className="mt-1 shrink-0 text-accent-text" />
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              {DESTACADA[lang].desc}
            </p>
          </Link>
        </Reveal>

        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {GUIAS.map((g, i) => (
            <li key={g.href} className="h-full">
              <Reveal delay={0.08 + i * 0.04} className="h-full">
                <Link
                  href={g.href}
                  className="card group flex h-full items-start justify-between gap-3 text-sm font-semibold text-foreground transition-colors hover:text-accent-text"
                >
                  {g[lang]}
                  <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-accent-text" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
