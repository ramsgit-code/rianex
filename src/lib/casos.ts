import type { Lang } from "@/lib/i18n";
import type { CaseClient } from "@/lib/servicios";

// Contenido de las paginas de cada caso de exito (/casos-de-exito/<slug>).
//
// Fuentes: la ficha del caso en content.ts, el articulo de propuestas
// automaticas, los testimonios aprobados en la base de datos (copiados tal
// cual) y el inventario del 25-nov-2026 de los documentos de cada cliente
// (~/Documents/rianex web/inventario-2026-11-25). Cada cifra sale de un
// documento; el -32% de Hospital Capilar y el -85% de Eventos Barcelona se
// quitaron porque no habia documento que los respaldara.
// Sin precios, sin los clientes de Tribeca, EB o Growth4U (salvo Hospital
// Capilar, ya publico) y sin detalles de seguridad.

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

type Video = { src: string; poster: string; /** ISO 8601 */ duration: string; /** ISO 8601 con zona horaria, lo exige Google */ uploadDate: string };

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
    services: ["agente-ia-whatsapp", "integracion-gohighlevel-hubspot", "implementacion-crm-gohighlevel"],
    posts: ["como-cualificar-leads-automaticamente", "automatizacion-para-clinicas-captacion-y-agenda"],
    es: {
      seoTitle: "Hospital Capilar con Growth4U: WhatsApp y citas en Koibox",
      metaDescription:
        "Proyecto con Growth4U: un quiz que cualifica cada lead, ocho workflows en GoHighLevel, bot de WhatsApp 24/7, recuperación de leads y citas directas en Koibox.",
      h1: "Hospital Capilar, con Growth4U: cualificación, WhatsApp 24/7 y citas en Koibox",
      answer:
        "Hospital Capilar, una clínica de Madrid, captaba muchos leads sin filtro ni visibilidad del embudo. En un proyecto con Growth4U, montamos en GoHighLevel un sistema que cualifica cada lead con un quiz, le atiende por WhatsApp a cualquier hora y agenda la cita directamente en Koibox. Nos encargamos de los ocho workflows en producción, del bot que recupera los leads que se quedaron a medias y de que el sistema no falle.",
      context: [
        "Captaban muchos leads, pero sin ningún filtro previo ni visibilidad del embudo.",
        "No sabían qué contactos merecía la pena trabajar ni en qué paso se perdían las oportunidades, así que el equipo dedicaba el mismo tiempo a un lead bueno que a uno que nunca iba a ser paciente.",
      ],
      built: [
        { title: "Quiz de cualificación", desc: "Cada lead responde un quiz que puntúa su encaje antes de hablar con nadie del equipo." },
        { title: "Ocho workflows en producción", desc: "Entrada del lead, cualificación, seguimiento, recordatorios y paso a cita, con un pipeline de ocho etapas en GoHighLevel conectado a Koibox y a Stripe." },
        { title: "WhatsApp 24/7", desc: "Un bot que contesta, resuelve dudas y lleva a la cita a cualquier hora, revisado con pruebas que simulan seis tipos de paciente distintos." },
        { title: "Recuperación de leads", desc: "Un bot que vuelve a escribir a los leads que se quedaron a medias, unos 255 en la primera tanda." },
        { title: "Citas en Koibox", desc: "Los leads cualificados agendan directamente en Koibox, el software de citas de la clínica, sin pasar por recepción." },
        { title: "Mantenimiento", desc: "Vigilancia de los workflows, arreglo de fallos (un bucle de mensajes, un recordatorio que no se marcaba como enviado) y el informe diario del embudo." },
      ],
      results: [
        "Cada lead cualificado antes de que nadie del equipo le dedique tiempo.",
        "Respuesta por WhatsApp a cualquier hora y cita directa en Koibox.",
        "Todo el embudo medido: conversión, abandono, citas y ventas.",
      ],
    },
    en: {
      seoTitle: "Hospital Capilar with Growth4U: WhatsApp and Koibox bookings",
      metaDescription:
        "A project with Growth4U: a quiz that qualifies every lead, eight GoHighLevel workflows, a 24/7 WhatsApp bot, lead recovery and bookings straight into Koibox.",
      h1: "Hospital Capilar, with Growth4U: qualification, 24/7 WhatsApp and Koibox bookings",
      answer:
        "Hospital Capilar, a clinic in Madrid, was getting plenty of leads with no filter and no visibility of the funnel. In a project with Growth4U, we built a GoHighLevel system that qualifies every lead with a quiz, answers them on WhatsApp at any hour and books the appointment straight into Koibox. We run the eight workflows in production, the bot that recovers half-finished leads, and keep the system from failing.",
      context: [
        "They were getting plenty of leads, but with no prior filter and no visibility of the funnel.",
        "They did not know which contacts were worth working or at which step opportunities were lost, so the team spent as much time on a good lead as on one that would never become a patient.",
      ],
      built: [
        { title: "Qualification quiz", desc: "Every lead answers a quiz that scores their fit before talking to anyone on the team." },
        { title: "Eight workflows in production", desc: "Lead intake, qualification, follow-up, reminders and booking, with an eight-stage pipeline in GoHighLevel connected to Koibox and Stripe." },
        { title: "24/7 WhatsApp", desc: "A bot that answers, handles questions and leads to a booking at any hour, tested with simulations of six different kinds of patient." },
        { title: "Lead recovery", desc: "A bot that writes again to leads who stopped halfway, about 255 in the first batch." },
        { title: "Bookings in Koibox", desc: "Qualified leads book straight into Koibox, the clinic's booking software, without going through reception." },
        { title: "Maintenance", desc: "Monitoring of the workflows, fixing failures (a message loop, a reminder that was not marked as sent) and the daily funnel report." },
      ],
      results: [
        "Every lead qualified before anyone on the team spends time on it.",
        "Answers on WhatsApp at any hour and bookings straight into Koibox.",
        "The whole funnel measured: conversion, drop-off, appointments and sales.",
      ],
    },
  },

  "eventos-barcelona": {
    client: "Eventos Barcelona",
    sector: "eventos",
    services: ["generador-de-propuestas", "automatizacion-procesos-ia", "outbound-linkedin", "implementacion-crm-gohighlevel"],
    posts: ["propuestas-comerciales-automaticas", "reducir-gasto-tokens-ia-selectiva"],
    video: {
      src: "/videos/caso-eventos-barcelona.mp4",
      poster: "/videos/caso-eventos-barcelona.jpg",
      duration: "PT1M13S",
      uploadDate: "2026-10-08T09:00:00+02:00",
    },
    es: {
      seoTitle: "Caso Eventos Barcelona: propuestas en minutos, no en días",
      metaDescription:
        "Propuestas que tardaban días y salen en minutos, correos clasificados por una IA en servidor propio, outbound en LinkedIn y todo el proceso comercial en GoHighLevel.",
      h1: "Eventos Barcelona: de días a minutos por propuesta, y todo el proceso comercial automatizado",
      answer:
        "Eventos Barcelona tardaba días en preparar y gestionar cada propuesta, y para entonces el cliente ya había pedido presupuesto a otro. Montamos el sistema comercial completo: propuestas que salen en minutos tras la llamada, una IA en servidor propio que lee los correos que entran y crea la oportunidad en GoHighLevel, campañas de LinkedIn con las respuestas en el CRM y un panel para ver qué hacen distinto los clientes que compran.",
      context: [
        "Cada propuesta tardaba días en salir y gestionarse. Para cuando llegaba, el cliente ya se había enfriado o había pedido presupuesto a la competencia.",
        "Las solicitudes llegaban mezcladas en el mismo buzón con artistas, proveedores y publicidad, y alguien tenía que leerlas todas para saber cuáles eran clientes.",
        "Casi todo el negocio entraba por la web y por recomendación: no había un canal propio para ir a buscar clientes.",
      ],
      built: [
        { title: "Propuestas en minutos", desc: "Al colgar la llamada, el comercial rellena un formulario y sale la propuesta en web con la marca de la empresa y en PDF, se envía y queda registrada en el CRM con su estado." },
        { title: "Clasificador de correo con IA", desc: "Un modelo de IA en servidor propio lee cada correo, decide si es un cliente, un artista, un proveedor o un descarte, y abre la oportunidad en GoHighLevel. Sin coste por uso del modelo y con avisos por Telegram si algo falla." },
        { title: "Medido y corregido", desc: "155 casos de prueba sacados de correos reales. Una revisión encontró clientes clasificados como proveedores; las reglas de código que lo arreglaron cambiaron 19 decisiones de 122 correos reales, todas a mejor." },
        { title: "Outbound en LinkedIn", desc: "Campañas a contactos del director, agencias internacionales y expositores de ferias del sector, con las respuestas entrando solas en un pipeline del CRM y las métricas en el panel cada día." },
        { title: "Panel comercial", desc: "Seguimiento de lectura de cada propuesta, estados, origen de cada lead, la pestaña de outbound y una de indicadores con lo que hacen distinto los clientes que acaban comprando." },
        { title: "CRM y correo", desc: "Pipelines nuevos en GoHighLevel, correos de bienvenida en castellano e inglés, newsletter con informe de resultados y limpieza de datos." },
      ],
      results: [
        "Las propuestas pasaron de 1-3 días a unos 8 minutos desde el final de la llamada.",
        "En siete semanas (28-sep a 15-nov), 50 oportunidades nuevas: 25 desde la web, 17 creadas por el clasificador de IA y 8 a mano.",
        "LinkedIn: 1.298 invitaciones, 477 aceptadas (37%) y 62 conversaciones abiertas.",
        "El equipo dejó de maquetar documentos y de leer correo a mano, y dedica ese tiempo al seguimiento.",
      ],
      quote: {
        text: "Antes tardábamos hasta tres días en enviar una propuesta y perdíamos eventos por lentos. Con el sistema que montó Ramiro en GoHighLevel, la propuesta sale en minutos tras la llamada. Hemos cerrado eventos que antes se nos escapaban.",
        author: "Xavi",
        role: "Director · EB Eventos Barcelona",
      },
    },
    en: {
      seoTitle: "Eventos Barcelona case: proposals in minutes, not days",
      metaDescription:
        "Proposals that took days now go out in minutes, an AI on its own server sorts incoming email, LinkedIn outbound, and the whole sales process in GoHighLevel.",
      h1: "Eventos Barcelona: from days to minutes per proposal, and the whole sales process automated",
      answer:
        "Eventos Barcelona took days to prepare and manage each proposal, and by then the client had already asked someone else for a quote. We built the whole sales system: proposals that go out minutes after the call, an AI on its own server that reads incoming email and creates the opportunity in GoHighLevel, LinkedIn campaigns with replies flowing into the CRM, and a dashboard that shows what clients who buy do differently.",
      context: [
        "Each proposal took days to go out and be managed. By the time it arrived, the client had cooled off or asked competitors for a quote.",
        "Requests arrived in the same inbox as artists, suppliers and advertising, and someone had to read them all to know which were clients.",
        "Almost all business came from the website and referrals: there was no channel of their own to go and find clients.",
      ],
      built: [
        { title: "Proposals in minutes", desc: "After the call, the salesperson fills in a form and the proposal goes out as a branded web page and PDF, is sent and is recorded in the CRM with its status." },
        { title: "AI email classifier", desc: "An AI model on its own server reads every email, decides whether it is a client, an artist, a supplier or noise, and opens the opportunity in GoHighLevel. No per-use model cost, with Telegram alerts if anything fails." },
        { title: "Measured and fixed", desc: "155 test cases built from real emails. A review found clients filed as suppliers; the code rules that fixed it changed 19 decisions out of 122 real emails, all for the better." },
        { title: "LinkedIn outbound", desc: "Campaigns to the director's contacts, international agencies and exhibitors at industry fairs, with replies flowing into a CRM pipeline and the metrics on the dashboard every day." },
        { title: "Sales dashboard", desc: "Read tracking for each proposal, statuses, the source of each lead, an outbound tab and an indicators tab showing what clients who end up buying do differently." },
        { title: "CRM and email", desc: "New pipelines in GoHighLevel, welcome emails in Spanish and English, a newsletter with a results report and data clean-up." },
      ],
      results: [
        "Proposals went from 1-3 days to about 8 minutes after the end of the call.",
        "In seven weeks (28 Sep to 15 Nov), 50 new opportunities: 25 from the website, 17 created by the AI classifier and 8 by hand.",
        "LinkedIn: 1,298 invitations, 477 accepted (37%) and 62 conversations opened.",
        "The team stopped laying out documents and reading email by hand, and spends that time on follow-up.",
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
    services: ["asesoramiento-ia", "ia-selectiva", "automatizacion-procesos-ia", "desarrollo-software-a-medida"],
    posts: ["revisar-sistema-de-agentes-ia-antes-de-escalar", "coste-agente-de-ia-en-produccion", "agente-ia-meta-ads-google-ads", "agentes-de-ia-con-aprobacion-humana", "reducir-gasto-tokens-ia-selectiva", "que-es-gtm-engineering"],
    video: {
      src: "/videos/caso-tribeca-media.mp4",
      poster: "/videos/caso-tribeca-media.jpg",
      duration: "PT1M23S",
      uploadDate: "2026-10-08T09:00:00+02:00",
    },
    es: {
      seoTitle: "Tribeca Media: auditoría y agentes de IA para KEYWORKERS",
      metaDescription:
        "Auditoría técnica de una plataforma de agentes de IA, plan de corrección a precio cerrado, control del coste de IA y un agente de Meta y Google Ads con aprobación.",
      h1: "Tribeca Media: auditoría, coste de IA y agentes de performance y contenido para KEYWORKERS",
      answer:
        "Tribeca Media construye KEYWORKERS, una plataforma de agentes de IA para marketing. Empezamos con una auditoría técnica del código y del servidor en producción, que encontró problemas críticos de seguridad y de coste antes de escalar. Después vino el plan de corrección por bloques a precio cerrado, la observabilidad y el control del gasto en IA, y el Performance Agent: revisa Meta y Google Ads, propone cambios y no ejecuta nada sin aprobación.",
      context: [
        "KEYWORKERS da a cada cliente un equipo de agentes de IA para marketing que trabajan sobre sus cuentas reales de publicidad y redes.",
        "Antes de crecer necesitaban saber si la plataforma aguantaba: cuánto gastaba en IA y por qué, qué riesgos de seguridad tenía y qué había que arreglar primero.",
        "El agente de anuncios leía Meta Ads, pero no actuaba sobre las campañas ni tenía Google Ads.",
      ],
      built: [
        { title: "Auditoría técnica", desc: "16 horas sobre ocho repositorios y el servidor en producción: 3 hallazgos críticos, 9 altos y 6 medios, con dos salidas para cada uno (asumir el riesgo por escrito o corregirlo), arquitectura objetivo y un plan de cinco sprints." },
        { title: "Coste de la IA", desc: "El 64% de las llamadas iba al modelo más caro y el 73% de los tokens no estaba asignado a ningún cliente. Desde entonces cada llamada e imagen queda registrada con su coste, con tope de gasto." },
        { title: "Plan a precio cerrado y revisión independiente", desc: "Bloques de corrección con criterio de aceptación comprobable. Cuando el equipo de Tribeca hizo parte del plan por su cuenta, revisamos su trabajo y dejamos nueve puntos abiertos, cada uno con responsable." },
        { title: "Observabilidad y escalado", desc: "Chequeos de salud con avisos, logs sin credenciales, clientes procesados en paralelo, copia de seguridad fuera del servidor y 135 tests en el bloque de observabilidad." },
        { title: "Performance Agent en Meta y Google Ads", desc: "Lee las campañas, detecta lo que deja de funcionar y propone pausar, bajar presupuesto o crear campañas nuevas, que nacen en pausa. Nada se ejecuta sin el visto bueno de una persona; las aprobaciones caducan a las 24 horas y una bajada de presupuesto se puede deshacer." },
        { title: "Creatividades y contenido", desc: "Cuando un anuncio de Meta se fatiga, genera una imagen nueva y la deja lista para revisar. El Content Agent prepara piezas de contenido en vista previa, pendientes de aprobación; sus dos primeras líneas ya están desplegadas." },
      ],
      results: [
        "Los riesgos críticos, identificados y priorizados antes de escalar, con un plan de precio cerrado.",
        "El gasto en IA medido por cliente y con tope.",
        "Un agente que actúa sobre Meta y Google Ads solo con aprobación humana, en validación con un cliente piloto.",
        "El consejo de no montar el CRM mientras no hubiera clientes de pago, que ahorró un bloque de 129 horas.",
      ],
      // Reseña pública de Antonio en Sortlist (25-nov-2026).
      quote: {
        text: "La colaboración de Ramiro es espectacular.",
        author: "Antonio",
        role: "Country Manager · Tribeca Media",
      },
    },
    en: {
      seoTitle: "Tribeca Media: AI audit and agents for KEYWORKERS",
      metaDescription:
        "A technical audit of an AI agent platform, a fixed-price fix plan, AI cost control and a Meta and Google Ads agent that acts only with human approval.",
      h1: "Tribeca Media: audit, AI cost and performance and content agents for KEYWORKERS",
      answer:
        "Tribeca Media is building KEYWORKERS, a platform of AI agents for marketing. We started with a technical audit of the code and the production server, which found critical security and cost problems before scaling. Then came the fixed-price fix plan in blocks, observability and AI spend control, and the Performance Agent: it reviews Meta and Google Ads, proposes changes and executes nothing without approval.",
      context: [
        "KEYWORKERS gives each client a team of AI marketing agents that work on their real ad and social accounts.",
        "Before growing they needed to know whether the platform would hold: how much it spent on AI and why, which security risks it had and what to fix first.",
        "The ads agent read Meta Ads, but did not act on campaigns and had no Google Ads.",
      ],
      built: [
        { title: "Technical audit", desc: "16 hours on eight repositories and the production server: 3 critical, 9 high and 6 medium findings, each with two ways out (accept the risk in writing or fix it), a target architecture and a five-sprint plan." },
        { title: "AI cost", desc: "64% of calls went to the most expensive model and 73% of tokens were not assigned to any client. Since then every call and image is recorded with its cost, with a spending cap." },
        { title: "Fixed-price plan and independent review", desc: "Fix blocks with a checkable acceptance criterion. When Tribeca's team did part of the plan themselves, we reviewed their work and left nine open points, each with an owner." },
        { title: "Observability and scaling", desc: "Health checks with alerts, logs without credentials, clients processed in parallel, backups off the server and 135 tests in the observability block." },
        { title: "Performance Agent on Meta and Google Ads", desc: "Reads campaigns, spots what stops working and proposes pausing, cutting budget or creating new campaigns, which start paused. Nothing runs without a person's sign-off; approvals expire after 24 hours and a budget cut can be undone." },
        { title: "Creatives and content", desc: "When a Meta ad fatigues, it generates a new image and leaves it ready for review. The Content Agent prepares content pieces as previews pending approval; its first two lines are already deployed." },
      ],
      results: [
        "Critical risks identified and prioritised before scaling, with a fixed-price plan.",
        "AI spend measured per client, with a cap.",
        "An agent that acts on Meta and Google Ads only with human approval, being validated with a pilot client.",
        "The advice not to build the CRM until there were paying clients, which saved a 129-hour block.",
      ],
      // Reseña pública de Antonio en Sortlist (25-nov-2026), traducida.
      quote: {
        text: "Working with Ramiro has been outstanding.",
        author: "Antonio",
        role: "Country Manager · Tribeca Media",
      },
    },
  },

  growth4u: {
    client: "Growth4U",
    services: ["outbound-b2b", "outbound-linkedin", "implementacion-crm-gohighlevel", "cold-calling"],
    posts: ["clay-treg-coldiq-enriquecimiento-prospeccion-b2b", "prospeccion-b2b-outbound-con-ia", "como-cualificar-leads-automaticamente"],
    es: {
      seoTitle: "Caso Growth4U: outbound, enriquecimiento y GoHighLevel",
      metaDescription:
        "Para Growth4U y sus clientes: funnel en GoHighLevel, enriquecimiento de listas B2B con coste por acierto, LinkedIn, llamadas en caliente y auditoría de atribución.",
      h1: "Growth4U: el proceso comercial de la agencia y el outbound de sus clientes",
      answer:
        "Growth4U es una agencia de growth de Madrid. Montamos su funnel de captación en GoHighLevel y llevamos el outbound de varios de sus clientes B2B: listas enriquecidas con decisores, emails y móviles verificados, campañas en LinkedIn, llamadas en caliente cuando alguien acepta la invitación y la medición de dónde viene cada lead.",
      context: [
        "La captación de la agencia era manual, sin cualificación ni seguimiento sistemático, y en el CRM no se sabía de dónde venía cada contacto.",
        "Sus clientes B2B necesitaban listas de empresas con el decisor, su email y su teléfono comprobados, y no había una forma estable de conseguirlos ni de saber cuánto costaba cada acierto.",
      ],
      built: [
        { title: "Funnel en GoHighLevel", desc: "14 workflows, 15 plantillas de WhatsApp y 10 correos, con scoring y seguimiento automático." },
        { title: "Auditoría de atribución", desc: "En 622 contactos no había ningún campo de origen y el 37% tenía el origen vacío. Propuesta de siete campos y atribución automática con un control diario." },
        { title: "Enriquecimiento de listas B2B", desc: "Decisores, emails y móviles cruzando varias fuentes (Clay, Treg, ColdIQ, ContactOut, el BORME y verificación de teléfonos), con el coste por acierto medido en cada paso." },
        { title: "LinkedIn y llamadas en caliente", desc: "Campañas en LinkedIn con Valley y, cuando alguien acepta la invitación, una tarea de llamada para el comercial en HubSpot." },
        { title: "Resumen antes de cada reunión", desc: "El comercial recibe antes de cada cita un resumen del contacto con lo que hay en el CRM y en LinkedIn, sin datos personales de más." },
        { title: "QA de bots de WhatsApp", desc: "Pruebas de los bots de los clientes con seis tipos de cliente simulados antes de ponerlos en marcha." },
      ],
      results: [
        "En una lista de 584 empresas, los contactos con móvil pasaron del 9% al 26% en un día, a unos 0,17 $ por contacto.",
        "En otra, email de trabajo para el 63% de los contactos y 144 emails válidos de 167 verificados.",
        "1.252 mensajes de campaña etiquetados con su origen y comprobados uno a uno.",
        "La agencia sabe de dónde viene cada lead y sus clientes, cuánto les cuesta cada contacto.",
      ],
      quote: {
        text: "Necesitábamos un funnel de captación serio, con cualificación e IA, no un formulario más. Ramiro montó todo el proceso comercial en automático: captar, puntuar y hacer seguimiento. Ahora el equipo solo habla con leads que valen la pena.",
        author: "Philippe",
        role: "Growth Manager · Growth4U",
      },
    },
    en: {
      seoTitle: "Growth4U case: outbound, data enrichment and GoHighLevel",
      metaDescription:
        "For Growth4U and its clients: a GoHighLevel funnel, B2B list enrichment with cost per hit, LinkedIn, warm calls and an attribution audit.",
      h1: "Growth4U: the agency's sales process and its clients' outbound",
      answer:
        "Growth4U is a growth agency in Madrid. We built its lead capture funnel in GoHighLevel and run the outbound for several of its B2B clients: lists enriched with decision-makers and verified emails and mobiles, LinkedIn campaigns, warm calls when someone accepts the invitation, and measuring where each lead comes from.",
      context: [
        "The agency's lead capture was manual, with no qualification or systematic follow-up, and the CRM did not show where each contact came from.",
        "Its B2B clients needed lists of companies with the decision-maker, their email and phone checked, and there was no reliable way to get them or to know what each hit cost.",
      ],
      built: [
        { title: "GoHighLevel funnel", desc: "14 workflows, 15 WhatsApp templates and 10 emails, with scoring and automatic follow-up." },
        { title: "Attribution audit", desc: "Across 622 contacts there was no source field at all and 37% had an empty source. A proposal of seven fields and automatic attribution with a daily check." },
        { title: "B2B list enrichment", desc: "Decision-makers, emails and mobiles by crossing several sources (Clay, Treg, ColdIQ, ContactOut, the Spanish company register and phone verification), with the cost per hit measured at each step." },
        { title: "LinkedIn and warm calls", desc: "LinkedIn campaigns with Valley and, when someone accepts the invitation, a call task for the salesperson in HubSpot." },
        { title: "Brief before each meeting", desc: "Before each meeting the salesperson gets a summary of the contact from the CRM and LinkedIn, with no more personal data than needed." },
        { title: "WhatsApp bot QA", desc: "Testing clients' bots with six simulated kinds of customer before they go live." },
      ],
      results: [
        "On a list of 584 companies, contacts with a mobile went from 9% to 26% in one day, at about $0.17 per contact.",
        "On another, a work email for 63% of contacts and 144 valid emails out of 167 verified.",
        "1,252 campaign messages tagged with their source and checked one by one.",
        "The agency knows where each lead comes from, and its clients what each contact costs.",
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
