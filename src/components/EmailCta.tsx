"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

// Captura progresiva: el email se escribe aquí y llega ya puesto al paso 1
// de /diagnostico (?email=), donde solo faltan nombre y teléfono.
// Sin email válido, el botón lleva igual al formulario: nunca bloquea.
export function EmailCta({
  button,
  placeholder,
  label,
  origin,
  tone = "light",
  stacked = false,
}: {
  button: string;
  placeholder: string;
  /** Etiqueta accesible del campo. */
  label: string;
  /** Sección desde la que se envía, para GA4. */
  origin: string;
  /** "light" sobre fondo claro; "tape" sobre el amarillo del cierre. */
  tone?: "light" | "tape";
  /** Campo y botón uno encima de otro (columnas estrechas). */
  stacked?: boolean;
}) {
  const { lang, localize } = useLang();
  const router = useRouter();
  const id = useId();
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
    w.gtag?.("event", "email_cta", { origen: origin, idioma: lang, con_email: valid });
    const base = localize("/diagnostico");
    router.push(valid ? `${base}?email=${encodeURIComponent(value)}` : base);
  };

  const inputClass =
    tone === "tape"
      ? "border-ink bg-background text-ink placeholder:text-ink/55"
      : "border-ink bg-white text-foreground placeholder:text-muted";

  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-full max-w-xl flex-col gap-3 ${stacked ? "" : "sm:flex-row sm:gap-0"}`}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className={`min-h-[3.25rem] w-full min-w-0 border-2 px-4 text-base outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink ${stacked ? "" : "sm:flex-1 sm:border-r-0"} ${inputClass}`}
      />
      <button type="submit" className="btn-primary shrink-0 whitespace-nowrap sm:min-h-[3.25rem]">
        {button}
        <ArrowRight size={17} aria-hidden />
      </button>
    </form>
  );
}
