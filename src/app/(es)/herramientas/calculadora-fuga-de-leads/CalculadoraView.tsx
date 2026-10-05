import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { CalculadoraFuga } from "@/components/CalculadoraFuga";
import { localizePath, type Lang } from "@/lib/i18n";
import { getPost } from "@/lib/blog";
import { RAMIRO, SITE_URL } from "@/lib/seo";

// Pagina de la calculadora. La herramienta es interactiva, pero la formula,
// los supuestos y las preguntas van en el HTML del servidor: es lo que leen
// Google y los asistentes de IA, y lo que hace la pagina citable.

export const CALCULADORA_PATH = "/herramientas/calculadora-fuga-de-leads";

export const CALCULADORA_COPY = {
  es: {
    seoTitle: "Calculadora de fuga de leads: cuánto pierdes al año",
    metaDescription:
      "Calcula gratis cuánto dinero pierdes al año por los leads que no llegan a una conversación y por el trabajo comercial manual. Sin registro, en el navegador.",
    tag: "Herramienta gratuita",
    h1: "Calculadora de fuga de leads",
    description:
      "Cuánto dinero se te escapa al año por los contactos que nadie atiende a tiempo, y cuánto cuesta el trabajo manual que los persigue. Sin registro: la cuenta se hace en tu navegador.",
    howTitle: "Cómo se calcula",
    how: [
      "Ventas perdidas al año = leads al mes × 12 × % de fuga × % de cierre × ticket medio.",
      "Coste del trabajo manual al año = veces a la semana × 52 × minutos ÷ 60 × coste por hora.",
      "Cada 10 puntos de fuga = leads al año × 10% × % de cierre × ticket medio. Es lo que vale reducir la fuga, por ejemplo, del 40% al 30%.",
    ],
    defaultsTitle: "De dónde salen los valores por defecto",
    defaults:
      "Son un ejemplo para que veas cómo funciona: cámbialos por los tuyos. El 30% de fuga es el extremo bajo de lo habitual en procesos comerciales sin sistema, que suele estar entre el 30% y el 60%. Si no conoces tu fuga, cuenta cuántos contactos del último mes no llegaron a hablar con nadie.",
    whyTitle: "Por qué la fuga pesa más que las horas",
    why:
      "En los procesos comerciales, el dinero no está en las horas que se ahorran, sino en lo que se deja de perder: el contacto que no recibe respuesta a tiempo se va con otro, y la propuesta que sale tres días tarde llega cuando el cliente ya ha decidido. Por eso la cifra de la fuga suele ser bastante mayor que la del trabajo manual, y es la que decide si automatizar compensa.",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Qué es la fuga de leads?",
        a: "Los contactos que muestran interés —un formulario, un WhatsApp, una llamada— y nunca llegan a una conversación real con tu equipo. No aparecen en ningún informe porque nadie los trabajó, y por eso casi nadie sabe cuántos son.",
      },
      {
        q: "¿Cómo reduzco la fuga?",
        a: "Respondiendo a cada contacto en el momento, venga por donde venga, y con una lista clara de quién está pendiente. La respuesta inmediata y el seguimiento automático por correo y WhatsApp recuperan buena parte de lo que se escapa; la cualificación hace que el equipo dedique su tiempo a quien de verdad va a comprar.",
      },
      {
        q: "¿Se guardan los datos que meto?",
        a: "No. La cuenta se hace en tu navegador y los números no salen de él. Solo se registra, si aceptas la analítica, que alguien usó la calculadora.",
      },
    ],
    guides: "Para profundizar",
    servicesLink: "Embudos de captación y cualificación",
    servicesText: "El servicio que ataca la fuga: respuesta inmediata, scoring y seguimiento.",
    home: "Inicio",
  },
  en: {
    seoTitle: "Lead leakage calculator: what you lose per year",
    metaDescription:
      "Work out for free how much money you lose each year to leads that never reach a conversation and to manual sales work. No sign-up, runs in your browser.",
    tag: "Free tool",
    h1: "Lead leakage calculator",
    description:
      "How much money slips away each year from contacts nobody answers in time, and what the manual work chasing them costs. No sign-up: the maths runs in your browser.",
    howTitle: "How it is calculated",
    how: [
      "Sales lost per year = leads per month × 12 × % leakage × % close rate × average deal value.",
      "Manual work cost per year = times per week × 52 × minutes ÷ 60 × hourly cost.",
      "Every 10 points of leakage = leads per year × 10% × % close rate × average deal value. It is what cutting leakage from, say, 40% to 30% is worth.",
    ],
    defaultsTitle: "Where the default values come from",
    defaults:
      "They are an example so you can see how it works: replace them with yours. The 30% leakage is the low end of what is usual in sales processes without a system, typically 30% to 60%. If you do not know your leakage, count how many contacts last month never got to talk to anyone.",
    whyTitle: "Why leakage outweighs the hours",
    why:
      "In sales processes the money is not in the hours saved but in what stops being lost: a contact who does not get a timely reply goes elsewhere, and a proposal sent three days late arrives after the client has decided. That is why the leakage figure is usually much larger than the manual work one, and it is what decides whether automating pays off.",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "What is lead leakage?",
        a: "Contacts who show interest —a form, a WhatsApp message, a call— and never reach a real conversation with your team. They do not appear in any report because nobody worked them, which is why almost nobody knows how many there are.",
      },
      {
        q: "How do I reduce leakage?",
        a: "By answering every contact straight away, whatever the channel, with a clear list of who is pending. Instant response and automatic email and WhatsApp follow-up recover much of what slips away; qualification makes the team spend its time on people who will actually buy.",
      },
      {
        q: "Is the data I enter stored?",
        a: "No. The maths runs in your browser and the numbers never leave it. If you accept analytics, the only thing recorded is that someone used the calculator.",
      },
    ],
    guides: "Go deeper (in Spanish)",
    servicesLink: "Lead capture and qualification funnels",
    servicesText: "The service that tackles leakage: instant response, scoring and follow-up.",
    home: "Home",
  },
} as const;

