"use client";

import { m } from "framer-motion";
import { TrendingUp, Clock, Zap, Award } from "lucide-react";

const metrics = [
  { icon: TrendingUp, value: "+60%", label: "Mejora en tiempo de respuesta", sub: "Media de clientes activos" },
  { icon: Clock,      value: "8 min", label: "De llamada a propuesta",        sub: "Antes: 2 dias" },
  { icon: Zap,        value: "24/7",  label: "Cobertura con voice AI",        sub: "Vapi + Retell" },
  { icon: Award,      value: "3",     label: "Sistemas en produccion",        sub: "Espana" },
];

const testimonials = [
  {
    quote: "Antes tardabamos 2 dias en enviar una propuesta. Ahora tarda 8 minutos y la recibe el cliente mejor presentada.",
    author: "Director comercial",
    company: "Empresa de eventos · Barcelona",
    initials: "DC",
  },
  {
    quote: "El equipo solo habla con quien tiene intencion real de compra. Redujo el ruido en el pipeline al 80%.",
    author: "Gerente comercial",
    company: "Clinica capilar · Madrid",
    initials: "GC",
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
          className="mb-14 max-w-2xl"
        >
          <span className="tag">Resultados</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Numeros, no promesas.
          </h2>
        </m.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mb-16">
          {metrics.map((item, i) => {
            const Icon = item.icon;
            return (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-background p-6 md:p-8 flex flex-col"
              >
                <Icon size={18} className="text-accent mb-4 opacity-70" />
                <p className="text-4xl md:text-5xl font-bold text-foreground leading-none mb-3 tracking-tight tabular-nums">
                  {item.value}
                </p>
                <p className="text-sm font-medium text-foreground-muted leading-snug mb-1">{item.label}</p>
                <p className="text-xs text-muted font-mono">{item.sub}</p>
              </m.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-background border border-border rounded-2xl p-8 flex flex-col hover:border-accent/30 transition-colors"
            >
              <div className="text-accent text-2xl font-serif leading-none mb-4 opacity-60">"</div>
              <p className="text-foreground leading-relaxed mb-8 text-[15px] flex-1">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-mono text-xs font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{t.author}</p>
                  <p className="text-xs text-muted">{t.company}</p>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
