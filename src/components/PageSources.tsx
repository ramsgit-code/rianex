import type { Lang } from "@/lib/i18n";
import { formatDate } from "@/lib/lastmod";

// Pie de una ficha: fuentes externas que cita (si las hay) y fecha de la
// ultima revision. Los asistentes de IA prefieren citar paginas con fecha y
// con fuentes, y al lector le sirve para comprobar lo que lee.

const T = {
  es: { sources: "Fuentes", updated: "Actualizado el", by: "por" },
  en: { sources: "Sources", updated: "Updated on", by: "by" },
} as const;

export function PageSources({
  lang,
  updated,
  sources = [],
}: {
  lang: Lang;
  updated: string;
  sources?: { label: string; url: string }[];
}) {
  const t = T[lang];
  return (
    <footer className="border-t border-border pt-6 text-sm text-foreground-muted">
      {sources.length > 0 && (
        <>
          <h2 className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-foreground">
            {t.sources}
          </h2>
          <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5">
            {sources.map((s) => (
              <li key={s.url + s.label}>
                <a href={s.url} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-foreground">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      <p className={sources.length > 0 ? "mt-5" : undefined}>
        {t.updated} <time dateTime={updated}>{formatDate(updated, lang)}</time> {t.by}{" "}
        <a href={lang === "es" ? "/sobre-mi" : "/en/sobre-mi"} className="underline underline-offset-2 hover:text-foreground">
          Ramiro Pérez Rodero
        </a>
      </p>
    </footer>
  );
}
