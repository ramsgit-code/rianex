"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Send,
  Sparkles,
  Check,
  MessageCircle,
  Database,
  Server,
  Plug,
} from "lucide-react";
import { AgentChat } from "@/components/sections/AgentChat";
import { useLang } from "@/components/LanguageProvider";

const ACCENT = "#c7d400";

// Contador que sube de 0 a `to` con easing (sin dependencias).
function Counter({ to, duration = 1400 }: { to: number; duration?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{v.toLocaleString()}</>;
}

// Marco común: tarjeta con rejilla + glow, tamaño estable.
function Frame({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <div className="card relative flex h-[280px] w-full max-w-sm flex-col items-center justify-center overflow-hidden sm:h-[360px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(199,212,0,0.10),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#12130f 1px, transparent 1px), linear-gradient(90deg, #12130f 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative flex flex-1 items-center justify-center px-4 sm:px-6">{children}</div>
      {caption && (
        <p className="relative w-full border-t border-ink/[0.06] px-5 py-3 text-center text-xs text-muted">
          {caption}
        </p>
      )}
    </div>
  );
}

function FlowPath({ d, delay = 0 }: { d: string; delay?: number }) {
  return (
    <>
      <path d={d} fill="none" stroke="rgba(18,19,15,0.12)" strokeWidth={2} />
      <motion.path
        d={d}
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="5 12"
        animate={{ strokeDashoffset: [0, -34] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay }}
      />
    </>
  );
}

// 1 · Automatización — correo entra → IA redacta propuesta → correo la envía
function Automation({
  caption,
  labels,
  StartIcon = Mail,
  EndIcon = Send,
}: {
  caption: string;
  labels: string[];
  StartIcon?: typeof Mail;
  EndIcon?: typeof Mail;
}) {
  return (
    <Frame caption={caption}>
      <div className="relative w-[256px] lg:[transform:perspective(900px)_rotateX(10deg)]">
        {/* línea de flujo + pulso viajando */}
        <div className="absolute left-9 right-9 top-[26px] h-[2px] bg-ink/[0.10]" />
        <motion.div
          className="absolute top-[26px] z-20 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_#c7d400]"
          animate={{ left: [26, 224] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative flex items-start justify-between">
          {/* 1 · correo entra */}
          <div className="flex w-16 flex-col items-center gap-1.5">
            <span className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-accent/30 bg-background text-accent-text shadow-[0_0_16px_-6px_#c7d400]">
              <StartIcon size={20} />
            </span>
            <span className="text-center text-[10px] leading-tight text-foreground-muted">
              {labels[0]}
            </span>
          </div>

          {/* 2 · IA redacta la propuesta */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative w-[54px] rounded-lg border border-accent/40 bg-background p-2">
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-accent/40 bg-background text-accent-text">
                <Sparkles size={11} />
              </span>
              <span className="mb-1.5 block h-1.5 w-7 rounded bg-ink/20" />
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="mb-1 block h-1 rounded bg-accent/60"
                  initial={{ width: 0 }}
                  animate={{ width: ["0%", "100%", "100%", "0%"] }}
                  transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3, times: [0, 0.3, 0.85, 1] }}
                />
              ))}
            </div>
            <span className="text-center text-[10px] leading-tight text-foreground-muted">
              {labels[1]}
            </span>
          </div>

          {/* 3 · correo envía la propuesta */}
          <div className="flex w-16 flex-col items-center gap-1.5">
            <span className="relative flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-accent/30 bg-background text-accent-text shadow-[0_0_16px_-6px_#c7d400]">
              <EndIcon size={19} />
              <motion.span
                className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-ink"
                animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, times: [0, 0.75, 0.85, 0.96, 1] }}
              >
                <Check size={10} strokeWidth={3} />
              </motion.span>
            </span>
            <span className="text-center text-[10px] leading-tight text-foreground-muted">
              {labels[2]}
            </span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// 2 · Embudos — embudo de 4 etapas con contadores reales y % de conversión
