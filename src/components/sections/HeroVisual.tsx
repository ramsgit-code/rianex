"use client";

import { Sparkles, LayoutGrid, Workflow, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";

function Chip({
  className,
  icon: Icon,
  label,
  delay,
}: {
  className: string;
  icon: LucideIcon;
  label: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute ${className} flex animate-float items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-background/70 px-2.5 py-1.5 text-xs font-medium text-foreground shadow-glass backdrop-blur-md`}
      style={{ animationDelay: delay }}
    >
      <Icon size={13} className="text-accent" />
      {label}
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[13rem] sm:max-w-[17rem] lg:max-w-[23rem]">
      {/* glow de fondo (pulsa) */}
      <div className="absolute inset-[10%] animate-glow-pulse rounded-full bg-accent/10 blur-[60px]" />

      {/* anillo exterior giratorio (lento) */}
      <div className="absolute inset-[4%] animate-spin rounded-full border border-dashed border-white/10 [animation-duration:30s]" />
      {/* anillos concéntricos */}
      <div className="absolute inset-[22%] rounded-full border border-white/[0.07]" />
      <div className="absolute inset-[38%] rounded-full border border-white/[0.05]" />
      {/* señal que emana del núcleo (AI ambient) */}
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-ping-slow rounded-full border border-accent/25" />

      {/* núcleo IA */}
      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse items-center justify-center rounded-2xl border border-accent/30 bg-accent/[0.1] text-accent shadow-glow backdrop-blur-md">
        <Sparkles size={30} />
      </div>

      {/* palabras en el anillo */}
      <Chip className="left-1/2 top-0 -translate-x-1/2" icon={LayoutGrid} label="GoHighLevel" delay="0s" />
      <Chip className="bottom-[7%] right-0" icon={Workflow} label="Automation" delay="0.9s" />
      <Chip className="bottom-[7%] left-0" icon={Bot} label="Agent AI" delay="1.8s" />
    </div>
  );
}
