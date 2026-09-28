import { z } from "zod";

// Campo trampa: va oculto en el formulario, una persona nunca lo ve ni lo
// rellena, los bots que autocompletan todo si. Si llega con contenido, el
// envio no es humano.
export const HONEYPOT_FIELD = "empresa_web";

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
  email: z.string().email().transform((v) => v.trim().toLowerCase()),
  telefono: z.string().min(7),
  // La politica de privacidad declara el consentimiento (art. 6.1.a RGPD) como
  // base juridica del tratamiento, asi que el servidor tiene que exigirlo, no
  // solo el formulario en el navegador.
  consent: z.literal(true),
  [HONEYPOT_FIELD]: z
    .string()
    .max(0, { message: "spam" })
    .optional()
    .or(z.literal("")),
  como_conociste: z.string().min(1),
  notas: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
