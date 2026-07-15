"use client";

import { LazyMotion } from "motion/react";

const loadFeatures = () => import("@/lib/motion-features").then((m) => m.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
