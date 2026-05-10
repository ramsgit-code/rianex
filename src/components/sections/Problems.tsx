"use client";

import { m } from "framer-motion";

const problems = [
  "Leads que llegan y no convierten",
  "Seguimiento que depende de que alguien se acuerde",
  "Propuestas que tardan dias",
  "CRM que nadie mira",
  "WhatsApp sin sistema ni historial",
  "La competencia responde antes que tu",
];

export function Problems() {
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
          <span className="tag">El problema</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground max-w-xl leading-tight">
            Si reconoces alguno de estos, necesitas un sistema.
          </h2>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {problems.map((p, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="bg-background border border-border rounded-xl px-5 py-4 flex items-center gap-3"
            >
              <span className="text-red-400/70 text-sm shrink-0">✕</span>
              <p className="text-sm font-medium text-foreground-muted leading-snug">{p}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
