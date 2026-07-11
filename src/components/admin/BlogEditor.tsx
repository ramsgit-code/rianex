"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Languages, Loader2 } from "lucide-react";
import { slugify } from "@/lib/slug";

type BlogPostInput = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  titleEn: string;
  descriptionEn: string;
  contentEn: string;
  tags: string;
  published: boolean;
};

export function BlogEditor({ initial }: { initial?: BlogPostInput }) {
  const router = useRouter();
  const [form, setForm] = useState<BlogPostInput>(
    initial ?? {
      title: "",
      slug: "",
      description: "",
      content: "",
      titleEn: "",
      descriptionEn: "",
      contentEn: "",
      tags: "",
      published: false,
    }
  );
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState("");

  const update = (key: keyof BlogPostInput, value: string | boolean) => {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "title" && !initial?.id) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  };

  const autoTranslate = async () => {
    setTranslating(true);
    setError("");
    try {
      const res = await fetch("/api/admin/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          content: form.content,
        }),
      });
      if (res.ok) {
        const d = await res.json();
        setForm((f) => ({
          ...f,
          titleEn: d.titleEn ?? f.titleEn,
          descriptionEn: d.descriptionEn ?? f.descriptionEn,
          contentEn: d.contentEn ?? f.contentEn,
        }));
      } else {
        setError("No se pudo traducir.");
      }
    } catch {
      setError("No se pudo traducir.");
    } finally {
      setTranslating(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const url = initial?.id ? `/api/admin/blog/${initial.id}` : "/api/admin/blog";
    const method = initial?.id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Error al guardar");
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  };

  const inputClass =
    "w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent";
  const label = "text-xs text-muted block mb-1";

  return (
    <form onSubmit={submit} className="flex max-w-2xl flex-col gap-4">
      {/* ── Español ── */}
      <p className="text-sm font-semibold text-foreground">Español</p>
      <div>
        <label className={label}>Título</label>
        <input className={inputClass} value={form.title} onChange={(e) => update("title", e.target.value)} required />
      </div>
      <div>
        <label className={label}>Slug</label>
        <input className={inputClass} value={form.slug} onChange={(e) => update("slug", e.target.value)} required />
      </div>
      <div>
        <label className={label}>Descripción</label>
        <input className={inputClass} value={form.description} onChange={(e) => update("description", e.target.value)} required />
      </div>
      <div>
        <label className={label}>Tags (separados por coma)</label>
        <input className={inputClass} value={form.tags} onChange={(e) => update("tags", e.target.value)} placeholder="automatización, gohighlevel" />
      </div>
      <div>
        <label className={label}>Contenido (markdown)</label>
        <textarea className={`${inputClass} min-h-[280px] font-mono`} value={form.content} onChange={(e) => update("content", e.target.value)} required />
      </div>

      {/* ── Inglés ── */}
      <div className="mt-2 flex items-center justify-between border-t border-border pt-5">
        <p className="text-sm font-semibold text-foreground">Inglés</p>
        <button
          type="button"
          onClick={autoTranslate}
          disabled={translating}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-foreground-muted hover:border-accent hover:text-accent"
        >
          {translating ? <Loader2 size={13} className="animate-spin" /> : <Languages size={13} />}
          Traducir del español
        </button>
      </div>
      <p className="-mt-2 text-xs text-muted">
        Puedes traducir automáticamente y luego retocar a mano. Se guarda tal cual lo dejes.
      </p>
      <div>
        <label className={label}>Title (EN)</label>
        <input className={inputClass} value={form.titleEn} onChange={(e) => update("titleEn", e.target.value)} />
      </div>
      <div>
        <label className={label}>Description (EN)</label>
        <input className={inputClass} value={form.descriptionEn} onChange={(e) => update("descriptionEn", e.target.value)} />
      </div>
      <div>
        <label className={label}>Content (EN, markdown)</label>
        <textarea className={`${inputClass} min-h-[280px] font-mono`} value={form.contentEn} onChange={(e) => update("contentEn", e.target.value)} />
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground-muted">
        <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} className="rounded border-border" />
        Publicado
      </label>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" className="btn-primary w-fit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
