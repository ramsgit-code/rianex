import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, Quote } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { content } from "@/lib/content";
import { localizePath, type Lang } from "@/lib/i18n";
import { CASOS_PUBLICADOS, getCaso } from "@/lib/casos";
import { getSector } from "@/lib/sectores";
import { getPost } from "@/lib/blog";
import { RAMIRO, SITE_URL } from "@/lib/seo";

// Pagina de un caso de exito. Componente de servidor: la historia completa
// (contexto, que se monto, resultado y cita del cliente) tiene que estar en el
// HTML, que es lo que un asistente de IA cita como ejemplo.

const LOGO_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/logos/hospital-capilar-dark.png": { width: 396, height: 117 },
  "/logos/eventos-barcelona-dark.png": { width: 435, height: 117 },
  "/logos/growth4u-dark.png": { width: 339, height: 64 },
};

const LABELS = {
  es: {
    home: "Inicio",
    back: "Todos los casos",
    answer: "En resumen",
    context: "El punto de partida",
    built: "Qué montamos",
    results: "Resultado",
    stack: "Stack",
    services: "Servicios de este caso",
    sector: "La solución para el sector",
    guides: "Guías relacionadas",
  },
  en: {
    home: "Home",
    back: "All case studies",
    answer: "In short",
    context: "Starting point",
    built: "What we built",
    results: "Result",
    stack: "Stack",
    services: "Services in this case",
    sector: "The solution for this sector",
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

export function CasoView({ slug, lang }: { slug: string; lang: Lang }) {
  const c = content[lang];
  const t = LABELS[lang];
  const d = getCaso(slug, lang)!;
  const ficha = c.cases.items.find((i) => i.client === d.client)!;
  const href = (path: string) => localizePath(path, lang);
  const pageUrl = `${SITE_URL}${href(`/casos-de-exito/${slug}`)}`;
  const dim = LOGO_DIMENSIONS[ficha.logo] ?? { width: 300, height: 90 };

  const servicios = d.services
    .map((s) => c.servicios.items.find((i) => i.slug === s))
    .filter((s) => s !== undefined);
  const sector = d.sector ? getSector(d.sector, lang) : null;
  const posts = d.posts.map((s) => getPost(s)).filter((p) => p !== null);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: d.h1,
      description: d.answer,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      image: `${SITE_URL}${ficha.logo}`,
      datePublished: CASOS_PUBLICADOS,
      dateModified: CASOS_PUBLICADOS,
      inLanguage: lang === "es" ? "es-ES" : "en",
      author: { "@type": "Person", name: RAMIRO.name, url: `${SITE_URL}/sobre-mi`, sameAs: [RAMIRO.linkedin] },
      publisher: { "@type": "Organization", name: "Rianex", url: SITE_URL },
      about: { "@type": "Organization", name: d.client },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.home, item: `${SITE_URL}${href("/")}` },
        { "@type": "ListItem", position: 2, name: c.casos.tag, item: `${SITE_URL}${href("/casos-de-exito")}` },
        { "@type": "ListItem", position: 3, name: d.client, item: pageUrl },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
      <PageShell tag={`${c.casos.tag} · ${ficha.sector}`} title={d.h1}>
        <div className="flex flex-col gap-14">
          <div className="-mt-4 flex flex-wrap items-center justify-between gap-4">
            <Link
              href={href("/casos-de-exito")}
              className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
            >
              <ArrowLeft size={15} />
              {t.back}
            </Link>
            <Image
              src={ficha.logo}
              alt={d.client}
              width={dim.width}
              height={dim.height}
              className="h-8 w-auto max-w-[170px] object-contain opacity-90"
            />
          </div>

          <Reveal>
            <section className="card border-accent/30 bg-accent/[0.04]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-text">
                {t.answer}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-foreground">{d.answer}</p>
            </section>
          </Reveal>

          <Reveal>
            <section className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <SectionTitle>{t.context}</SectionTitle>
                <div className="mt-4 flex flex-col gap-3">
                  {d.context.map((p) => (
                    <p key={p} className="leading-relaxed text-foreground-muted">{p}</p>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-2xl border border-accent/20 bg-accent/[0.05] p-8 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{t.results}</p>
                <p className="mt-2 font-display text-6xl font-semibold tracking-tight text-accent-text">
                  {ficha.metric}
                </p>
                <p className="mt-2 text-sm text-foreground-muted">{ficha.metricLabel}</p>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <SectionTitle>{t.built}</SectionTitle>
              <ol className="mt-6 grid gap-5 sm:grid-cols-2">
                {d.built.map((b, i) => (
                  <li key={b.title} className="card">
                    <span className="font-mono text-xs text-accent-text">0{i + 1}</span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{b.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{b.desc}</p>
                  </li>
                ))}
              </ol>
              {ficha.stack.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-muted">{t.stack}</span>
                  {ficha.stack.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-ink/[0.08] bg-ink/[0.03] px-2.5 py-1 text-[11px] text-foreground-muted"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </section>
          </Reveal>

          <Reveal>
            <section>
              <SectionTitle>{t.results}</SectionTitle>
              <ul className="mt-5 flex flex-col gap-3">
                {d.results.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 leading-relaxed text-foreground-muted">
                    <Check size={18} className="mt-0.5 shrink-0 text-accent-text" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <figure className="card">
              <Quote size={22} className="text-accent-text" />
              <blockquote className="mt-3 text-lg leading-relaxed text-foreground">
                {d.quote.text}
              </blockquote>
              <figcaption className="mt-4 text-sm text-foreground-muted">
                <span className="font-medium text-foreground">{d.quote.author}</span> · {d.quote.role}
              </figcaption>
            </figure>
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
              {sector && d.sector && (
                <Link
                  href={href(`/soluciones/${d.sector}`)}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text hover:text-ink"
                >
                  {t.sector}: {sector.h1}
                  <ArrowRight size={15} />
                </Link>
              )}
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
