import { formContent } from "@/lib/formContent";

export type LeadTier = "cold" | "warm" | "hot" | "premium";

// Objetivos del formulario que piden automatizar un proceso: es el cliente
// ideal de la web (empresas que quieren automatizar procesos con IA). Llegan
// como el texto de la opcion en el idioma del formulario, asi que se comparan
// por posicion en las dos listas.
const OBJETIVOS_AUTOMATIZACION = new Set<string>(
  [0, 1, 5, 6].flatMap((i) => [formContent.es.opts.objetivo[i], formContent.en.opts.objetivo[i]])
);

interface LeadData {
  presupuesto: string;
  urgencia: string;
  volumen_leads: string;
  tamano_equipo: string;
  crm_actual: string;
  sector: string;
  /** Opcional: los leads que se crean a mano desde el panel no lo traen. */
  objetivo?: string[];
}

export function calculateScore(data: LeadData): number {
  let score = 0;

  // Presupuesto (max 30)
  const presupuestoMap: Record<string, number> = {
    "<1000": 0,
    "1000-3000": 10,
    "3000-7000": 20,
    ">7000": 30,
  };
  score += presupuestoMap[data.presupuesto] ?? 0;

  // Urgencia (max 25)
  const urgenciaMap: Record<string, number> = {
    explorando: 5,
    "1-3meses": 15,
    prisa: 25,
  };
  score += urgenciaMap[data.urgencia] ?? 0;

  // Quiere automatizar un proceso (max 15). Sin objetivo, un valor neutro.
  if (!data.objetivo?.length) score += 5;
  else score += data.objetivo.some((o) => OBJETIVOS_AUTOMATIZACION.has(o)) ? 15 : 5;

  // Volumen de leads (max 10): ya no es el filtro, el proceso a automatizar
  // puede no tener nada que ver con leads.
  const volumenMap: Record<string, number> = {
    "<10": 3,
    "10-50": 5,
    "50-200": 8,
    "200+": 10,
  };
  score += volumenMap[data.volumen_leads] ?? 0;

  // Tamano de equipo (max 10)
  const equipoMap: Record<string, number> = {
    solo: 3,
    "2-5": 7,
    "6-20": 10,
    "20+": 10,
  };
  score += equipoMap[data.tamano_equipo] ?? 0;

  // CRM actual (max 10) — sin CRM = mas dolor = mas motivado
  const crmMap: Record<string, number> = {
    ninguno: 10,
    otro: 7,
    pipedrive: 6,
    hubspot: 5,
    gohighlevel: 5,
    salesforce: 4,
  };
  score += crmMap[data.crm_actual] ?? 5;

  // El sector no puntua: importa el proceso, no el sector.

  return Math.min(score, 100);
}

export function getTier(score: number): LeadTier {
  if (score >= 76) return "premium";
  if (score >= 51) return "hot";
  if (score >= 31) return "warm";
  return "cold";
}

export function getTags(data: LeadData & { como_conociste: string; tier: LeadTier }): string[] {
  const tags: string[] = ["#nuevo-lead", `#${data.tier}`];

  // Sector
  const sectorTagMap: Record<string, string> = {
    salud: "#clinica",
    eventos: "#eventos",
    formacion: "#formacion",
    consultoria: "#consultoria",
    agencia: "#agencia",
    industria: "#industria",
  };
  if (sectorTagMap[data.sector]) tags.push(sectorTagMap[data.sector]);

  // Canal
  const canalTagMap: Record<string, string> = {
    linkedin: "#via-linkedin",
    google: "#via-google",
    referido: "#via-referido",
  };
  if (canalTagMap[data.como_conociste]) tags.push(canalTagMap[data.como_conociste]);

  // Presupuesto bajo
  if (data.presupuesto === "<1000") tags.push("#budget-bajo");

  // Early stage
  if (data.volumen_leads === "<10") tags.push("#early-stage");

  return tags;
}
