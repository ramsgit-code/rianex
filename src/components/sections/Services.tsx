"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, Filter, FileText, MessageSquare, Phone } from "lucide-react";

const services = [
  {
    icon: Filter,
    tag: "Sistema A",
    title: "Lead Qualification",
    desc: "Filtra automaticamente quien vale tu tiempo antes de que hables con ellos.",
    href: "/servicios#lead-qualification-system",
  },
  {
    icon: FileText,
    tag: "Sistema B",
    title: "Proposal Automation",
    desc: "Propuestas profesionales listas en minutos, no en dias.",
    href: "/servicios#proposal-automation",
  },
  {
    icon: MessageSquare,
    tag: "Sistema C",
    title: "WhatsApp + CRM",
    desc: "Seguimiento automatico que no suena a robot, integrado con Go High Level.",
    href: "/servicios#whatsapp-crm-automation",
  },
  {
    icon: Phone,
    tag: "Sistema D",
    title: "Voice AI Agents",
    desc: "Agentes de voz con Vapi y Retell que califican, agendan y atienden 24/7.",
    href: "/servicios#voice-ai-agents",
  },
];

export function Services() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="section">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="tag">Servicios</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Cuatro sistemas. Un objetivo.
          </h2>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <m.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="card group hover:border-accent/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-accent" />
                </div>
                <p className="text-xs text-muted font-mono mb-1">{s.tag}</p>
                <h3 className="font-semibold text-foreground mb-2 text-lg">{s.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed mb-6">{s.desc}</p>
                <Link
                  href={s.href}
                  className="text-sm text-accent flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Ver mas <ArrowRight size={14} />
                </Link>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
