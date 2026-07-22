import { z } from "zod";

export const leadFormSchema = z.object({
  nombre: z.string().min(2),
  empresa: z.string().min(2),
  web: z.string().optional(),
  pais: z.string().min(2),
  sector: z.string().min(1),
  tipo_negocio: z.string().min(1),
  tamano_equipo: z.string().min(1),
  volumen_leads: z.string().min(1),
  crm_actual: z.string().min(1),
  usa_whatsapp: z.string().min(1),
  tiempo_propuesta: z.string().min(1),
  problema_principal: z.string().min(5),
  objetivo: z.array(z.string()).min(1),
  urgencia: z.string().min(1),
  presupuesto: z.string().min(1),
  email: z.string().email(),
  telefono: z.string().min(7),
  consent: z.literal(true).optional(),
  como_conociste: z.string().min(1),
  notas: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
