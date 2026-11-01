"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";

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
    href: "/blog/que-es-gtm-engineering",
    es: "Qué es GTM Engineering para una pyme",
    en: "What GTM Engineering means for an SME",
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
      <div className="tape" />
      <div className="section-wide grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="section-title">{home[lang].guides.title}</h2>
          {home[lang].guides.note && <p className="mt-3 text-sm text-muted">{home[lang].guides.note}</p>}
        </div>

        <div className="lg:col-span-8">
          <Link href={DESTACADA.href} className="group block border-2 border-ink bg-white p-6 transition-colors hover:bg-accent sm:p-8">
            <p className="flex items-start justify-between gap-4 font-display text-2xl font-extrabold uppercase leading-tight text-foreground sm:text-3xl">
              {DESTACADA[lang].title}
              <ArrowUpRight size={24} aria-hidden className="mt-1 shrink-0" />
            </p>
            <p className="measure mt-3 leading-relaxed text-foreground-muted group-hover:text-ink">
              {DESTACADA[lang].desc}
            </p>
          </Link>

          <ul className="mt-6 border-b-2 border-ink">
            {GUIAS.map((g) => (
              <li key={g.href} className="border-t-2 border-ink">
                <Link
                  href={g.href}
                  className="group flex items-center justify-between gap-4 py-4 text-[17px] font-semibold text-foreground transition-colors hover:text-accent-text"
                >
                  {g[lang]}
                  <ArrowUpRight size={18} aria-hidden className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
