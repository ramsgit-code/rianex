import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const stats = [
  { value: "8 min", label: "para enviar una propuesta" },
  { value: "−40%", label: "tiempo en llamadas sin filtro" },
  { value: "24/7", label: "seguimiento automatico" },
];

const clientLogos = [
  { src: "/logos/hospital-capilar.png", alt: "Hospital Capilar", h: "h-9" },
  { src: "/logos/eventos-barcelona.png", alt: "EB Eventos Barcelona", h: "h-9" },
  { src: "/logos/growth4u.png", alt: "Growth4U", h: "h-5" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44">
      {/* glow superior */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />

      <div className="section-wide relative !py-0">
        <Reveal>
          <span className="tag">
            <Sparkles size={12} className="text-accent" />
            Go High Level · Automatizacion comercial con IA
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl">
            Vende mas sin{" "}
            <span className="gradient-text">perseguir leads</span> a mano.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
            Monto tu sistema de captacion, cualificacion y cierre en Go High
            Level. Formularios, WhatsApp y propuestas conectados en un solo
            flujo automatico.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/diagnostico" className="btn-primary">
              Solicitar diagnostico gratuito
              <ArrowRight size={16} />
            </Link>
            <Link href="/servicios" className="btn-secondary">
              Ver los sistemas
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">
            30 min · Sin compromiso · Respuesta en 24h
          </p>
        </Reveal>

        {/* bento de metricas */}
        <Reveal delay={0.2}>
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="card !p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="font-display text-3xl font-semibold tracking-tight text-foreground">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* logos */}
        <Reveal delay={0.25}>
          <div className="mt-14 border-t border-white/[0.08] pt-8">
            <p className="mb-5 text-xs uppercase tracking-wider text-muted">
              Clientes con sistema activo
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
              {clientLogos.map((logo) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.h} w-auto object-contain opacity-60 transition-opacity duration-300 hover:opacity-100`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
