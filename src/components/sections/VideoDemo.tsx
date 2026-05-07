"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Play } from "lucide-react";

// Cambia esta URL con tu video de Loom o YouTube embed
// Loom:   https://www.loom.com/embed/TU_VIDEO_ID
// YouTube: https://www.youtube.com/embed/TU_VIDEO_ID
const VIDEO_EMBED_URL = "https://www.loom.com/embed/REPLACE_WITH_YOUR_VIDEO_ID";

const chapters = [
  { time: "0:30", label: "Lead entra y se cualifica en segundos" },
  { time: "1:45", label: "Pipeline en tiempo real: quién pasa y quién no" },
  { time: "2:30", label: "WhatsApp + CRM + propuesta: el ciclo completo" },
];

export function VideoDemo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="video">
      <div className="section">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 max-w-2xl mx-auto"
        >
          <span className="tag">Ver en accion</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            3 minutos para entender el sistema.
          </h2>
          <p className="text-foreground-muted text-lg leading-relaxed">
            Desde que el lead entra hasta que el comercial recibe la notificacion de cierre.
            Sin explicaciones tecnicas. Solo el proceso real.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {/* Video */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-surface">
            {!playing ? (
              <button
                onClick={() => setPlaying(true)}
                aria-label="Reproducir demo del sistema"
                className="absolute inset-0 flex items-center justify-center w-full h-full group cursor-pointer"
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-[#0d0d0d]" />

                {/* Subtle grid */}
                <div
                  className="absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                />

                {/* Glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
                </div>

                {/* Play button */}
                <div className="relative z-10 flex flex-col items-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(234,179,8,0.25)]">
                    <Play size={30} fill="black" className="text-black ml-1.5" />
                  </div>
                  <span className="text-sm text-foreground-muted bg-surface/80 backdrop-blur-sm border border-border rounded-full px-4 py-1.5">
                    Ver demo del sistema · 3 min
                  </span>
                </div>
              </button>
            ) : (
              <iframe
                src={`${VIDEO_EMBED_URL}?autoplay=1`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Chapter markers */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            {chapters.map((c, i) => (
              <m.div
                key={c.time}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                className="flex items-center gap-3 flex-1 bg-surface border border-border rounded-xl px-4 py-3"
              >
                <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded shrink-0">
                  {c.time}
                </span>
                <span className="text-sm text-foreground-muted">{c.label}</span>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
