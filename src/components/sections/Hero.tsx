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

const pipeline = [
  { stage: "New Lead", count: 5, delta: "+2 hoy", accent: true },
  { stage: "Cualificado", count: 8, delta: null, accent: false },
  { stage: "Propuesta enviada", count: 4, delta: null, accent: false },
  { stage: "Cerrado", count: 12, delta: "↑ 80%", accent: false },
];

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="section w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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

            <div className="flex flex-col sm:flex-row items-start gap-3 mb-12">
              <Link href="/diagnostico" className="btn-primary text-base px-7 py-3.5">
                Solicita tu diagnostico
                <ArrowRight size={16} />
              </Link>
              <Link href="#video" className="btn-secondary text-base px-7 py-3.5">
                Ver como funciona
              </Link>
            </div>

            {/* Stats strip */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 pb-10 border-b border-border"
            >
              {stats.map((s) => (
                <div key={s.value} className="flex flex-col">
                  <span className="text-2xl font-bold text-accent leading-none">{s.value}</span>
                  <span className="text-xs text-muted mt-1">{s.label}</span>
                </div>
              ))}
            </m.div>

            {/* Logos */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8"
            >
              <p className="text-xs text-muted uppercase tracking-widest mb-5">
                Sistemas implementados en
              </p>
              <div className="flex flex-wrap items-center gap-8">
                <LogoHospitalCapilar className="h-5 w-auto text-foreground opacity-40 hover:opacity-70 transition-opacity" />
                <LogoEventosBarcelona className="h-7 w-auto text-foreground opacity-40 hover:opacity-70 transition-opacity" />
                <LogoHermetic className="h-5 w-auto text-foreground opacity-40 hover:opacity-70 transition-opacity" />
              </div>
            </m.div>
          </m.div>

          {/* Right — pipeline mockup */}
          <m.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-[0_0_60px_rgba(232,255,0,0.04)]">
              {/* Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-border">
                <div>
                  <p className="text-xs font-mono text-muted">CRM · Pipeline activo</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">Go High Level</p>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>

              {/* Pipeline stages */}
              <div className="flex flex-col gap-2 mb-5">
                {pipeline.map((p) => (
                  <div
                    key={p.stage}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 ${
                      p.accent ? "bg-accent/10 border border-accent/20" : "bg-background border border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${p.accent ? "bg-accent" : "bg-border"}`} />
                      <span className="text-sm text-foreground-muted">{p.stage}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {p.delta && (
                        <span className={`text-xs font-mono ${p.accent ? "text-accent" : "text-emerald-400"}`}>
                          {p.delta}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-foreground tabular-nums">{p.count}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity feed */}
              <div className="border-t border-border pt-4 flex flex-col gap-2.5">
                <p className="text-xs text-muted uppercase tracking-wider mb-1">Actividad reciente</p>
                {[
                  { text: "Nuevo lead cualificado", sub: "HOT · 84pts · LinkedIn", time: "2 min" },
                  { text: "Propuesta abierta", sub: "Clinica · 3.500€", time: "18 min" },
                  { text: "WhatsApp enviado", sub: "Seguimiento día 2", time: "1 h" },
                ].map((a) => (
                  <div key={a.text} className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-foreground-muted">{a.text}</p>
                      <p className="text-xs text-accent/80 font-mono">{a.sub}</p>
                    </div>
                    <span className="text-xs text-muted shrink-0 ml-4">{a.time}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Tasa de conversion</span>
                  <span className="text-foreground font-semibold">34% → cierre</span>
                </div>
                <div className="mt-2 h-1.5 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: "34%" }} />
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
