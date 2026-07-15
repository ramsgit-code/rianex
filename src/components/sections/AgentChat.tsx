"use client";

import { motion } from "motion/react";
import { CalendarCheck, Sparkles } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-foreground-muted"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  );
}

export function AgentChat() {
  const { lang } = useLang();
  const en = lang === "en";

  const t = {
    header: en ? "Rianex · AI agent" : "Rianex · Agente IA",
    online: en ? "online" : "en línea",
    lead1: en ? "Hi, I'd like some info 👋" : "Hola, quiero información 👋",
    agent1: en ? "Hi! When do you want to start?" : "¡Hola! ¿Para cuándo quieres empezar?",
    lead2: en ? "This week if possible." : "Esta semana si puede ser.",
    booked: en ? "Meeting booked" : "Cita agendada",
    slot: en ? "Thu · 12:00" : "Jue · 12:00",
    qualified: en ? "Qualified lead · hot" : "Lead cualificado · hot",
  };

  const spring = { type: "spring", stiffness: 260, damping: 22 } as const;

  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[23rem]">
      {/* glow detrás */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-accent/10 blur-[70px]" />

      <div className="glass overflow-hidden rounded-3xl shadow-glass">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/[0.1] text-accent">
            <Sparkles size={16} />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">{t.header}</p>
            <p className="flex items-center gap-1.5 text-xs text-foreground-muted">
              <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-green-400" />
              {t.online}
            </p>
          </div>
        </div>

        {/* mensajes */}
        <div className="flex flex-col gap-3 p-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.3 }}
            className="max-w-[80%] self-start rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-sm text-foreground"
          >
            {t.lead1}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.9 }}
            className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-sm font-medium text-black"
          >
            {t.agent1}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 1.5 }}
            className="max-w-[80%] self-start rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-sm text-foreground"
          >
            {t.lead2}
          </motion.div>

          {/* typing del agente */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 2.0 }}
            className="self-end rounded-2xl rounded-br-md bg-accent/90 px-3.5 text-black"
          >
            <TypingDots />
          </motion.div>

          {/* cita agendada */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spring, delay: 2.8 }}
            className="mt-1 flex items-center gap-3 rounded-2xl border border-accent/25 bg-accent/[0.06] px-4 py-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <CalendarCheck size={18} />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{t.booked}</p>
              <p className="text-xs text-foreground-muted">{t.slot}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* badge flotante */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 3.3 }}
        className="absolute -bottom-4 -left-3 flex items-center gap-2 rounded-full border border-white/10 bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground shadow-glass backdrop-blur-md sm:-left-6"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {t.qualified}
      </motion.div>
    </div>
  );
}