function Funnel({
  caption,
  stages,
}: {
  caption: string;
  stages: { label: string; n: number; w: string }[];
}) {
  return (
    <Frame caption={caption}>
      <div className="flex w-full max-w-[280px] flex-col items-center gap-1.5 lg:[transform:perspective(900px)_rotateX(8deg)]">
        {stages.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.18 }}
            className={`${s.w} flex items-center justify-between rounded-lg border border-accent/25 bg-gradient-to-r from-accent/[0.04] to-accent/[0.12] px-3 py-2`}
          >
            <span className="text-[11px] font-medium text-foreground">{s.label}</span>
            <span className="font-display text-sm font-bold text-accent-text">
              <Counter to={s.n} duration={1200 + i * 250} />
            </span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

// 5 · Integraciones — hub central con 6 sistemas y datos fluyendo
function Integrations({
  caption,
  hub,
  sats,
}: {
  caption: string;
  hub: string;
  sats: { label: string; Icon: typeof Mail }[];
}) {
  const R = 92;
  const cx = 140;
  const cy = 84;
  return (
    <Frame caption={caption}>
      <div className="relative h-[168px] w-[280px] lg:[transform:perspective(900px)_rotateX(8deg)]">
        <svg viewBox="0 0 280 168" className="absolute inset-0 h-full w-full">
          <motion.circle
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke="rgba(18,19,15,0.10)"
            strokeWidth={1}
            strokeDasharray="3 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
          {sats.map((_, i) => {
            const a = (i / sats.length) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(a) * R;
            const y = cy + Math.sin(a) * R;
            return <FlowPath key={i} d={`M${x} ${y} L${cx} ${cy}`} delay={i * 0.15} />;
          })}
        </svg>

        <motion.div
          className="absolute flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/50 bg-accent/[0.1] font-display text-sm font-extrabold tracking-tight text-accent-text"
          style={{ left: cx - 32, top: cy - 32 }}
          animate={{ boxShadow: ["0 0 0 rgba(199,212,0,0)", "0 0 28px rgba(199,212,0,0.45)", "0 0 0 rgba(199,212,0,0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {hub}
        </motion.div>

        {sats.map((s, i) => {
          const a = (i / sats.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(a) * R;
          const y = cy + Math.sin(a) * R;
          return (
            <motion.div
              key={s.label}
              className="absolute flex items-center gap-1 rounded-lg border border-ink/[0.08] bg-background/90 px-2 py-1 text-[10px] text-foreground-muted"
              style={{ left: x - 24, top: y - 12 }}
              animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
            >
              <s.Icon size={12} className="text-accent-text" />
              {s.label}
            </motion.div>
          );
        })}
      </div>
    </Frame>
  );
}

export function CapabilityDemo({ index }: { index: number }) {
  const { lang } = useLang();
  const en = lang === "en";

  switch (index) {
    case 0:
      return (
        <Automation
          caption={en ? "From email to sent proposal" : "Del correo a la propuesta enviada"}
          labels={
            en
              ? ["Email in", "AI drafts", "Sent"]
              : ["Correo", "IA redacta", "Enviada"]
          }
        />
      );
    case 1:
      return (
        <Integrations
          caption={en ? "Your CRM, connected to everything" : "Tu CRM, conectado con todo"}
          hub="Rianex"
          sats={[
            { label: "GoHighLevel", Icon: Database },
            { label: "HubSpot", Icon: Database },
            { label: "ERP", Icon: Server },
            { label: "API", Icon: Plug },
            { label: "Email", Icon: Mail },
            { label: "WhatsApp", Icon: MessageCircle },
          ]}
        />
      );
    case 2:
      return (
        <Automation
          caption={en ? "From your current CRM to GoHighLevel" : "De tu CRM actual a GoHighLevel"}
          labels={
            en
              ? ["Your CRM", "Map & validate", "GoHighLevel"]
              : ["Tu CRM", "Mapeo y validación", "GoHighLevel"]
          }
          StartIcon={Database}
          EndIcon={Check}
        />
      );
    case 3:
      return (
        <Automation
          caption={en ? "From list to booked meeting" : "De la lista a la reunión agendada"}
          labels={
            en
              ? ["Clay list", "Email + LinkedIn", "Meeting"]
              : ["Lista Clay", "Email + LinkedIn", "Reunión"]
          }
          StartIcon={Database}
          EndIcon={Check}
        />
      );
    case 4:
      return (
        <Funnel
          caption={en ? "From lead to client" : "Del lead al cliente"}
          stages={
            en
              ? [
                  { label: "Leads", n: 1000, w: "w-full" },
                  { label: "Qualified", n: 640, w: "w-4/5" },
                  { label: "Meetings", n: 180, w: "w-3/5" },
                  { label: "Clients", n: 42, w: "w-2/5" },
                ]
              : [
                  { label: "Leads", n: 1000, w: "w-full" },
                  { label: "Cualificados", n: 640, w: "w-4/5" },
                  { label: "Citas", n: 180, w: "w-3/5" },
                  { label: "Clientes", n: 42, w: "w-2/5" },
                ]
          }
        />
      );
    case 5:
      return <AgentChat />;
    default:
      return <Automation caption="" labels={["Lead", "IA", "CRM"]} />;
  }
}
