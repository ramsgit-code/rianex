"use client";

import { useLang } from "@/components/LanguageProvider";

const ITEMS = [
  "Go High Level",
  "WhatsApp",
  "Telegram",
  "OpenAI",
  "Koibox",
  "n8n",
  "Make",
  "Email",
  "Instagram",
  "API · MCP",
];

export function Marquee() {
  const { lang } = useLang();
  const label =
    lang === "en" ? "Integrated with" : "Se integra con";

  return (
    <section className="relative border-y border-white/[0.06] py-8">
      <p className="mb-5 text-center text-xs uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-10 text-lg font-medium text-foreground-muted"
            >
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-accent/40" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
