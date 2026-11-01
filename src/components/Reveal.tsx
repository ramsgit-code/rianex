"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** etiqueta HTML a renderizar (por defecto div) */
  as?: "div" | "li" | "section" | "span";
  /**
   * Contenido visible al cargar (hero, titulares de cabecera).
   *
   * Con la animacion normal el HTML sale con opacity:0 y el contenido no se
   * pinta hasta que hidrata React y salta el IntersectionObserver. Para lo que
   * esta bajo el pliegue da igual, pero el elemento mas grande del primer
   * viewport es justo lo que Google mide como LCP: ocultarlo empeora la metrica
   * y deja la pagina en blanco si el JS falla.
   */
  priority?: boolean;
};

const MOTION = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  span: motion.span,
} as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
  priority = false,
}: RevealProps) {
  const Tag = MOTION[as];
  const reduceMotion = useReducedMotion();

  // Con prefers-reduced-motion no basta con saltarse la animacion: el HTML
  // del servidor ya sale con opacity:0 (el servidor no sabe la preferencia) y,
  // sin whileInView, el contenido se quedaba invisible para siempre. Se anima
  // igual hasta el estado final, pero sin desplazamiento y en 0 segundos.
  return (
    <Tag
      className={className}
      // initial={false} hace que motion no escriba ningun estilo de partida:
      // el contenido se sirve ya visible.
      initial={priority ? false : { opacity: 0, y }}
      whileInView={priority ? undefined : { opacity: 1, y: 0 }}
      viewport={priority ? undefined : { once: true, margin: "-80px" }}
      transition={
        priority
          ? undefined
          : reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 90, damping: 18, delay }
      }
    >
      {children}
    </Tag>
  );
}
