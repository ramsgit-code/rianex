"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2 } from "lucide-react";

type Lead = {
  id: string;
  score: number;
  tier: string;
  ghlSynced: boolean;
  createdAt: Date | string;
  payload: unknown;
};

const tiers = ["", "cold", "warm", "hot", "premium"];

const inputClass =
  "bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors";

const SECTORES = ["salud", "formacion", "eventos", "consultoria", "agencia", "retail", "otro"];
const PRESUPUESTOS = ["<1000", "1000-3000", "3000-7000", ">7000"];
const URGENCIAS = ["prisa", "1-3meses", "explorando"];

export function LeadsTable({
  leads,
  activeTier,
}: {
  leads: Lead[];
  activeTier?: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Lead | null>(null);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    sector: "",
    presupuesto: "",
    urgencia: "",
  });

  const addLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ nombre: "", empresa: "", email: "", telefono: "", sector: "", presupuesto: "", urgencia: "" });
    setSaving(false);
    setAdding(false);
    router.refresh();
  };

  const deleteLead = async (id: string) => {
    if (!confirm("¿Borrar este lead?")) return;
    setDeleting(true);
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    setDeleting(false);
    setSelected(null);
    router.refresh();
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {tiers.map((t) => (
            <Link
              key={t || "all"}
              href={t ? `/admin/leads?tier=${t}` : "/admin/leads"}
              className={`rounded-md border px-3 py-1 text-xs ${
                (activeTier ?? "") === t
                  ? "border-accent bg-accent text-black"
                  : "border-border text-muted"
              }`}
            >
              {t || "Todos"}
            </Link>
          ))}
        </div>
        <button
          onClick={() => setAdding(true)}
          className="btn-primary px-3 py-1.5 text-xs"
        >
          <Plus size={14} /> Añadir lead
        </button>
      </div>

      {leads.length === 0 ? (
        <p className="text-sm text-muted">Sin envíos todavía.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-muted">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Empresa</th>
                <th className="px-4 py-2">Tier</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">GHL</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const p = (lead.payload ?? {}) as {
                  nombre?: string;
                  empresa?: string;
                };
                return (
                  <tr
                    key={lead.id}
                    className="cursor-pointer border-t border-border hover:bg-surface/50"
                  >
                    <td className="px-4 py-3 text-foreground" onClick={() => setSelected(lead)}>
                      {p.nombre ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-foreground-muted" onClick={() => setSelected(lead)}>
                      {p.empresa ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-accent" onClick={() => setSelected(lead)}>{lead.tier}</td>
                    <td className="px-4 py-3" onClick={() => setSelected(lead)}>{lead.score}</td>
                    <td className="px-4 py-3" onClick={() => setSelected(lead)}>
                      <span className={lead.ghlSynced ? "text-accent" : "text-muted"}>
                        {lead.ghlSynced ? "Sí" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted" onClick={() => setSelected(lead)}>
                      {new Date(lead.createdAt).toLocaleString("es-ES")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="text-muted hover:text-red-400"
                        title="Borrar"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* modal detalle */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="card max-h-[80vh] w-full max-w-lg overflow-auto">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="font-medium text-foreground">Detalle del lead</h2>
              <button onClick={() => setSelected(null)} className="text-muted hover:text-foreground">
                Cerrar
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-xs text-foreground-muted">
              {JSON.stringify(selected.payload, null, 2)}
            </pre>
            <button
              onClick={() => deleteLead(selected.id)}
              disabled={deleting}
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
            >
              {deleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
              Borrar lead
            </button>
          </div>
        </div>
      )}

      {/* modal añadir */}
      {adding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <form onSubmit={addLead} className="card w-full max-w-lg">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="font-medium text-foreground">Añadir lead a mano</h2>
              <button type="button" onClick={() => setAdding(false)} className="text-muted hover:text-foreground">
                Cerrar
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input required placeholder="Nombre *" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={inputClass} />
              <input placeholder="Empresa" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} className={inputClass} />
              <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
              <input placeholder="Teléfono" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} className={inputClass} />
              <select value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} className={inputClass}>
                <option value="">Sector...</option>
                {SECTORES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={form.presupuesto} onChange={(e) => setForm({ ...form, presupuesto: e.target.value })} className={inputClass}>
                <option value="">Presupuesto...</option>
                {PRESUPUESTOS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={form.urgencia} onChange={(e) => setForm({ ...form, urgencia: e.target.value })} className={inputClass}>
                <option value="">Urgencia...</option>
                {URGENCIAS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <button type="submit" disabled={saving} className="btn-primary mt-5">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              Guardar lead
            </button>
            <p className="mt-3 text-xs text-muted">
              Se guarda en la tabla con su score/tier. No se envía a Go High Level.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
