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
  Cpu,
  Plug,
  TrendingUp,
} from "lucide-react";
import { AgentChat } from "@/components/sections/AgentChat";
import { useLang } from "@/components/LanguageProvider";

const ACCENT = "#e8ff00";

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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(232,255,0,0.08),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative flex flex-1 items-center justify-center px-4 sm:px-6">{children}</div>
      {caption && (
        <p className="relative w-full border-t border-white/[0.06] px-5 py-3 text-center text-xs text-muted">
          {caption}
        </p>
      )}
    </div>
  );
}

function FlowPath({ d, delay = 0 }: { d: string; delay?: number }) {
  return (
    <>
      <path d={d} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={2} />
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
function Automation({ caption, labels }: { caption: string; labels: string[] }) {
  return (
    <Frame caption={caption}>
      <div className="relative w-[256px] lg:[transform:perspective(900px)_rotateX(10deg)]">
        {/* línea de flujo + pulso viajando */}
        <div className="absolute left-9 right-9 top-[26px] h-[2px] bg-white/10" />
        <motion.div
          className="absolute top-[26px] z-20 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_#e8ff00]"
          animate={{ left: [26, 224] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative flex items-start justify-between">
          {/* 1 · correo entra */}
          <div className="flex w-16 flex-col items-center gap-1.5">
            <span className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-accent/30 bg-background text-accent shadow-[0_0_16px_-6px_#e8ff00]">
              <Mail size={20} />
            </span>
            <span className="text-center text-[10px] leading-tight text-foreground-muted">
              {labels[0]}
            </span>
          </div>

          {/* 2 · IA redacta la propuesta */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative w-[54px] rounded-lg border border-accent/40 bg-background p-2">
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-accent/40 bg-background text-accent">
                <Sparkles size={11} />
              </span>
              <span className="mb-1.5 block h-1.5 w-7 rounded bg-white/25" />
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
            <span className="relative flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-accent/30 bg-background text-accent shadow-[0_0_16px_-6px_#e8ff00]">
              <Send size={19} />
              <motion.span
                className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-background"
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
            <span className="font-display text-sm font-bold text-accent">
              <Counter to={s.n} duration={1200 + i * 250} />
            </span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

// 3 · Go-to-Market — barras + línea de crecimiento SVG + KPI
function Growth({ caption, kpi }: { caption: string; kpi: string }) {
  const bars = [30, 42, 38, 58, 74, 92];
  return (
    <Frame caption={caption}>
      <div className="relative lg:[transform:perspective(900px)_rotateX(10deg)]">
        <div className="flex h-32 items-end gap-2">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-6 rounded-t-md bg-gradient-to-t from-accent/20 to-accent/70"
              initial={{ height: 6 }}
              animate={{ height: (h / 100) * 128 }}
              transition={{ duration: 1, delay: i * 0.12, ease: "easeOut" }}
            />
          ))}
        </div>
        <svg viewBox="0 0 200 128" className="absolute inset-0 h-32 w-full overflow-visible">
          <motion.path
            d="M6 112 L40 96 L74 100 L108 74 L142 60 L184 20"
            fill="none"
            stroke={ACCENT}
            strokeWidth={2.5}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          <motion.circle
            cx={184}
            cy={20}
            r={4}
            fill={ACCENT}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.4, 1] }}
            transition={{ delay: 1.6, duration: 0.5 }}
          />
        </svg>
        <motion.div
          className="absolute -right-2 -top-3 flex items-center gap-1 rounded-full border border-accent/40 bg-background px-2.5 py-1 text-xs font-bold text-accent"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7 }}
        >
          <TrendingUp size={13} /> {kpi}
        </motion.div>
      </div>
    </Frame>
  );
}

// 4 · Founding Engineering — una app/producto que se construye sola
function ProductBuild({
  caption,
  live,
  cta,
}: {
  caption: string;
  live: string;
  cta: string;
}) {
  const build = (i: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.25 + i * 0.28, duration: 0.4 },
  });
  return (
    <Frame caption={caption}>
      <div
        className="relative w-[236px] lg:[transform:perspective(1100px)_rotateY(-13deg)_rotateX(6deg)]"
      >
        <div className="overflow-hidden rounded-xl border border-white/[0.12] bg-[#0c0c0e] shadow-2xl">
          {/* chrome del navegador */}
          <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="ml-2 h-3 flex-1 rounded bg-white/[0.06]" />
          </div>
          {/* cuerpo del producto */}
          <div className="flex flex-col gap-2.5 p-3.5">
            <motion.div {...build(0)} className="flex items-center justify-between">
              <span className="h-2.5 w-16 rounded bg-white/15" />
              <span className="flex items-center gap-1 rounded-full border border-accent/30 bg-accent/[0.1] px-1.5 py-0.5">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                <span className="text-[8px] font-semibold uppercase tracking-wide text-accent">
                  {live}
                </span>
              </span>
            </motion.div>

            <motion.div {...build(1)} className="flex items-end gap-1.5">
              {[40, 68, 52, 84].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-4 rounded-sm bg-gradient-to-t from-accent/25 to-accent/70"
                  animate={{ height: [8, h * 0.45, h * 0.35] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 1 + i * 0.15 }}
                />
              ))}
            </motion.div>

            <motion.div {...build(2)} className="flex flex-col gap-1.5">
              <span className="h-2 w-full rounded bg-white/[0.08]" />
              <span className="h-2 w-3/4 rounded bg-white/[0.08]" />
            </motion.div>

            <motion.button
              {...build(3)}
              className="mt-0.5 rounded-lg bg-accent py-1.5 text-center text-[11px] font-semibold text-background"
            >
              {cta}
            </motion.button>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// 5 · Integraciones — hub central con 6 sistemas y datos fluyendo
function Integrations({ caption, hub }: { caption: string; hub: string }) {
  const sats = [
    { label: "CRM", Icon: Database },
    { label: "ERP", Icon: Server },
    { label: "MES", Icon: Cpu },
    { label: "API", Icon: Plug },
    { label: "Email", Icon: Mail },
    { label: "Chat", Icon: MessageCircle },
  ];
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
            stroke="rgba(255,255,255,0.06)"
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
          className="absolute flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/50 bg-accent/[0.1] font-display text-sm font-extrabold tracking-tight text-accent"
          style={{ left: cx - 32, top: cy - 32 }}
          animate={{ boxShadow: ["0 0 0 rgba(232,255,0,0)", "0 0 28px rgba(232,255,0,0.45)", "0 0 0 rgba(232,255,0,0)"] }}
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
              className="absolute flex items-center gap-1 rounded-lg border border-white/10 bg-background/90 px-2 py-1 text-[10px] text-foreground-muted"
              style={{ left: x - 24, top: y - 12 }}
              animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
            >
              <s.Icon size={12} className="text-accent" />
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
    case 2:
      return (
        <Growth
          caption={en ? "Launch and scale your sales" : "Lanza y escala tu venta"}
          kpi={en ? "+320% sales" : "+320% ventas"}
        />
      );
    case 3:
      return (
        <ProductBuild
          caption={en ? "Your product, built and shipped" : "Tu producto, construido y en marcha"}
          live={en ? "Live" : "En vivo"}
          cta={en ? "Get started" : "Empezar"}
        />
      );
    case 4:
      return (
        <Integrations
          caption={en ? "Your systems, connected" : "Tus sistemas, conectados"}
          hub="Rianex"
        />
      );
    case 5:
      return <AgentChat />;
    default:
      return <Automation caption="" labels={["Lead", "IA", "Chat", "CRM"]} />;
  }
}
