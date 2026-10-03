import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, AlertTriangle } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { content } from "@/lib/content";
import { localizePath, type Lang } from "@/lib/i18n";
import { getSector } from "@/lib/sectores";
import { getPost } from "@/lib/blog";
import { RAMIRO, SITE_URL } from "@/lib/seo";

// Pagina de un sector. Componente de servidor por lo mismo que la de cada
// servicio: el texto tiene que estar en el HTML que leen los rastreadores.

const LABELS = {
  es: {
    home: "Inicio",
    back: "Todos los sectores",
    answer: "En resumen",
    timeline: "Plazo",
    caseLabel: "Caso real",
    challenge: "Reto",
    solution: "Solución",
    readCase: "Leer el caso completo",
    faq: "Preguntas frecuentes",
    services: "Servicios que lo resuelven",
    guides: "Guías relacionadas",
  },
  en: {
    home: "Home",
    back: "All sectors",
    answer: "In short",
    timeline: "Timeline",
    caseLabel: "Real case",
    challenge: "Challenge",
    solution: "Solution",
    readCase: "Read the full case study",
    faq: "Frequently asked questions",
    services: "Services that solve it",
    guides: "Related guides (in Spanish)",
  },
} as const;

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  );
}

export function SectorView({ slug, lang }: { slug: string; lang: Lang }) {
  const c = content[lang];
  const t = LABELS[lang];
  const d = getSector(slug, lang)!;
  const base = c.soluciones.items[d.index];
  const href = (path: string) => localizePath(path, lang);
  const pageUrl = `${SITE_URL}${href(`/soluciones/${slug}`)}`;

  const caso = d.caseClient
    ? c.cases.items.find((i) => i.client === d.caseClient)
    : undefined;
  const servicios = d.services
    .map((s) => c.servicios.items.find((i) => i.slug === s))
    .filter((s) => s !== undefined);
  const posts = d.posts.map((s) => getPost(s)).filter((p) => p !== null);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: d.h1,
      description: d.answer,
      url: pageUrl,
      audience: { "@type": "BusinessAudience", audienceType: base.title },
      areaServed: ["ES", "Latinoamérica"],
      inLanguage: lang === "es" ? "es-ES" : "en",
      provider: {
        "@type": "ProfessionalService",
        name: "Rianex",
        url: SITE_URL,
        founder: { "@type": "Person", name: RAMIRO.name, sameAs: [RAMIRO.linkedin] },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: d.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.home, item: `${SITE_URL}${href("/")}` },
        { "@type": "ListItem", position: 2, name: c.soluciones.tag, item: `${SITE_URL}${href("/soluciones")}` },
        { "@type": "ListItem", position: 3, name: base.title, item: pageUrl },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
      <PageShell tag={base.sector} title={d.h1} description={base.pain}>
        <div className="flex flex-col gap-14">
          <Link
            href={href("/soluciones")}
            className="-mt-4 inline-flex items-center gap-1.5 self-start text-sm text-foreground-muted hover:text-foreground"
          >
            <ArrowLeft size={15} />
            {t.back}
          </Link>

          <Reveal>
            <section className="card border-accent/30 bg-accent/[0.04]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-text">
                {t.answer}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-foreground">{d.answer}</p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <SectionTitle>{d.painsTitle}</SectionTitle>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {d.pains.map((p) => (
                  <div key={p.title} className="card">
                    <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <SectionTitle>{d.automationsTitle}</SectionTitle>
              <ol className="mt-6 flex flex-col gap-4">
                {d.automations.map((a, i) => (
                  <li key={a.title} className="card flex gap-4">
                    <span className="font-mono text-xs text-accent-text">0{i + 1}</span>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{a.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{a.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          {d.care && (
            <Reveal>
              <section className="card">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                  <AlertTriangle size={18} className="text-accent-text" />
                  {d.care.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {d.care.items.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground-muted">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-text" />
                      {x}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          <Reveal>
            <section className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
              <div className="card">
                <h2 className="font-display text-lg font-semibold text-foreground">{d.metricsTitle}</h2>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {d.metrics.map((m) => (
                    <li key={m} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground-muted">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-text" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h2 className="font-display text-lg font-semibold text-foreground">{t.timeline}</h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.timeline}</p>
              </div>
            </section>
          </Reveal>

          {caso && (
            <Reveal>
              <section className="card">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-text">
                  {t.caseLabel} · {caso.sector}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
                  {caso.client}: <span className="text-accent-text">{caso.metric}</span>{" "}
                  {caso.metricLabel}
                </h2>
                <div className="mt-5 grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">{t.challenge}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{caso.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">{t.solution}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{caso.solution}</p>
                  </div>
                </div>
                <Link
                  href={href(`/casos-de-exito/${caso.slug}`)}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text hover:text-ink"
                >
                  {t.readCase}
                  <ArrowRight size={15} />
                </Link>
              </section>
            </Reveal>
          )}

          <Reveal>
            <section>
              <SectionTitle>{t.faq}</SectionTitle>
              <div className="mt-6 flex flex-col divide-y divide-ink/[0.08] border-y border-ink/[0.08]">
                {d.faqs.map((f) => (
                  <div key={f.q} className="py-5">
                    <h3 className="font-display text-base font-semibold text-foreground">{f.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <SectionTitle>{t.services}</SectionTitle>
              <ul className="mt-5 grid gap-4 md:grid-cols-3">
                {servicios.map((s) => (
                  <li key={s.slug}>
                    <Link href={href(`/servicios/${s.slug}`)} className="card group block h-full">
                      <h3 className="font-display font-semibold text-foreground group-hover:text-accent-text">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{s.tagline}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {posts.length > 0 && (
            <Reveal>
              <section>
                <SectionTitle>{t.guides}</SectionTitle>
                <ul className="mt-5 grid gap-4 md:grid-cols-2">
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="card group block h-full">
                        <h3 className="font-display font-semibold text-foreground group-hover:text-accent-text">
                          {p.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{p.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          <Reveal>
            <section className="card flex flex-col items-start gap-4 border-accent/30 bg-accent/[0.04] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">{c.pageCta.title}</h2>
                <p className="mt-1 text-sm text-foreground-muted">{c.pageCta.subtitle}</p>
              </div>
              <Link href={href("/diagnostico")} className="btn-primary shrink-0">
                {c.pageCta.button}
                <ArrowRight size={16} />
              </Link>
            </section>
          </Reveal>
        </div>
      </PageShell>
    </>
  );
}