const POSTS = [
  "cuanto-cuesta-automatizar-un-proceso-con-ia",
  "como-cualificar-leads-automaticamente",
  "automatizar-procesos-con-ia-por-donde-empezar",
];

export function CalculadoraView({ lang }: { lang: Lang }) {
  const t = CALCULADORA_COPY[lang];
  const href = (p: string) => localizePath(p, lang);
  const pageUrl = `${SITE_URL}${href(CALCULADORA_PATH)}`;
  const posts = POSTS.map((s) => getPost(s)).filter((p) => p !== null);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: t.h1,
      description: t.metaDescription,
      url: pageUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      inLanguage: lang === "es" ? "es-ES" : "en",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      creator: { "@type": "Person", name: RAMIRO.name, sameAs: [RAMIRO.linkedin] },
      provider: { "@type": "ProfessionalService", name: "Rianex", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faqs.map((f) => ({
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
        { "@type": "ListItem", position: 2, name: t.h1, item: pageUrl },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
      <PageShell tag={t.tag} title={t.h1} description={t.description} wide>
        <div className="flex flex-col gap-16">
          <CalculadoraFuga lang={lang} />

          <Reveal>
            <section className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">{t.howTitle}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {t.how.map((x) => (
                    <li key={x} className="font-mono text-[13px] leading-relaxed text-foreground-muted">{x}</li>
                  ))}
                </ul>
                <h2 className="mt-8 font-display text-xl font-semibold tracking-tight text-foreground">{t.defaultsTitle}</h2>
                <p className="mt-3 leading-relaxed text-foreground-muted">{t.defaults}</p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">{t.whyTitle}</h2>
                <p className="mt-4 leading-relaxed text-foreground-muted">{t.why}</p>
                <Link
                  href={href("/servicios/embudo-de-captacion")}
                  className="card group mt-6 block"
                >
                  <span className="font-display font-semibold text-foreground group-hover:text-accent-text">
                    {t.servicesLink} <ArrowRight size={15} className="inline" />
                  </span>
                  <span className="mt-1 block text-sm text-foreground-muted">{t.servicesText}</span>
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">{t.faqTitle}</h2>
              <div className="mt-6 flex flex-col divide-y divide-ink/[0.08] border-y border-ink/[0.08]">
                {t.faqs.map((f) => (
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
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">{t.guides}</h2>
                <ul className="mt-5 grid gap-4 md:grid-cols-3">
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="card group block h-full">
                        <h3 className="font-display font-semibold text-foreground group-hover:text-accent-text">{p.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{p.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}
        </div>
      </PageShell>
    </>
  );
}
