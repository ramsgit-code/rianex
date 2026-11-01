"use client";

import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";

const ITEMS = [
  "Claude",
  "OpenAI",
  "n8n",
  "Make",
  "Zapier",
  "GoHighLevel",
  "HubSpot",
  "Clay",
  "Instantly",
  "Valley",
  "WhatsApp",
  "Vapi",
  "API · MCP",
];

// Herramientas: una línea de rótulos, sin animación. Es contexto, no espectáculo.
export function Marquee() {
  const { lang } = useLang();

  return (
    <section className="border-y-2 border-ink bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:gap-10 lg:px-12">
        <p className="shrink-0 font-display text-[13px] font-bold uppercase tracking-[0.08em] text-foreground">
          {home[lang].tools}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[17px] font-semibold text-foreground-muted">
          {ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
