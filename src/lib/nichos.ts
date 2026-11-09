import type { CaseClient } from "@/lib/servicios";
import { getServicio } from "@/lib/servicios";
import { SECTORES } from "@/lib/sectores";
import { SERVICIO_VIDEO } from "@/lib/servicio-media";
import { CASOS } from "@/lib/casos";

// Landings de campaña por nicho (/l/<nicho>): los sectores de "Para quién
// trabajamos". Para Meta, LinkedIn y outbound, que segmentan por público:
// quien llega tiene que reconocerse en el titular, en los problemas y en el
// caso. Solo en castellano y con noindex; las que posicionan son las páginas
// de /soluciones.
//
// Clínicas y eventos reutilizan los problemas, lo que automatizamos y las
// preguntas de sectores.ts, que ya están publicados. Agencias, inmobiliarias y
// negocios con cita llevan copia propia. Regla de siempre: ni cifras ni
// clientes que no estén publicados; Hospital Capilar, siempre "con Growth4U".

type Item = { title: string; desc: string };
type Faq = { q: string; a: string };
type Video = { src: string; poster: string; demo?: boolean; caption?: string };

export type Nicho = {
  /** Title de la pestaña y de la tarjeta social. */
  title: string;
  h1: string;
  lead: string;
  outcomes: string[];
  painsTitle: string;
  pains: Item[];
  automations: Item[];
  /** Ejemplo de cuatro pasos (sale en el titular si no hay vídeo). */
  flow: { label: string; text: string }[];
  /** Servicios que lo componen, con enlace a su ficha. */
  services: string[];
  cases: CaseClient[];
  /** Frase de la banda de prueba cuando el nicho no tiene caso propio. */
  proofLine?: string;
  video?: Video;
  care?: { title: string; items: string[] };
  timeline: string;
  faqs: Faq[];
  /** Página de /soluciones del sector, si existe (canonical). */
  sector?: string;
};

const PRECIO =
  "Depende del alcance: el discovery arranca en 1.500 €, la implementación completa va de 5.000 € a 25.000 € y hay un retainer mensual opcional de mantenimiento. El precio exacto se confirma tras la consultoría gratuita, no antes.";

const clinicas = SECTORES.clinicas.es;
const eventos = SECTORES.eventos.es;
const agente = getServicio("agente-ia-whatsapp", "es")!;
const faqAgente = (q: string) => {
  const f = agente.faqs.find((x) => x.q === q);
  if (!f) throw new Error(`FAQ del agente no encontrada: ${q}`);
  return f;
};

const videoCaso = (slug: string, caption: string): Video | undefined => {
  const v = CASOS[slug]?.video;
  return v ? { src: v.src, poster: v.poster, caption } : undefined;
};

const PROOF_SIN_CASO =
  "Sistemas de IA en producción en empresas de eventos, marketing y salud. Te enseñamos los casos en la consultoría.";

