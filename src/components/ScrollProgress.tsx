"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Barra de progreso de scroll en la parte superior (premium, global).
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent/60 via-accent to-accent/60"
    />
  );
}
