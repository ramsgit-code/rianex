import { tarjetaSocial } from "@/lib/og-card";
import { LANGS } from "@/lib/i18n";

// Imagen social general (home, listados, textos legales y landings), en cada
// idioma: /og/general/<es|en>. Sustituye a /og.png, que decia «Recupera 10
// horas/semana», un mensaje que la web dejo de usar en octubre de 2026.

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

const TEXTO = {
  // "con\u00a0IA" va unido: si no, «IA» queda sola en la segunda línea.
  es: { titulo: "Agencia de automatización con\u00a0IA", etiqueta: "AI Workflow & Business Automation" },
  en: { titulo: "AI automation agency", etiqueta: "AI Workflow & Business Automation" },
} as const;

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = TEXTO[lang === "en" ? "en" : "es"];
  return tarjetaSocial(t.titulo, t.etiqueta);
}
