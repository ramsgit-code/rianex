import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Minus } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { content } from "@/lib/content";
import { localizePath, type Lang } from "@/lib/i18n";
import { getServicio } from "@/lib/servicios";
import { getPost } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

// Pagina de un servicio. Componente de servidor a proposito: todo el texto
// (respuesta directa, FAQ, metodo) tiene que estar en el HTML que leen los
// rastreadores y los asistentes de IA, no aparecer al hidratar.

const LABELS = {
  es: {
    home: "Inicio",
    back: "Todos los servicios",
    answer: "En resumen",
    problem: "El problema",
    forWho: "Para quién",
    includes: "Qué incluye",
    fit: "Encaja si…",
    notFit: "No encaja si…",
    method: "Cómo lo hacemos",
    timeline: "Plazo",
    price: "Inversión",
    priceNote: "El precio exacto se confirma en la auditoría gratuita, no antes.",
    caseLabel: "Caso real",
    challenge: "Reto",
    solution: "Solución",
    readCase: "Leer el caso completo",
    faq: "Preguntas frecuentes",
    guides: "Guías relacionadas",
    others: "Otros servicios",
  },
  en: {
    home: "Home",
    back: "All services",
    answer: "In short",
    problem: "The problem",
    forWho: "Who it is for",
    includes: "What is included",
    fit: "A good fit if…",
    notFit: "Not a fit if…",
    method: "How we do it",
    timeline: "Timeline",
    price: "Investment",
    priceNote: "The exact price is confirmed in the free audit, not before.",
    caseLabel: "Real case",
    challenge: "Challenge",
    solution: "Solution",
    readCase: "Read the full case study",
    faq: "Frequently asked questions",
    guides: "Related guides (in Spanish)",
    others: "Other services",
  },
} as const;

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  );
}

export function ServicioView({ slug, lang }: { slug: string; lang: Lang }) {
  const c = content[lang];
  const t = LABELS[lang];
  const base = c.servicios.items.find((i) => i.slug === slug)!;
  const d = getServicio(slug, lang)!;
  const href = (path: string) => localizePath(path, lang);
  const pageUrl = `${SITE_URL}${href(`/servicios/${slug}`)}`;

  const caso = d.caseClient
    ? c.cases.items.find((i) => i.client === d.caseClient)
    : undefined;
  const posts = d.posts.map((s) => getPost(s)).filter((p) => p !== null);
  const otros = c.servicios.items.filter((i) => i.slug !== slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: base.title,
      description: d.answer,
      url: pageUrl,
      serviceType: base.title,
      areaServed: ["ES", "Latinoamérica"],
      inLanguage: lang === "es" ? "es-ES" : "en",
      provider: {
        "@type": "ProfessionalService",
        name: "Rianex",
        url: SITE_URL,
        founder: { "@type": "Person", name: "Ramiro Pérez Rodero" },
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
        { "@type": "ListItem", position: 2, name: c.servicios.tag, item: `${SITE_URL}${href("/servicios")}` },
        { "@type": "ListItem", position: 3, name: base.title, item: pageUrl },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
      <PageShell tag={c.servicios.tag} title={base.title} description={base.tagline}>
        <div className="flex flex-col gap-14">
          <Link
            href={href("/servicios")}
            className="-mt-4 inline-flex items-center gap-1.5 self-start text-sm text-foreground-muted hover:text-foreground"
          >
            <ArrowLeft size={15} />
            {t.back}
          </Link>

          {/* Respuesta directa: lo primero que extrae un buscador o un asistente. */}
          <Reveal>
            <section className="card border-accent/30 bg-accent/[0.04]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-text">
                {t.answer}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-foreground">{d.answer}</p>
            </section>
          </Reveal>

          <Reveal>
            <section className="grid gap-8 md:grid-cols-2">
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {t.problem}
                  </h2>
                  <p className="mt-2 leading-relaxed text-foreground-muted">{base.problem}</p>
                </div>
                <div>
                  <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {t.forWho}
                  </h2>
                  <p className="mt-2 leading-relaxed text-foreground-muted">{base.forWho}</p>
                </div>
              </div>
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  {t.includes}
                </h2>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {base.deliverables.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-foreground-muted">
                      <span className="mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent-text">
                        <Check size={10} />
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="grid gap-5 md:grid-cols-2">
              <div className="card">
                <h2 className="font-display text-lg font-semibold text-foreground">{t.fit}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {d.fit.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground-muted">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-text" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h2 className="font-display text-lg font-semibold text-foreground">{t.notFit}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {d.notFit.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground-muted">
                      <Minus size={16} className="mt-0.5 shrink-0 text-muted" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <SectionTitle>{t.method}</SectionTitle>
              <ol className="mt-6 grid gap-5 sm:grid-cols-2">
                {d.steps.map((step, i) => (
                  <li key={step.title} className="card">
                    <span className="font-mono text-xs text-accent-text">0{i + 1}</span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{step.desc}</p>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          <Reveal>
            <section className="grid gap-5 md:grid-cols-[1fr_1.6fr]">
              <div className="card">
                <h2 className="font-display text-lg font-semibold text-foreground">{t.timeline}</h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.timeline}</p>
              </div>
              <div className="card">
                <h2 className="font-display text-lg font-semibold text-foreground">{t.price}</h2>
                <dl className="mt-3 grid gap-3 sm:grid-cols-3">
                  {c.pricing.tiers.map((tier) => (
                    <div key={tier.name}>
                      <dt className="text-xs uppercase tracking-wider text-muted">{tier.name}</dt>
                      <dd className="mt-1 font-display font-semibold text-foreground">{tier.range}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs text-muted">{t.priceNote}</p>
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

          <nav aria-label={t.others}>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted">{t.others}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {otros.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={href(`/servicios/${o.slug}`)}
                    className="inline-block rounded-full border border-ink/[0.1] px-3.5 py-1.5 text-sm text-foreground-muted hover:border-accent/40 hover:text-foreground"
                  >
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </PageShell>
    </>
  );
}
