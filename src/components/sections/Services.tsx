"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { home } from "@/lib/home";
import { SERVICIO_VIDEO } from "@/lib/servicio-media";

// "Servicios": las fichas de content.ts agrupadas como en /servicios, en
// tarjetas kanban. El último grupo ("Otros servicios": kit, formación y
// asesoramiento) va en grafito para separarlo de la automatización. Debajo,
// los complementarios en lista. Cada tarjeta lleva a la página del servicio.
export function Services() {
  const { lang, c, localize } = useLang();
  const k = home[lang].services;
  const s = c.servicios;
  const bySlug = (slug: string) => s.items.find((i) => i.slug === slug);
  const last = s.groups.length - 1;

  return (
    <section id="servicios" className="relative scroll-mt-20 bg-white">
      <div className="tape" />
      <div className="section-wide">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <h2 className="section-title lg:col-span-5">{k.title}</h2>
          <p className="measure text-pretty text-lg leading-relaxed text-foreground-muted lg:col-span-7 lg:self-end">
            {k.lead}
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-16">
          {s.groups.map((group, gi) => {
            const dark = gi === last;
            return (
              <div key={group.title}>
                <div className="grid grid-cols-1 gap-3 border-b-[6px] border-accent pb-5 lg:grid-cols-12 lg:gap-10">
                  <h3 className="font-display text-3xl font-extrabold uppercase leading-[0.95] text-foreground lg:col-span-5">
                    {group.title}
                  </h3>
                  <p className="measure text-pretty text-[15px] leading-relaxed text-foreground-muted lg:col-span-7 lg:self-end">
                    {group.desc}
                  </p>
                </div>
                <ul
                  className={`mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 ${
                    group.slugs.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
                  }`}
                >
                  {group.slugs.map((slug) => {
                    const item = bySlug(slug);
                    if (!item) return null;
                    const video = SERVICIO_VIDEO[slug];
                    return (
                      <li key={slug}>
                        <Link
                          href={localize(`/servicios/${slug}`)}
                          className={`group flex h-full flex-col border p-6 transition-colors ${
                            dark
                              ? "border-ink bg-ink text-background hover:bg-[#1F2226]"
                              : "border-border bg-background hover:border-ink"
                          }`}
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span
                              className={`font-display text-[12px] font-bold uppercase tracking-[0.08em] ${
                                dark ? "text-accent" : "text-accent-text"
                              }`}
                            >
                              {item.area}
                            </span>
                            {video && (
                              <span
                                className={`inline-flex items-center gap-1 px-1.5 py-0.5 font-display text-[11px] font-bold uppercase tracking-[0.06em] ${
                                  dark ? "bg-accent text-ink" : "bg-ink text-background"
                                }`}
                              >
                                <Play size={10} aria-hidden className="fill-current" />
                                {s.video}
                              </span>
                            )}
                          </span>
                          <span className="mt-5 block font-display text-2xl font-extrabold uppercase leading-[0.95]">
                            {item.title}
                          </span>
                          <span className={`mt-3 block text-[15px] leading-relaxed ${dark ? "text-background/75" : "text-foreground-muted"}`}>
                            {item.tagline}
                          </span>
                          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold underline decoration-accent decoration-[3px] underline-offset-4">
                            {s.short}
                            <ArrowUpRight
                              size={15}
                              aria-hidden
                              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          <div>
            <div className="grid grid-cols-1 gap-3 border-b-2 border-ink pb-5 lg:grid-cols-12 lg:gap-10">
              <h3 className="font-display text-3xl font-extrabold uppercase leading-[0.95] text-foreground lg:col-span-5">
                {s.complementary.title}
              </h3>
              <p className="measure text-pretty text-[15px] leading-relaxed text-foreground-muted lg:col-span-7 lg:self-end">
                {s.complementary.desc}
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {s.complementary.items.map((it) => (
                <li key={it.title} className="border-b border-border py-5 sm:pr-8">
                  <p className="font-semibold text-foreground">{it.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{it.desc}</p>
                  {"href" in it && it.href && (
                    <Link
                      href={localize(it.href)}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-text"
                    >
                      {s.complementary.more}
                      <ArrowUpRight size={14} aria-hidden />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link href={localize("/servicios")} className="btn-secondary mt-12">
          {k.all}
          <ArrowRight size={17} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
