"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  problem: string;
  forWho: string;
  deliverables: readonly string[];
};

export function ServiceCard({
  item,
  i,
  s,
}: {
  item: Service;
  i: number;
  s: {
    problemLabel: string;
    forWhoLabel: string;
    cta: string;
  };
}) {
  const [open, setOpen] = useState(false);

  return (
    <article className="card !p-6 sm:!p-9">
      {/* cabecera: siempre visible. En móvil actúa de toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-3 text-left sm:pointer-events-none"
      >
        <div className="flex items-start gap-3">
          <span className="font-display text-xl font-bold text-accent/40 sm:text-2xl">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground sm:text-2xl">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-accent">{item.tagline}</p>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`mt-1 shrink-0 text-muted transition-transform sm:hidden ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* detalle: colapsable en móvil, siempre visible en escritorio */}
      <div
        className={`${open ? "mt-6 block" : "hidden"} sm:mt-8 sm:grid sm:grid-cols-[1.1fr_1fr] sm:gap-8`}
      >
        <div>
          <p className="mb-3 text-sm leading-relaxed text-foreground-muted">
            <span className="text-muted">{s.problemLabel} </span>
            {item.problem}
          </p>
          <p className="text-sm leading-relaxed text-foreground-muted">
            <span className="text-muted">{s.forWhoLabel} </span>
            {item.forWho}
          </p>
          <Link
            href="/diagnostico"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
          >
            {s.cta}
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:mt-0">
          <ul className="flex flex-col gap-3">
            {item.deliverables.map((d) => (
              <li
                key={d}
                className="flex items-start gap-2.5 text-sm text-foreground-muted"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                  <Check size={12} />
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
