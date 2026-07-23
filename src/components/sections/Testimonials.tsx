"use client";

import { useRef } from "react";
import Link from "next/link";
import { Quote, ArrowRight, ArrowLeft } from "lucide-react";
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
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (!items.length) return null;

  const scroll = (dir: number) => {
    scrollerRef.current?.scrollBy({
      left: dir * scrollerRef.current.clientWidth * 0.9,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative">
      <div className="section-wide">
        <div className="flex items-end justify-between gap-4">
          <Reveal>
            <p className="tag">{t.tag}</p>
            <h2 className="section-title max-w-2xl">{t.title}</h2>
          </Reveal>

          {items.length > 1 && (
            <Reveal className="hidden shrink-0 items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Anterior"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Siguiente"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-accent/10 text-accent transition-colors hover:bg-accent hover:text-background"
              >
                <ArrowRight size={18} />
              </button>
            </Reveal>
          )}
        </div>

        {/* tira horizontal: ~2 testimonios visibles por pantalla, con scroll snap */}
        <Reveal delay={0.08}>
          <div
            ref={scrollerRef}
            className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:mt-10"
          >
            {items.map((item) => (
              <figure
                key={item.id}
                className="card flex w-[82%] shrink-0 snap-start flex-col sm:w-[calc(50%-0.5rem)]"
              >
                <Quote size={20} className="text-accent/70" />
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground sm:text-[15px]">
                  “{lang === "en" ? item.quoteEn ?? item.quote : item.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-white/[0.08] pt-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold text-accent">
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
            ))}
          </div>
        </Reveal>

        {/* controles móvil */}
        {items.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Siguiente"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-accent/10 text-accent transition-colors hover:bg-accent hover:text-background"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        <Reveal delay={0.1}>
          <div className="mt-8 text-center">
            <Link
              href="/testimonios"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
            >
              {t.addCta}
              <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
