"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

// Escribe el texto carácter a carácter con un caret parpadeante.
// Con `texts` (varias frases) las va rotando: escribe, espera, borra y pasa a la siguiente.
export function Typewriter({
  text,
  texts,
  className = "",
  speed = 45,
  deleteSpeed = 22,
  hold = 2200,
  startDelay = 400,
}: {
  text?: string;
  texts?: readonly string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  hold?: number;
  startDelay?: number;
}) {
  const list = texts ?? (text ? [text] : []);
  const reduceMotion = useReducedMotion();
  const loop = list.length > 1 && !reduceMotion;

  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const current = list[idx] ?? "";

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    if (!deleting) {
      if (count < current.length) t = setTimeout(() => setCount((c) => c + 1), speed);
      else if (loop) t = setTimeout(() => setDeleting(true), hold);
    } else if (count > 0) {
      t = setTimeout(() => setCount((c) => c - 1), deleteSpeed);
    } else {
      t = setTimeout(() => {
        setDeleting(false);
        setIdx((i) => (i + 1) % list.length);
      }, 250);
    }
    return () => clearTimeout(t);
  }, [started, count, deleting, current.length, loop, speed, deleteSpeed, hold, list.length]);

  const done = !deleting && count >= current.length;

  return (
    <span className={className} aria-label={current}>
      <span aria-hidden>{current.slice(0, count)}</span>
      {/* caret de alto cero en la línea: no agranda el renglón al saltar de línea */}
      <span aria-hidden className="relative ml-0.5 inline-block h-0 w-[3px] align-baseline">
        <span
          className={`absolute bottom-[-0.08em] left-0 h-[0.9em] w-full bg-accent ${
            done ? "animate-pulse" : ""
          }`}
        />
      </span>
    </span>
  );
}
