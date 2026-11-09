import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { DiagnosticForm } from "@/components/DiagnosticForm";
import { content } from "@/lib/content";
import { getServicio, type CaseClient } from "@/lib/servicios";
import { SERVICIO_VIDEO } from "@/lib/servicio-media";
import { CASOS, casoSlug } from "@/lib/casos";
import { LANDINGS } from "@/lib/landings";
import { home } from "@/lib/home";
import { RAMIRO } from "@/lib/seo";

// Landing de campaña (/l/<slug>). Componente de servidor: el texto va en el
// HTML. Una sola acción, el formulario de la consultoría gratuita, al que
// apuntan todos los botones (#formulario). Sin menú ni pie de la web.
//
// Orden: titular con lo que consigues y vídeo (o el ejemplo paso a paso) →
// prueba en banda grafito → es para ti si → así funciona → qué incluye y cómo
// empezamos → casos → formulario → preguntas → cierre amarillo.

const FLOW_BAR = ["bg-stop", "bg-accent", "bg-accent", "bg-go"];

// Logos claros para la banda grafito. Solo casos propios (Hospital Capilar es
// de Growth4U y no va en logos).
const LOGOS_CLAROS = [
  { src: "/logos/eventos-barcelona.png", alt: "Eventos Barcelona", w: 435, h: 117, cls: "h-7" },
  { src: "/logos/tribeca.png", alt: "Tribeca Media", w: 800, h: 800, cls: "h-9" },
  { src: "/logos/growth4u.png", alt: "Growth4U", w: 339, h: 64, cls: "h-4" },
];

