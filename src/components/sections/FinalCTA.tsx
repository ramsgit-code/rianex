"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section>
      <div className="section">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-surface border border-border rounded-2xl p-10 md:p-16 text-center max-w-2xl mx-auto"
        >
          <span className="tag mb-6 inline-block">Diagnostico gratuito</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            ¿Tu proceso comercial podria{" "}
            <span className="text-accent">funcionar sin ti encima?</span>
          </h2>
          <Link href="/diagnostico" className="btn-primary text-base px-8 py-3.5 inline-flex">
            Solicita tu diagnostico gratuito
            <ArrowRight size={18} />
          </Link>
          <p className="text-xs text-muted mt-5">
            30 min · Gratis · Sin compromiso
          </p>
        </m.div>
      </div>
    </section>
  );
}
