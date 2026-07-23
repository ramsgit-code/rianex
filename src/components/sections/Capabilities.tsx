"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Workflow, Filter, Rocket, Boxes, Network, Bot } from "lucide-react";
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

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () =>
      setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 8);
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

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

        {/* fila horizontal (6 columnas) con scroll; icono a la derecha indica que hay mas */}
        <Reveal delay={0.05}>
          <div className="relative mt-10">
            <div
              ref={scrollerRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
            >
              {cap.items.map((item, i) => {
                const Icon = icons[i % icons.length];
                const isActive = active === i;
                return (
                  <div
                    key={item.title}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="w-[200px] shrink-0 snap-start cursor-pointer sm:w-[220px]"
                  >
                    <TiltCard className="h-full">
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

            {/* fundido + icono animado: indica que se puede desplazar a la derecha */}
            <AnimatePresence>
              {canScrollRight && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-y-0 right-0 flex w-16 items-center justify-end bg-gradient-to-l from-background via-background/85 to-transparent pb-2 pr-0.5 sm:w-20"
                >
                  <motion.button
                    type="button"
                    aria-label={cap.scrollHint}
                    onClick={() =>
                      scrollerRef.current?.scrollBy({ left: 260, behavior: "smooth" })
                    }
                    className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-background text-accent shadow-[0_0_16px_-6px_rgba(232,255,0,0.6)]"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronRight size={18} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
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
