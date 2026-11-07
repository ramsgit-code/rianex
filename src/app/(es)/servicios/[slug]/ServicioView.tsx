import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Minus, Play } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { content } from "@/lib/content";
import { localizePath, type Lang } from "@/lib/i18n";
import { getServicio, type CaseClient } from "@/lib/servicios";
import { SERVICIO_VIDEO } from "@/lib/servicio-media";
import { CASOS, casoSlug } from "@/lib/casos";
import { getPost } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

// Pagina de un servicio. Componente de servidor a proposito: todo el texto
// (respuesta directa, FAQ, metodo) tiene que estar en el HTML que leen los
// rastreadores y los asistentes de IA, no aparecer al hidratar.
//
// Orden: en resumen → video y que consigues → asi funciona (ejemplo) → problema,
// para quien e incluye → encaja / no encaja → metodo → plazo e inversion →
// casos reales → FAQ → guias → otros servicios. La llamada a la consultoria
// la pone el pie de la pagina.

const LABELS = {
  es: {
    home: "Inicio",
    back: "Todos los servicios",
    answer: "En resumen",
    video: "Míralo en un minuto",
    videoDemo: "Demo con una llamada recreada en una clínica ficticia.",
    videoNote: "",
    outcomes: "Qué consigues",
    flow: "Así funciona",
    flowNote: "Ejemplo ilustrativo",
    problem: "El problema",
    forWho: "Para quién",
    includes: "Qué incluye",
    fit: "Encaja si…",
    notFit: "No encaja si…",
    method: "Cómo lo hacemos",
    timeline: "Plazo",
    price: "Inversión",
    priceNote: "El precio exacto se confirma en la consultoría gratuita, no antes.",
    cases: "Casos reales",
    challenge: "Reto",
    solution: "Solución",
    focus: "Qué hicimos en este caso",
    readCase: "Leer el caso completo",
    caseVideo: "Con vídeo del caso",
    faq: "Preguntas frecuentes",
    guides: "Guías relacionadas",
    others: "Otros servicios",
  },
  en: {
    home: "Home",
    back: "All services",
    answer: "In short",
    video: "Watch it in a minute",
    videoDemo: "Demo with a recreated call at a fictional clinic. Narrated in Spanish.",
    videoNote: "Narrated in Spanish.",
    outcomes: "What you get",
    flow: "How it works",
    flowNote: "Illustrative example",
    problem: "The problem",
    forWho: "Who it is for",
    includes: "What is included",
    fit: "A good fit if…",
    notFit: "Not a fit if…",
    method: "How we do it",
    timeline: "Timeline",
    price: "Investment",
    priceNote: "The exact price is confirmed in the free consultation, not before.",
    cases: "Real cases",
    challenge: "Challenge",
    solution: "Solution",
    focus: "What we did in this case",
    readCase: "Read the full case study",
    caseVideo: "Case video available",
    faq: "Frequently asked questions",
    guides: "Related guides (in Spanish)",
    others: "Other services",
  },
} as const;

// El primer paso del ejemplo es lo que llega (rojo: hoy a mano), los del
// medio lo que hace el sistema (ambar) y el ultimo lo que queda hecho (verde).
const FLOW_BAR = ["bg-stop", "bg-accent", "bg-accent", "bg-go"];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] text-foreground">
      {children}
    </h2>
  );
}

function SmallTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-foreground">
      {children}
    </h2>
  );
}

