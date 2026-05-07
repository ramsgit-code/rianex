"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const included = [
  "Analisis de tu proceso comercial actual",
  "Identificacion de los puntos de fuga de leads",
  "Recomendacion del sistema que necesitas",
  "Estimacion de tiempo e inversion",
];

export function FinalCTA() {
  return (
    <section>
      <div className="section">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-surface border border-border rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left */}
            <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-border">
              <span className="tag mb-6 inline-block">Diagnostico gratuito</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                ¿Tu proceso comercial podria{" "}
                <span className="text-accent">funcionar sin ti encima?</span>
              </h2>
              <p className="text-foreground-muted leading-relaxed mb-8">
                En 30 minutos analizo tu situacion actual y te digo exactamente
                que sistema necesitas y si tiene sentido que trabajemos juntos.
              </p>
              <Link href="/diagnostico" className="btn-primary text-base px-8 py-3.5 inline-flex">
                Solicita tu diagnostico gratuito
                <ArrowRight size={18} />
              </Link>
              <p className="text-xs text-muted mt-4">
                Respondo en menos de 24h. Sin humo, sin pitch agresivo.
              </p>
            </div>

            {/* Right */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <p className="text-sm font-medium text-foreground mb-6">Que incluye el diagnostico:</p>
              <ul className="flex flex-col gap-4">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={16} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground-muted leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
