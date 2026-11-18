"use client";

import { EmailCta } from "@/components/EmailCta";
import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";

// Cierre de la home: la cinta amarilla ocupa toda la sección.
export function Close() {
  const { lang } = useLang();
  const k = home[lang].close;

  return (
    <section className="relative bg-accent text-ink">
      <div className="section-wide grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <h2 className="text-balance font-display text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.88] lg:col-span-8">
          {k.title} <span className="block">{k.highlight}</span>
        </h2>
        <div className="lg:col-span-4">
          <p className="measure text-pretty text-lg leading-relaxed text-ink/85">{k.lead}</p>
          <div className="mt-7">
            <EmailCta
              button={k.button}
              placeholder={k.emailPlaceholder}
              label={k.emailLabel}
              origin="cierre"
              tone="tape"
              stacked
            />
          </div>
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
