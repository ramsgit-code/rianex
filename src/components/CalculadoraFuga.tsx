"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localizePath, type Lang } from "@/lib/i18n";

// Calculadora de fuga de leads. Toda la cuenta se hace en el navegador: no
// se envia nada a ningun sitio salvo un evento anonimo de GA4 la primera vez
// que alguien cambia un valor (para saber si la herramienta se usa).

const inputClass =
  "w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent transition-colors";

const T = {
  es: {
    leakTitle: "1 · Lo que se pierde en la fuga",
    leads: "Leads que entran al mes",
    leak: "% que se pierde sin llegar a una conversación",
    leakHelp: "En procesos comerciales sin sistema suele estar entre el 30% y el 60%.",
    close: "% de conversaciones que acaban en venta",
    ticket: "Ticket medio (€)",
    manualTitle: "2 · Lo que cuesta el trabajo manual",
    times: "Veces a la semana que se repite la tarea",
    minutes: "Minutos que lleva cada vez",
    hourly: "Coste por hora de quien la hace (€)",
    hourlyHelp: "Su coste real para la empresa, no el sueldo bruto dividido entre horas.",
    resultTitle: "Tu resultado al año",
    lostLeads: "leads que no llegan a una conversación",
    lostSales: "ventas que no se cierran",
    lostRevenue: "en ventas perdidas por la fuga",
    hours: "horas de trabajo manual",
    manualCost: "en coste de trabajo manual",
    total: "Total al año",
    per10: "Cada 10 puntos de fuga que recuperes valen",
    perYear: "al año",
    ratio: "La fuga pesa {x} veces más que las horas: es donde está el dinero.",
    ctaTitle: "¿Lo calculamos con tus datos reales?",
    ctaText: "En la auditoría gratuita de 30 minutos miramos estos números sobre tu proceso y sale qué automatizar primero.",
    cta: "Obtén mi Auditoría Gratuita",
    locale: "es-ES",
  },
  en: {
    leakTitle: "1 · What leaks out of the funnel",
    leads: "Leads coming in per month",
    leak: "% lost before reaching a conversation",
    leakHelp: "In sales processes without a system it is usually between 30% and 60%.",
    close: "% of conversations that end in a sale",
    ticket: "Average deal value (€)",
    manualTitle: "2 · What the manual work costs",
    times: "Times per week the task repeats",
    minutes: "Minutes it takes each time",
    hourly: "Hourly cost of whoever does it (€)",
    hourlyHelp: "Their real cost to the company, not gross salary divided by hours.",
    resultTitle: "Your result per year",
    lostLeads: "leads that never reach a conversation",
    lostSales: "sales that are not closed",
    lostRevenue: "in sales lost to leakage",
    hours: "hours of manual work",
    manualCost: "in manual work cost",
    total: "Total per year",
    per10: "Every 10 points of leakage you recover are worth",
    perYear: "per year",
    ratio: "Leakage weighs {x} times more than the hours: that is where the money is.",
    ctaTitle: "Shall we run it with your real numbers?",
    ctaText: "In the free 30-minute audit we look at these numbers on your process and you get what to automate first.",
    cta: "Get my Free Audit",
    locale: "en-GB",
  },
} as const;

type Field = { key: keyof typeof DEFAULTS; label: string; help?: string; max?: number };

const DEFAULTS = {
  leads: 100,
  leak: 30,
  close: 20,
  ticket: 1000,
  times: 50,
  minutes: 10,
  hourly: 25,
};

