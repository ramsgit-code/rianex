/**
 * CONFIGURACION DE VIDEOS ANTES / DESPUES
 * ---------------------------------------
 * 1. Genera los videos con IA (ver guia en docs/VIDEOS-IA.txt y docs/KLING-PROMPTS.md)
 * 2. Exporta MP4 (H.264), max 1080p, 15-45 seg, < 15 MB si es posible
 * 3. Coloca archivos en: public/videos/{id}-antes.mp4 y public/videos/{id}-despues.mp4
 * 4. Opcional: poster JPG en public/videos/{id}-antes.jpg
 * 5. Actualiza las rutas `video` abajo. Deja "" para mostrar placeholder hasta tener el archivo.
 *
 * Hosting alternativo (recomendado en produccion):
 * - Cloudflare Stream, Bunny.net, Vimeo Pro → pega la URL directa .mp4 en `video`
 * - YouTube: usa embedUrl en lugar de video (ver BeforeAfterPlayer)
 */

export type TransformationVideo = {
  video: string;
  poster?: string;
  embedUrl?: string;
  label: string;
  caption: string;
};

export type Transformation = {
  id: string;
  tag: string;
  title: string;
  client: string;
  metric: string;
  metricLabel: string;
  before: TransformationVideo;
  after: TransformationVideo;
};

export const transformations: Transformation[] = [
  {
    id: "lead-qualification",
    tag: "Lead Qualification",
    title: "De llamadas a ciegas a leads filtrados",
    client: "Clinica capilar",
    metric: "−40%",
    metricLabel: "tiempo en llamadas",
    before: {
      video: "",
      poster: "",
      label: "Antes",
      caption: "Excel, WhatsApp suelto, nadie sabe que lead es bueno.",
    },
    after: {
      video: "",
      poster: "",
      label: "Despues",
      caption: "Formulario + score + CRM: solo hablas con quien califica.",
    },
  },
  {
    id: "proposal-automation",
    tag: "Proposal Automation",
    title: "De 3 dias a 8 minutos por propuesta",
    client: "Empresa de eventos",
    metric: "8 min",
    metricLabel: "por propuesta",
    before: {
      video: "",
      poster: "",
      label: "Antes",
      caption: "Propuesta en Word, copiar-pegar, enviar tarde.",
    },
    after: {
      video: "",
      poster: "",
      label: "Despues",
      caption: "Intake → propuesta web + PDF automatico al cliente.",
    },
  },
  {
    id: "whatsapp-crm",
    tag: "WhatsApp + CRM",
    title: "De caos en WhatsApp a seguimiento 24/7",
    client: "Academia / servicios",
    metric: "0",
    metricLabel: "leads sin respuesta",
    before: {
      video: "",
      poster: "",
      label: "Antes",
      caption: "Mensajes perdidos, sin historial, sin secuencias.",
    },
    after: {
      video: "",
      poster: "",
      label: "Despues",
      caption: "Agente + nurturing + todo registrado en GoHighLevel.",
    },
  },
];

export const heroPreviewId = "lead-qualification";