export const NICHOS: Record<string, Nicho> = {
  "agencias-de-marketing": {
    title: "Automatización con IA para agencias de marketing",
    h1: "Tu agencia lleva más clientes sin contratar a más gente.",
    lead: "Agentes de IA que revisan las campañas de Meta y Google Ads y proponen cambios con aprobación humana, captación con scoring en GoHighLevel, e informes y propuestas que se hacen solos.",
    outcomes: [
      "Campañas revisadas cada día, no cuando hay tiempo",
      "Los leads de tus clientes, contestados y cualificados al momento",
      "Informes y propuestas sin horas de copiar y pegar",
    ],
    painsTitle: "Dónde se le va el margen a una agencia",
    pains: [
      { title: "Campañas revisadas tarde", desc: "Un anuncio fatigado o un presupuesto mal repartido se ve en la reunión semanal, cuando ya ha gastado." },
      { title: "Informes a mano", desc: "Cada mes, horas sacando datos de Meta, Google y el CRM para montar el mismo informe para cada cliente." },
      { title: "Leads que nadie sigue", desc: "La campaña trae leads, pero el cliente tarda en contestarlos y acaba diciendo que la agencia no le trae ventas." },
      { title: "Propuestas y altas lentas", desc: "Cada cliente nuevo pide una propuesta a medida y un alta que el equipo monta a mano." },
    ],
    automations: [
      { title: "Agente de performance", desc: "Revisa Meta y Google Ads, detecta lo que deja de funcionar y propone pausar, bajar presupuesto o crear campañas. Nada se ejecuta sin aprobación." },
      { title: "Creatividades cuando un anuncio se fatiga", desc: "Genera una imagen nueva y la deja lista para revisar. Solo se sube lo que se aprueba." },
      { title: "Captación con scoring", desc: "Cada lead entra en GoHighLevel con una puntuación y su seguimiento automático, para la agencia o para sus clientes." },
      { title: "Respuesta a los leads de tus clientes", desc: "Un agente de WhatsApp que contesta y agenda por ellos: el resultado de la campaña se ve en ventas, no solo en leads." },
      { title: "Informes que se hacen solos", desc: "Los datos de las plataformas y del CRM, en el mismo informe cada semana, sin montarlo a mano." },
      { title: "Propuestas en minutos", desc: "Un formulario corto tras la llamada y la propuesta sale en web y PDF, con tu marca." },
    ],
    flow: [
      { label: "Cada mañana", text: "El agente revisa las campañas de cada cliente en Meta y Google Ads." },
      { label: "Detecta", text: "Un anuncio fatigado o un conjunto que gasta sin convertir." },
      { label: "Propone", text: "Pausar, bajar presupuesto o una creatividad nueva, con el motivo." },
      { label: "Aprobado", text: "Una persona lo aprueba y se ejecuta; todo queda registrado." },
    ],
    services: ["automatizacion-procesos-ia", "embudo-de-captacion", "agente-ia-whatsapp", "generador-de-propuestas"],
    cases: ["Tribeca Media", "Growth4U"],
    video: videoCaso("tribeca-media", "El caso de Tribeca Media, en vídeo."),
    timeline:
      "El primer sistema suele estar en marcha en 4 a 8 semanas desde la consultoría, según cuántas cuentas y herramientas haya que conectar.",
    faqs: [
      {
        q: "¿La IA toca las campañas de mis clientes sin control?",
        a: "No. El agente propone y una persona con permiso aprueba cada acción. En Tribeca Media las aprobaciones caducan a las 24 horas, cada acción queda registrada, subir presupuesto nunca es automático y una bajada se puede deshacer.",
      },
      {
        q: "¿Funciona con varias cuentas de clientes?",
        a: "Sí. Cada cliente con sus cuentas, sus límites y su coste: en Tribeca Media el gasto en IA se mide por cliente y tiene un tope diario.",
      },
      {
        q: "¿Con qué herramientas trabajáis?",
        a: "Meta Ads y Google Ads; GoHighLevel o HubSpot como CRM; Claude u OpenAI para los agentes, y n8n, Make o Zapier para conectar el resto. Partimos de lo que ya usáis.",
      },
      { q: "¿Cuánto cuesta?", a: PRECIO },
    ],
  },

  "empresas-de-eventos": {
    title: "Automatización con IA para empresas de eventos",
    h1: "Tu propuesta llega antes que la de la competencia.",
    lead: "Propuesta en web y PDF minutos después de la llamada, cada correo de clientes, artistas y proveedores en su sitio y seguimiento automático. En Eventos Barcelona, de 1-3 días a 8 minutos.",
    outcomes: [
      "La propuesta sale el mismo día de la llamada",
      "Todas con el mismo formato, precios y margen",
      "Seguimiento de cada presupuesto hasta que dice sí o no",
    ],
    painsTitle: eventos.painsTitle,
    pains: eventos.pains,
    automations: eventos.automations,
    flow: getServicio("generador-de-propuestas", "es")!.flow,
    services: ["generador-de-propuestas", "implementacion-crm-gohighlevel", "automatizacion-procesos-ia"],
    cases: ["Eventos Barcelona"],
    video: videoCaso("eventos-barcelona", "El caso de Eventos Barcelona, en vídeo."),
    timeline: eventos.timeline,
    faqs: eventos.faqs.slice(0, 4),
    sector: "eventos",
  },

  clinicas: {
    title: "Automatización con IA para clínicas y hospitales",
    h1: "Ni una llamada sin coger ni un hueco vacío en la agenda.",
    lead: "Respuesta inmediata por WhatsApp y teléfono, recordatorios con confirmación, lista de espera y precualificación por tratamiento, conectados a tu software de citas.",
    outcomes: [
      "Cada paciente recibe respuesta en minutos, también fuera de horario",
      "Menos ausencias, con recordatorios que se confirman solos",
      "Las cancelaciones se convierten en citas con la lista de espera",
    ],
    painsTitle: clinicas.painsTitle,
    pains: clinicas.pains,
    automations: clinicas.automations,
    flow: agente.flow,
    services: ["agente-ia-whatsapp", "embudo-de-captacion", "integracion-gohighlevel-hubspot"],
    cases: ["Hospital Capilar"],
    video: { ...SERVICIO_VIDEO["agente-ia-whatsapp"] },
    care: clinicas.care,
    timeline: clinicas.timeline,
    faqs: clinicas.faqs.slice(0, 4),
    sector: "clinicas",
  },

  inmobiliarias: {
    title: "Automatización con IA para inmobiliarias",
    h1: "Cada lead de los portales, atendido antes de que llame a otra agencia.",
    lead: "Respuesta al momento a los contactos de los portales y de tu web, cualificación por presupuesto y zona, visitas agendadas y cada operación en el CRM.",
    outcomes: [
      "Respuesta en minutos a cada lead, también el fin de semana",
      "Solo visitas con compradores que encajan en presupuesto y zona",
      "Inmuebles, compradores y visitas en un solo CRM",
    ],
    painsTitle: "Dónde se pierden operaciones",
    pains: [
      { title: "El lead que se enfría", desc: "Quien pregunta por un piso escribe a varias agencias. Si contestas al día siguiente, ya ha quedado con otra." },
      { title: "Visitas que no encajan", desc: "Se enseñan pisos a quien no tiene el presupuesto ni la financiación, y la tarde se va en visitas que no acaban en nada." },
      { title: "Contactos repartidos", desc: "Los leads viven en el correo de cada agente, en WhatsApp y en una hoja de cálculo. Cuando alguien se va, se lleva su cartera." },
      { title: "Propietarios sin noticias", desc: "El propietario no sabe cuántas visitas ha tenido su inmueble y llama para preguntar." },
    ],
    automations: [
      { title: "Respuesta inmediata", desc: "El aviso del portal o el formulario de la web se lee solo, se crea el contacto y sale una respuesta por WhatsApp o correo en minutos." },
      { title: "Cualificación", desc: "Presupuesto, zona, plazo y si necesita financiación, antes de proponer una visita." },
      { title: "Visitas agendadas", desc: "El comprador elige hueco en la agenda del comercial y recibe recordatorio; si cancela, el hueco se libera." },
      { title: "El CRM de la agencia", desc: "Inmuebles, compradores, propietarios y operaciones en GoHighLevel o HubSpot, con el pipeline a la vista." },
      { title: "Informe al propietario", desc: "Las visitas y el interés que ha tenido su inmueble, enviados solos cada semana." },
    ],
    flow: [
      { label: "Sábado 20:15", text: "Llega un contacto de un portal por un piso de tres habitaciones." },
      { label: "Al momento", text: "El agente responde por WhatsApp y pregunta presupuesto, zona y financiación." },
      { label: "Si encaja", text: "Ofrece huecos para visitar y la visita queda en la agenda del comercial." },
      { label: "Lunes", text: "El comercial llega con la visita confirmada y la ficha del comprador en el CRM." },
    ],
    services: ["agente-ia-whatsapp", "implementacion-crm-gohighlevel", "automatizacion-procesos-ia"],
    cases: [],
    proofLine: PROOF_SIN_CASO,
    timeline:
      "Entre 4 y 8 semanas desde la consultoría. Lo primero suele ser la respuesta inmediata a los leads de los portales: es lo que antes se nota.",
    faqs: [
      {
        q: "¿Se conecta con los portales inmobiliarios?",
        a: "Los portales avisan de cada contacto por correo, y ese aviso es la entrada: el sistema lo lee, crea el contacto y responde. Si tu software inmobiliario tiene API, también se conecta a él.",
      },
      {
        q: "¿El agente negocia o valora inmuebles?",
        a: "No. Informa de lo que está publicado, pregunta lo necesario y agenda la visita. Negociar y valorar es cosa del comercial: lo que se sale de ahí pasa a una persona.",
      },
      {
        q: "¿De quién son los datos de los compradores?",
        a: "De la agencia. Se guardan en tu CRM, con el consentimiento registrado, y las cuentas están a tu nombre, no al nuestro.",
      },
      { q: "¿Cuánto cuesta?", a: PRECIO },
    ],
  },

  "negocios-con-cita": {
    title: "Agente de IA para negocios con cita previa",
    h1: "Tu agenda se llena sola, aunque estés con un cliente.",
    lead: "Peluquerías, estética, fisioterapia, consultas o centros deportivos: un agente de IA contesta por WhatsApp y por teléfono, da la cita, la recuerda y cubre las cancelaciones.",
    outcomes: [
      "Ningún mensaje ni llamada sin contestar, aunque tengas las manos ocupadas",
      "Menos ausencias, con recordatorios que se confirman solos",
      "Las cancelaciones se cubren con la lista de espera",
    ],
    painsTitle: "Dónde se pierden citas",
    pains: [
      { title: "El teléfono que no puedes coger", desc: "Estás con un cliente y suena el teléfono. Quien llama no deja mensaje: llama al siguiente." },
      { title: "Mensajes a deshoras", desc: "Se piden citas por WhatsApp a las once de la noche y se contestan al día siguiente, cuando ya han reservado en otro sitio." },
      { title: "El hueco vacío", desc: "Una cita a la que no viene nadie es una hora que ya no se puede volver a vender." },
      { title: "El cliente que no repite", desc: "Quedó contento, pero nadie le recordó que ya tocaba volver." },
    ],
    automations: [
      { title: "Agente de WhatsApp y voz", desc: "Contesta, resuelve las dudas de siempre (precios, horarios y servicios) y da la cita en tu agenda." },
      { title: "Recordatorios con confirmación", desc: "Al reservar y el día antes. Si cancela, el hueco se libera solo." },
      { title: "Lista de espera", desc: "Cuando se libera un hueco, se avisa a quien lo estaba esperando." },
      { title: "Vuelta del cliente", desc: "Un mensaje cuando toca repetir: el corte, la revisión o la siguiente sesión." },
      { title: "Reseñas", desc: "Después de la cita, se pide la reseña a los clientes contentos." },
    ],
    flow: agente.flow,
    services: ["agente-ia-whatsapp", "implementacion-crm-gohighlevel"],
    cases: [],
    proofLine: PROOF_SIN_CASO,
    video: { ...SERVICIO_VIDEO["agente-ia-whatsapp"] },
    timeline: agente.timeline,
    faqs: [
      faqAgente("¿Puede agendar citas en mi calendario?"),
      faqAgente("¿Sirve la app de WhatsApp Business del móvil?"),
      faqAgente("¿Qué pasa si el agente no sabe responder?"),
      faqAgente("¿Cuánto cuesta un agente de IA para WhatsApp?"),
    ],
  },
};

export const NICHO_SLUGS = Object.keys(NICHOS);
