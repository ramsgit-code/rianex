"use client";

import { useState } from "react";
import { Quote, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";
import type { TestimonialItem } from "@/components/sections/Testimonials";

const inputClass =
  "bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors";

export function TestimoniosView({ items }: { items: TestimonialItem[] }) {
  const { c } = useLang();
  const t = c.testimonials;

  const [form, setForm] = useState({ name: "", company: "", role: "", quote: "" });
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setState(res.ok ? "ok" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <PageShell tag={t.tag} title={t.pageTitle} description={t.pageDesc} wide>
      {/* lista */}
      {items.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.05}>
              <figure className="card flex h-full flex-col">
                <Quote size={20} className="text-accent/70" />
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-white/[0.08] pt-4">
                  <p className="font-display text-sm font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="text-xs text-foreground-muted">
                    {[item.role, item.company].filter(Boolean).join(" · ")}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">{t.empty}</p>
      )}

      {/* formulario */}
      <div className="mt-14 max-w-xl">
        <div className="card">
          <h2 className="font-display text-xl font-semibold text-foreground">
            {t.formTitle}
          </h2>

          {state === "ok" ? (
            <div className="py-8 text-center">
              <CheckCircle size={40} className="mx-auto mb-4 text-accent" />
              <p className="text-foreground-muted">{t.success}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-foreground-muted">
                    {t.nameLabel}
                  </span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.namePh}
                    className={inputClass}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-foreground-muted">
                    {t.companyLabel}
                  </span>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder={t.companyPh}
                    className={inputClass}
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground-muted">
                  {t.roleLabel}
                </span>
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder={t.rolePh}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground-muted">
                  {t.quoteLabel}
                </span>
                <textarea
                  required
                  rows={4}
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  placeholder={t.quotePh}
                  className={`${inputClass} resize-none`}
                />
              </label>

              {state === "error" && (
                <p className="text-sm text-red-400">{t.error}</p>
              )}

              <button
                type="submit"
                disabled={state === "loading"}
                className="btn-primary w-fit"
              >
                {state === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> {t.sending}
                  </>
                ) : (
                  <>
                    {t.submit} <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </PageShell>
  );
}
