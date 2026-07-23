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

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-10">
          {/* rejilla de tarjetas 3D */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cap.items.map((item, i) => {
              const Icon = icons[i % icons.length];
              const isActive = active === i;
              return (
                <Reveal key={item.title} delay={i * 0.05} className="h-full">
                  <div
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="h-full cursor-pointer"
                  >
                    <TiltCard className="h-full">
                      <div
                        className={`card relative h-full overflow-hidden !p-6 transition-shadow ${
                          isActive
                            ? "shadow-[0_0_0_1px_rgba(232,255,0,0.45),0_0_30px_-8px_rgba(232,255,0,0.4)]"
                            : ""
                        }`}
                      >
                        <span className="absolute right-4 top-3 font-display text-2xl font-bold text-white/[0.06]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`flex h-11 w-11 items-center justify-center rounded-xl border text-accent transition-colors ${
                            isActive
                              ? "border-accent/50 bg-accent/[0.15]"
                              : "border-accent/25 bg-accent/[0.08]"
                          }`}
                        >
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

                    {/* ejemplo inline en móvil/tablet, bajo la tarjeta activa */}
                    <div className="lg:hidden">
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="flex justify-center pt-4">
                              <CapabilityDemo index={i} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* panel del ejemplo 3D — escritorio (sticky) */}
          <div className="hidden lg:sticky lg:top-28 lg:block">
            <p className="mb-4 text-xs uppercase tracking-wider text-muted">
              {cap.chatLabel}
            </p>
            {demo}
          </div>
        </div>
      </div>
    </section>
  );
}
