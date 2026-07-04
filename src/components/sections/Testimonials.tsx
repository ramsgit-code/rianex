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
  roleEn: string | null;
  quoteEn: string | null;
  imageUrl: string | null;
};

export function Testimonials({ items }: { items: TestimonialItem[] }) {
  const { c, lang } = useLang();
  const t = c.testimonials;

  if (!items.length) return null;

  return (
    <section className="relative">
      <div className="section-wide">
        <Reveal>
          <p className="tag">{t.tag}</p>
          <h2 className="section-title max-w-2xl">{t.title}</h2>
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-3">
          {items.slice(0, 3).map((item, i) => (
            <Reveal
              as="li"
              key={item.id}
              delay={i * 0.08}
              className={i > 0 ? "hidden sm:block" : ""}
            >
              <figure className="card flex h-full flex-col">
                <Quote size={22} className="text-accent/70" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">
                  “{lang === "en" ? item.quoteEn ?? item.quote : item.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-white/[0.08] pt-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-accent">
                    {item.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      item.name.charAt(0)
                    )}
                  </span>
                  <span>
                    <span className="block font-display text-sm font-semibold text-foreground">
                      {item.name}
                    </span>
                    <span className="block text-xs text-foreground-muted">
                      {[
                        lang === "en" ? item.roleEn ?? item.role : item.role,
                        item.company,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </span>
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
