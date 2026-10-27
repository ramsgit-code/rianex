import type { Lang } from "@/lib/i18n";
import type { CaseClient } from "@/lib/servicios";

// Contenido de las paginas de cada caso de exito (/casos-de-exito/<slug>).
//
// Fuentes: la ficha del caso en content.ts, el articulo de propuestas
// automaticas (que describe el sistema de Eventos Barcelona), los testimonios
// aprobados en la base de datos (copiados tal cual) y las cifras confirmadas
// por Ramiro (Hospital Capilar: -32% de coste por paciente en 8 semanas).
// Tribeca Media sale del estado de KEYWORKERS (~/Documents/tribeca): sin
// precios, sin los clientes de Tribeca y sin detalles de seguridad.
// Nada mas: si un dato no esta publicado, no aparece.

type Item = { title: string; desc: string };

export type CasoDetalle = {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  answer: string;
  context: string[];
  built: Item[];
  results: string[];
  /** Solo si el cliente ha dado un testimonio. */
  quote?: { text: string; author: string; role: string };
};

type Video = { src: string; poster: string; /** ISO 8601 */ duration: string; uploadDate: string };

type Caso = {
  client: CaseClient;
  /** Pagina del sector, si la hay. */
  sector?: string;
  services: string[];
  posts: string[];
  /** Video del caso (narrado en castellano). */
  video?: Video;
  es: CasoDetalle;
  en: CasoDetalle;
};

/** Fecha de publicacion de las paginas de caso, para el schema Article. */
export const CASOS_PUBLICADOS = "2026-10-03";

