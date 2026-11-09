import { z } from "zod";

// De dónde viene un lead: la landing en la que rellenó el formulario (si fue
// en una de /l/<servicio>) y los parámetros UTM de la campaña. Viaja con el
// formulario, se guarda en el payload del lead y se convierte en etiquetas de
// GoHighLevel ("landing-<servicio>", "utm-<fuente>") para filtrar sin crear
// campos personalizados nuevos.

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

const utm = z.string().trim().max(100).optional();

export const origenSchema = z
  .object({
    landing: z
      .string()
      .regex(/^[a-z0-9-]{1,60}$/)
      .optional(),
    utm_source: utm,
    utm_medium: utm,
    utm_campaign: utm,
    utm_content: utm,
    utm_term: utm,
  })
  .optional();

export type Origen = z.infer<typeof origenSchema>;

/** Origen del navegador: la landing (si la hay) y las UTM de la URL actual. */
export function leerOrigen(landing?: string): Origen {
  if (typeof window === "undefined") return landing ? { landing } : undefined;
  const q = new URLSearchParams(window.location.search);
  const o: Record<string, string> = {};
  if (landing) o.landing = landing;
  for (const k of UTM_KEYS) {
    const v = q.get(k);
    if (v) o[k] = v.slice(0, 100);
  }
  return Object.keys(o).length ? (o as Origen) : undefined;
}

const limpia = (v: string) =>
  v
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

/** Etiquetas de GoHighLevel para el origen. Vacío si no hay origen. */
export function origenTags(o: Origen): string[] {
  if (!o) return [];
  const tags: string[] = [];
  if (o.landing) tags.push(`landing-${o.landing}`);
  if (o.utm_source) {
    const s = limpia(o.utm_source);
    if (s) tags.push(`utm-${s}`);
  }
  return tags;
}
