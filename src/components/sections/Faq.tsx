"use client";

import { Plus } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";

export function Faq() {
  const { c, lang } = useLang();
  const f = c.faq;

  return (
    <section className="relative">
      <div className="tape" />
      <div className="section-wide grid grid-cols-1 gap-10 lg:grid-cols-12">
        <h2 className="section-title lg:col-span-4">{home[lang].faqTitle}</h2>

        <div className="border-b-2 border-ink lg:col-span-8">
          {f.items.map((item) => (
            <details key={item.q} className="group border-t-2 border-ink [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-semibold text-foreground transition-colors hover:text-accent-text">
                {item.q}
                <Plus
                  size={22}
                  aria-hidden
                  className="mt-0.5 shrink-0 transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="measure pb-6 text-[16px] leading-relaxed text-foreground-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
