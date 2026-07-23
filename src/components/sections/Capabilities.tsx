"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Workflow, Filter, Rocket, Boxes, Network, Bot } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { CapabilityDemo } from "@/components/sections/CapabilityDemos";

const icons = [Workflow, Filter, Rocket, Boxes, Network, Bot];

export function Capabilities() {
  const { c } = useLang();
  const cap = c.capabilities;
  const [active, setActive] = useState(5); // por defecto: el bot
  const activeItem = cap.items[active];

  const demo = (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.28 }}
        className="flex justify-center"
      >
        <CapabilityDemo index={active} />
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section className="relative">
      <div className="section-wide">
        <Reveal>
          <p className="tag">{cap.tag}</p>
          <h2 className="section-title max-w-2xl">{cap.title}</h2>
          <p className="mt-3 max-w-xl text-foreground-muted">{cap.subtitle}</p>
        </Reveal>

        {/* tira horizontal de tarjetas de servicio */}
        <Reveal delay={0.05}>
          <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6">
            {cap.items.map((item, i) => {
              const Icon = icons[i % icons.length];
              const isActive = active === i;
              return (
                <div
                  key={item.title}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="w-[220px] shrink-0 snap-start cursor-pointer sm:w-[240px]"
                >
                  <TiltCard>
                    <div
                      className={`card relative h-full overflow-hidden !p-5 transition-shadow ${
                        isActive
                          ? "shadow-[0_0_0_1px_rgba(232,255,0,0.45),0_0_30px_-8px_rgba(232,255,0,0.4)]"
                          : ""
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border text-accent transition-colors ${
                          isActive
                            ? "border-accent/50 bg-accent/[0.15]"
                            : "border-accent/25 bg-accent/[0.08]"
                        }`}
                      >
                        <Icon size={18} />
                      </span>
                      <h3 className="mt-3.5 font-display text-sm font-semibold leading-snug text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">
                        {item.desc}
                      </p>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* panel: ejemplo 3D + kpis del servicio activo */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-10">
          <div>
            <p className="mb-4 text-center text-xs uppercase tracking-wider text-muted lg:text-left">
              {cap.chatLabel}
            </p>
            {demo}
          </div>

          <div>
            <p className="mb-4 text-center text-xs uppercase tracking-wider text-muted lg:text-left">
              {cap.kpiLabel}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1"
              >
                {activeItem.kpis.map((k) => (
                  <div key={k.label} className="card !p-5">
                    <p className="font-display text-2xl font-semibold tracking-tight text-accent sm:text-3xl">
                      {k.value}
                    </p>
                    <p className="mt-1.5 text-sm leading-snug text-foreground-muted">
                      {k.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
