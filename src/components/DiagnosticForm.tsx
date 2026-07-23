"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { getForm } from "@/lib/formContent";

const TOTAL_STEPS = 5;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground-muted">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputClass =
  "bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors";

const selectClass =
  "bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent transition-colors appearance-none";

export function DiagnosticForm() {
  const { lang } = useLang();
  const f = getForm(lang);

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  // datos para prellenar el formulario del calendario de GHL tras enviar
  const [booking, setBooking] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  } | null>(null);

  const schema = useMemo(
    () =>
      z.object({
        nombre: z.string().min(2, f.errors.nombre),
        empresa: z.string().min(2, f.errors.empresa),
        web: z.string().optional(),
        pais: z.string().min(2, f.errors.pais),
        sector: z.string().min(1, f.errors.sector),
        tipo_negocio: z.string().min(1, f.errors.required),
        tamano_equipo: z.string().min(1, f.errors.required),
        volumen_leads: z.string().min(1, f.errors.required),
        crm_actual: z.string().min(1, f.errors.required),
        usa_whatsapp: z.string().min(1, f.errors.required),
        tiempo_propuesta: z.string().min(1, f.errors.required),
        problema_principal: z.string().min(5, f.errors.problema),
        objetivo: z.array(z.string()).min(1, f.errors.objetivo),
        urgencia: z.string().min(1, f.errors.required),
        presupuesto: z.string().min(1, f.errors.required),
        email: z.string().email(f.errors.email),
        telefono: z.string().min(7, f.errors.telefono),
        consent: z.literal(true, {
          errorMap: () => ({ message: f.errors.consent }),
        }),
        como_conociste: z.string().min(1, f.errors.required),
        notas: z.string().optional(),
      }),
    [f]
  );

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { objetivo: [] },
  });

  const objetivoValue = watch("objetivo") || [];

  const toggleObjetivo = (val: string) => {
    if (objetivoValue.includes(val)) {
      setValue("objetivo", objetivoValue.filter((v) => v !== val), { shouldValidate: true });
    } else if (objetivoValue.length < 2) {
      setValue("objetivo", [...objetivoValue, val], { shouldValidate: true });
    }
  };

  const stepFields: Record<number, (keyof FormData)[]> = {
    1: ["nombre", "email", "telefono", "consent"],
    2: ["empresa", "pais", "sector"],
    3: ["tipo_negocio", "tamano_equipo", "volumen_leads"],
    4: ["crm_actual", "usa_whatsapp", "tiempo_propuesta", "problema_principal"],
    5: ["objetivo", "urgencia", "presupuesto", "como_conociste"],
  };

  // Captura parcial: en cuanto el lead da contacto (paso 1) lo mandamos a GHL
  // con etiqueta "lead-incompleto" para arrancar el nurturing aunque abandone.
  const partialSent = useRef(false);
  const sendPartial = () => {
    if (partialSent.current) return;
    partialSent.current = true;
    const nombre = watch("nombre");
    const email = watch("email");
    const telefono = watch("telefono");
    if (!email || !telefono) return;
    // no bloqueante: si falla, el usuario sigue igual
    fetch("/api/leads/partial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email: email.trim().toLowerCase(), telefono }),
      keepalive: true,
    }).catch(() => {
      partialSent.current = false;
    });
  };

  const nextStep = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) {
      if (step === 1) sendPartial();
      setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data: FormData) => {
    // normalizamos email y web siempre en minúsculas
    data.email = data.email.trim().toLowerCase();
    if (data.web) data.web = data.web.trim().toLowerCase();
    setLoading(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setSubmitError(err.error ?? f.errors.sendFail);
        return;
      }
      const [bFirst, ...bRest] = data.nombre.trim().split(" ");
      setBooking({
        firstName: bFirst,
        lastName: bRest.join(" "),
        email: data.email,
        phone: data.telefono,
      });
      setSubmitted(true);
    } catch {
      setSubmitError(f.errors.connFail);
    } finally {
      setLoading(false);
    }
  };

  const Select = ({
    name,
    options,
  }: {
    name: keyof FormData;
    options: readonly (readonly [string, string])[];
  }) => (
    <select {...register(name)} className={selectClass}>
      <option value="">{f.select}</option>
      {options.map(([v, l]) => (
        <option key={v} value={v}>
          {l}
        </option>
      ))}
    </select>
  );

  // Enlace al calendario de GHL con los datos del lead como parámetros,
  // para que su formulario de reserva salga ya prellenado (solo confirmar).
  const buildCalendarUrl = () => {
    const base = process.env.NEXT_PUBLIC_CALENDAR_URL || "#";
    if (!booking || base === "#") return base;
    const params = new URLSearchParams({
      first_name: booking.firstName,
      last_name: booking.lastName,
      email: booking.email,
      phone: booking.phone,
    });
    return `${base}${base.includes("?") ? "&" : "?"}${params.toString()}`;
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-12 text-center"
      >
        <CheckCircle size={48} className="mx-auto mb-6 text-accent" />
        <h2 className="mb-3 text-2xl font-bold text-foreground">{f.success.title}</h2>
        <p className="mx-auto mb-8 max-w-md text-foreground-muted">{f.success.body}</p>
        <a
          href={buildCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary px-8 py-3 text-base"
        >
          {f.success.button} <ArrowRight size={16} />
        </a>
        <p className="mt-4 text-xs text-muted">{f.success.note}</p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-foreground-muted">
            {f.progress(step, TOTAL_STEPS, f.stepTitles[step - 1])}
          </span>
          <span className="text-xs text-muted">
            {Math.round((step / TOTAL_STEPS) * 100)}%
          </span>
        </div>
        <div className="h-1 rounded-full bg-border">
          <motion.div
            className="h-1 rounded-full bg-accent"
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-5"
          >
            {step === 1 && (
              <>
                <p className="-mt-1 text-sm text-muted">{f.contactHint}</p>
                <Field label={f.labels.nombre} error={errors.nombre?.message}>
                  <input {...register("nombre")} placeholder={f.ph.nombre} className={inputClass} />
                </Field>
                <Field label={f.labels.email} error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    inputMode="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    autoComplete="email"
                    placeholder={f.ph.email}
                    className={inputClass}
                  />
                </Field>
                <Field label={f.labels.telefono} error={errors.telefono?.message}>
                  <input {...register("telefono")} placeholder={f.ph.telefono} className={inputClass} />
                </Field>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-start gap-2.5 text-sm text-foreground-muted">
                    <input
                      type="checkbox"
                      {...register("consent")}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                    />
                    <span>
                      {f.consentPre}
                      <Link href="/privacidad" target="_blank" className="text-accent underline underline-offset-2">
                        {f.consentLink}
                      </Link>
                      {f.consentPost}
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-xs text-red-400">{errors.consent.message}</p>
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <Field label={f.labels.empresa} error={errors.empresa?.message}>
                  <input {...register("empresa")} placeholder={f.ph.empresa} className={inputClass} />
                </Field>
                <Field label={f.labels.web}>
                  <input
                    {...register("web")}
                    inputMode="url"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder={f.ph.web}
                    className={inputClass}
                  />
                </Field>
                <Field label={f.labels.pais} error={errors.pais?.message}>
                  <input {...register("pais")} placeholder={f.ph.pais} className={inputClass} />
                </Field>
                <Field label={f.labels.sector} error={errors.sector?.message}>
                  <Select name="sector" options={f.opts.sector} />
                </Field>
              </>
            )}

            {step === 3 && (
              <>
                <Field label={f.labels.tipoNegocio} error={errors.tipo_negocio?.message}>
                  <Select name="tipo_negocio" options={f.opts.tipoNegocio} />
                </Field>
                <Field label={f.labels.tamanoEquipo} error={errors.tamano_equipo?.message}>
                  <Select name="tamano_equipo" options={f.opts.tamanoEquipo} />
                </Field>
                <Field label={f.labels.volumenLeads} error={errors.volumen_leads?.message}>
                  <Select name="volumen_leads" options={f.opts.volumenLeads} />
                </Field>
              </>
            )}

            {step === 4 && (
              <>
                <Field label={f.labels.crmActual} error={errors.crm_actual?.message}>
                  <Select name="crm_actual" options={f.opts.crmActual} />
                </Field>
                <Field label={f.labels.usaWhatsapp} error={errors.usa_whatsapp?.message}>
                  <Select name="usa_whatsapp" options={f.opts.usaWhatsapp} />
                </Field>
                <Field label={f.labels.tiempoPropuesta} error={errors.tiempo_propuesta?.message}>
                  <Select name="tiempo_propuesta" options={f.opts.tiempoPropuesta} />
                </Field>
                <Field label={f.labels.problema} error={errors.problema_principal?.message}>
                  <textarea
                    {...register("problema_principal")}
                    placeholder={f.ph.problema}
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </>
            )}

            {step === 5 && (
              <>
                <Field label={f.labels.objetivo} error={errors.objetivo?.message}>
                  <div className="grid grid-cols-1 gap-2">
                    {f.opts.objetivo.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleObjetivo(opt)}
                        className={`rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                          objetivoValue.includes(opt)
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border text-foreground-muted hover:border-foreground-muted"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label={f.labels.urgencia} error={errors.urgencia?.message}>
                  <Select name="urgencia" options={f.opts.urgencia} />
                </Field>
                <Field label={f.labels.presupuesto} error={errors.presupuesto?.message}>
                  <Select name="presupuesto" options={f.opts.presupuesto} />
                </Field>
                <Field label={f.labels.comoConociste} error={errors.como_conociste?.message}>
                  <Select name="como_conociste" options={f.opts.comoConociste} />
                </Field>
                <Field label={f.labels.notas}>
                  <textarea
                    {...register("notas")}
                    placeholder={f.ph.notas}
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <button type="button" onClick={prevStep} className="btn-secondary">
              <ArrowLeft size={16} /> {f.prev}
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <button type="button" onClick={nextStep} className="btn-primary">
              {f.next} <ArrowRight size={16} />
            </button>
          ) : (
            <div className="flex flex-col items-end gap-2">
              {submitError && <p className="text-sm text-red-400">{submitError}</p>}
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> {f.sending}
                  </>
                ) : (
                  <>
                    {f.submit} <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
