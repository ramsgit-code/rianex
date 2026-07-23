"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

// Tarjeta con efecto 3D: se inclina siguiendo el cursor y tiene un brillo
// que reacciona a la posición del ratón. Se desactiva en dispositivos táctiles.
export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 150, damping: 15, mass: 0.4 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), spring);
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useTransform(
    [glareX, glareY],
    ([gx, gy]: string[]) =>
      `radial-gradient(300px circle at ${gx} ${gy}, rgba(232,255,0,0.10), transparent 60%)`
  );

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full rounded-2xl"
      >
        {/* brillo que sigue el cursor */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />
        {children}
      </motion.div>
    </div>
  );
}
