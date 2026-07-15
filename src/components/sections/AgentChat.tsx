"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalendarCheck, Sparkles, Gauge, FileText, type LucideIcon } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

type Msg = { side: "in" | "out" | "typing"; text?: string };
type Convo = {
  msgs: Msg[];
  icon: LucideIcon;
  result: string;
  sub: string;
  badge: string;
};

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-black/60"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  );
}

export function AgentChat() {
  const { lang } = useLang();
  const en = lang === "en";
  const [idx, setIdx] = useState(0);

  const convos: Convo[] = en
    ? [
        {
          msgs: [
            { side: "in", text: "Hi, I'd like some info 👋" },
            { side: "out", text: "Hi! When do you want to start?" },
            { side: "in", text: "This week if possible." },
            { side: "typing" },
          ],
          icon: CalendarCheck,
          result: "Meeting booked",
          sub: "Thu · 12:00",
          badge: "Qualified lead · hot",
        },
        {
          msgs: [
            { side: "in", text: "How much is it?" },
            { side: "out", text: "Depends. What's your budget?" },
            { side: "in", text: "€3–5k a month." },
            { side: "typing" },
          ],
          icon: Gauge,
          result: "Score 92 / 100",
          sub: "Priority: premium",
          badge: "High-value lead",
        },
        {
          msgs: [
            { side: "in", text: "Still thinking about it…" },
            { side: "out", text: "No problem. Sending your proposal 👇" },
            { side: "typing" },
          ],
          icon: FileText,
          result: "Proposal sent",
          sub: "PDF + auto follow-up",
          badge: "Follow-up 24/7",
        },
      ]
    : [
        {
          msgs: [
            { side: "in", text: "Hola, quiero información 👋" },
            { side: "out", text: "¡Hola! ¿Para cuándo quieres empezar?" },
            { side: "in", text: "Esta semana si puede ser." },
            { side: "typing" },
          ],
          icon: CalendarCheck,
          result: "Cita agendada",
          sub: "Jue · 12:00",
          badge: "Lead cualificado · hot",
        },
        {
          msgs: [
            { side: "in", text: "¿Cuánto cuesta?" },
            { side: "out", text: "Depende. ¿Qué presupuesto manejas?" },
            { side: "in", text: "3–5k al mes." },
            { side: "typing" },
          ],
          icon: Gauge,
          result: "Scoring 92 / 100",
          sub: "Prioridad: premium",
          badge: "Lead de alto valor",
        },
        {
          msgs: [
            { side: "in", text: "Aún lo estoy pensando…" },
            { side: "out", text: "Sin problema. Te mando la propuesta 👇" },
            { side: "typing" },
          ],
          icon: FileText,
          result: "Propuesta enviada",
          sub: "PDF + seguimiento auto",
          badge: "Seguimiento 24/7",
        },
      ];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % convos.length), 5600);
    return () => clearInterval(t);
  }, [convos.length]);

  const convo = convos[idx];
  const Icon = convo.icon;
  const spring = { type: "spring", stiffness: 260, damping: 24 } as const;

  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[23rem]">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-accent/10 blur-[70px]" />

      <div className="glass overflow-hidden rounded-3xl shadow-glass">
        {/* header (fijo) */}
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/[0.1] text-accent">
            <Sparkles size={16} />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              {en ? "Rianex · AI agent" : "Rianex · Agente IA"}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-foreground-muted">
              <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-green-400" />
              {en ? "online" : "en línea"}
            </p>
          </div>
        </div>

        {/* cuerpo: cicla entre conversaciones */}
        <div className="min-h-[268px] p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              className="flex flex-col gap-3"
            >
              {convo.msgs.map((m, i) =>
                m.side === "typing" ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring, delay: 0.4 + i * 0.55 }}
                    className="self-end rounded-2xl rounded-br-md bg-accent/90 px-3.5 text-black"
                  >
                    <TypingDots />
                  </motion.div>
                ) : (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ ...spring, delay: 0.4 + i * 0.55 }}
                    className={
                      m.side === "in"
                        ? "max-w-[80%] self-start rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-sm text-foreground"
                        : "max-w-[80%] self-end rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-sm font-medium text-black"
                    }
                  >
                    {m.text}
                  </motion.div>
                )
              )}

              {/* resultado */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...spring, delay: 0.4 + convo.msgs.length * 0.55 + 0.4 }}
                className="mt-1 flex items-center gap-3 rounded-2xl border border-accent/25 bg-accent/[0.06] px-4 py-3"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon size={18} />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{convo.result}</p>
                  <p className="text-xs text-foreground-muted">{convo.sub}</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* badge flotante (cambia con la conversación) */}
      <div className="absolute -bottom-4 -left-3 sm:-left-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            transition={{ ...spring, delay: 0.3 }}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground shadow-glass backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {convo.badge}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
