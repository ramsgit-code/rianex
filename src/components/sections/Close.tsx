"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";

// Cierre de la home: la cinta amarilla ocupa toda la sección.
export function Close() {
  const { lang, localize } = useLang();
  const k = home[lang].close;

  return (
    <section className="relative bg-accent text-ink">
      <div className="section-wide grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <h2 className="text-balance font-display text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.88] lg:col-span-8">
          {k.title} <span className="block">{k.highlight}</span>
        </h2>
        <div className="lg:col-span-4">
          <p className="measure text-pretty text-lg leading-relaxed text-ink/85">{k.lead}</p>
          <Link href={localize("/diagnostico")} className="btn-primary mt-7 w-full sm:w-auto">
            {k.button}
            <ArrowRight size={17} aria-hidden />
          </Link>
          <p className="mt-4 text-sm">
            <a href="mailto:hola@rianex.es" className="underline">
              {k.mail}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
