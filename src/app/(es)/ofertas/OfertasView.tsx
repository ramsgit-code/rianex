import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { localizePath, type Lang } from "@/lib/i18n";
import { ORGANIZATION_ID, SITE_URL } from "@/lib/seo";
import {
  LINEAS,
  ofertasDeLinea,
  precioCuota,
  precioProyecto,
  rotuloPrecio,
  type Oferta,
  type ProofKind,
} from "@/lib/ofertas";

// Pagina de ofertas cerradas. Componente de servidor a proposito: precios,
// plazos y pruebas tienen que estar en el HTML que leen los rastreadores y
// los asistentes de IA. Cada oferta lleva su ancla (#slug) para enlazarla
// desde otras paginas.

const LABELS = {
  es: {
    home: "Inicio",
    tag: "Ofertas",
    title: "Ofertas cerradas",
    description:
      "Ocho trabajos con lo que entregamos, cuánto tardamos y desde cuánto cuesta, cada uno con la prueba que lo respalda.",
    answer: "En resumen",
    answerText:
      "Ocho ofertas con alcance, plazo y precio de partida publicados, agrupadas en nuestras cuatro líneas de trabajo. Todos los precios son sin IVA. El precio exacto lo cerramos por escrito tras la consultoría gratuita de 30 minutos, antes de empezar.",
    index: "Ir a una oferta",
    forWho: "Para quién",
    problem: "El problema",
    deliverables: "Qué entregamos",
    timeline: "Plazo",
    price: "Precio",
    monthly: "Cuota mensual",
    proof: { caso: "Caso real", propio: "Lo usamos nosotros", fundador: "Quién lo hace" } as Record<ProofKind, string>,
    cta: "Pedir esta oferta",
    closingTitle: "Si tu caso no encaja en ninguna",
    closingText:
      "Estas ocho tienen alcance y precio publicados; lo demás lo presupuestamos a medida. En la consultoría gratuita vemos tu proceso y te decimos qué haríamos, en cuánto tiempo y por cuánto.",
    closingCta: "Pide tu consultoría gratuita",
    services: "Ver todos los servicios",
    catalog: "Ofertas cerradas de Rianex",
  },
  en: {
    home: "Home",
    tag: "Offers",
    title: "Fixed-price offers",
    description:
      "Eight pieces of work with what we deliver, how long it takes and the starting price, each with the proof behind it.",
    answer: "In short",
    answerText:
      "Eight offers with published scope, timeline and starting price, grouped under our four lines of work. All prices exclude VAT. We confirm the exact price in writing after the free 30-minute consultation, before any work starts.",
    index: "Jump to an offer",
    forWho: "Who it is for",
    problem: "The problem",
    deliverables: "What we deliver",
    timeline: "Timeline",
    price: "Price",
    monthly: "Monthly fee",
    proof: { caso: "Real case", propio: "We use it ourselves", fundador: "Who builds it" } as Record<ProofKind, string>,
    cta: "Ask for this offer",
    closingTitle: "If your case fits none of them",
    closingText:
      "These eight have published scope and prices; anything else we quote case by case. In the free consultation we look at your process and tell you what we would do, how long it would take and what it would cost.",
    closingCta: "Book your free consultation",
    services: "See all services",
    catalog: "Rianex fixed-price offers",
  },
} as const;

function precioSchema(o: Oferta) {
  const specs: Record<string, unknown>[] = [
    {
      "@type": "PriceSpecification",
      ...(o.price.from ? { minPrice: o.price.amount } : { price: o.price.amount }),
      priceCurrency: "EUR",
      valueAddedTaxIncluded: false,
    },
  ];
  if (o.monthly) {
    specs.push({
      "@type": "UnitPriceSpecification",
      ...(o.monthly.from ? { minPrice: o.monthly.amount } : { price: o.monthly.amount }),
      priceCurrency: "EUR",
      unitCode: "MON",
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
      valueAddedTaxIncluded: false,
    });
  }
  return specs;
}

function buildJsonLd(lang: Lang) {
  const t = LABELS[lang];
  const pre = `${SITE_URL}${lang === "en" ? "/en" : ""}`;
  const url = `${pre}/ofertas`;
  const provider = { "@type": "ProfessionalService", "@id": ORGANIZATION_ID, name: "Rianex", url: SITE_URL };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: pre || SITE_URL },
      { "@type": "ListItem", position: 2, name: t.title, item: url },
    ],
  };

  const catalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${url}#catalogo`,
    name: t.catalog,
    url,
    inLanguage: lang === "en" ? "en" : "es-ES",
    itemListElement: LINEAS.map((linea) => ({
      "@type": "OfferCatalog",
      name: linea[lang].name,
      description: linea[lang].summary,
      itemListElement: ofertasDeLinea(linea.id).map((o) => {
        const copy = o[lang];
        return {
          "@type": "Offer",
          "@id": `${url}#${o.slug}`,
          url: `${url}#${o.slug}`,
          name: copy.name,
          description: copy.problem,
          priceCurrency: "EUR",
          ...(o.price.from ? {} : { price: o.price.amount }),
          priceSpecification: precioSchema(o),
          offeredBy: { "@id": ORGANIZATION_ID },
          itemOffered: {
            "@type": "Service",
            name: copy.name,
            description: copy.problem,
            audience: { "@type": "BusinessAudience", audienceType: copy.forWho },
            serviceType: linea[lang].name,
            areaServed: ["ES", "Latinoamérica"],
            provider,
          },
        };
      }),
    })),
  };

  return [breadcrumb, catalog];
}

function SmallTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-foreground">{children}</h4>
  );
}

function OfertaCard({ o, lang }: { o: Oferta; lang: Lang }) {
  const t = LABELS[lang];
  const copy = o[lang];
  const href = (path: string) => localizePath(path, lang);
  const cuota = precioCuota(o, lang);

  return (
    <article
      id={o.slug}
      className="grid scroll-mt-28 border-2 border-ink bg-white md:grid-cols-[1.5fr_1fr]"
    >
      <div className="flex flex-col p-6 sm:p-8">
        <h3 className="font-display text-3xl font-extrabold uppercase leading-[0.95] text-foreground">
          <a href={`#${o.slug}`} className="hover:text-accent-text">
            {copy.name}
          </a>
        </h3>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <SmallTitle>{t.forWho}</SmallTitle>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{copy.forWho}</p>
          </div>
          <div>
            <SmallTitle>{t.problem}</SmallTitle>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{copy.problem}</p>
          </div>
        </div>

        <div className="mt-6">
          <SmallTitle>{t.deliverables}</SmallTitle>
          <ul className="mt-3 flex flex-col gap-2.5">
            {copy.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-foreground">
                <span className="mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center bg-go text-white">
                  <Check size={10} aria-hidden />
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="flex flex-col border-t-2 border-ink bg-background p-6 sm:p-8 md:border-l-2 md:border-t-0">
        <dl className="grid gap-5">
          <div>
            <dt className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-foreground">
              {t.timeline}
            </dt>
            <dd className="mt-1 text-lg font-semibold text-foreground">{copy.timeline}</dd>
          </div>
          <div>
            <dt className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-foreground">
              {o.monthly ? rotuloPrecio(o, lang) : t.price}
            </dt>
            <dd className="mt-1 font-display text-3xl font-extrabold leading-none text-foreground">
              {precioProyecto(o, lang)}
            </dd>
          </div>
          {cuota && (
            <div>
              <dt className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-foreground">
                {t.monthly}
              </dt>
              <dd className="mt-1 text-lg font-semibold text-foreground">{cuota}</dd>
            </div>
          )}
        </dl>

        <div className="mt-6 border-t-2 border-ink pt-5">
          <SmallTitle>{t.proof[o.proofKind]}</SmallTitle>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{copy.proof}</p>
          {copy.links.length > 0 && (
            <ul className="mt-3 flex flex-col gap-1.5">
              {copy.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={href(l.href)}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-text"
                  >
                    {l.label}
                    <ArrowUpRight size={14} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8 md:mt-auto md:pt-8">
          <Link href={href("/diagnostico")} className="btn-tape w-full">
            {t.cta}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </aside>
    </article>
  );
}

export function OfertasView({ lang }: { lang: Lang }) {
  const t = LABELS[lang];
  const href = (path: string) => localizePath(path, lang);

  return (
    <>
      {buildJsonLd(lang).map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
      <PageShell tag={t.tag} title={t.title} description={t.description} wide>
        <div className="flex flex-col gap-16">
          {/* Respuesta directa: lo primero que extrae un buscador o un asistente. */}
          <section className="bg-accent p-6 text-ink sm:p-8">
            <p className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-foreground">
              {t.answer}
            </p>
            <p className="measure mt-3 text-lg leading-relaxed text-foreground">{t.answerText}</p>
          </section>

          {/* Indice: las cuatro lineas con sus ofertas */}
          <nav aria-label={t.index}>
            <p className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-foreground">{t.index}</p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {LINEAS.map((linea) => (
                <div key={linea.id} className="border-t-[6px] border-accent pt-3">
                  <a
                    href={`#${linea.id}`}
                    className="font-display text-lg font-extrabold uppercase leading-none text-foreground hover:text-accent-text"
                  >
                    {linea[lang].name}
                  </a>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {ofertasDeLinea(linea.id).map((o) => (
                      <li key={o.slug}>
                        <a
                          href={`#${o.slug}`}
                          className="text-sm text-foreground-muted underline decoration-border decoration-2 underline-offset-4 hover:text-foreground hover:decoration-accent"
                        >
                          {o[lang].name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {LINEAS.map((linea) => (
            <section key={linea.id} id={linea.id} className="scroll-mt-28">
              <Reveal>
                <div className="tape" aria-hidden />
                <h2 className="mt-6 text-balance font-display text-4xl font-extrabold uppercase leading-[0.95] text-foreground md:text-5xl">
                  {linea[lang].name}
                </h2>
                <p className="measure mt-3 text-lg leading-relaxed text-foreground-muted">{linea[lang].summary}</p>
              </Reveal>
              <div className="mt-8 flex flex-col gap-8">
                {ofertasDeLinea(linea.id).map((o) => (
                  <OfertaCard key={o.slug} o={o} lang={lang} />
                ))}
              </div>
            </section>
          ))}

          <section className="border-2 border-ink bg-white p-6 sm:p-10">
            <h2 className="font-display text-3xl font-extrabold uppercase leading-[0.95] text-foreground md:text-4xl">
              {t.closingTitle}
            </h2>
            <p className="measure mt-4 text-lg leading-relaxed text-foreground-muted">{t.closingText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={href("/diagnostico")} className="btn-tape">
                {t.closingCta}
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href={href("/servicios")} className="btn-secondary">
                {t.services}
              </Link>
            </div>
          </section>
        </div>
      </PageShell>
    </>
  );
}
