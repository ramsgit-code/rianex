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

        {/* rejilla horizontal: las 6 tarjetas de servicio, siempre visibles sin scroll */}
        <Reveal delay={0.05}>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {cap.items.map((item, i) => {
              const Icon = icons[i % icons.length];
              const isActive = active === i;
              return (
                <div
                  key={item.title}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="cursor-pointer"
                >
                  <TiltCard className="h-full">
                    <div
                      className={`card relative h-full overflow-hidden !p-4 transition-shadow sm:!p-5 ${
                        isActive
                          ? "shadow-[0_0_0_1px_rgba(232,255,0,0.45),0_0_30px_-8px_rgba(232,255,0,0.4)]"
                          : ""
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl border text-accent transition-colors sm:h-10 sm:w-10 ${
                          isActive
                            ? "border-accent/50 bg-accent/[0.15]"
                            : "border-accent/25 bg-accent/[0.08]"
                        }`}
                      >
                        <Icon size={17} />
                      </span>
                      <h3 className="mt-3 font-display text-xs font-semibold leading-snug text-foreground sm:mt-3.5 sm:text-sm">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 hidden text-xs leading-relaxed text-foreground-muted sm:block">
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
