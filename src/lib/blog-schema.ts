import { z } from "zod";

// El esquema es el contrato del contenido: si a un articulo le falta un campo
// o se pasa de largo, la importacion falla en vez de publicar una pagina a
// medias. Es mas barato que descubrirlo en la SERP tres semanas despues.

/**
 * Agrupaciones tematicas del blog. Sirven para el enlazado interno y para que
 * llms.txt le enseñe a los modelos la estructura del sitio, que un indice plano
 * de titulos no transmite.
 */
export const CLUSTERS = {
  "automatizacion-ia": "Automatización de procesos con IA",
  "agentes-ia": "Agentes de IA",
  "desarrollo-ia": "Desarrollo a medida con IA",
  crm: "CRM, integraciones y migraciones",
  captacion: "Captación y cualificación",
} as const;

export type Cluster = keyof typeof CLUSTERS;

export const AUTHORS = ["Ramiro Pérez"] as const;

export const blogFrontmatterSchema = z.object({
  // Google corta el title en la SERP pasados ~70 caracteres.
  title: z.string().min(10).max(70, "El title debe caber en la SERP: 70 caracteres"),
  // Por debajo de 70 se desaprovecha; por encima de 165 se corta.
  description: z
    .string()
    .min(70, "La meta description se queda corta: minimo 70 caracteres")
    .max(165, "La meta description se corta pasados 165 caracteres"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe ser AAAA-MM-DD"),
  tags: z.array(z.string()).min(1, "Al menos una etiqueta"),
  cluster: z.enum(Object.keys(CLUSTERS) as [Cluster, ...Cluster[]]),
  author: z.enum(AUTHORS).default("Ramiro Pérez"),
  draft: z.boolean().default(false),
});

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;

/**
 * Separa el frontmatter YAML del cuerpo y lo valida.
 *
 * Solo se admite el subconjunto de YAML que usamos (cadenas entre comillas,
 * arrays en linea y booleanos), asi que no hace falta arrastrar un parser
 * entero para esto.
 */
export function parseBlogFile(raw: string, filename: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error(`${filename}: no tiene frontmatter`);
  }

  const [, fm, body] = match;
  const data: Record<string, unknown> = {};

  for (const line of fm.split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const [, key, rawValue] = kv;
    const value = rawValue.trim();

    if (value.startsWith("[")) {
      data[key] = JSON.parse(value.replace(/'/g, '"'));
    } else if (value === "true" || value === "false") {
      data[key] = value === "true";
    } else {
      // Sin el flag `s`, que exige ES2018 y el proyecto compila a ES2017.
      data[key] = value.replace(/^"([\s\S]*)"$/, "$1");
    }
  }

  const parsed = blogFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const problemas = parsed.error.issues
      .map((i) => `  - ${i.path.join(".") || "(raiz)"}: ${i.message}`)
      .join("\n");
    throw new Error(`${filename}: frontmatter invalido\n${problemas}`);
  }

  const content = body.trim();
  if (content.length < 200) {
    throw new Error(`${filename}: el cuerpo esta practicamente vacio`);
  }

  return { frontmatter: parsed.data, content };
}
