"use client";

import { motion } from "motion/react";
import { Workflow, Boxes, Rocket, Database, Server, Cpu } from "lucide-react";
import { AgentChat } from "@/components/sections/AgentChat";
import { useLang } from "@/components/LanguageProvider";

// Marco común de los ejemplos: tarjeta con fondo de rejilla y glow, tamaño estable.
function Frame({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <div className="card relative flex h-[360px] w-full max-w-sm flex-col items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(232,255,0,0.08),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative flex flex-1 items-center justify-center px-6">
        {children}
      </div>
      {caption && (
        <p className="relative w-full border-t border-white/[0.06] px-5 py-3 text-center text-xs text-muted">
          {caption}
        </p>
      )}
    </div>
  );
}

// 1 · Automatización de procesos — nodos con un pulso que viaja por el flujo
function Automation({ caption }: { caption: string }) {
  const icons = [Workflow, Boxes, Rocket];
  return (
    <Frame caption={caption}>
      <div
        className="relative mx-auto h-16 w-[248px]"
        style={{ transform: "perspective(700px) rotateX(12deg)" }}
      >
        <div className="absolute left-8 right-8 top-1/2 h-[2px] -translate-y-1/2 bg-white/10" />
        <motion.div
          className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_#e8ff00]"
          animate={{ left: [18, 228] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 flex items-center justify-between">
          {icons.map((Icon, i) => (
            <motion.span
              key={i}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-background text-accent"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.65 }}
            >
              <Icon size={18} />
            </motion.span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// 2 · Embudos de venta — leads cayendo por un embudo de 3 etapas
function Funnel({ caption, stages }: { caption: string; stages: string[] }) {
  const widths = ["w-52", "w-40", "w-28"];
  return (
    <Frame caption={caption}>
      <div
        className="relative flex flex-col items-center gap-2"
        style={{ transform: "perspective(800px) rotateX(14deg)" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${widths[i]} rounded-lg border border-accent/25 bg-accent/[0.07] py-2 text-center text-[11px] font-medium text-foreground`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
          >
            {stages[i]}
          </motion.div>
        ))}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={`d${i}`}
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_#e8ff00]"
            style={{ top: 0 }}
            animate={{ y: [0, 96], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.5, ease: "easeIn" }}
          />
        ))}
      </div>
    </Frame>
  );
}

// 3 · Go-to-Market — barras que crecen + curva de crecimiento
function Growth({ caption }: { caption: string }) {
  const bars = [40, 55, 48, 72, 90];
  return (
    <Frame caption={caption}>
      <div
        className="flex h-32 items-end gap-2.5"
        style={{ transform: "perspective(800px) rotateX(10deg)" }}
      >
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="w-7 rounded-t-md bg-gradient-to-t from-accent/30 to-accent"
            initial={{ height: 8 }}
            animate={{ height: [8, (h / 100) * 128, (h / 100) * 128] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18, ease: "easeOut" }}
          />
        ))}
      </div>
    </Frame>
  );
}

// 4 · Founding Engineering — bloques que se ensamblan (isométrico)
function Blocks({ caption }: { caption: string }) {
  return (
    <Frame caption={caption}>
      <div
        className="relative h-28 w-28"
        style={{ transform: "rotateX(55deg) rotateZ(45deg)", transformStyle: "preserve-3d" }}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-md border border-accent/40 bg-accent/[0.12]"
            style={{
              width: 48,
              height: 48,
              left: (i % 2) * 44,
              top: Math.floor(i / 2) * 44,
            }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>
    </Frame>
  );
}

// 5 · Integraciones CRM — hub central con satélites conectados
function Integrations({ caption }: { caption: string }) {
  const sats = [
    { label: "CRM", Icon: Database, pos: "left-0 top-2" },
    { label: "ERP", Icon: Server, pos: "right-0 top-2" },
    { label: "MES", Icon: Cpu, pos: "left-0 bottom-2" },
    { label: "API", Icon: Workflow, pos: "right-0 bottom-2" },
  ];
  return (
    <Frame caption={caption}>
      <div className="relative h-40 w-56" style={{ transform: "perspective(800px) rotateX(8deg)" }}>
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-accent/40 bg-accent/[0.1] text-xs font-semibold text-accent"
          animate={{ boxShadow: ["0 0 0 rgba(232,255,0,0)", "0 0 26px rgba(232,255,0,0.4)", "0 0 0 rgba(232,255,0,0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Rianex
        </motion.div>
        {sats.map((s, i) => (
          <motion.div
            key={s.label}
            className={`absolute ${s.pos} flex items-center gap-1.5 rounded-lg border border-white/10 bg-background/80 px-2 py-1 text-[11px] text-foreground-muted`}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          >
            <s.Icon size={13} className="text-accent" />
            {s.label}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

export function CapabilityDemo({ index }: { index: number }) {
  const { lang } = useLang();
  const en = lang === "en";

  switch (index) {
    case 0:
      return <Automation caption={en ? "Automated flow · no manual work" : "Flujo automatizado · sin intervención"} />;
    case 1:
      return (
        <Funnel
          caption={en ? "Capture → qualify → close" : "Captación → cualificación → cierre"}
          stages={
            en
              ? ["Capture", "Qualification", "Close"]
              : ["Captación", "Cualificación", "Cierre"]
          }
        />
      );
    case 2:
      return <Growth caption={en ? "Launch and scale your sales" : "Lanza y escala tu venta"} />;
    case 3:
      return <Blocks caption={en ? "From MVP to production" : "Del MVP a producción"} />;
    case 4:
      return <Integrations caption={en ? "Your systems, connected" : "Tus sistemas, conectados"} />;
    case 5:
      return <AgentChat />;
    default:
      return <Automation caption={en ? "Automated flow" : "Flujo automatizado"} />;
  }
}