const CONSULTORIA = [
  "Dónde se te escapan clientes, citas u horas",
  "Qué resultado conseguir primero y cuánto vale",
  "Qué haría falta, con las herramientas que ya usas",
  "Si no compensa, te lo decimos",
];

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-balance font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl ${className}`}>
      {children}
    </h2>
  );
}

function CtaButton({ className = "", tape = false }: { className?: string; tape?: boolean }) {
  return (
    <a href="#formulario" className={`${tape ? "btn-tape" : "btn-primary"} ${className}`}>
      Pide tu consultoría gratuita
      <ArrowDown size={17} aria-hidden />
    </a>
  );
}

export function LandingView({ slug }: { slug: string }) {
  const c = content.es;
  const l = LANDINGS[slug];
  const base = c.servicios.items.find((i) => i.slug === slug)!;
  const d = getServicio(slug, "es")!;
  const video = SERVICIO_VIDEO[slug];
  const proof = home.es.hero;

  const casos = d.cases
    .map((client) => {
      const ficha = c.cases.items.find((i) => i.client === client);
      const cs = casoSlug(client);
      if (!ficha || !cs) return null;
      return { ficha, slug: cs, focus: d.caseFocus?.[client as CaseClient] };
    })
    .filter((x) => x !== null);

  const flowList = (
    <ol className="flex flex-col gap-3">
      {d.flow.map((f, i) => (
        <li key={f.label} className="flex border border-border bg-white">
          <span aria-hidden className={`w-2 shrink-0 ${FLOW_BAR[i] ?? "bg-accent"}`} />
          <div className="px-4 py-3">
            <p className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-foreground">
              <span className="font-mono text-xs font-medium text-accent-text">0{i + 1}</span> {f.label}
            </p>
            <p className="mt-1 text-[15px] leading-relaxed text-foreground-muted">{f.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="bg-background">
      {/* Cabecera mínima: marca y un solo botón */}
      <header className="border-b-[6px] border-accent bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Image
            src="/logos/rianex-mark-dark.png"
            alt="Rianex"
            width={1145}
            height={253}
            sizes="130px"
            priority
            className="h-5 w-auto sm:h-[22px]"
          />
          <a href="#formulario" className="btn-tape min-h-[2.5rem] px-4 py-2 text-sm">
            Consultoría gratuita
            <ArrowRight size={15} aria-hidden />
          </a>
        </div>
      </header>

      {/* Titular y vídeo (o el ejemplo paso a paso si no hay vídeo) */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 pb-14 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className="lg:col-span-6">
          <h1 className="text-balance font-display text-[clamp(2.6rem,9vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.01em] text-foreground">
            {l.h1}
          </h1>
          <p className="measure mt-6 text-pretty text-lg leading-relaxed text-foreground-muted">{l.lead}</p>
          <ul className="mt-7 flex flex-col gap-3">
            {d.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-3 text-[17px] font-medium leading-snug text-foreground">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-go text-white">
                  <Check size={14} aria-hidden />
                </span>
                {o}
              </li>
            ))}
          </ul>
          <CtaButton className="mt-9" />
          <p className="mt-3 text-sm text-muted">30 minutos · Gratis · Sin compromiso</p>
        </div>
        <div className="lg:col-span-6 lg:pt-8">
          {video ? (
            <>
              <video
                controls
                playsInline
                preload="none"
                poster={video.poster}
                className="aspect-video w-full border border-ink bg-ink"
              >
                <source src={video.src} type="video/mp4" />
              </video>
              <p className="mt-2 text-xs text-muted">
                {video.demo ? "Demo con una llamada recreada en una clínica ficticia." : "El servicio en un minuto."}
              </p>
            </>
          ) : (
            <div className="border-2 border-ink bg-background p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-xl font-extrabold uppercase">Así funciona</p>
                <span className="data-tag">Ejemplo ilustrativo</span>
              </div>
              <div className="mt-4">{flowList}</div>
            </div>
          )}
        </div>
      </section>

      {/* Prueba: casos del servicio o, si no tiene, el resultado de Eventos Barcelona */}
      <section className="bg-ink text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:gap-12 lg:px-12">
          <dl className="flex flex-col gap-5 sm:flex-row sm:gap-10">
            {casos.length > 0
              ? casos.slice(0, 2).map(({ ficha }) => (
                  <div key={ficha.client} className="flex items-baseline gap-3">
                    <dt className="font-display text-4xl font-extrabold tabular-nums text-accent">{ficha.metric}</dt>
                    <dd className="max-w-[18rem] text-sm leading-snug text-background/80">
                      {ficha.metricLabel}{" "}
                      <span className="font-semibold text-background">
                        · {ficha.client}
                        {ficha.client === "Hospital Capilar" ? " (con Growth4U)" : ""}
                      </span>
                    </dd>
                  </div>
                ))
              : proof.proof.map((p) => (
                  <div key={p.metric} className="flex items-baseline gap-3">
                    <dt className="font-display text-4xl font-extrabold tabular-nums text-accent">{p.metric}</dt>
                    <dd className="max-w-[16rem] text-sm leading-snug text-background/80">
                      {p.label} <span className="font-semibold text-background">· {proof.proofClient}</span>
                    </dd>
                  </div>
                ))}
          </dl>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-background/15 pt-5 lg:ml-auto lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {LOGOS_CLAROS.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.w}
                height={logo.h}
                className={`${logo.cls} w-auto object-contain opacity-75`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Es para ti si */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <H2>Es para ti si…</H2>
        <ul className={`mt-8 grid grid-cols-1 gap-4 ${d.fit.length % 3 === 0 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {d.fit.map((x) => (
            <li key={x} className="card flex items-start gap-3">
              <Check size={18} className="mt-0.5 shrink-0 text-go-text" aria-hidden />
              <span className="leading-relaxed text-foreground">{x}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-foreground-muted">
          <span className="font-semibold text-foreground">El problema:</span> {base.problem}
        </p>
      </section>

      {/* Así funciona (en el titular si no hay vídeo) */}
      {video && (
        <section className="bg-white">
          <div className="tape" />
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <H2>Así funciona</H2>
              <span className="data-tag">Ejemplo ilustrativo</span>
            </div>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {d.flow.map((f, i) => (
                <li key={f.label} className="flex flex-col border border-border bg-background">
                  <span aria-hidden className={`block h-2 w-full ${FLOW_BAR[i] ?? "bg-accent"}`} />
                  <div className="p-5">
                    <p className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-foreground">
                      <span className="font-mono text-xs font-medium text-accent-text">0{i + 1}</span> {f.label}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{f.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Qué incluye y cómo empezamos */}
      <section className={video ? "" : "bg-white"}>
        <div className="tape" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:px-12">
          <div>
            <H2>Qué incluye</H2>
            <ul className="mt-7 flex flex-col gap-3">
              {base.deliverables.map((x) => (
                <li key={x} className="flex items-start gap-3 text-[17px] text-foreground">
                  <span className="mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center bg-go text-white">
                    <Check size={11} aria-hidden />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <H2>Cómo empezamos</H2>
            <ol className="mt-7 flex flex-col">
              {[
                { t: "Consultoría gratuita", d: "30 minutos: vemos tu proceso y te decimos qué conseguirías, cuánto vale y si compensa." },
                { t: "Propuesta por escrito", d: "El objetivo, cómo lo vamos a conseguir, el plazo y el precio, antes de empezar." },
                { t: "Puesta en marcha", d: d.timeline },
              ].map((s, i) => (
                <li key={s.t} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t-2 border-ink py-4 last:border-b-2">
                  <span className="font-display text-3xl font-extrabold leading-none text-accent-text">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-foreground">{s.t}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-foreground-muted">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Casos reales del servicio */}
      {casos.length > 0 && (
        <section className="bg-ink text-background">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
            <H2>{casos.length > 1 ? "Casos reales" : "Caso real"}</H2>
            <ul className={`mt-8 grid grid-cols-1 gap-px bg-background/15 ${casos.length > 1 ? "lg:grid-cols-2" : "max-w-3xl"}`}>
              {casos.map(({ ficha, slug: cs, focus }) => (
                <li key={cs} className="flex flex-col bg-ink py-6 lg:px-6 lg:first:pl-0">
                  <p className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-background/60">{ficha.sector}</p>
                  <p className="mt-2 font-display text-3xl font-extrabold uppercase leading-none">{ficha.client}</p>
                  <p className="mt-1 text-sm font-medium text-accent">{ficha.tag}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-background/80">{focus ?? ficha.solution}</p>
                  <p className="mt-5">
                    <span className="font-display text-4xl font-extrabold tabular-nums text-accent">{ficha.metric}</span>{" "}
                    <span className="text-sm text-background/70">{ficha.metricLabel}</span>
                  </p>
                  {CASOS[cs] && (
                    <Link
                      href={`/casos-de-exito/${cs}`}
                      className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold underline decoration-accent decoration-[3px] underline-offset-4 hover:text-accent"
                    >
                      Leer el caso completo
                      <ArrowRight size={15} aria-hidden />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Formulario: la única acción de la página */}
      <section id="formulario" className="scroll-mt-4">
        <div className="tape" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <H2>Pide tu consultoría gratuita</H2>
            <p className="measure mt-5 text-pretty text-lg leading-relaxed text-foreground-muted">
              30 minutos para revisar tu proceso. Te llevas un plan concreto aunque no trabajemos juntos.
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {CONSULTORIA.map((x) => (
                <li key={x} className="flex items-start gap-3 text-[16px] font-medium text-foreground">
                  <Check size={18} className="mt-0.5 shrink-0 text-go-text" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex items-center gap-4 border-t-2 border-ink pt-6">
              <Image
                src={RAMIRO.photo}
                alt={RAMIRO.name}
                width={200}
                height={200}
                className="h-16 w-16 border border-ink object-cover"
              />
              <p className="text-sm leading-relaxed text-foreground-muted">
                <span className="block font-semibold text-foreground">Te atiende {RAMIRO.name}</span>
                Ingeniero industrial, al frente de Rianex.
              </p>
            </div>
          </div>
          <div className="card lg:col-span-7">
            <DiagnosticForm landing={slug} />
          </div>
        </div>
      </section>

      {/* Preguntas */}
      <section className="bg-white">
        <div className="tape" />
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
          <H2>Preguntas frecuentes</H2>
          <div className="mt-8 flex flex-col divide-y divide-ink border-y-2 border-ink">
            {d.faqs.slice(0, 4).map((f) => (
              <div key={f.q} className="py-5">
                <h3 className="text-lg font-semibold text-foreground">{f.q}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="bg-accent text-ink">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <p className="text-balance font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold uppercase leading-[0.9]">
            ¿Lo vemos en 30 minutos?
          </p>
          <CtaButton />
        </div>
      </section>

      <footer className="bg-ink text-background/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} Rianex · Agencia de automatización con IA · hola@rianex.es</p>
          <div className="flex gap-5">
            <Link href="/privacidad" className="hover:text-accent">Política de privacidad</Link>
            <Link href="/cookies" className="hover:text-accent">Política de cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
