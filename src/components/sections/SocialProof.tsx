"use client";

import { m } from "framer-motion";

const metrics = [
  { value: "3", label: "empresas con sistemas activos" },
  { value: "+60%", label: "mejora media en tiempo de respuesta" },
  { value: "2–4 sem", label: "tiempo medio de implementacion" },
  { value: "30 dias", label: "soporte incluido tras la entrega" },
];

const testimonials = [
  {
    quote:
      "Antes tardabamos 2 dias en enviar una propuesta. Ahora tarda 8 minutos y la recibe el cliente mejor presentada que antes.",
    author: "Director comercial",
    company: "Empresa de eventos",
  },
  {
    quote:
      "Redujo el ruido de leads malos en el pipeline. Ahora el equipo solo habla con quien tiene intencion real de compra.",
    author: "Gerente comercial",
    company: "Clinica capilar",
  },
];

export function SocialProof() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="section">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="tag">Lo que dicen</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Resultados que puedes medir.
          </h2>
        </m.div>

        {/* Metrics row */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {metrics.map((m_item, i) => (
            <div key={i} className="bg-background border border-border rounded-xl p-5">
              <p className="text-3xl font-bold text-accent leading-none mb-1">{m_item.value}</p>
              <p className="text-xs text-muted leading-snug">{m_item.label}</p>
            </div>
          ))}
        </m.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card"
            >
              <p className="text-accent text-4xl font-serif leading-none mb-4">"</p>
              <p className="text-foreground-muted leading-relaxed mb-6 text-[15px]">{t.quote}</p>
              <div>
                <p className="text-sm font-medium text-foreground">{t.author}</p>
                <p className="text-xs text-muted">{t.company}</p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
