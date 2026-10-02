import type { Lang } from "@/lib/i18n";
import type { CaseClient } from "@/lib/servicios";

// Contenido de las paginas por sector (/soluciones/<slug>).
//
// Misma regla que servicios.ts: nada de cifras ni clientes que no esten ya
// publicados. Clinicas sale del articulo de clinicas y del caso de Hospital
// Capilar; eventos, del caso y del articulo de Eventos Barcelona. Academias
// no tiene caso ni articulo propio todavia, asi que describe el metodo sin
// prometer resultados.

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
  clinicas: {
    index: 0,
    caseClient: "Hospital Capilar",
    services: ["embudo-de-captacion", "agentes-ia-vps", "integracion-gohighlevel-hubspot"],
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
        { title: "El hueco vacío", desc: "En clínicas sin recordatorios automáticos, la tasa de ausencias suele estar entre el 15% y el 30%. Cada ausencia es agenda que ya no se puede vender." },
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
        "Instant response, reminders with confirmation, waiting lists and pre-qualification for clinics, connected to your clinical software and careful with health data.",
      h1: "Automation for clinics and hospitals",
      answer:
        "A clinic loses money in three places: the call nobody picked up, the slot left empty and the patient who never comes back. We automate instant response, reminders with confirmation, waiting lists and pre-qualification on GoHighLevel, connected to your clinical software and without moving medical records out of where they belong.",
      painsTitle: "Where the money is lost",
      pains: [
        { title: "The call nobody picked up", desc: "People looking for a clinic call several and stay with the first one that answers. That patient never shows up in any report because they never existed." },
        { title: "Out-of-hours enquiries", desc: "A large share of requests arrive in the evening, at night or at weekends. If the reply comes on Monday at ten, it is too late." },
        { title: "The empty slot", desc: "In clinics without automated reminders, no-show rates are usually 15% to 30%. Every no-show is calendar time that can no longer be sold." },
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
      "cuanto-cuesta-automatizar-un-proceso-con-ia",
    ],
    es: {
      seoTitle: "Automatización para empresas de eventos",
      metaDescription:
        "Del formulario tras la llamada a la propuesta en web y PDF en minutos, con seguimiento automático. Cómo Eventos Barcelona bajó un 85% su tiempo de respuesta.",
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
          a: "En Eventos Barcelona pasó de 1 a 3 días a unos 8 minutos desde el final de la llamada, y el tiempo de respuesta al cliente bajó un 85%.",
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
        "From the form after the call to a web and PDF proposal in minutes, with automatic follow-up. How Eventos Barcelona cut its response time by 85%.",
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
          a: "At Eventos Barcelona it went from 1–3 days to about 8 minutes from the end of the call, and client response time dropped by 85%.",
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
    index: 2,
    services: ["embudo-de-captacion", "agentes-ia-vps", "implementacion-crm-gohighlevel"],
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
        { title: "Interesados que nadie sigue", desc: "Pidieron información y nadie volvió a escribirles. En procesos sin sistema, la fuga habitual está entre el 30% y el 60% de los contactos." },
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
        { title: "Enquiries nobody follows up", desc: "They asked for information and nobody wrote back. In processes without a system, leakage is usually 30% to 60% of contacts." },
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
};

export const SECTOR_SLUGS = Object.keys(SECTORES);

export function getSector(slug: string, lang: Lang) {
  const s = SECTORES[slug];
  if (!s) return null;
  return { ...s[lang], index: s.index, caseClient: s.caseClient, services: s.services, posts: s.posts };
}
