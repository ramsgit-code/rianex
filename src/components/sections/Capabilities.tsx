"use client";

import { Workflow, Filter, Rocket, Boxes, Network, Bot } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { AgentChat } from "@/components/sections/AgentChat";

const icons = [Workflow, Filter, Rocket, Boxes, Network, Bot];

export function Capabilities() {
  const { c } = useLang();
  const cap = c.capabilities;

  return (
    <section className="relative">
      <div className="section-wide">
        <Reveal>
          <p className="tag">{cap.tag}</p>
          <h2 className="section-title max-w-2xl">{cap.title}</h2>
          <p className="mt-3 max-w-xl text-foreground-muted">{cap.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-10">
          {/* rejilla de tarjetas 3D */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cap.items.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={item.title} delay={i * 0.05} className="h-full">
                  <TiltCard className="h-full">
                    <div className="card relative h-full overflow-hidden !p-6">
                      <span className="absolute right-4 top-3 font-display text-2xl font-bold text-white/[0.06]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/[0.08] text-accent">
                        <Icon size={20} />
                      </span>
                      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                        {item.desc}
                      </p>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>

          {/* bot dinámico destacado */}
          <Reveal delay={0.12} className="lg:sticky lg:top-28">
            <p className="mb-4 text-xs uppercase tracking-wider text-muted">
              {cap.chatLabel}
            </p>
            <div className="flex justify-center lg:justify-start">
              <AgentChat />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
