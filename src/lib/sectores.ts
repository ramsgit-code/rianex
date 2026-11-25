import type { Lang } from "@/lib/i18n";
import type { CaseClient } from "@/lib/servicios";

// Contenido de las paginas por sector (/soluciones/<slug>).
//
// Misma regla que servicios.ts: nada de cifras ni clientes que no esten ya
// publicados. Clinicas sale del articulo de clinicas y del caso de Hospital
// Capilar; eventos, del caso y del articulo de Eventos Barcelona; agencias de
// marketing, de los casos de Tribeca Media y Growth4U. Academias
// no tiene caso ni articulo propio todavia, asi que describe el metodo sin
// prometer resultados.
//
// Inmobiliarias y negocios con cita previa tampoco tienen caso: salen de las
// landings de nichos.ts y de la ficha del agente de WhatsApp en servicios.ts
// (plazo, precio y preguntas), sin cifras de resultado ni caseClient.
//
// Industria y logistica (25-nov-2026): sin caso ni caseClient. La unica prueba
// es la trayectoria del fundador (Nissan, Michelin, UCAV) tal y como la fija
// POSICIONAMIENTO; Nissan y Michelin no son clientes y asi se dice.

type Item = { title: string; desc: string };
type Faq = { q: string; a: string };

export type SectorDetalle = {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  answer: string;
  painsTitle: string;
  pains: Item[];
  automationsTitle: string;
  automations: Item[];
  care?: { title: string; items: string[] };
  metricsTitle: string;
  metrics: string[];
  timeline: string;
  faqs: Faq[];
};

type Sector = {
  /** Indice del sector en content.soluciones.items. */
  index: number;
  caseClient?: CaseClient;
  services: string[];
  posts: string[];
  es: SectorDetalle;
  en: SectorDetalle;
};

