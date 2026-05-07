"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LogoHospitalCapilar } from "@/components/logos/LogoHospitalCapilar";
import { LogoEventosBarcelona } from "@/components/logos/LogoEventosBarcelona";
import { LogoHermetic } from "@/components/logos/LogoHermetic";

const stats = [
  { value: "−40%", label: "tiempo en leads sin cualificar" },
  { value: "8 min", label: "de llamada a propuesta enviada" },
  { value: "0", label: "leads sin respuesta en 24h" },
];

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="section w-full">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <m.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="tag mb-6 inline-block"
          >
            Automatizacion comercial · Go High Level · IA
          </m.span>

          <h1 className="text-5xl md:text-[4.5rem] font-bold leading-[1.04] tracking-tight mb-6 text-foreground">
            Tu proceso comercial,{" "}
            <span className="text-accent">funcionando solo.</span>
          </h1>

          <p className="text-lg text-foreground-muted max-w-xl mb-10 leading-relaxed">
            Diseno sistemas de captacion, cualificacion y cierre de leads
            para negocios que quieren vender mas sin depender de procesos manuales.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-3 mb-12">
            <Link href="/diagnostico" className="btn-primary text-base px-7 py-3.5">
              Solicita tu diagnostico
              <ArrowRight size={16} />
            </Link>
            <Link href="#video" className="btn-secondary text-base px-7 py-3.5">
              Ver como funciona
            </Link>
          </div>

          {/* Results strip */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 pb-12 border-b border-border"
          >
            {stats.map((s) => (
              <div key={s.value} className="flex flex-col">
                <span className="text-2xl font-bold text-accent leading-none">{s.value}</span>
                <span className="text-xs text-muted mt-1">{s.label}</span>
              </div>
            ))}
          </m.div>
        </m.div>

        {/* Social proof logos */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10"
        >
          <p className="text-xs text-muted uppercase tracking-widest mb-6">
            Sistemas implementados en
          </p>
          <div className="flex flex-wrap items-center gap-10">
            <LogoHospitalCapilar className="h-5 w-auto text-foreground opacity-40 hover:opacity-70 transition-opacity" />
            <LogoEventosBarcelona className="h-7 w-auto text-foreground opacity-40 hover:opacity-70 transition-opacity" />
            <LogoHermetic className="h-5 w-auto text-foreground opacity-40 hover:opacity-70 transition-opacity" />
          </div>
        </m.div>
      </div>
    </section>
  );
}
