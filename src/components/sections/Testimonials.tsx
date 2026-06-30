"use client";

import Link from "next/link";
import { Quote, ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

export type TestimonialItem = {
  id: string;
  name: string;
  company: string | null;
  role: string | null;
  quote: string;
};

export function Testimonials({ items }: { items: TestimonialItem[] }) {
  const { c } = useLang();
  const t = c.testimonials;

  if (!items.length) return null;

  return (
    <section className="relative">
      <div className="section-wide">
        <Reveal>
          <p className="tag">{t.tag}</p>
          <h2 className="section-title max-w-2xl">{t.title}</h2>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.slice(0, 3).map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.08}>
              <figure className="card flex h-full flex-col">
                <Quote size={22} className="text-accent/70" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-white/[0.08] pt-4">
                  <p className="font-display text-sm font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="text-xs text-foreground-muted">
                    {[item.role, item.company].filter(Boolean).join(" · ")}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <Link
            href="/testimonios"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
          >
            {t.addCta}
            <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