export const SECTORES: Record<string, Sector> = {
  "agencias-de-marketing": {
    index: 0,
    caseClient: "Tribeca Media",
    services: ["automatizacion-procesos-ia", "embudo-de-captacion", "agente-ia-whatsapp", "generador-de-propuestas"],
    posts: [
      "agente-ia-meta-ads-google-ads",
      "agentes-de-ia-con-aprobacion-humana",
      "como-cualificar-leads-automaticamente",
      "coste-agente-de-ia-en-produccion",
    ],
    es: {
      seoTitle: "Automatización con IA para agencias de marketing",
      metaDescription:
        "Agentes que revisan Meta y Google Ads con aprobación humana, captación con scoring en GoHighLevel e informes automáticos. Casos de Tribeca Media y Growth4U.",
      h1: "Automatización con IA para agencias de marketing",
      answer:
        "Una agencia pierde margen en lo que se repite con cada cliente: revisar campañas, montar informes, seguir los leads y preparar propuestas. Automatizamos esas tareas con agentes de IA que revisan Meta y Google Ads y proponen cambios que una persona aprueba, captación con puntuación en GoHighLevel e informes y propuestas que se generan solos. Lo hemos hecho en Tribeca Media y en Growth4U.",
      painsTitle: "Dónde se le va el margen a una agencia",
      pains: [
        { title: "Campañas revisadas tarde", desc: "Un anuncio fatigado o un presupuesto mal repartido se ve en la reunión semanal, cuando ya ha gastado." },
        { title: "Informes a mano", desc: "Cada mes, horas sacando datos de Meta, Google y el CRM para montar el mismo informe para cada cliente." },
        { title: "Leads que nadie sigue", desc: "La campaña trae leads, pero el cliente tarda en contestarlos y acaba diciendo que la agencia no le trae ventas." },
        { title: "Propuestas y altas lentas", desc: "Cada cliente nuevo pide una propuesta a medida y un alta que el equipo monta a mano." },
      ],
      automationsTitle: "Qué automatizamos",
      automations: [
        { title: "Agente de performance", desc: "Revisa Meta y Google Ads, detecta lo que deja de funcionar y propone pausar, bajar presupuesto o crear campañas, que nacen en pausa. Nada se ejecuta sin aprobación." },
        { title: "Creatividades cuando un anuncio se fatiga", desc: "Genera una imagen nueva y la deja lista para revisar. Solo se sube lo que se aprueba." },
        { title: "Captación con scoring", desc: "Cada lead entra en GoHighLevel con una puntuación y su seguimiento automático, para la agencia o para sus clientes." },
        { title: "Respuesta a los leads de tus clientes", desc: "Un agente de WhatsApp que contesta y agenda por ellos, para que el resultado de la campaña se vea en ventas y no solo en leads." },
        { title: "Informes que se hacen solos", desc: "Los datos de las plataformas y del CRM, en el mismo informe cada semana, sin montarlo a mano." },
        { title: "Propuestas en minutos", desc: "Un formulario corto tras la llamada y la propuesta sale en web y PDF, con la marca de la agencia." },
      ],
      care: {
        title: "Lo que hay que tocar con cuidado",
        items: [
          "Son las cuentas de tus clientes: cada acción del agente la aprueba una persona con permiso, y la aprobación caduca si nadie la usa.",
          "Subir presupuesto nunca es automático. Bajarlo o pausar sí se propone, y se puede deshacer.",
          "Cada cliente con sus cuentas, sus límites y su coste de IA, medido por separado y con tope diario.",
          "Todo queda registrado: qué propuso el agente, quién lo aprobó y qué se ejecutó.",
        ],
      },
      metricsTitle: "Qué medimos",
      metrics: [
        "Horas al mes que el equipo dedica a revisar campañas, montar informes y preparar propuestas.",
        "Cuánto tarda en recibir respuesta un lead nuevo de cada cliente.",
        "Coste de IA por cliente y acciones propuestas, aprobadas y rechazadas.",
      ],
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
          q: "¿Qué se automatiza primero en una agencia?",
          a: "Lo que se repite con cada cliente y se puede medir: la revisión diaria de campañas, el informe semanal o la respuesta a los leads. En Growth4U, una agencia de marketing, empezamos por la captación: un funnel en GoHighLevel con puntuación automática y seguimiento.",
        },
        {
          q: "¿Con qué herramientas trabajáis?",
          a: "Meta Ads y Google Ads; GoHighLevel o HubSpot como CRM; Claude u OpenAI para los agentes, y n8n, Make o Zapier para conectar el resto. Partimos de lo que ya usáis.",
        },
      ],
    },
    en: {
      seoTitle: "AI automation for marketing agencies",
      metaDescription:
        "Agents that review Meta and Google Ads with human approval, lead capture with scoring in GoHighLevel and automatic reports. Tribeca Media and Growth4U cases.",
      h1: "AI automation for marketing agencies",
      answer:
        "An agency loses margin on what repeats with every client: reviewing campaigns, building reports, following up leads and preparing proposals. We automate those tasks with AI agents that review Meta and Google Ads and propose changes a person approves, lead capture with scoring in GoHighLevel, and reports and proposals that build themselves. We have done it at Tribeca Media and Growth4U.",
      painsTitle: "Where an agency loses its margin",
      pains: [
        { title: "Campaigns reviewed late", desc: "A fatigued ad or a badly split budget shows up in the weekly meeting, once it has already spent." },
        { title: "Reports by hand", desc: "Every month, hours pulling data from Meta, Google and the CRM to build the same report for each client." },
        { title: "Leads nobody follows", desc: "The campaign brings leads, but the client is slow to answer them and ends up saying the agency brings no sales." },
        { title: "Slow proposals and onboarding", desc: "Every new client needs a tailored proposal and an onboarding the team builds by hand." },
      ],
      automationsTitle: "What we automate",
      automations: [
        { title: "Performance agent", desc: "Reviews Meta and Google Ads, spots what stops working and proposes pausing, cutting budget or creating campaigns, which start paused. Nothing runs without approval." },
        { title: "Creatives when an ad fatigues", desc: "Generates a new image and leaves it ready for review. Only what is approved gets uploaded." },
        { title: "Lead capture with scoring", desc: "Every lead lands in GoHighLevel with a score and automatic follow-up, for the agency or for its clients." },
        { title: "Replies to your clients' leads", desc: "A WhatsApp agent that answers and books for them, so the campaign result shows up in sales, not just leads." },
        { title: "Reports that build themselves", desc: "Platform and CRM data in the same report every week, without building it by hand." },
        { title: "Proposals in minutes", desc: "A short form after the call and the proposal goes out as a web page and PDF, with the agency's branding." },
      ],
      care: {
        title: "What needs careful handling",
        items: [
          "These are your clients' accounts: every agent action is approved by an authorised person, and the approval expires if nobody uses it.",
          "Raising budget is never automatic. Cutting it or pausing is proposed, and can be undone.",
          "Each client with its own accounts, limits and AI cost, measured separately with a daily cap.",
          "Everything is logged: what the agent proposed, who approved it and what was executed.",
        ],
      },
      metricsTitle: "What we measure",
      metrics: [
        "Hours a month the team spends reviewing campaigns, building reports and preparing proposals.",
        "How long a new lead from each client waits for a reply.",
        "AI cost per client, and actions proposed, approved and rejected.",
      ],
      timeline:
        "The first system is usually running 4 to 8 weeks after the consultation, depending on how many accounts and tools need connecting.",
      faqs: [
        {
          q: "Does the AI touch my clients' campaigns without control?",
          a: "No. The agent proposes and an authorised person approves every action. At Tribeca Media approvals expire after 24 hours, every action is logged, raising budget is never automatic and a cut can be undone.",
        },
        {
          q: "Does it work with several client accounts?",
          a: "Yes. Each client with its own accounts, limits and cost: at Tribeca Media AI spend is measured per client and has a daily cap.",
        },
        {
          q: "What does an agency automate first?",
          a: "What repeats with every client and can be measured: the daily campaign review, the weekly report or replying to leads. At Growth4U, a marketing agency, we started with lead capture: a GoHighLevel funnel with automatic scoring and follow-up.",
        },
        {
          q: "Which tools do you work with?",
          a: "Meta Ads and Google Ads; GoHighLevel or HubSpot as CRM; Claude or OpenAI for the agents, and n8n, Make or Zapier to connect the rest. We start from what you already use.",
        },
      ],
    },
  },

  clinicas: {
    index: 2,
    caseClient: "Hospital Capilar",
    services: ["embudo-de-captacion", "agente-ia-whatsapp", "integracion-gohighlevel-hubspot"],
    posts: [
      "automatizacion-para-clinicas-captacion-y-agenda",
      "como-cualificar-leads-automaticamente",
      "rgpd-y-automatizacion-con-ia",
    ],
    es: {
      seoTitle: "Automatización para clínicas: captación y agenda",
      metaDescription:
        "Respuesta inmediata, recordatorios, lista de espera y precualificación para clínicas, conectados a tu software clínico, cuidando los datos de salud.",
      h1: "Automatización para clínicas y hospitales",
      answer:
        "En una clínica el dinero se pierde en tres sitios: la llamada que nadie cogió, el hueco que queda vacío y el paciente que no vuelve. Automatizamos la respuesta inmediata, los recordatorios con confirmación, la lista de espera y la precualificación sobre GoHighLevel, conectados a tu software clínico y sin sacar la historia clínica del sitio donde tiene que estar.",
      painsTitle: "Dónde se pierde el dinero",
      pains: [
        { title: "La llamada que nadie cogió", desc: "Quien busca una clínica llama a varias y se queda con la primera que le atiende. Ese paciente no aparece en ningún informe porque nunca llegó a existir." },
        { title: "El contacto fuera de horario", desc: "Una parte grande de las solicitudes entra por la tarde, por la noche o el fin de semana. Si la respuesta llega el lunes a las diez, llega tarde." },
        { title: "El hueco vacío", desc: "Sin recordatorios automáticos, casi ninguna clínica sabe cuántas ausencias tiene a la semana. Cada una es agenda que ya no se puede vender." },
        { title: "El paciente que no vuelve", desc: "Terminó su tratamiento, quedó contento y nadie le volvió a escribir. Recuperar pacientes antiguos es lo más barato que existe y lo que menos se hace." },
      ],
      automationsTitle: "Qué automatizamos, por orden de retorno",
      automations: [
        { title: "Respuesta inmediata", desc: "Venga del formulario, de WhatsApp o de una llamada perdida, en menos de un minuto hay una respuesta que ofrece el siguiente paso." },
        { title: "Recordatorios con confirmación", desc: "Al reservar, 48 horas antes y el mismo día. La respuesta del paciente actualiza la agenda sin que nadie lo teclee." },
        { title: "Lista de espera", desc: "Cuando alguien cancela, se avisa a quien esperaba hueco para ese tratamiento. La cancelación se convierte en cita, no en agenda vacía." },
        { title: "Precualificación", desc: "Antes de la primera llamada se sabe qué tratamiento busca, con qué urgencia y si encaja con lo que ofrecéis." },
        { title: "Seguimiento después del tratamiento", desc: "Un mensaje a los tres meses. Recupera pacientes y genera reseñas, que es lo que trae a los siguientes." },
      ],
      care: {
        title: "Lo que hay que tocar con cuidado",
        items: [
          "Los datos de salud son categoría especial (artículo 9 del RGPD): pedir cita para un tratamiento ya dice algo sobre la salud de alguien.",
          "El CRM gestiona el contacto, el interés y la cita. La historia clínica vive en el software clínico y no se cruza con el CRM comercial.",
          "Los mensajes automáticos no nombran el tratamiento: basta con «tienes cita mañana a las 10».",
          "Un agente informa de servicios, precios y disponibilidad, y agenda. No interpreta síntomas ni orienta sobre un tratamiento.",
          "Consentimiento explícito y registrado, para poder demostrarlo.",
        ],
      },
      metricsTitle: "Qué medimos",
      metrics: [
        "Cuántas solicitudes entran al mes y por qué canal.",
        "Cuánto se tarda de media en dar la primera respuesta.",
        "Qué porcentaje de citas acaba en ausencia.",
        "Cuántos pacientes no han vuelto en los últimos doce meses.",
      ],
      timeline:
        "Entre 4 y 8 semanas desde el diagnóstico. Si solo se puede empezar por una cosa, los recordatorios con confirmación: es lo más barato de montar y lo más rápido de notar.",
      faqs: [
        {
          q: "¿Qué conviene automatizar primero en una clínica?",
          a: "Los recordatorios de cita con confirmación. Es lo más barato de montar, lo más rápido de notar y lo que menos roza la parte delicada de los datos. Después, la respuesta inmediata a las solicitudes que entran fuera de horario.",
        },
        {
          q: "¿Sustituye a mi software clínico?",
          a: "No, se conecta a él. El CRM gestiona la captación y la conversación, y la agenda sigue siendo la del software clínico, sincronizada en un solo sentido. Que la agenda viva en dos sitios que se escriben mutuamente acaba en citas duplicadas.",
        },
        {
          q: "¿Se pueden automatizar procesos con datos de salud?",
          a: "Sí, con cuidado: consentimiento explícito y registrado, la historia clínica fuera del CRM comercial y mensajes que no nombran el tratamiento. Con mucho volumen o datos sensibles, los agentes pueden desplegarse en un servidor propio en la Unión Europea.",
        },
        {
          q: "¿Puede un agente de IA atender a los pacientes?",
          a: "Puede informar de servicios, precios y disponibilidad, y agendar la cita, también fuera de horario. No debe interpretar síntomas ni orientar sobre un tratamiento: eso no es una limitación técnica, es dónde está la línea.",
        },
      ],
    },
    en: {
      seoTitle: "Automation for clinics: patient intake and booking",
      metaDescription:
        "Instant replies, reminders with confirmation, waitlists and pre-qualification for clinics, connected to your clinical software and careful with health data.",
      h1: "Automation for clinics and hospitals",
      answer:
        "A clinic loses money in three places: the call nobody picked up, the slot left empty and the patient who never comes back. We automate instant response, reminders with confirmation, waiting lists and pre-qualification on GoHighLevel, connected to your clinical software and without moving medical records out of where they belong.",
      painsTitle: "Where the money is lost",
      pains: [
        { title: "The call nobody picked up", desc: "People looking for a clinic call several and stay with the first one that answers. That patient never shows up in any report because they never existed." },
        { title: "Out-of-hours enquiries", desc: "A large share of requests arrive in the evening, at night or at weekends. If the reply comes on Monday at ten, it is too late." },
        { title: "The empty slot", desc: "Without automated reminders, almost no clinic knows how many no-shows it has each week. Every one is calendar time that can no longer be sold." },
        { title: "The patient who does not return", desc: "They finished treatment, were happy and nobody wrote to them again. Winning back past patients is the cheapest thing there is and the least done." },
      ],
      automationsTitle: "What we automate, by return",
      automations: [
        { title: "Instant response", desc: "Whether it comes from a form, WhatsApp or a missed call, within a minute there is a reply offering the next step." },
        { title: "Reminders with confirmation", desc: "When booking, 48 hours before and on the day. The patient's reply updates the calendar without anyone typing it." },
        { title: "Waiting list", desc: "When someone cancels, whoever was waiting for that treatment is notified. The cancellation becomes an appointment, not an empty slot." },
        { title: "Pre-qualification", desc: "Before the first call you know which treatment they want, how urgent it is and whether it fits what you offer." },
        { title: "Post-treatment follow-up", desc: "A message after three months. It brings patients back and generates reviews, which is what brings the next ones." },
      ],
      care: {
        title: "What needs careful handling",
        items: [
          "Health data is a special category (GDPR article 9): booking a treatment already says something about someone's health.",
          "The CRM handles the contact, the interest and the appointment. Medical records live in the clinical software and are not mixed with the sales CRM.",
          "Automated messages do not name the treatment: “you have an appointment tomorrow at 10” is enough.",
          "An agent gives information on services, prices and availability, and books. It does not interpret symptoms or advise on treatment.",
          "Explicit, recorded consent, so it can be proven.",
        ],
      },
      metricsTitle: "What we measure",
      metrics: [
        "How many requests come in each month and through which channel.",
        "How long the first response takes on average.",
        "What percentage of appointments end in a no-show.",
        "How many patients have not returned in the last twelve months.",
      ],
      timeline:
        "Between 4 and 8 weeks from the assessment. If you can only start with one thing, reminders with confirmation: cheapest to set up and quickest to notice.",
      faqs: [
        {
          q: "What should a clinic automate first?",
          a: "Appointment reminders with confirmation. They are the cheapest to set up, the quickest to notice and touch the sensitive data least. Next, instant response to requests that arrive out of hours.",
        },
        {
          q: "Does it replace my clinical software?",
          a: "No, it connects to it. The CRM handles acquisition and conversation, and the calendar remains the clinical software's, synced in one direction. A calendar living in two places that write to each other ends in double bookings.",
        },
        {
          q: "Can processes involving health data be automated?",
          a: "Yes, carefully: explicit and recorded consent, medical records kept out of the sales CRM and messages that do not name the treatment. With high volume or sensitive data, agents can run on your own server in the European Union.",
        },
        {
          q: "Can an AI agent talk to patients?",
          a: "It can give information on services, prices and availability, and book the appointment, out of hours too. It must not interpret symptoms or advise on treatment: that is not a technical limit, it is where the line is.",
        },
      ],
    },
  },

  eventos: {
    index: 1,
    caseClient: "Eventos Barcelona",
    services: ["generador-de-propuestas", "implementacion-crm-gohighlevel", "automatizacion-procesos-ia"],
    posts: [
      "propuestas-comerciales-automaticas",
      "automatizar-procesos-con-ia-por-donde-empezar",
      "proyectos-de-ia-a-medida-ejemplos-plazos-precio",
    ],
    es: {
      seoTitle: "Automatización para empresas de eventos",
      metaDescription:
        "Del formulario tras la llamada a la propuesta en web y PDF en minutos, con seguimiento automático. El caso de Eventos Barcelona.",
      h1: "Automatización para empresas de eventos",
      answer:
        "En eventos gana quien responde primero: el cliente pide presupuesto a varios proveedores y se queda con quien llega antes. Automatizamos el tramo que va de la llamada a la propuesta. Un formulario de intake genera la propuesta en web y PDF en minutos dentro de GoHighLevel, y el seguimiento avisa si el cliente no la abre o no contesta.",
      painsTitle: "Por qué se pierden eventos",
      pains: [
        { title: "La propuesta es lenta", desc: "Entre la llamada, el análisis, la maquetación y la revisión se van de 1 a 3 días en empresas que trabajan bien. En las que tienen más carga, más." },
        { title: "Cada una sale distinta", desc: "Cada comercial la hace a su manera: cambia el formato, el cálculo de precios y el margen aplicado. No hay dos propuestas iguales." },
        { title: "Se pierde el momento", desc: "El cliente está interesado justo al colgar. Dos días después ha hablado con otros y ya tomó una dirección." },
        { title: "Nadie sabe si se leyó", desc: "La propuesta se envía y nadie sabe si se abrió. El comercial llama «por si tienes dudas» sin información real." },
      ],
      automationsTitle: "Qué automatizamos",
      automations: [
        { title: "Intake después de la llamada", desc: "El comercial rellena en 3 a 5 minutos el tipo de servicio, fechas, aforo, ciudad, detalles del evento y margen." },
        { title: "Propuesta generada", desc: "Web con URL propia y la marca de la empresa, con PDF descargable, creada a partir del intake." },
        { title: "Envío inmediato", desc: "El cliente recibe el enlace por correo y el CRM registra el envío." },
        { title: "Seguimiento", desc: "Si en 48 horas no la abre, recordatorio. Si la abre y no contesta en 72 horas, aviso al comercial." },
        { title: "Pipeline de propuestas", desc: "Cada propuesta con su estado en GoHighLevel: enviada, abierta, en negociación, aceptada o rechazada." },
      ],
      metricsTitle: "Qué medimos",
      metrics: [
        "Tiempo desde el final de la llamada hasta que el cliente tiene la propuesta.",
        "Propuestas enviadas, abiertas y aceptadas cada mes.",
        "Cuántas se quedan sin respuesta y en qué estado.",
      ],
      timeline:
        "La implementación completa lleva entre 3 y 4 semanas, según la complejidad del catálogo de servicios.",
      faqs: [
        {
          q: "¿Cuánto tarda en salir una propuesta?",
          a: "En Eventos Barcelona pasó de 1 a 3 días a unos 8 minutos desde el final de la llamada.",
        },
        {
          q: "¿Quién rellena el formulario?",
          a: "El comercial, no el cliente, justo después de la llamada. Son los datos que cambian en cada evento: servicio, fechas, aforo, ciudad, detalles y margen. Le lleva entre 3 y 5 minutos.",
        },
        {
          q: "¿Cómo sé si el cliente ha visto la propuesta?",
          a: "El CRM registra la apertura. Si no la abre en 48 horas, sale un recordatorio; si la abre y no contesta en 72, se avisa al comercial para que llame con información real.",
        },
        {
          q: "¿Sirve si cada evento es distinto?",
          a: "Sí. Lo que cambia de un evento a otro va en el intake; la estructura de la propuesta, los precios y las condiciones se repiten. El generador elimina el montaje, no el criterio: una persona revisa antes de enviar.",
        },
      ],
    },
    en: {
      seoTitle: "Automation for event companies",
      metaDescription:
        "From the form after the call to a web and PDF proposal in minutes, with automatic follow-up. The Eventos Barcelona case.",
      h1: "Automation for event companies",
      answer:
        "In events, whoever answers first wins: the client asks several suppliers for a quote and stays with whoever arrives first. We automate the stretch from the call to the proposal. An intake form generates the proposal as a web page and PDF in minutes inside GoHighLevel, and follow-up alerts you if the client does not open it or reply.",
      painsTitle: "Why events are lost",
      pains: [
        { title: "The proposal is slow", desc: "Between the call, analysis, layout and review, 1 to 3 days go by in companies that work well. In busier ones, longer." },
        { title: "Every one is different", desc: "Each salesperson does it their way: format, pricing and margin change. No two proposals are alike." },
        { title: "The moment is lost", desc: "The client is interested right after the call. Two days later they have talked to others and already chosen a direction." },
        { title: "Nobody knows if it was read", desc: "The proposal goes out and nobody knows whether it was opened. The salesperson calls “in case you have questions” with no real information." },
      ],
      automationsTitle: "What we automate",
      automations: [
        { title: "Intake after the call", desc: "The salesperson fills in service type, dates, capacity, city, event details and margin in 3 to 5 minutes." },
        { title: "Generated proposal", desc: "A web page with its own URL and the company's branding, plus a downloadable PDF, built from the intake." },
        { title: "Instant delivery", desc: "The client gets the link by email and the CRM records it." },
        { title: "Follow-up", desc: "If it is not opened in 48 hours, a reminder. If it is opened with no reply in 72 hours, the salesperson is alerted." },
        { title: "Proposal pipeline", desc: "Every proposal with its status in GoHighLevel: sent, opened, negotiating, accepted or rejected." },
      ],
      metricsTitle: "What we measure",
      metrics: [
        "Time from the end of the call until the client has the proposal.",
        "Proposals sent, opened and accepted each month.",
        "How many go unanswered, and at what stage.",
      ],
      timeline:
        "The full implementation takes 3 to 4 weeks, depending on how complex the service catalogue is.",
      faqs: [
        {
          q: "How long does a proposal take to go out?",
          a: "At Eventos Barcelona it went from 1–3 days to about 8 minutes from the end of the call.",
        },
        {
          q: "Who fills in the form?",
          a: "The salesperson, not the client, right after the call. It holds what changes for each event: service, dates, capacity, city, details and margin. It takes 3 to 5 minutes.",
        },
        {
          q: "How do I know the client has seen the proposal?",
          a: "The CRM records when it is opened. If it is not opened in 48 hours a reminder goes out; if it is opened with no reply in 72, the salesperson is alerted to call with real information.",
        },
        {
          q: "Does it work if every event is different?",
          a: "Yes. What changes between events goes into the intake; the proposal structure, prices and terms repeat. The generator removes the assembly, not the judgement: a person reviews before sending.",
        },
      ],
    },
  },

  academias: {
    index: 3,
    services: ["embudo-de-captacion", "agente-ia-whatsapp", "implementacion-crm-gohighlevel"],
    posts: [
      "como-cualificar-leads-automaticamente",
      "whatsapp-automatizacion-ventas",
      "agentes-de-ia-para-empresas-cuando-compensan",
    ],
    es: {
      seoTitle: "Automatización para academias y formación",
      metaDescription:
        "Respuesta inmediata, cualificación y seguimiento automático de interesados hasta la matrícula, para academias y centros de formación, medido en GoHighLevel.",
      h1: "Automatización para academias y centros de formación",
      answer:
        "En una academia el problema suele ser el mismo: muchos interesados, pocos matriculados y nadie con una lista de quién quedó pendiente. Automatizamos la respuesta inmediata a cada solicitud, la cualificación según el curso y el momento del interesado, y el seguimiento por correo y WhatsApp hasta la matrícula, todo medido en GoHighLevel.",
      painsTitle: "Dónde se quedan los interesados",
      pains: [
        { title: "Solicitudes sin respuesta a tiempo", desc: "Muchas llegan por la tarde, de noche o en fin de semana. Quien busca formación pregunta en varios sitios y se queda con quien contesta primero." },
        { title: "Interesados que nadie sigue", desc: "Pidieron información y nadie volvió a escribirles, y nadie sabe cuántos se pierden así." },
        { title: "Las mismas preguntas cada día", desc: "Fechas, horarios, precio, modalidad, plazas libres. Son repetitivas, pero exigen mirar algo, y el equipo se quema contestándolas." },
        { title: "Sin saber dónde se pierden", desc: "Sin el embudo medido no hay forma de saber si el problema está en la respuesta, en la información o en el seguimiento." },
      ],
      automationsTitle: "Qué automatizamos",
      automations: [
        { title: "Centralizar las solicitudes", desc: "Formulario, WhatsApp, correo y redes llegando a un mismo CRM, con una lista clara de quién está pendiente." },
        { title: "Respuesta inmediata", desc: "Cada interesado recibe al momento la información del curso que pidió y el siguiente paso." },
        { title: "Cualificación", desc: "Qué curso busca, cuándo quiere empezar y si encaja, para que el equipo dedique su tiempo a quien está cerca de matricularse." },
        { title: "Agente para las preguntas repetidas", desc: "Responde fechas, horarios y plazas consultando la información real, y pasa a una persona lo que no es rutina." },
        { title: "Seguimiento hasta la matrícula", desc: "Secuencia por correo y WhatsApp para quien aún no está listo, que vuelve al equipo cuando muestra intención." },
      ],
      metricsTitle: "Qué medimos",
      metrics: [
        "Cuántas solicitudes entran al mes y por qué canal.",
        "Cuánto se tarda en dar la primera respuesta.",
        "Qué parte de los interesados llega a hablar con alguien.",
        "Qué parte acaba matriculándose, y en qué paso se pierden los demás.",
      ],
      timeline: "Entre 4 y 8 semanas según el número de cursos y canales.",
      faqs: [
        {
          q: "¿Qué conviene automatizar primero en una academia?",
          a: "Centralizar las solicitudes y responder al momento. Si los interesados llegan por cuatro canales distintos, ninguna automatización puede con ello; con todo en un sitio, la respuesta inmediata ya recupera buena parte de lo que se escapa.",
        },
        {
          q: "¿Puede un agente de IA responder dudas sobre los cursos?",
          a: "Sí, las repetitivas que exigen consultar algo: fechas, horarios, precio o plazas. Lo que depende de matices, como orientar sobre qué formación le conviene a alguien, pasa a una persona.",
        },
        {
          q: "¿Qué pasa con quien no se matricula ahora?",
          a: "No se descarta: entra en una secuencia de seguimiento por correo y WhatsApp y vuelve al equipo cuando muestra intención, por ejemplo cuando se acerca la fecha de inicio que le interesaba.",
        },
      ],
    },
    en: {
      seoTitle: "Automation for academies and training centres",
      metaDescription:
        "Instant response, qualification and automatic follow-up of enquiries through to enrolment, for academies and training centres, measured in GoHighLevel.",
      h1: "Automation for academies and training centres",
      answer:
        "Academies usually share the same problem: many enquiries, few enrolments and nobody with a list of who is still pending. We automate the instant reply to every enquiry, qualification by course and timing, and email and WhatsApp follow-up through to enrolment, all measured in GoHighLevel.",
      painsTitle: "Where enquiries get stuck",
      pains: [
        { title: "Enquiries not answered in time", desc: "Many arrive in the evening, at night or at weekends. People looking for training ask in several places and go with whoever answers first." },
        { title: "Enquiries nobody follows up", desc: "They asked for information and nobody wrote back, and nobody knows how many are lost that way." },
        { title: "The same questions every day", desc: "Dates, schedules, price, format, free places. They repeat, but require checking something, and the team burns out answering them." },
        { title: "No idea where they drop", desc: "Without a measured funnel there is no way to know whether the problem is the response, the information or the follow-up." },
      ],
      automationsTitle: "What we automate",
      automations: [
        { title: "Centralise enquiries", desc: "Forms, WhatsApp, email and social landing in one CRM, with a clear list of who is pending." },
        { title: "Instant response", desc: "Every enquiry immediately gets the information about the course they asked for and the next step." },
        { title: "Qualification", desc: "Which course, when they want to start and whether it fits, so the team spends its time on people close to enrolling." },
        { title: "Agent for repeated questions", desc: "Answers dates, schedules and places by checking the real information, and hands anything non-routine to a person." },
        { title: "Follow-up to enrolment", desc: "An email and WhatsApp sequence for those not ready yet, who return to the team when they show intent." },
      ],
      metricsTitle: "What we measure",
      metrics: [
        "How many enquiries come in each month and through which channel.",
        "How long the first response takes.",
        "What share of enquiries gets to talk to someone.",
        "What share ends up enrolling, and at which step the rest drop.",
      ],
      timeline: "Between 4 and 8 weeks depending on the number of courses and channels.",
      faqs: [
        {
          q: "What should an academy automate first?",
          a: "Centralise enquiries and reply instantly. If enquiries come through four different channels no automation can cope; with everything in one place, the instant reply alone recovers much of what slips away.",
        },
        {
          q: "Can an AI agent answer questions about courses?",
          a: "Yes, the repetitive ones that need checking something: dates, schedules, price or places. Anything that depends on nuance, such as advising which training suits someone, goes to a person.",
        },
        {
          q: "What happens to people who do not enrol now?",
          a: "They are not discarded: they enter an email and WhatsApp follow-up sequence and return to the team when they show intent, for example when the start date they were interested in approaches.",
        },
      ],
    },
  },

  inmobiliarias: {
    index: 4,
    services: ["agente-ia-whatsapp", "implementacion-crm-gohighlevel", "embudo-de-captacion"],
    posts: [
      "como-cualificar-leads-automaticamente",
      "whatsapp-automatizacion-ventas",
      "agentes-de-ia-para-empresas-cuando-compensan",
      "que-es-gohighlevel",
    ],
    es: {
      seoTitle: "Automatización con IA para inmobiliarias",
      metaDescription:
        "Un agente de IA para inmobiliarias responde al momento a los leads de los portales, cualifica por presupuesto y zona, agenda la visita y lo deja en el CRM.",
      h1: "Automatización con IA para inmobiliarias",
      answer:
        "La automatización con IA para inmobiliarias hace que cada contacto de los portales o de la web reciba respuesta en minutos, también el fin de semana, sin depender de que un comercial esté libre. Un agente de IA contesta por WhatsApp o correo, pregunta presupuesto, zona, plazo y financiación, y agenda la visita con quien encaja. Inmuebles, compradores, propietarios y operaciones quedan en un solo CRM, GoHighLevel o HubSpot.",
      painsTitle: "Dónde se pierden operaciones",
      pains: [
        { title: "El lead que se enfría", desc: "Quien pregunta por un piso escribe a varias agencias. Si contestas al día siguiente, ya ha quedado con otra." },
        { title: "Visitas que no encajan", desc: "Se enseñan pisos a quien no tiene el presupuesto ni la financiación, y la tarde se va en visitas que no acaban en nada." },
        { title: "Contactos repartidos", desc: "Los leads viven en el correo de cada agente, en WhatsApp y en una hoja de cálculo. Cuando alguien se va, se lleva su cartera." },
        { title: "Propietarios sin noticias", desc: "El propietario no sabe cuántas visitas ha tenido su inmueble y llama para preguntar." },
      ],
      automationsTitle: "Qué automatizamos",
      automations: [
        { title: "Respuesta inmediata", desc: "El aviso del portal o el formulario de la web se lee solo, se crea el contacto y sale una respuesta por WhatsApp o correo en minutos, también de noche y en fin de semana." },
        { title: "Cualificación", desc: "Presupuesto, zona, plazo y si necesita financiación, antes de proponer una visita. El comercial enseña pisos a quien puede comprarlos." },
        { title: "Visitas agendadas", desc: "El comprador elige hueco en la agenda del comercial y recibe recordatorio; si cancela, el hueco se libera." },
        { title: "El CRM de la agencia", desc: "Inmuebles, compradores, propietarios y operaciones en GoHighLevel o HubSpot, con el pipeline a la vista. La cartera es de la agencia, no del correo de cada agente." },
        { title: "Informe al propietario", desc: "Las visitas y el interés que ha tenido su inmueble, enviados solos cada semana." },
      ],
      metricsTitle: "Qué medimos",
      metrics: [
        "Cuántos leads entran al mes y por qué portal o canal.",
        "Cuánto tarda cada lead en recibir la primera respuesta.",
        "Qué parte de los leads llega a visita y qué parte de las visitas acaba en operación.",
        "Cuántos contactos siguen sin seguimiento y desde cuándo.",
      ],
      timeline:
        "Entre 4 y 8 semanas desde la consultoría. Lo primero suele ser la respuesta inmediata a los leads de los portales: es lo que antes se nota.",
      faqs: [
        {
          q: "¿Qué hace un agente de IA en una inmobiliaria?",
          a: "Responde al momento a quien pregunta por un inmueble, informa de lo que está publicado, pregunta presupuesto, zona, plazo y financiación, y agenda la visita en la agenda del comercial. No negocia ni valora inmuebles: eso es cosa del comercial, y lo que se sale de ahí pasa a una persona.",
        },
        {
          q: "¿Se conecta con los portales inmobiliarios?",
          a: "Los portales avisan de cada contacto por correo, y ese aviso es la entrada: el sistema lo lee, crea el contacto y responde. Si tu software inmobiliario tiene API, también se conecta a él.",
        },
        {
          q: "¿De quién son los datos de los compradores?",
          a: "De la agencia. Se guardan en tu CRM, con el consentimiento registrado, y las cuentas están a tu nombre, no al nuestro.",
        },
        {
          q: "¿Cuánto cuesta?",
          a: "Depende del alcance: el discovery arranca en 1.500 €, la implementación completa va de 5.000 € a 25.000 € y hay un retainer mensual opcional de mantenimiento. El precio exacto se confirma tras la consultoría gratuita, no antes.",
        },
      ],
    },
    en: {
      seoTitle: "AI automation for real estate agencies",
      metaDescription:
        "An AI agent for real estate agencies replies to portal leads at once, qualifies by budget and area, books the viewing and logs it all in the CRM.",
      h1: "AI automation for real estate agencies",
      answer:
        "AI automation for real estate agencies means every enquiry from the property portals or your website gets a reply within minutes, weekends included, without waiting for an agent to be free. An AI agent answers on WhatsApp or email, asks about budget, area, timing and financing, and books the viewing with the buyers who fit. Properties, buyers, owners and deals sit in a single CRM, GoHighLevel or HubSpot.",
      painsTitle: "Where deals are lost",
      pains: [
        { title: "The lead that goes cold", desc: "Someone asking about a flat writes to several agencies. If you reply the next day, they have already arranged a viewing with another." },
        { title: "Viewings that do not fit", desc: "Flats are shown to people without the budget or the financing, and the afternoon goes on viewings that lead nowhere." },
        { title: "Scattered contacts", desc: "Leads live in each agent's inbox, in WhatsApp and in a spreadsheet. When someone leaves, their portfolio leaves with them." },
        { title: "Owners left without news", desc: "The owner does not know how many viewings the property has had, and calls to ask." },
      ],
      automationsTitle: "What we automate",
      automations: [
        { title: "Instant response", desc: "The portal notification or the website form is read automatically, the contact is created and a reply goes out on WhatsApp or email within minutes, at night and at weekends too." },
        { title: "Qualification", desc: "Budget, area, timing and whether they need financing, before a viewing is offered. The agent shows flats to people who can buy them." },
        { title: "Booked viewings", desc: "The buyer picks a slot in the agent's calendar and gets a reminder; if they cancel, the slot is freed." },
        { title: "The agency's CRM", desc: "Properties, buyers, owners and deals in GoHighLevel or HubSpot, with the pipeline in view. The portfolio belongs to the agency, not to each agent's inbox." },
        { title: "Owner report", desc: "The viewings and interest the property has had, sent automatically every week." },
      ],
      metricsTitle: "What we measure",
      metrics: [
        "How many leads come in each month, and from which portal or channel.",
        "How long each lead waits for the first reply.",
        "What share of leads reaches a viewing, and what share of viewings ends in a deal.",
        "How many contacts have had no follow-up, and since when.",
      ],
      timeline:
        "Between 4 and 8 weeks from the consultation. The first piece is usually the instant reply to portal leads: it is what you notice soonest.",
      faqs: [
        {
          q: "What does an AI agent do in a real estate agency?",
          a: "It replies at once to anyone asking about a property, gives the information that is published, asks about budget, area, timing and financing, and books the viewing in the agent's calendar. It does not negotiate or value properties: that is the agent's job, and anything beyond it goes to a person.",
        },
        {
          q: "Does it connect to the property portals?",
          a: "The portals notify you of each enquiry by email, and that notification is the entry point: the system reads it, creates the contact and replies. If your real estate software has an API, it connects to that too.",
        },
        {
          q: "Who owns the buyers' data?",
          a: "The agency. It is stored in your CRM, with consent recorded, and the accounts are in your name, not ours.",
        },
        {
          q: "How much does it cost?",
          a: "It depends on scope: discovery starts at €1,500, a full build runs from €5,000 to €25,000, and there is an optional monthly maintenance retainer. The exact price is confirmed after the free consultation, not before.",
        },
      ],
    },
  },

  "negocios-con-cita": {
    index: 5,
    services: ["agente-ia-whatsapp", "automatizacion-procesos-ia", "implementacion-crm-gohighlevel"],
    posts: [
      "agente-de-voz-whatsapp-agenda-citas",
      "automatizar-recepcion-clinica",
      "whatsapp-automatizacion-ventas",
      "ai-act-chatbot-decir-que-es-ia",
    ],
    es: {
      seoTitle: "Agente de IA para negocios con cita previa",
      metaDescription:
        "Agente de IA que contesta por WhatsApp y teléfono, da la cita en tu agenda y envía el recordatorio de citas automático. Para peluquerías, estética y fisios.",
      h1: "Agente de IA para negocios con cita previa",
      answer:
        "Un agente de IA para negocios con cita previa contesta por WhatsApp y por teléfono a cualquier hora, resuelve las dudas de siempre y da la cita en tu agenda mientras atiendes a un cliente. Después envía un recordatorio de citas automático que el cliente confirma con un mensaje, y cubre las cancelaciones con la lista de espera. Lo montamos para peluquerías, centros de estética, fisioterapia, consultas y centros deportivos.",
      painsTitle: "Dónde se pierden citas",
      pains: [
        { title: "El teléfono que no puedes coger", desc: "Estás con un cliente y suena el teléfono. Quien llama no deja mensaje: llama al siguiente." },
        { title: "Mensajes a deshoras", desc: "Se piden citas por WhatsApp a las once de la noche y se contestan al día siguiente, cuando ya han reservado en otro sitio." },
        { title: "El hueco vacío", desc: "Una cita a la que no viene nadie es una hora que ya no se puede volver a vender." },
        { title: "El cliente que no repite", desc: "Quedó contento, pero nadie le recordó que ya tocaba volver." },
      ],
      automationsTitle: "Qué automatizamos",
      automations: [
        { title: "Agente de WhatsApp y voz", desc: "Contesta, resuelve las dudas de siempre (precios, horarios y servicios) y da la cita en tu agenda. Lo que se sale de lo normal pasa a una persona." },
        { title: "Recordatorio de citas automático", desc: "Sale al reservar y el día antes, y el cliente confirma con un mensaje. Si cancela, el hueco se libera solo." },
        { title: "Lista de espera", desc: "Cuando se libera un hueco, se avisa a quien lo estaba esperando." },
        { title: "Vuelta del cliente", desc: "Un mensaje cuando toca repetir: el corte, la revisión o la siguiente sesión." },
        { title: "Reseñas", desc: "Después de la cita, se pide la reseña a los clientes contentos." },
      ],
      care: {
        title: "Lo que hay que tocar con cuidado",
        items: [
          "El agente dice que es una IA en el primer mensaje o al empezar la llamada: lo exige el AI Act desde agosto de 2026.",
          "Qué decide el agente solo y qué pasa siempre por una persona se fija contigo antes de construir.",
          "Si tratas datos de salud, como en fisioterapia o en una consulta, los mensajes automáticos no nombran el tratamiento: basta con «tienes cita mañana a las 10».",
          "El agente necesita la API oficial de WhatsApp Business. Mantienes tu número, pero deja de usarse en la app del móvil.",
        ],
      },
      metricsTitle: "Qué medimos",
      metrics: [
        "Cuántos mensajes y llamadas entran, y cuántos se quedan sin contestar.",
        "Cuánto tarda la primera respuesta, dentro y fuera de horario.",
        "Qué parte de las citas acaba en ausencia.",
        "Cuántas cancelaciones se cubren con la lista de espera.",
        "Cuántos clientes vuelven después del mensaje de repetición.",
      ],
      timeline:
        "Entre 4 y 8 semanas desde el diagnóstico. El primer agente suele estar atendiendo en la semana 4.",
      faqs: [
        {
          q: "¿Cómo funciona el recordatorio de citas automático?",
          a: "El cliente recibe un mensaje al reservar y otro el día antes, y confirma o cancela contestando. La respuesta actualiza la agenda sin que nadie lo teclee: si cancela, el hueco se libera y se avisa a quien estaba en la lista de espera.",
        },
        {
          q: "¿Puede agendar citas en mi calendario?",
          a: "Sí. Consulta los huecos libres y reserva directamente en tu agenda: el calendario de GoHighLevel o HubSpot, Google Calendar o tu software de citas si tiene API. Después envía la confirmación y los recordatorios.",
        },
        {
          q: "¿Sirve la app de WhatsApp Business del móvil?",
          a: "No. El agente necesita la API oficial de WhatsApp Business, que se da de alta con Meta directamente o a través de una plataforma como GoHighLevel. Puedes mantener tu número actual: se migra a la API. Lo que no se puede es seguir usándolo a la vez en la app del móvil.",
        },
        {
          q: "¿Cuánto cuesta un agente de IA para WhatsApp?",
          a: "La construcción entra en el rango de implementación, de 5.000 € a 25.000 €. Lo que más mueve el precio es cuántos sistemas tiene que consultar el agente y cuántas excepciones tiene tu proceso. Aparte están los costes de uso, que pagas directamente: Meta cobra por los mensajes de plantilla que inicia tu empresa (contestar a quien te escribe dentro de las 24 horas no tiene coste de Meta), Vapi cobra por minuto de llamada si hay agente de voz y el modelo de IA cobra por uso, o tiene coste fijo si va en servidor propio.",
        },
      ],
    },
    en: {
      seoTitle: "AI agent for appointment-based businesses",
      metaDescription:
        "An AI agent that answers on WhatsApp and the phone, books into your calendar and sends automatic appointment reminders. For salons, beauty centres and physios.",
      h1: "AI agent for appointment-based businesses",
      answer:
        "An AI agent for appointment-based businesses answers on WhatsApp and on the phone at any hour, handles the usual questions and books the appointment into your calendar while you are with a customer. It then sends an automatic appointment reminder the customer confirms with a message, and fills cancellations from the waiting list. We build it for hair salons, beauty centres, physiotherapy, private practices and sports centres.",
      painsTitle: "Where appointments are lost",
      pains: [
        { title: "The phone you cannot pick up", desc: "You are with a customer and the phone rings. The caller leaves no message: they call the next place." },
        { title: "Messages out of hours", desc: "People ask for appointments on WhatsApp at eleven at night and get an answer the next day, once they have booked somewhere else." },
        { title: "The empty slot", desc: "An appointment nobody turns up to is an hour that can no longer be sold." },
        { title: "The customer who does not come back", desc: "They left happy, but nobody reminded them it was time to return." },
      ],
      automationsTitle: "What we automate",
      automations: [
        { title: "WhatsApp and voice agent", desc: "It answers, handles the usual questions (prices, opening hours and services) and books the appointment into your calendar. Anything out of the ordinary goes to a person." },
        { title: "Automatic appointment reminders", desc: "Sent when booking and the day before, and the customer confirms with a message. If they cancel, the slot is freed automatically." },
        { title: "Waiting list", desc: "When a slot is freed, whoever was waiting for it is notified." },
        { title: "Bringing customers back", desc: "A message when it is time to return: the haircut, the check-up or the next session." },
        { title: "Reviews", desc: "After the appointment, happy customers are asked for a review." },
      ],
      care: {
        title: "What needs careful handling",
        items: [
          "The agent says it is an AI in the first message or at the start of the call: the AI Act has required it since August 2026.",
          "What the agent decides on its own and what always goes to a person is agreed with you before building.",
          "If you handle health data, as in physiotherapy or a private practice, automated messages do not name the treatment: “you have an appointment tomorrow at 10” is enough.",
          "The agent needs the official WhatsApp Business API. You keep your number, but it stops being used in the phone app.",
        ],
      },
      metricsTitle: "What we measure",
      metrics: [
        "How many messages and calls come in, and how many go unanswered.",
        "How long the first reply takes, in and out of hours.",
        "What share of appointments ends in a no-show.",
        "How many cancellations are filled from the waiting list.",
        "How many customers return after the come-back message.",
      ],
      timeline:
        "Between 4 and 8 weeks from the diagnosis. The first agent is usually answering by week 4.",
      faqs: [
        {
          q: "How do automatic appointment reminders work?",
          a: "The customer gets a message when booking and another the day before, and confirms or cancels by replying. The reply updates the calendar without anyone typing it: if they cancel, the slot is freed and whoever was on the waiting list is notified.",
        },
        {
          q: "Can it book appointments in my calendar?",
          a: "Yes. It checks free slots and books straight into your calendar: GoHighLevel or HubSpot calendars, Google Calendar or your booking software if it has an API. Then it sends the confirmation and reminders.",
        },
        {
          q: "Does the WhatsApp Business phone app work?",
          a: "No. The agent needs the official WhatsApp Business API, set up with Meta directly or through a platform such as GoHighLevel. You can keep your current number: it is migrated to the API. What you cannot do is keep using it in the phone app at the same time.",
        },
        {
          q: "How much does an AI agent for WhatsApp cost?",
          a: "The build falls within the implementation range, €5,000 to €25,000. What moves the price most is how many systems the agent has to check and how many exceptions your process has. Usage costs are separate and you pay them directly: Meta charges for template messages your business initiates (replying to someone who writes to you within 24 hours has no Meta fee), Vapi charges per call minute if there is a voice agent, and the AI model charges per use, or has a fixed cost on your own server.",
        },
      ],
    },
  },

  "industria-logistica": {
    index: 6,
    services: ["automatizacion-procesos-ia", "desarrollo-software-a-medida", "control-con-camaras-ia", "asesoramiento-ia"],
    posts: [
      "medir-un-proceso-antes-de-automatizarlo",
      "ejemplos-automatizacion-procesos-con-ia",
      "propuestas-licitaciones-con-ia",
      "camaras-con-ia-para-controlar-tu-negocio",
      "agentes-de-ia-vps-propio-o-nube",
    ],
    es: {
      seoTitle: "Automatización con IA para industria y logística",
      metaDescription:
        "Pedidos del correo al ERP, seguimiento de proveedores y OTIF, partes de calidad y cuadros de mando para fabricantes, distribuidores y empresas logísticas.",
      h1: "Automatización con IA para industria y logística",
      answer:
        "En un fabricante, una distribuidora o un operador logístico, las horas se van en pasar pedidos del correo al ERP, perseguir a los proveedores por las fechas de entrega y montar a mano los partes de calidad y los cuadros de mando. Automatizamos esos procesos con IA y reglas, conectados a tu ERP, y desarrollamos la aplicación que falte. El método viene de plantas y cadenas de suministro: el fundador coordina la migración del ERP en la cadena de suministro de Nissan.",
      painsTitle: "Dónde se van las horas",
      pains: [
        { title: "Pedidos que se teclean", desc: "Llegan por correo en PDF o en Excel, cada cliente con su formato, y alguien los pasa al ERP línea a línea. Un error en una referencia se descubre cuando el camión ya ha salido." },
        { title: "Proveedores sin fecha", desc: "Confirmar plazos es una ronda de correos y llamadas cada semana. Cuando un retraso se conoce tarde, la planificación ya no tiene margen y el OTIF cae." },
        { title: "Calidad e incidencias sueltas", desc: "Partes de calidad, no conformidades y reclamaciones en formularios o en hojas que nadie consolida, así que la misma incidencia vuelve a pasar." },
        { title: "Informes montados a mano", desc: "Cada lunes alguien saca datos del ERP, los cruza en Excel y los envía. Cuando llegan a dirección, ya son de la semana pasada." },
      ],
      automationsTitle: "Qué automatizamos",
      automations: [
        { title: "Pedidos y documentos al ERP", desc: "La IA lee el pedido en PDF o en el cuerpo del correo, extrae cliente, referencias, cantidades y fechas, y lo deja en el ERP para que una persona lo valide. Lo mismo con albaranes, facturas de proveedor y certificados. Lo que no cuadra con el maestro de artículos se marca, no se inventa." },
        { title: "Seguimiento de proveedores y OTIF", desc: "Peticiones de confirmación de fecha automáticas, lectura de las respuestas y aviso cuando una entrega se mueve. El OTIF por proveedor sale solo, cada semana." },
        { title: "Partes de calidad e incidencias", desc: "Una aplicación para registrar incidencias desde planta o almacén, con foto, y seguirlas hasta el cierre, en lugar de hojas sueltas." },
        { title: "Cuadros de mando para responsables", desc: "Los datos del ERP, del MES y de las hojas que sigan existiendo, en un panel que se actualiza solo con los indicadores que cada responsable revisa." },
        { title: "Listas de compra y BOM normalizadas", desc: "Listas de materiales y pedidos de compra que llegan en formatos distintos, convertidos a vuestras referencias y unidades antes de entrar en el sistema." },
        { title: "Muelles y almacén con cámaras", desc: "Las cámaras que ya tenéis miden cuánto tarda un camión en el muelle o cuándo se ocupa una zona, con avisos al momento y sin reconocimiento facial." },
      ],
      care: {
        title: "Lo que hay que tocar con cuidado",
        items: [
          "El ERP es la fuente de verdad: empezamos leyendo y nada se escribe en él sin validación.",
          "Los datos de producción y de clientes pueden quedarse en vuestros servidores, con modelos de IA que se ejecutan en local cuando hace falta.",
          "Cada dato que extrae la IA lleva al lado el documento de origen, para revisarlo en segundos.",
          "Todo queda registrado: qué entró, qué se cambió y quién lo aprobó.",
        ],
      },
      metricsTitle: "Qué medimos",
      metrics: [
        "Minutos por pedido desde que llega el correo hasta que está en el ERP, y errores de grabación.",
        "OTIF por proveedor y con cuántos días de antelación se conoce un retraso.",
        "Horas a la semana dedicadas a montar informes y a consolidar incidencias.",
      ],
      timeline:
        "Un primer proceso, como la entrada de pedidos o el seguimiento de proveedores, suele estar en marcha en 4 a 8 semanas desde la consultoría, según cómo se pueda conectar el ERP.",
      faqs: [
        {
          q: "¿Os conectáis con SAP u otro ERP?",
          a: "Sí, por la vía que permita el ERP: API, servicios web, un conector de integración o una base de datos de consulta. Empezamos leyendo, que no tiene riesgo, y solo escribimos en el ERP con validación y registro de cada cambio. Si el ERP no tiene API, trabajamos con las exportaciones que ya genera.",
        },
        {
          q: "¿Los datos pueden quedarse en nuestras instalaciones?",
          a: "Sí. La aplicación y el modelo de IA pueden ejecutarse en un servidor vuestro, sin enviar datos a servicios externos. Ya tenemos en producción un clasificador de correo con IA que funciona así, en un servidor propio y sin coste por uso.",
        },
        {
          q: "¿Por dónde se empieza?",
          a: "Por el proceso que más horas consume o que más errores mete en el ERP, medido antes de tocarlo: cuántos pedidos, cuántos minutos y cuántos errores. En la consultoría gratuita de 30 minutos vemos cuál es y qué datos hacen falta.",
        },
        {
          q: "¿Qué cambia que el fundador venga de la industria?",
          a: "Que conocemos el proceso antes de hablar de IA. Ramiro Pérez Rodero es ingeniero industrial y coordina la migración del ERP en la cadena de suministro de Nissan, donde también ha montado cuadros de mando para responsables en varios países. En Michelin redujo un 6 % el tiempo de ciclo con simulación, y es profesor de Industria 4.0 en el máster de la UCAV. Es su trayectoria: Nissan y Michelin no son clientes de Rianex.",
        },
      ],
    },
    en: {
      seoTitle: "AI automation for manufacturing and logistics",
      metaDescription:
        "Orders from email into the ERP, supplier follow-up and OTIF, quality reports and dashboards for manufacturers, distributors and logistics companies.",
      h1: "AI automation for manufacturing and logistics",
      answer:
        "At a manufacturer, a distributor or a logistics operator, the hours go on moving orders from email into the ERP, chasing suppliers for delivery dates and building quality reports and dashboards by hand. We automate those processes with AI and rules, connected to your ERP, and build whatever app is missing. The method comes from plants and supply chains: the founder coordinates the ERP migration in Nissan's supply chain.",
      painsTitle: "Where the hours go",
      pains: [
        { title: "Orders typed by hand", desc: "They arrive by email as PDF or Excel, each customer with its own format, and someone keys them into the ERP line by line. A wrong part number is found once the lorry has already left." },
        { title: "Suppliers with no date", desc: "Confirming lead times is a round of emails and calls every week. When a delay is known late, planning has no slack left and OTIF drops." },
        { title: "Scattered quality issues", desc: "Quality reports, non-conformities and complaints in loose forms or sheets nobody consolidates, so the same issue happens again." },
        { title: "Reports built by hand", desc: "Every Monday someone pulls data from the ERP, cross-checks it in Excel and sends it. By the time it reaches management, it is last week's." },
      ],
      automationsTitle: "What we automate",
      automations: [
        { title: "Orders and documents into the ERP", desc: "AI reads the order in a PDF or the email body, extracts customer, part numbers, quantities and dates, and leaves it in the ERP for a person to validate. The same goes for delivery notes, supplier invoices and certificates. Anything that does not match the item master is flagged, not made up." },
        { title: "Supplier follow-up and OTIF", desc: "Automatic requests to confirm dates, reading the replies and an alert when a delivery moves. OTIF per supplier comes out on its own, every week." },
        { title: "Quality reports and incidents", desc: "An app to log incidents from the plant or warehouse, with a photo, and follow them through to closure, instead of loose sheets." },
        { title: "Dashboards for managers", desc: "Data from the ERP, the MES and whatever sheets remain, in a dashboard that updates itself with the indicators each manager actually checks." },
        { title: "Normalised purchase lists and BOMs", desc: "Bills of materials and purchase orders that arrive in different formats, converted to your part numbers and units before they enter the system." },
        { title: "Docks and warehouse with cameras", desc: "The cameras you already have measure how long a lorry takes at the dock or when an area fills up, with instant alerts and no facial recognition." },
      ],
      care: {
        title: "What needs careful handling",
        items: [
          "The ERP is the source of truth: we start by reading and nothing is written to it without validation.",
          "Production and customer data can stay on your own servers, with AI models running locally when needed.",
          "Every piece of data the AI extracts sits next to its source document, so it can be checked in seconds.",
          "Everything is logged: what came in, what changed and who approved it.",
        ],
      },
      metricsTitle: "What we measure",
      metrics: [
        "Minutes per order from the email arriving to the order being in the ERP, and keying errors.",
        "OTIF per supplier and how many days in advance a delay becomes known.",
        "Hours a week spent building reports and consolidating incidents.",
      ],
      timeline:
        "A first process, such as order intake or supplier follow-up, is usually running 4 to 8 weeks after the consultation, depending on how the ERP can be connected.",
      faqs: [
        {
          q: "Do you connect to SAP or other ERPs?",
          a: "Yes, through whatever the ERP allows: an API, web services, an integration connector or a read-only database. We start by reading, which carries no risk, and only write to the ERP with validation and a log of every change. If the ERP has no API, we work with the exports it already produces.",
        },
        {
          q: "Can the data stay on our premises?",
          a: "Yes. The app and the AI model can run on a server of yours, with no data sent to outside services. We already have an AI email classifier in production that works this way, on its own server and with no per-use cost.",
        },
        {
          q: "Where do we start?",
          a: "With the process that takes the most hours or puts the most errors into the ERP, measured before we touch it: how many orders, how many minutes and how many errors. In the free 30-minute consultation we work out which one it is and what data is needed.",
        },
        {
          q: "What difference does the founder's industrial background make?",
          a: "We understand the process before talking about AI. Ramiro Pérez Rodero is an industrial engineer who coordinates the ERP migration in Nissan's supply chain, where he has also built dashboards for managers in several countries. At Michelin he cut cycle time by 6 % through simulation, and he teaches Industry 4.0 on the UCAV master's programme. This is his background: Nissan and Michelin are not Rianex clients.",
        },
      ],
    },
  },
};

export const SECTOR_SLUGS = Object.keys(SECTORES);

export function getSector(slug: string, lang: Lang) {
  const s = SECTORES[slug];
  if (!s) return null;
  return { ...s[lang], index: s.index, caseClient: s.caseClient, services: s.services, posts: s.posts };
}
