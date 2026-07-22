"use client";

import { useState } from "react";
import Link from "next/link";
import { Quote, ArrowRight, ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);

  if (!items.length) return null;

  const total = items.length;
  const item = items[index];
  const go = (d: number) =>
    setState([(index + d + total) % total, d]);

  return (
    <section className="relative">
      <div className="section-wide">
        <div className="flex items-end justify-between gap-4">
          <Reveal>
            <p className="tag">{t.tag}</p>
            <h2 className="section-title max-w-2xl">{t.title}</h2>
          </Reveal>

          {total > 1 && (
            <Reveal className="hidden shrink-0 items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Anterior"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Siguiente"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-accent/10 text-accent transition-colors hover:bg-accent hover:text-background"
              >
                <ArrowRight size={18} />
              </button>
            </Reveal>
          )}
        </div>

        {/* carrusel */}
        <div className="relative mt-8 overflow-hidden sm:mt-10">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={item.id}
              custom={dir}
              initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="card mx-auto flex max-w-3xl flex-col"
            >
              <Quote size={26} className="text-accent/70" />
              <blockquote className="mt-5 text-lg leading-relaxed text-foreground sm:text-xl">
                “{lang === "en" ? item.quoteEn ?? item.quote : item.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-accent">
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
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* controles móvil + puntos */}
        {total > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent sm:hidden"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {items.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-accent" : "w-2 bg-border hover:bg-foreground-muted"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Siguiente"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-accent/10 text-accent transition-colors hover:bg-accent hover:text-background sm:hidden"
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
