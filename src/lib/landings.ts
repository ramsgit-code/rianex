// Landings de conversión, una por servicio (/l/<slug>), para campañas de
// Meta, Google o LinkedIn. Solo en castellano y con noindex: no compiten en
// Google con las fichas de /servicios, que son las que posicionan.
//
// Aquí va solo lo propio de la landing: el titular (el resultado, no el
// servicio) y la entradilla. Lo demás (qué consigues, así funciona, encaja si,
// qué incluye, plazo, casos, FAQ y vídeo) sale de servicios.ts, content.ts y
// servicio-media.ts, para que landing y ficha digan siempre lo mismo.
//
// Regla: las cifras solo de casos publicados (Eventos Barcelona: de 1-3 días a
// 8 minutos y −85% de tiempo de respuesta).

export type Landing = {
  /** Titular: el resultado que compra el visitante. */
  h1: string;
  /** Entradilla: qué hacemos para conseguirlo, en una o dos frases. */
  lead: string;
  /** Title de la pestaña y de la tarjeta social. */
  title: string;
};

export const LANDINGS: Record<string, Landing> = {
  "agente-ia-whatsapp": {
    title: "Agente de IA para WhatsApp y teléfono",
    h1: "Ningún cliente sin respuesta, ni a las 23:40.",
    lead: "Un agente de IA atiende WhatsApp, Telegram y el teléfono, resuelve las dudas de siempre y deja la cita en tu agenda. Tú solo ves las citas confirmadas.",
  },
  "outbound-b2b": {
    title: "Prospección B2B autónoma",
    h1: "Reuniones con clientes nuevos cada semana, sin prospectar a mano.",
    lead: "Un sistema en la nube busca empresas que encajan contigo, escribe a quien decide por email y LinkedIn y hace el seguimiento hasta que reserva una reunión en tu calendario.",
  },
  "embudo-de-captacion": {
    title: "Leads de Meta cualificados y agendados",
    h1: "Habla solo con los leads de Meta que de verdad compran.",
    lead: "Cada lead de tus anuncios entra en GoHighLevel con una puntuación, recibe respuesta en minutos y, si encaja, reserva cita solo. Al resto le hacemos el seguimiento.",
  },
  "generador-de-propuestas": {
    title: "Propuestas comerciales automáticas",
    h1: "La propuesta, enviada minutos después de colgar.",
    lead: "Rellenas un formulario corto al terminar la llamada y sale la propuesta en web y PDF, con tu marca y tus precios. En Eventos Barcelona pasó de 1-3 días a 8 minutos.",
  },
  "automatizacion-procesos-ia": {
    title: "Automatización de procesos con IA",
    h1: "Lo que tu equipo repite cada semana, hecho solo.",
    lead: "Correos, pedidos, facturas y datos que pasan de una herramienta a otra: los automatizamos con IA y reglas, conectados a lo que ya usas.",
  },
  "implementacion-crm-gohighlevel": {
    title: "Implantación de CRM: GoHighLevel o HubSpot",
    h1: "Todos tus clientes y oportunidades, en un solo sitio.",
    lead: "Montamos GoHighLevel o HubSpot a tu proceso: el pipeline a la vista, cada contacto con su responsable y su seguimiento, y el equipo formado para usarlo.",
  },
  "integracion-gohighlevel-hubspot": {
    title: "Integración de GoHighLevel y HubSpot",
    h1: "Tu CRM y tus herramientas, por fin hablando entre sí.",
    lead: "Web, agenda, facturación y WhatsApp sincronizados con GoHighLevel o HubSpot: sin copiar datos a mano y con aviso si algo falla.",
  },
  "migracion-a-gohighlevel": {
    title: "Migración a GoHighLevel",
    h1: "Pásate a GoHighLevel sin perder ni un contacto.",
    lead: "Migramos contactos, oportunidades, notas y automatizaciones desde HubSpot u otro CRM, con una prueba previa y los dos sistemas en paralelo hasta que todo cuadra.",
  },
  "kit-ia": {
    title: "Kit IA para empresas",
    h1: "Tu equipo usando IA desde la primera semana, con orden.",
    lead: "Claude o ChatGPT con cuentas de empresa, un asistente que responde con vuestros documentos, plantillas por puesto, reglas claras de datos y formación.",
  },
  "formacion-ia-empresas": {
    title: "Formación en IA para equipos",
    h1: "Formación en IA que tu equipo usa al día siguiente.",
    lead: "Talleres prácticos con vuestras propias tareas y documentos, para dirección, ventas, atención y administración. Presenciales o en remoto.",
  },
  "asesoramiento-ia": {
    title: "Asesoramiento en IA para empresas",
    h1: "Un responsable de IA a tiempo parcial, sin contratarlo.",
    lead: "Hoja de ruta de qué automatizar y en qué orden, elección de herramientas y proveedores, y seguimiento mensual con dirección.",
  },
};

export const LANDING_SLUGS = Object.keys(LANDINGS);
