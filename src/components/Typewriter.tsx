"use client";

import { useEffect, useState } from "react";

// Escribe el texto carácter a carácter con un caret parpadeante.
export function Typewriter({
  text,
  className = "",
  speed = 45,
  startDelay = 400,
}: {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  const done = count >= text.length;

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, count)}</span>
      <span
        aria-hidden
        className={`ml-0.5 inline-block w-[3px] -translate-y-[2px] self-stretch bg-accent align-middle ${
          done ? "animate-pulse" : ""
        }`}
        style={{ height: "0.9em" }}
      />
    </span>
  );
}