export function ServicioView({ slug, lang }: { slug: string; lang: Lang }) {
  const c = content[lang];
  const t = LABELS[lang];
  const base = c.servicios.items.find((i) => i.slug === slug)!;
  const d = getServicio(slug, lang)!;
  const video = SERVICIO_VIDEO[slug];
  const href = (path: string) => localizePath(path, lang);
  const pageUrl = `${SITE_URL}${href(`/servicios/${slug}`)}`;

  const casos = d.cases
    .map((client) => {
      const ficha = c.cases.items.find((i) => i.client === client);
      const caseSlug = casoSlug(client);
      if (!ficha || !caseSlug) return null;
      return { ficha, slug: caseSlug, hasVideo: Boolean(CASOS[caseSlug]?.video) };
    })
    .filter((x) => x !== null);
  const posts = d.posts.map((s) => getPost(s)).filter((p) => p !== null);
  const otros = c.servicios.items.filter((i) => i.slug !== slug);
  const tiers =
    d.price === "advisory"
      ? [c.pricing.tiers[0], c.pricing.tiers[2]]
      : d.price === "tiers"
        ? c.pricing.tiers
        : [];

  const jsonLd: Record<string, unknown>[] = [
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
  if (video) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: base.title,
      description: d.answer,
      thumbnailUrl: `${SITE_URL}${video.poster}`,
      contentUrl: `${SITE_URL}${video.src}`,
      uploadDate: video.uploadDate,
      duration: video.duration,
      inLanguage: "es-ES",
    });
  }

  const outcomesList = (
    <ul className="flex flex-col gap-4">
      {d.outcomes.map((o) => (
        <li key={o} className="flex items-start gap-3 text-lg font-medium leading-snug text-foreground">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-go text-white">
            <Check size={14} aria-hidden />
          </span>
          {o}
        </li>
      ))}
    </ul>
  );

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
            <section className="bg-accent p-6 text-ink sm:p-8">
              <p className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-foreground">
                {t.answer}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-foreground">{d.answer}</p>
            </section>
          </Reveal>

          {/* Video (si lo hay) y lo que consigue el cliente */}
          <Reveal>
            {video ? (
              <section className="grid gap-8 md:grid-cols-[1.45fr_1fr] md:items-start">
                <div>
                  <SmallTitle>{t.video}</SmallTitle>
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={video.poster}
                    className="mt-3 aspect-video w-full border border-ink bg-ink"
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  {(video.demo || t.videoNote) && (
                    <p className="mt-2 text-xs text-muted">{video.demo ? t.videoDemo : t.videoNote}</p>
                  )}
                </div>
                <div className="border-2 border-ink bg-white p-6 sm:p-7">
                  <SmallTitle>{t.outcomes}</SmallTitle>
                  <div className="mt-5">{outcomesList}</div>
                </div>
              </section>
            ) : (
              <section className="border-2 border-ink bg-white p-6 sm:p-8">
                <SmallTitle>{t.outcomes}</SmallTitle>
                <div className="mt-5">{outcomesList}</div>
              </section>
            )}
          </Reveal>

          {/* Ejemplo paso a paso: de lo que llega a lo que queda hecho */}
          <Reveal>
            <section>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <SectionTitle>{t.flow}</SectionTitle>
                <span className="data-tag">{t.flowNote}</span>
              </div>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {d.flow.map((f, i) => (
                  <li key={f.label} className="relative flex flex-col border border-border bg-white">
                    <span aria-hidden className={`block h-2 w-full ${FLOW_BAR[i] ?? "bg-accent"}`} />
                    <div className="flex flex-1 flex-col p-5">
                      <p className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-foreground">
                        <span className="font-mono text-xs font-medium text-accent-text">0{i + 1}</span>{" "}
                        {f.label}
                      </p>
                      <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{f.text}</p>
                    </div>
                    {i < d.flow.length - 1 && (
                      <ArrowRight
                        size={18}
                        aria-hidden
                        className="absolute -right-[15px] top-1/2 z-10 hidden -translate-y-1/2 bg-background text-ink lg:block"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          <Reveal>
            <section className="grid gap-8 md:grid-cols-2">
              <div className="flex flex-col gap-6">
                <div>
                  <SmallTitle>{t.problem}</SmallTitle>
                  <p className="mt-2 leading-relaxed text-foreground-muted">{base.problem}</p>
                </div>
                <div>
                  <SmallTitle>{t.forWho}</SmallTitle>
                  <p className="mt-2 leading-relaxed text-foreground-muted">{base.forWho}</p>
                </div>
              </div>
              <div>
                <SmallTitle>{t.includes}</SmallTitle>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {base.deliverables.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-foreground-muted">
                      <span className="mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center bg-go text-white">
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
                <h2 className="font-display text-2xl font-extrabold uppercase leading-none text-foreground">{t.fit}</h2>
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
                <h2 className="font-display text-2xl font-extrabold uppercase leading-none text-foreground">{t.notFit}</h2>
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
                    <h3 className="mt-2 font-display text-2xl font-extrabold uppercase leading-none text-foreground">
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
                <h2 className="font-display text-2xl font-extrabold uppercase leading-none text-foreground">{t.timeline}</h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.timeline}</p>
              </div>
              <div className="card">
                <h2 className="font-display text-2xl font-extrabold uppercase leading-none text-foreground">{t.price}</h2>
                {tiers.length > 0 ? (
                  <>
                    <dl className={`mt-3 grid gap-3 ${tiers.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                      {tiers.map((tier) => (
                        <div key={tier.name}>
                          <dt className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-foreground">{tier.name}</dt>
                          <dd className="mt-1 font-semibold text-foreground">{tier.range}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-4 text-xs text-muted">{t.priceNote}</p>
                  </>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{d.priceNote}</p>
                )}
              </div>
            </section>
          </Reveal>

          {/* Casos reales. Hospital Capilar lleva "Con Growth4U" en su etiqueta. */}
          {casos.length > 0 && (
            <Reveal>
              <section className="-mx-5 bg-ink px-5 py-10 text-background sm:mx-0 sm:px-8 sm:py-10">
                <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95]">{t.cases}</h2>
                <ul className="mt-8 flex flex-col gap-px bg-background/15">
                  {casos.map(({ ficha, slug: cs, hasVideo }) => (
                    <li key={cs} className="bg-ink py-7 first:pt-0">
                      <p className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-background/60">
                        {ficha.sector}
                      </p>
                      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <h3 className="font-display text-3xl font-extrabold uppercase leading-none">{ficha.client}</h3>
                          <p className="mt-1 text-sm font-medium text-accent">{ficha.tag}</p>
                        </div>
                        <p className="sm:text-right">
                          <span className="block font-display text-4xl font-extrabold tabular-nums text-accent">{ficha.metric}</span>
                          <span className="block max-w-[26ch] text-sm text-background/70">{ficha.metricLabel}</span>
                        </p>
                      </div>
                      {d.caseFocus?.[ficha.client as CaseClient] ? (
                        <div className="mt-5">
                          <h4 className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-background">{t.focus}</h4>
                          <p className="measure mt-1.5 text-sm leading-relaxed text-background/75">
                            {d.caseFocus[ficha.client as CaseClient]}
                          </p>
                        </div>
                      ) : (
                        <div className="mt-5 grid gap-5 md:grid-cols-2">
                          <div>
                            <h4 className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-background">{t.challenge}</h4>
                            <p className="mt-1.5 text-sm leading-relaxed text-background/75">{ficha.challenge}</p>
                          </div>
                          <div>
                            <h4 className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-background">{t.solution}</h4>
                            <p className="mt-1.5 text-sm leading-relaxed text-background/75">{ficha.solution}</p>
                          </div>
                        </div>
                      )}
                      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                        <Link
                          href={href(`/casos-de-exito/${cs}`)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-accent decoration-[3px] underline-offset-4 hover:text-accent"
                        >
                          {t.readCase}
                          <ArrowRight size={15} />
                        </Link>
                        {hasVideo && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.06em] text-background/70">
                            <Play size={11} aria-hidden className="fill-current" />
                            {t.caseVideo}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          <Reveal>
            <section>
              <SectionTitle>{t.faq}</SectionTitle>
              <div className="mt-6 flex flex-col divide-y divide-ink border-y-2 border-ink">
                {d.faqs.map((f) => (
                  <div key={f.q} className="py-5">
                    <h3 className="text-lg font-semibold text-foreground">{f.q}</h3>
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
                        <h3 className="font-semibold text-foreground group-hover:text-accent-text">
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

          <nav aria-label={t.others}>
            <h2 className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-foreground">{t.others}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {otros.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={href(`/servicios/${o.slug}`)}
                    className="inline-flex items-center gap-1 border border-border bg-white px-3.5 py-1.5 text-sm font-semibold text-foreground hover:border-ink hover:bg-accent"
                  >
                    {o.title}
                    {SERVICIO_VIDEO[o.slug] && <Play size={11} aria-hidden className="fill-current text-muted" />}
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
