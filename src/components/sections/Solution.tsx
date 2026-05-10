"use client";

import { m } from "framer-motion";

const flow = [
  { step: "01", label: "Lead entra", icon: "↓" },
  { step: "02", label: "Se cualifica solo", icon: "⚡" },
  { step: "03", label: "Respuesta inmediata", icon: "✉" },
  { step: "04", label: "Tu equipo actua", icon: "→" },
];

export function Solution() {
  return (
    <section>
      <div className="section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="tag">La solucion</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground leading-tight">
              Un sistema, no una herramienta.
            </h2>
            <p className="text-lg text-foreground-muted leading-relaxed">
              Diseno el proceso completo: captacion, cualificacion automatica, propuesta y seguimiento.
              Sin que tengas que perseguir a nadie.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute left-[22px] top-10 bottom-10 w-px bg-gradient-to-b from-accent/30 via-accent/10 to-transparent hidden sm:block" />

            <div className="flex flex-col gap-3">
              {flow.map((f, i) => (
                <m.div
                  key={f.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-full bg-background border border-accent/30 flex items-center justify-center text-accent font-mono text-base shrink-0 z-10">
                    {f.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-accent/60">{f.step}</span>
                    <h3 className="font-semibold text-foreground">{f.label}</h3>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