function clamp(n: number, max?: number) {
  if (!Number.isFinite(n) || n < 0) return 0;
  return max !== undefined ? Math.min(n, max) : n;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function CalculadoraFuga({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [v, setV] = useState(DEFAULTS);
  const tracked = useRef(false);

  const r = useMemo(() => {
    const leadsYear = v.leads * 12;
    const lostLeads = leadsYear * (v.leak / 100);
    const lostSales = lostLeads * (v.close / 100);
    const lostRevenue = lostSales * v.ticket;
    const hours = (v.times * 52 * v.minutes) / 60;
    const manualCost = hours * v.hourly;
    const per10 = leadsYear * 0.1 * (v.close / 100) * v.ticket;
    return { lostLeads, lostSales, lostRevenue, hours, manualCost, total: lostRevenue + manualCost, per10 };
  }, [v]);

  const eur = new Intl.NumberFormat(t.locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const num = new Intl.NumberFormat(t.locale, { maximumFractionDigits: 0 });

  const update = (key: keyof typeof DEFAULTS, raw: string, max?: number) => {
    setV((prev) => ({ ...prev, [key]: clamp(Number(raw), max) }));
    if (!tracked.current) {
      tracked.current = true;
      window.gtag?.("event", "calculadora_fuga_uso", { idioma: lang });
    }
  };

  // Un segundo evento con el resultado redondeado, cuando el visitante deja
  // de teclear: dice que tamaño de negocio usa la herramienta, sin datos suyos.
  useEffect(() => {
    if (!tracked.current) return;
    const id = setTimeout(() => {
      window.gtag?.("event", "calculadora_fuga_resultado", {
        idioma: lang,
        total_k: Math.round(r.total / 1000),
      });
    }, 2500);
    return () => clearTimeout(id);
  }, [r.total, lang]);

  const leakFields: Field[] = [
    { key: "leads", label: t.leads },
    { key: "leak", label: t.leak, help: t.leakHelp, max: 100 },
    { key: "close", label: t.close, max: 100 },
    { key: "ticket", label: t.ticket },
  ];
  const manualFields: Field[] = [
    { key: "times", label: t.times },
    { key: "minutes", label: t.minutes },
    { key: "hourly", label: t.hourly, help: t.hourlyHelp },
  ];

  const renderField = (f: Field) => (
    <label key={f.key} className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground-muted">{f.label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        max={f.max}
        value={v[f.key]}
        onChange={(e) => update(f.key, e.target.value, f.max)}
        className={inputClass}
      />
      {f.help && <span className="text-xs text-muted">{f.help}</span>}
    </label>
  );

  const ratio = r.manualCost > 0 ? r.lostRevenue / r.manualCost : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
      <div className="flex flex-col gap-6">
        <fieldset className="card flex flex-col gap-4">
          <legend className="sr-only">{t.leakTitle}</legend>
          <h2 className="font-display text-lg font-semibold text-foreground">{t.leakTitle}</h2>
          {leakFields.map(renderField)}
        </fieldset>
        <fieldset className="card flex flex-col gap-4">
          <legend className="sr-only">{t.manualTitle}</legend>
          <h2 className="font-display text-lg font-semibold text-foreground">{t.manualTitle}</h2>
          {manualFields.map(renderField)}
        </fieldset>
      </div>

      <div className="flex flex-col gap-5 lg:sticky lg:top-28" aria-live="polite">
        <section className="card border-accent/30 bg-accent/[0.04]">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-accent-text">{t.resultTitle}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="font-display text-2xl font-semibold text-foreground">{num.format(r.lostLeads)}</p>
              <p className="text-sm text-foreground-muted">{t.lostLeads}</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-foreground">{num.format(r.lostSales)}</p>
              <p className="text-sm text-foreground-muted">{t.lostSales}</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-accent-text">{eur.format(r.lostRevenue)}</p>
              <p className="text-sm text-foreground-muted">{t.lostRevenue}</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-accent-text">{eur.format(r.manualCost)}</p>
              <p className="text-sm text-foreground-muted">
                {t.manualCost} ({num.format(r.hours)} {t.hours})
              </p>
            </div>
          </div>
          <div className="mt-5 border-t border-ink/[0.08] pt-4">
            <p className="text-sm text-foreground-muted">{t.total}</p>
            <p className="font-display text-4xl font-semibold tracking-tight text-foreground">{eur.format(r.total)}</p>
            <p className="mt-3 text-sm text-foreground-muted">
              {t.per10} <span className="font-semibold text-foreground">{eur.format(r.per10)}</span> {t.perYear}.
            </p>
            {ratio >= 1.5 && (
              <p className="mt-2 text-sm text-foreground-muted">
                {t.ratio.replace("{x}", new Intl.NumberFormat(t.locale, { maximumFractionDigits: 1 }).format(ratio))}
              </p>
            )}
          </div>
        </section>

        <section className="card flex flex-col items-start gap-3">
          <h2 className="font-display text-lg font-semibold text-foreground">{t.ctaTitle}</h2>
          <p className="text-sm leading-relaxed text-foreground-muted">{t.ctaText}</p>
          <Link href={localizePath("/diagnostico", lang)} className="btn-primary">
            {t.cta}
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </div>
  );
}
