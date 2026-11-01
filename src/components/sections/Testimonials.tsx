"use client";

import { useRef } from "react";
import Link from "next/link";
import { Quote, ArrowRight, ArrowLeft } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";

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
      <div className="tape" />
      <div className="section-wide">
        <div className="flex items-end justify-between gap-4">
          <h2 className="section-title max-w-2xl">{home[lang].testimonialsTitle}</h2>

          {items.length > 1 && (
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Anterior"
                className="flex h-10 w-10 items-center justify-center border-2 border-ink text-foreground transition-colors hover:bg-ink hover:text-background"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Siguiente"
                className="flex h-10 w-10 items-center justify-center border-2 border-ink bg-ink text-background transition-colors hover:bg-accent hover:text-ink"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* tira horizontal: ~2 testimonios visibles por pantalla, con scroll snap */}
                  <div
            ref={scrollerRef}
            className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:mt-10"
          >
            {items.map((item) => (
              <figure
                key={item.id}
                className="flex w-[85%] shrink-0 snap-start flex-col border-2 border-ink bg-white p-6 sm:w-[calc(50%-0.5rem)] sm:p-8"
              >
                <Quote size={26} className="fill-accent text-ink" aria-hidden />
                <blockquote className="mt-5 text-[17px] leading-relaxed text-foreground">
                  “{lang === "en" ? item.quoteEn ?? item.quote : item.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t-2 border-ink pt-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden bg-accent text-sm font-bold text-ink">
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
                    <span className="block text-[15px] font-bold text-foreground">
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

        {/* controles móvil */}
        {items.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Anterior"
              className="flex h-10 w-10 items-center justify-center border-2 border-ink text-foreground transition-colors hover:bg-ink hover:text-background"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Siguiente"
              className="flex h-10 w-10 items-center justify-center border-2 border-ink bg-ink text-background transition-colors hover:bg-accent hover:text-ink"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        )}

                  <div className="mt-8 text-center">
            <Link
              href="/testimonios"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline underline-offset-4 hover:text-accent-text"
            >
              {t.addCta}
              <ArrowRight size={15} />
            </Link>
          </div>
      </div>
    </section>
  );
}
