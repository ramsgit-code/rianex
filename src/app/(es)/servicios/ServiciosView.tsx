"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Play } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Label } from "@/components/ui/Label";
import { SERVICIO_VIDEO } from "@/lib/servicio-media";

export function ServiciosView() {
  const { c, localize } = useLang();
  const s = c.servicios;

  return (
    <PageShell tag={s.tag} title={s.title} description={s.description} wide>
      <div className="flex flex-col gap-20">
        {s.groups.map((group) => (
          <section key={group.title}>
            <div className="grid grid-cols-1 gap-4 border-b-[6px] border-accent pb-6 lg:grid-cols-12 lg:gap-10">
              <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] text-foreground lg:col-span-5">
                {group.title}
              </h2>
              <p className="measure text-pretty text-lg leading-relaxed text-foreground-muted lg:col-span-7 lg:self-end">
                {group.desc}
              </p>
            </div>

            <div>
              {group.slugs
                .map((slug) => s.items.find((item) => item.slug === slug))
                .filter((item) => item !== undefined)
                .map((item) => (
                  <article
                    key={item.slug}
                    id={item.slug}
                    className="grid grid-cols-1 gap-8 border-b-2 border-ink py-10 lg:grid-cols-12 lg:gap-10"
                  >
                    <div className="lg:col-span-5">
                      <h3 className="font-display text-3xl font-extrabold uppercase leading-[0.95] text-foreground">
                        <Link href={localize(`/servicios/${item.slug}`)} className="hover:text-accent-text">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-lg leading-snug text-foreground-muted">{item.tagline}</p>
                      {SERVICIO_VIDEO[item.slug] && (
                        <p className="mt-3 flex w-fit items-center gap-1 bg-ink px-1.5 py-0.5 font-display text-[11px] font-bold uppercase tracking-[0.06em] text-background">
                          <Play size={10} aria-hidden className="fill-current" />
                          {s.video}
                        </p>
                      )}
                      <Link href={localize(`/servicios/${item.slug}`)} className="btn-secondary mt-6 min-h-[2.75rem] px-4 py-2 text-sm">
                        {s.more}
                        <ArrowRight size={16} aria-hidden />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
                      <div>
                        <Label>{s.problemLabel.replace(":", "")}</Label>
                        <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{item.problem}</p>
                        <Label className="mt-5">{s.forWhoLabel.replace(":", "")}</Label>
                        <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{item.forWho}</p>
                      </div>
                      <ul className="flex flex-col gap-2.5 border-t-2 border-ink pt-4 sm:border-l-2 sm:border-t-0 sm:pl-6 sm:pt-0">
                        {item.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-[15px] text-foreground">
                            <Check size={17} aria-hidden className="mt-0.5 shrink-0 text-go-text" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}

        <section id="complementarios" className="scroll-mt-24">
          <div className="grid grid-cols-1 gap-4 border-b-[6px] border-accent pb-6 lg:grid-cols-12 lg:gap-10">
            <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] text-foreground lg:col-span-5">
              {s.complementary.title}
            </h2>
            <p className="measure text-pretty text-lg leading-relaxed text-foreground-muted lg:col-span-7 lg:self-end">
              {s.complementary.desc}
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2">
            {s.complementary.items.map((it) => (
              <li key={it.title} className="border-b-2 border-ink py-7 md:odd:pr-10 md:even:pl-10">
                <h3 className="font-display text-2xl font-extrabold uppercase leading-[0.95] text-foreground">{it.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{it.desc}</p>
                {"href" in it && it.href && (
                  <Link
                    href={localize(it.href)}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-foreground underline decoration-accent decoration-[3px] underline-offset-4 hover:text-accent-text"
                  >
                    {s.complementary.more}
                    <ArrowUpRight size={14} aria-hidden />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
