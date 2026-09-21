"use client";

import { useEffect, useState, useRef } from "react";
import { Check, Trash2, Loader2, Upload, X } from "lucide-react";
import { fileToAvatar } from "@/lib/avatar";

type T = {
  id: string;
  name: string;
  company: string | null;
  role: string | null;
  quote: string;
  imageUrl: string | null;
  approved: boolean;
  createdAt: string;
};

const inputClass =
  "bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors";

export function TestimonialsAdmin() {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", role: "", quote: "" });
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/testimonials");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (id: string, approved: boolean) => {
    await fetch(`/api/admin/testimonials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: !approved }),
    });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("¿Borrar este testimonio?")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    load();
  };

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    setImage(await fileToAvatar(f));
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, imageUrl: image, approved: true }),
    });
    setForm({ name: "", company: "", role: "", quote: "" });
    setImage(null);
    if (fileRef.current) fileRef.current.value = "";
    setSaving(false);
    load();
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Testimonios</h1>
        <p className="text-sm text-foreground-muted">
          Aprueba, borra o añade testimonios. Los que envía la gente entran como
          “pendientes”.
        </p>
      </div>

      {/* añadir a mano */}
      <form
        onSubmit={add}
        className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      >
        <p className="text-sm font-semibold text-foreground">Añadir testimonio</p>
        <div className="flex items-start gap-4">
          {/* foto */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border bg-background">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted">
                  <Upload size={18} />
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => onFile(e.target.files?.[0])}
              className="w-28 text-[11px] text-muted file:mr-1 file:rounded file:border-0 file:bg-border file:px-2 file:py-1 file:text-foreground"
            />
            {image && (
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="flex items-center gap-1 text-[11px] text-muted hover:text-foreground"
              >
                <X size={11} /> quitar
              </button>
            )}
          </div>

          <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
            <input
              required
              placeholder="Nombre *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
            <input
              placeholder="Empresa"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className={inputClass}
            />
            <input
              placeholder="Cargo"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <textarea
          required
          rows={3}
          placeholder="Testimonio *"
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
          className={`${inputClass} resize-none`}
        />
        <button type="submit" disabled={saving} className="btn-primary w-fit">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
          Añadir y publicar
        </button>
      </form>

      {/* lista */}
      {loading ? (
        <p className="text-sm text-muted">Cargando...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted">Aún no hay testimonios.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((t) => (
            <li
              key={t.id}
              className="flex items-start gap-4 rounded-xl border border-border bg-surface p-4"
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border bg-background">
                {t.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.imageUrl} alt={t.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted">
                    {t.name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{t.name}</span>
                  <span className="text-xs text-muted">
                    {[t.role, t.company].filter(Boolean).join(" · ")}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      t.approved
                        ? "bg-accent/15 text-accent-text"
                        : "bg-yellow-500/15 text-yellow-800"
                    }`}
                  >
                    {t.approved ? "Publicado" : "Pendiente"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-foreground-muted">{t.quote}</p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => toggle(t.id, t.approved)}
                  title={t.approved ? "Despublicar" : "Aprobar"}
                  className="rounded-md border border-border p-2 text-foreground-muted hover:text-accent-text"
                >
                  <Check size={15} />
                </button>
                <button
                  onClick={() => remove(t.id)}
                  title="Borrar"
                  className="rounded-md border border-border p-2 text-foreground-muted hover:text-red-400"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
