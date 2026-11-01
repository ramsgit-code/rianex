"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import type { BoardStage, BoardTask } from "@/lib/home";

// Tablero kanban del hero: cada tarjeta es un proceso que avanza solo de
// Manual a En consultoría y a Automatizado. Cuando todo está automatizado
// espera un momento y vuelve a empezar. Se pausa con el ratón encima y con
// prefers-reduced-motion se queda quieto en el estado inicial.
//
// El estado se marca tres veces para no depender del color: la banda superior
// (rojo, amarillo, verde), la luz andon con su texto y el tachado al terminar.

const STEP_MS = 1700;
const HOLD_MS = 3200;

const BAND: Record<BoardStage, string> = {
  0: "bg-stop",
  1: "bg-accent",
  2: "bg-go",
};

export function ProcessBoard({
  tasks,
  lanes,
  label,
  hoursLabel,
}: {
  tasks: BoardTask[];
  lanes: [string, string, string];
  label: string;
  hoursLabel: string;
}) {
  const reduce = useReducedMotion();
  const initial = tasks.map((t) => t.start);
  const [stages, setStages] = useState<BoardStage[]>(initial);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduce || paused) return;
    const done = stages.every((s) => s === 2);
    timer.current = setTimeout(
      () => {
        if (done) {
          setStages(tasks.map((t) => t.start));
          return;
        }
        // avanza la tarjeta más adelantada que aún no ha terminado, para que
        // el flujo se lea de derecha a izquierda como en una planta real
        setStages((prev) => {
          let pick = -1;
          for (let i = 0; i < prev.length; i++) {
            if (prev[i] === 2) continue;
            if (pick === -1 || prev[i] > prev[pick]) pick = i;
          }
          if (pick === -1) return prev;
          const next = [...prev];
          next[pick] = (next[pick] + 1) as BoardStage;
          return next;
        });
      },
      done ? HOLD_MS : STEP_MS,
    );
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [stages, paused, reduce, tasks]);

  const hours = tasks.reduce((sum, t, i) => (stages[i] === 2 ? sum + t.hours : sum), 0);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between border-b-[6px] border-accent pb-2 font-display text-[13px] font-bold uppercase tracking-[0.08em] text-foreground">
        <span>{label}</span>
        <span aria-live="polite" className="flex items-baseline gap-2">
          <span className="text-2xl tabular-nums">{hours}</span>
          <span className="font-sans text-xs normal-case tracking-normal text-foreground-muted" style={{ fontStretch: "100%" }}>
            {hoursLabel}
          </span>
        </span>
      </div>

      <LayoutGroup>
        <div className="grid grid-cols-3 border-l-[6px] border-ink">
          {lanes.map((lane, li) => {
            const inLane = tasks
              .map((t, i) => ({ t, i }))
              .filter(({ i }) => stages[i] === li);
            return (
              <div
                key={lane}
                className="min-h-[21rem] border-r-2 border-dashed border-border px-1.5 pb-3 sm:min-h-[24rem] sm:px-3"
              >
                <p className="flex items-start justify-between gap-1 py-3 font-display text-[11px] font-bold uppercase leading-tight tracking-[0.06em] text-foreground sm:items-center sm:text-[13px] sm:tracking-[0.08em]">
                  <span className="flex items-start gap-1.5 sm:items-center">
                    <span
                      aria-hidden
                      className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full sm:mt-0 ${BAND[li as BoardStage]}`}
                    />
                    {lane}
                  </span>
                  <span className="hidden tabular-nums text-muted sm:inline">
                    {String(inLane.length).padStart(2, "0")}
                  </span>
                </p>
                <ul className="flex flex-col gap-2">
                  {inLane.map(({ t, i }) => (
                    <motion.li
                      key={t.title}
                      layout={!reduce}
                      layoutId={reduce ? undefined : `task-${i}`}
                      transition={{ type: "spring", stiffness: 260, damping: 30 }}
                      className="relative bg-white"
                    >
                      <span aria-hidden className={`block h-2 w-full transition-colors duration-500 ${BAND[stages[i]]}`} />
                      <div className="p-2.5 sm:p-3">
                        <p
                          className={`text-[12.5px] font-semibold leading-snug text-foreground sm:text-sm ${
                            stages[i] === 2 ? "text-foreground-muted line-through decoration-go-text decoration-[1.5px]" : ""
                          }`}
                        >
                          {t.title}
                        </p>
                        <p className="mt-1.5 flex items-center justify-between gap-2 text-[11px] text-muted">
                          <span>{t.area}</span>
                          {stages[i] === 2 ? (
                            <Check size={14} className="text-go-text" aria-hidden />
                          ) : (
                            <span className="hidden tabular-nums sm:inline">{t.hours} h/sem</span>
                          )}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}