export const CASOS: Record<string, Caso> = {
  "hospital-capilar": {
    client: "Hospital Capilar",
    sector: "clinicas",
    services: ["embudo-de-captacion", "integracion-gohighlevel-hubspot", "implementacion-crm-gohighlevel"],
    posts: ["como-cualificar-leads-automaticamente", "automatizacion-para-clinicas-captacion-y-agenda"],
    es: {
      seoTitle: "Caso Hospital Capilar: −32% de coste por paciente",
      metaDescription:
        "Cómo Hospital Capilar bajó un 32% su coste por paciente en 8 semanas con un quiz de cualificación, seguimiento por WhatsApp y un Booking SDR que agenda en Koibox.",
      h1: "Hospital Capilar: −32% de coste por paciente en 8 semanas",
      answer:
        "Hospital Capilar, una clínica de Madrid, captaba muchos leads sin ningún filtro ni visibilidad del embudo. En un proyecto con Growth4U, montamos en GoHighLevel un sistema que cualifica cada lead con un quiz de scoring, hace seguimiento automático por WhatsApp y agenda la cita directamente en Koibox con un Booking SDR. En 8 semanas, el coste por paciente bajó un 32%.",
      context: [
        "Captaban muchos leads, pero sin ningún filtro previo ni visibilidad del embudo.",
        "No sabían qué contactos merecía la pena trabajar ni en qué paso se perdían las oportunidades, así que el equipo dedicaba el mismo tiempo a un lead bueno que a uno que nunca iba a ser paciente.",
      ],
      built: [
        { title: "Quiz de cualificación", desc: "Cada lead responde un quiz que puntúa su encaje antes de hablar con nadie del equipo." },
        { title: "Seguimiento por WhatsApp", desc: "Seguimiento automático por WhatsApp para que ningún lead se quede sin respuesta." },
        { title: "Booking SDR en Koibox", desc: "Los leads cualificados agendan su cita directamente en Koibox, el software de citas de la clínica." },
        { title: "Embudo medido", desc: "Conversión, abandono, citas y ventas medidos de punta a punta, por primera vez." },
      ],
      results: [
        "−32% de coste por paciente (CPP) en 8 semanas.",
        "Todo el embudo medido: conversión, abandono, citas y ventas.",
        "Las citas de los leads cualificados entran directamente en Koibox, sin pasar por recepción.",
      ],
      quote: {
        text: "El sistema capta, cualifica con un quiz, automatiza el WhatsApp y agenda directamente en nuestro Koibox. Lo mejor es que por fin medimos todo el embudo: conversión, abandono, citas y ventas. Bajamos el coste por paciente de forma notable.",
        author: "María Silva",
        role: "Responsable de Marketing · Hospital Capilar",
      },
    },
    en: {
      seoTitle: "Hospital Capilar case: −32% cost per patient",
      metaDescription:
        "How Hospital Capilar cut its cost per patient by 32% in 8 weeks with a qualification quiz, WhatsApp follow-up and a Booking SDR that books into Koibox.",
      h1: "Hospital Capilar: −32% cost per patient in 8 weeks",
      answer:
        "Hospital Capilar, a clinic in Madrid, was getting plenty of leads with no filter and no visibility of the funnel. In a project with Growth4U, we built a GoHighLevel system that qualifies every lead with a scoring quiz, follows up automatically on WhatsApp and books the appointment straight into Koibox with a Booking SDR. In 8 weeks, cost per patient fell by 32%.",
      context: [
        "They were getting plenty of leads, but with no prior filter and no visibility of the funnel.",
        "They did not know which contacts were worth working or at which step opportunities were lost, so the team spent as much time on a good lead as on one that would never become a patient.",
      ],
      built: [
        { title: "Qualification quiz", desc: "Every lead answers a quiz that scores their fit before talking to anyone on the team." },
        { title: "WhatsApp follow-up", desc: "Automatic WhatsApp follow-up so no lead goes unanswered." },
        { title: "Booking SDR in Koibox", desc: "Qualified leads book their appointment straight into Koibox, the clinic's booking software." },
        { title: "Measured funnel", desc: "Conversion, drop-off, appointments and sales measured end to end, for the first time." },
      ],
      results: [
        "−32% cost per patient (CPP) in 8 weeks.",
        "The whole funnel measured: conversion, drop-off, appointments and sales.",
        "Appointments from qualified leads go straight into Koibox, without going through reception.",
      ],
      quote: {
        text: "The system captures leads, qualifies them with a quiz, automates WhatsApp and books directly into our Koibox. The best part is that we finally measure the whole funnel: conversion, drop-off, appointments and sales. We lowered our cost per patient significantly.",
        author: "María Silva",
        role: "Marketing Manager · Hospital Capilar",
      },
    },
  },

  "eventos-barcelona": {
    client: "Eventos Barcelona",
    sector: "eventos",
    services: ["generador-de-propuestas", "implementacion-crm-gohighlevel", "automatizacion-procesos-ia"],
    posts: ["propuestas-comerciales-automaticas"],
    video: {
      src: "/videos/caso-eventos-barcelona.mp4",
      poster: "/videos/caso-eventos-barcelona.jpg",
      duration: "PT1M13S",
      uploadDate: "2026-10-08",
    },
    es: {
      seoTitle: "Caso Eventos Barcelona: propuestas en 8 minutos",
      metaDescription:
        "Cómo Eventos Barcelona pasó de tardar 1-3 días en cada propuesta a enviarla en unos 8 minutos tras la llamada, y bajó un 85% su tiempo de respuesta al cliente.",
      h1: "Eventos Barcelona: propuestas en 8 minutos y −85% de tiempo de respuesta",
      answer:
        "Eventos Barcelona tardaba entre 1 y 3 días en enviar cada propuesta, y para entonces el cliente ya había pedido presupuesto a la competencia. Montamos en GoHighLevel un formulario de intake que genera la propuesta en web y PDF al terminar la llamada, con seguimiento automático. Ahora la propuesta sale en unos 8 minutos y el tiempo de respuesta al cliente bajó un 85%.",
      context: [
        "Cada propuesta tardaba entre 1 y 3 días en salir. Para cuando llegaba, el cliente ya se había enfriado o había pedido presupuesto a la competencia.",
        "El cliente que pide presupuesto está interesado justo al colgar. Dos días después ha hablado con otros proveedores y ya ha tomado una dirección: en eventos, quien responde primero tiene ventaja real.",
      ],
      built: [
        { title: "Intake tras la llamada", desc: "El comercial rellena en 3 a 5 minutos el tipo de servicio, fechas, aforo, ciudad, detalles del evento y margen." },
        { title: "Propuesta generada", desc: "Una web con URL propia y la marca de la empresa, con PDF descargable, creada a partir del intake." },
        { title: "Envío inmediato", desc: "En unos 60 segundos el cliente recibe el enlace por correo y el CRM registra el envío." },
        { title: "Seguimiento automático", desc: "Si en 48 horas no la abre, recordatorio; si la abre y no contesta en 72 horas, aviso al comercial." },
        { title: "Pipeline de propuestas", desc: "Cada propuesta con su estado en GoHighLevel: enviada, abierta, en negociación, aceptada o rechazada." },
      ],
      results: [
        "De 1-3 días a unos 8 minutos por propuesta, desde el final de la llamada.",
        "−85% de tiempo de respuesta al cliente.",
        "La conversión mejoró: no por ser más baratos, sino porque la propuesta llega primero.",
        "El equipo dejó de maquetar documentos y dedica ese tiempo al seguimiento.",
      ],
      quote: {
        text: "Antes tardábamos hasta tres días en enviar una propuesta y perdíamos eventos por lentos. Con el sistema que montó Ramiro en GoHighLevel, la propuesta sale en minutos tras la llamada. Hemos cerrado eventos que antes se nos escapaban.",
        author: "Xavi",
        role: "Director · EB Eventos Barcelona",
      },
    },
    en: {
      seoTitle: "Eventos Barcelona case: proposals in 8 minutes",
      metaDescription:
        "How Eventos Barcelona went from taking 1-3 days per proposal to sending it about 8 minutes after the call, cutting client response time by 85%.",
      h1: "Eventos Barcelona: proposals in 8 minutes and −85% response time",
      answer:
        "Eventos Barcelona took 1 to 3 days to send each proposal, and by then the client had already asked competitors for a quote. We built a GoHighLevel intake form that generates the proposal as a web page and PDF when the call ends, with automatic follow-up. Now the proposal goes out in about 8 minutes and client response time fell by 85%.",
      context: [
        "Each proposal took 1 to 3 days to go out. By the time it arrived, the client had cooled off or asked competitors for a quote.",
        "A client asking for a quote is interested right after the call. Two days later they have spoken to other suppliers and already chosen a direction: in events, whoever answers first has a real advantage.",
      ],
      built: [
        { title: "Intake after the call", desc: "The salesperson fills in service type, dates, capacity, city, event details and margin in 3 to 5 minutes." },
        { title: "Generated proposal", desc: "A web page with its own URL and the company's branding, plus a downloadable PDF, built from the intake." },
        { title: "Instant delivery", desc: "Within about 60 seconds the client gets the link by email and the CRM records it." },
        { title: "Automatic follow-up", desc: "If it is not opened in 48 hours, a reminder; if it is opened with no reply in 72 hours, the salesperson is alerted." },
        { title: "Proposal pipeline", desc: "Every proposal with its status in GoHighLevel: sent, opened, negotiating, accepted or rejected." },
      ],
      results: [
        "From 1-3 days to about 8 minutes per proposal, from the end of the call.",
        "−85% client response time.",
        "Conversion improved: not by being cheaper, but because the proposal arrives first.",
        "The team stopped laying out documents and spends that time on follow-up.",
      ],
      quote: {
        text: "It used to take us up to three days to send a proposal, and we lost events for being slow. With the system Ramiro built in GoHighLevel, the proposal goes out within minutes of the call. We have closed events that used to slip away.",
        author: "Xavi",
        role: "Director · EB Eventos Barcelona",
      },
    },
  },

  "tribeca-media": {
    client: "Tribeca Media",
    services: ["automatizacion-procesos-ia", "agente-ia-whatsapp", "outbound-b2b"],
    posts: ["que-es-gtm-engineering", "proyectos-de-ia-a-medida-ejemplos-plazos-precio", "agentes-de-ia-para-empresas-cuando-compensan"],
    video: {
      src: "/videos/caso-tribeca-media.mp4",
      poster: "/videos/caso-tribeca-media.jpg",
      duration: "PT1M23S",
      uploadDate: "2026-10-08",
    },
    es: {
      seoTitle: "Caso Tribeca Media: agentes de IA de performance y contenido",
      metaDescription:
        "Cómo construimos para KEYWORKERS, la plataforma de Tribeca Media, un agente de IA que gestiona campañas de Meta y Google Ads con aprobación humana, y el agente de contenido.",
      h1: "Tribeca Media: agentes de IA de performance y contenido para KEYWORKERS",
      answer:
        "Tribeca Media construye KEYWORKERS, una plataforma de agentes de IA para marketing. Su agente leía las campañas de Meta Ads pero no actuaba sobre ellas. Construimos el Performance Agent: revisa Meta y Google Ads, propone pausar, bajar presupuesto o crear campañas, lo ejecuta solo cuando una persona lo aprueba y genera creatividades nuevas cuando un anuncio se fatiga. Ahora construimos el Content Agent.",
      context: [
        "KEYWORKERS da a cada cliente un equipo de agentes de IA para marketing que trabajan sobre sus cuentas reales de publicidad y redes.",
        "El sistema en producción leía Meta Ads, pero no tocaba las campañas, no tenía Google Ads ni generaba creatividades, y no había forma de saber cuánto gastaba en IA ni cuándo fallaba. Para dar servicio a muchos más clientes, los agentes tenían que poder actuar, y hacerlo con control.",
      ],
      built: [
        { title: "Diagnóstico y plan por fases", desc: "Revisión técnica del código y del sistema en vivo, y un plan de corrección por bloques, priorizado por riesgo." },
        { title: "Observabilidad y coste de IA", desc: "Chequeos de salud con avisos, el coste de cada llamada e imagen registrado, tope de gasto por cliente y auditorías de campañas por lotes a mitad de precio." },
        { title: "Performance Agent en Meta y Google Ads", desc: "Lee las campañas, detecta lo que deja de funcionar y propone pausar, bajar presupuesto o crear campañas nuevas, que nacen en pausa. Subir presupuesto nunca es automático." },
        { title: "Aprobación humana", desc: "Ninguna acción se ejecuta sin el visto bueno de una persona con permiso. Las aprobaciones caducan a las 24 horas, cada acción queda registrada y una bajada de presupuesto se puede deshacer." },
        { title: "Creatividades con IA", desc: "Cuando un anuncio de Meta se fatiga, genera una imagen nueva con GPT Image 2 y la deja lista para revisar. Solo sube a Meta lo que se aprueba." },
        { title: "Content Agent (en construcción)", desc: "Prepara piezas de contenido con texto e imagen, carruseles y vídeos cortos, en vista previa y pendientes de aprobación. Propone; no publica por su cuenta." },
      ],
      results: [
        "Un agente que actúa sobre campañas reales de Meta y Google Ads, no solo las lee.",
        "Ninguna acción sobre una campaña sin el visto bueno de una persona.",
        "El coste de IA medido por cliente y con tope diario.",
        "Casi 1.000 tests automáticos sobre el sistema.",
        "Performance, con el código cerrado y en validación con un cliente piloto. Content, en construcción.",
      ],
    },
    en: {
      seoTitle: "Tribeca Media case: performance and content AI agents",
      metaDescription:
        "How we built for KEYWORKERS, Tribeca Media's platform, an AI agent that manages Meta and Google Ads campaigns with human approval, and the content agent.",
      h1: "Tribeca Media: performance and content AI agents for KEYWORKERS",
      answer:
        "Tribeca Media is building KEYWORKERS, a platform of AI agents for marketing. Its agent read Meta Ads campaigns but did not act on them. We built the Performance Agent: it reviews Meta and Google Ads, proposes pausing, cutting budget or creating campaigns, executes only when a person approves, and generates new creatives when an ad fatigues. We are now building the Content Agent.",
      context: [
        "KEYWORKERS gives each client a team of AI marketing agents that work on their real ad and social accounts.",
        "The production system read Meta Ads, but it did not touch campaigns, had no Google Ads and generated no creatives, and there was no way to know how much it spent on AI or when it failed. To serve many more clients, the agents had to be able to act, and do it under control.",
      ],
      built: [
        { title: "Diagnosis and phased plan", desc: "Technical review of the code and the live system, and a fix plan in blocks, prioritised by risk." },
        { title: "Observability and AI cost", desc: "Health checks with alerts, the cost of every call and image recorded, a spending cap per client and campaign audits in batches at half price." },
        { title: "Performance Agent on Meta and Google Ads", desc: "Reads campaigns, spots what stops working and proposes pausing, cutting budget or creating new campaigns, which start paused. Raising budget is never automatic." },
        { title: "Human approval", desc: "No action runs without sign-off from an authorised person. Approvals expire after 24 hours, every action is logged and a budget cut can be undone." },
        { title: "AI creatives", desc: "When a Meta ad fatigues, it generates a new image with GPT Image 2 and leaves it ready for review. Only approved images go to Meta." },
        { title: "Content Agent (in progress)", desc: "Prepares content pieces with copy and image, carousels and short videos, as previews pending approval. It proposes; it does not publish on its own." },
      ],
      results: [
        "An agent that acts on real Meta and Google Ads campaigns, not one that only reads them.",
        "No action on a campaign without a person's sign-off.",
        "AI cost measured per client, with a daily cap.",
        "Almost 1,000 automated tests on the system.",
        "Performance: code complete and being validated with a pilot client. Content: in progress.",
      ],
    },
  },

  growth4u: {
    client: "Growth4U",
    services: ["embudo-de-captacion", "implementacion-crm-gohighlevel", "automatizacion-procesos-ia"],
    posts: ["como-cualificar-leads-automaticamente", "automatizar-procesos-con-ia-por-donde-empezar"],
    es: {
      seoTitle: "Caso Growth4U: proceso comercial automatizado",
      metaDescription:
        "Cómo Growth4U, agencia de marketing, pasó de una captación manual en hojas de cálculo a un funnel con scoring y seguimiento automático en GoHighLevel.",
      h1: "Growth4U: el proceso comercial automatizado de punta a punta",
      answer:
        "Growth4U, una agencia de marketing, captaba de forma manual: sin cualificación, sin seguimiento sistemático y con los leads enfriándose en hojas de cálculo. Implementamos en GoHighLevel un funnel de captación con scoring automático y seguimiento, con todo el proceso comercial medido desde el primer contacto hasta el cierre.",
      context: [
        "La captación era 100% manual y sin cualificación ni seguimiento sistemático.",
        "Los leads se enfriaban en hojas de cálculo y se perdía la trazabilidad de cada oportunidad.",
      ],
      built: [
        { title: "Funnel de captación", desc: "Los leads entran en GoHighLevel en lugar de en hojas de cálculo." },
        { title: "Scoring automático", desc: "Cada lead se puntúa según su encaje, para saber con quién hablar primero." },
        { title: "Seguimiento sistemático", desc: "Seguimiento automático para que ningún lead se enfríe por falta de respuesta." },
        { title: "Proceso medido", desc: "Trazabilidad de cada oportunidad, del primer contacto al cierre." },
      ],
      results: [
        "100% del proceso comercial automatizado: captar, puntuar y hacer seguimiento.",
        "Cada oportunidad trazada del primer contacto al cierre.",
        "El equipo solo habla con leads que valen la pena.",
      ],
      quote: {
        text: "Necesitábamos un funnel de captación serio, con cualificación e IA, no un formulario más. Ramiro montó todo el proceso comercial en automático: captar, puntuar y hacer seguimiento. Ahora el equipo solo habla con leads que valen la pena.",
        author: "Philippe",
        role: "Growth Manager · Growth4U",
      },
    },
    en: {
      seoTitle: "Growth4U case: an automated sales process",
      metaDescription:
        "How Growth4U, a marketing agency, went from manual lead capture in spreadsheets to a GoHighLevel funnel with automatic scoring and follow-up.",
      h1: "Growth4U: the sales process automated end to end",
      answer:
        "Growth4U, a marketing agency, was capturing leads by hand: no qualification, no systematic follow-up and leads going cold in spreadsheets. We implemented a GoHighLevel lead capture funnel with automatic scoring and follow-up, with the whole sales process measured from first contact to close.",
      context: [
        "Lead capture was 100% manual, with no qualification and no systematic follow-up.",
        "Leads went cold in spreadsheets and the trail of each opportunity was lost.",
      ],
      built: [
        { title: "Lead capture funnel", desc: "Leads land in GoHighLevel instead of spreadsheets." },
        { title: "Automatic scoring", desc: "Every lead is scored by fit, so the team knows who to talk to first." },
        { title: "Systematic follow-up", desc: "Automatic follow-up so no lead goes cold for lack of a reply." },
        { title: "Measured process", desc: "Every opportunity tracked from first contact to close." },
      ],
      results: [
        "100% of the sales process automated: capturing, scoring and following up.",
        "Every opportunity tracked from first contact to close.",
        "The team only talks to leads worth their time.",
      ],
      quote: {
        text: "We needed a serious lead generation funnel, with qualification and AI, not just another form. Ramiro automated the entire sales process: capturing, scoring and following up. Now the team only talks to leads worth their time.",
        author: "Philippe",
        role: "Growth Manager · Growth4U",
      },
    },
  },
};

export const CASO_SLUGS = Object.keys(CASOS);

export function getCaso(slug: string, lang: Lang) {
  const c = CASOS[slug];
  if (!c) return null;
  return { ...c[lang], client: c.client, sector: c.sector, services: c.services, posts: c.posts, video: c.video };
}

/** Slug de la pagina de un cliente, para enlazar desde otras paginas. */
export function casoSlug(client: string) {
  return CASO_SLUGS.find((s) => CASOS[s].client === client);
}
