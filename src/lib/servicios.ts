import type { Lang } from "@/lib/i18n";

// Contenido de las paginas de cada servicio (/servicios/<slug>).
//
// El titulo, el problema, el "para quien" y los entregables viven en
// content.ts y los comparte el listado de /servicios. Aqui va lo que solo
// tiene la pagina propia: la respuesta directa (lo primero que lee un buscador
// o un asistente de IA), lo que consigue el cliente, un ejemplo de como
// funciona paso a paso, cuando encaja y cuando no, el metodo, el plazo, las
// preguntas frecuentes, los casos y los articulos relacionados. El video de
// cada servicio esta en servicio-media.ts, que tambien lo usa la home.
//
// Regla: nada de cifras ni clientes que no esten ya publicados en la web o en
// el blog. Precios y plazos salen de pricing y faq de content.ts; los criterios,
// de los articulos enlazados. Hospital Capilar es cliente de Growth4U: puede
// salir como caso de un servicio, pero siempre con la etiqueta "Con Growth4U".
//
// Kit IA, formacion y asesoramiento (nov-2026) son servicios nuevos: sus plazos
// y su forma de precio estan pendientes de validar por Ramiro
// (docs/PENDIENTES-SEO.md).

export type CaseClient = "Hospital Capilar" | "Eventos Barcelona" | "Growth4U" | "Tribeca Media";

type Step = { title: string; desc: string };
type Faq = { q: string; a: string };
/** Un paso del ejemplo "Asi funciona": etiqueta corta y que pasa. */
type FlowStep = { label: string; text: string };

export type ServicioDetalle = {
  /** Title para la SERP, sin la marca (la añade pageMetadata). */
  seoTitle: string;
  metaDescription: string;
  /** Respuesta directa de 40-70 palabras: que es y como lo hacemos. */
  answer: string;
  /** Lo que nota el cliente, en tres frases cortas. */
  outcomes: string[];
  /** Ejemplo ilustrativo de cuatro pasos, de lo que llega a lo que queda hecho. */
  flow: FlowStep[];
  fit: string[];
  notFit: string[];
  steps: Step[];
  timeline: string;
  /** Solo para precio "quote": como se fija el precio. */
  priceNote?: string;
  /**
   * Que parte de un caso demuestra este servicio, cuando no es la que cuenta
   * la ficha del caso (p. ej. Tribeca en asesoramiento: el diagnostico y el
   * control de coste, no el Performance Agent). Sale de casos.ts.
   */
  caseFocus?: Partial<Record<CaseClient, string>>;
  faqs: Faq[];
};

/**
 * Como se enseña la inversion en la ficha:
 * - "tiers": los tres rangos de pricing (discovery, implementacion, retainer).
 * - "advisory": solo discovery y retainer (asesoramiento).
 * - "quote": sin rangos, con el texto de priceNote (kit y formacion).
 */
export type PriceKind = "tiers" | "advisory" | "quote";

type Servicio = {
  /** Casos que lo demuestran, en orden. */
  cases?: CaseClient[];
  price?: PriceKind;
  /** Slugs de articulos del blog (solo existen en castellano). */
  posts: string[];
  es: ServicioDetalle;
  en: ServicioDetalle;
};

const PRECIO_ES =
  "Depende del alcance: el discovery arranca en 1.500 €, la implementación completa va de 5.000 € a 25.000 € y hay un retainer mensual opcional de mantenimiento. El precio exacto se confirma tras la consultoría gratuita, no antes.";
const PRECIO_EN =
  "It depends on scope: discovery starts at €1,500, a full build runs from €5,000 to €25,000, and there is an optional monthly maintenance retainer. The exact price is confirmed after the free consultation, not before.";

export const SERVICIOS: Record<string, Servicio> = {
  "automatizacion-procesos-ia": {
    cases: ["Eventos Barcelona", "Tribeca Media"],
    posts: [
      "automatizar-procesos-con-ia-por-donde-empezar",
      "como-implementar-ia-en-tu-empresa",
      "ejemplos-automatizacion-procesos-con-ia",
      "herramientas-ia-para-automatizar-procesos",
      "proyectos-de-ia-a-medida-ejemplos-plazos-precio",
      "cuanto-cuesta-automatizar-un-proceso-con-ia",
      "rgpd-y-automatizacion-con-ia",
      "n8n-3-que-se-rompe-y-como-prepararte",
    ],
    es: {
      seoTitle: "Automatización de procesos con IA para empresas",
      metaDescription:
        "Automatizamos con IA y reglas los procesos que se repiten cada semana, del primer contacto al cierre. Qué automatizar primero, en qué orden, plazo y precio.",
      answer:
        "Automatizar procesos con IA es conseguir que las tareas repetitivas —copiar datos, contestar lo mismo, perseguir pendientes— se hagan solas. Lo montamos con n8n, Make o Zapier, tareas programadas (crons) y Claude u OpenAI donde hace falta criterio, conectado a tu CRM y tus herramientas. Empezamos por el proceso que más dinero pierde; el resto son reglas, más baratas y predecibles.",
      fit: [
        "La tarea ocurre muchas veces a la semana y sigue reglas que sabrías explicar a alguien nuevo en cinco minutos.",
        "Consume horas que se pueden contar y su fallo cuesta dinero: un lead sin respuesta, una factura sin emitir, una cita sin confirmar.",
        "Quieres tener todo centralizado en un CRM, sea GoHighLevel, HubSpot u otro.",
      ],
      notFit: [
        "El proceso ocurre dos veces al mes: construirlo y mantenerlo cuesta más de lo que ahorra.",
        "Las reglas cambian según quién lo haga: antes de automatizarlo hay que definirlo.",
      ],
      steps: [
        { title: "Centralizar", desc: "Que todo llegue a un mismo sitio antes de automatizar nada. Si los contactos viven en cuatro bandejas, ninguna automatización puede con ello." },
        { title: "Automatizar lo obvio", desc: "Crear el registro, acusar recibo, asignar y recordar. Sin IA: esto solo ya elimina la mayor parte de la fuga." },
        { title: "Meter criterio", desc: "IA para leer texto libre, clasificar solicitudes y redactar respuestas, sobre un proceso que ya funciona y se mide." },
        { title: "Medir y ampliar", desc: "Comparar volumen, tiempo y fuga con los de antes, y pasar al siguiente proceso. Nunca dos a la vez al principio." },
      ],
      timeline:
        "Un primer proceso bien acotado se implanta en 4 a 6 semanas, contando la fase de definición, que suele ser la más lenta.",
      outcomes: [
        "Horas a la semana devueltas al equipo",
        "Datos que pasan entre herramientas sin copiar y pegar",
        "Menos errores y ninguna tarea olvidada",
      ],
      flow: [
        { label: "Llega", text: "Un correo con un pedido, una factura o una consulta." },
        { label: "La IA lo lee", text: "Extrae los datos, entiende qué es y lo clasifica." },
        { label: "Se registra", text: "Los datos entran en el CRM o en tu herramienta, sin teclear." },
        { label: "Hecho", text: "Quien tiene que actuar recibe la tarea con fecha y recordatorio." },
      ],
      faqs: [
        {
          q: "¿Qué proceso conviene automatizar primero?",
          a: "El que cumple cuatro condiciones a la vez: ocurre muchas veces, sigue reglas estables, cuesta tiempo medible y su fallo tiene consecuencias. En la mayoría de pymes es el tramo que va desde que llega un contacto hasta que alguien hace algo con él.",
        },
        {
          q: "¿Todo lo hace la IA?",
          a: "No. La mayor parte de una automatización son reglas: si llega un formulario, crear el contacto, asignarlo y programar el recordatorio. La IA entra donde el dato es texto libre, como un mensaje de WhatsApp o un correo largo. Usarla donde basta una regla es más caro, más lento y menos predecible.",
        },
        {
          q: "¿Cómo sé si me compensa?",
          a: "Multiplica cuántas veces ocurre a la semana, cuántos minutos lleva y el coste por hora de quien lo hace: es lo que cuesta seguir haciéndolo a mano. Luego suma lo que se pierde. En procesos comerciales sin sistema, la fuga suele estar entre el 30% y el 60% de los contactos, y casi siempre pesa más que las horas.",
        },
        { q: "¿Cuánto cuesta?", a: PRECIO_ES },
      ],
    },
    en: {
      seoTitle: "AI process automation for businesses",
      metaDescription:
        "We automate the processes that repeat every week with AI and rules, from first contact to close. What to automate first, in what order, timeline and price.",
      answer:
        "AI process automation means the repetitive work —copying data, answering the same questions, chasing follow-ups— runs on its own. We build it with n8n, Make or Zapier, scheduled jobs (cron) and Claude or OpenAI where judgement is needed, connected to your CRM and tools. We start with the process that loses the most money; the rest is rules, cheaper and more predictable.",
      fit: [
        "The task happens many times a week and follows rules you could explain to a new hire in five minutes.",
        "It eats hours you can count and its failure costs money: an unanswered lead, an unsent invoice, an unconfirmed appointment.",
        "You want everything centralised in a CRM, whether GoHighLevel, HubSpot or another.",
      ],
      notFit: [
        "The process happens twice a month: building and maintaining it costs more than it saves.",
        "The rules change depending on who does it: it needs defining before it can be automated.",
      ],
      steps: [
        { title: "Centralise", desc: "Everything lands in one place before anything is automated. If contacts live in four inboxes, no automation can cope." },
        { title: "Automate the obvious", desc: "Create the record, acknowledge, assign and remind. No AI: this alone removes most of the leakage." },
        { title: "Add judgement", desc: "AI to read free text, classify requests and draft replies, on top of a process that already works and is measured." },
        { title: "Measure and expand", desc: "Compare volume, time and leakage with the baseline, then move to the next process. Never two at once at the start." },
      ],
      timeline:
        "A well-scoped first process goes live in 4 to 6 weeks, including the definition phase, which is usually the slowest.",
      outcomes: [
        "Hours a week back for the team",
        "Data that moves between tools without copy and paste",
        "Fewer mistakes and no forgotten tasks",
      ],
      flow: [
        { label: "Comes in", text: "An email with an order, an invoice or a question." },
        { label: "AI reads it", text: "It extracts the data, understands what it is and classifies it." },
        { label: "Recorded", text: "The data lands in the CRM or your tool, with no typing." },
        { label: "Done", text: "Whoever needs to act gets the task, with a due date and a reminder." },
      ],
      faqs: [
        {
          q: "Which process should I automate first?",
          a: "The one that meets four conditions at once: it happens often, follows stable rules, takes measurable time and its failure has consequences. For most small and mid-sized businesses it is the stretch between a contact arriving and someone acting on it.",
        },
        {
          q: "Does AI do everything?",
          a: "No. Most of an automation is rules: when a form arrives, create the contact, assign it and schedule the reminder. AI comes in where the input is free text, such as a WhatsApp message or a long email. Using it where a rule would do is more expensive, slower and less predictable.",
        },
        {
          q: "How do I know if it pays off?",
          a: "Multiply how often it happens per week, how many minutes it takes and the hourly cost of whoever does it: that is the cost of keeping it manual. Then add what is lost. In sales processes without a system, leakage is usually 30% to 60% of contacts, and it almost always outweighs the hours.",
        },
        { q: "How much does it cost?", a: PRECIO_EN },
      ],
    },
  },

  "integracion-gohighlevel-hubspot": {
    cases: ["Hospital Capilar"],
    posts: ["integrar-gohighlevel-con-tu-stack", "whatsapp-automatizacion-ventas"],
    es: {
      seoTitle: "Integración de GoHighLevel y HubSpot con tu stack",
      metaDescription:
        "Conectamos GoHighLevel o HubSpot con tu web, agenda, facturación, ERP y WhatsApp por API y webhooks, con avisos si algo falla. Qué integrar primero.",
      answer:
        "Integrar GoHighLevel o HubSpot es conseguir que el CRM reciba solo lo que pasa en la web, la agenda, la facturación y WhatsApp, sin que nadie copie datos a mano. Usamos la integración nativa cuando existe, webhooks para lo que ocurre en tiempo real y la API para el resto. Cada conexión lleva reintento y aviso si algo no entra.",
      fit: [
        "Usas GoHighLevel o HubSpot y los datos se copian a mano entre la web, la agenda, la facturación y WhatsApp.",
        "El equipo no se fía de lo que pone el CRM porque está incompleto o lleno de duplicados.",
        "Tu CRM funciona y solo le faltan piezas: mensajería, embudos o facturación.",
      ],
      notFit: [
        "Pagas varias herramientas que hacen lo mismo y ninguna se habla con las otras: ahí suele salir mejor migrar que poner tuberías entre ellas.",
        "Todavía no tienes CRM: primero se implanta y luego se integra.",
      ],
      steps: [
        { title: "Inventario", desc: "Qué herramientas hay, qué datos mueve cada una y qué sistema manda en cada dato. El resto lee y no escribe." },
        { title: "Orden", desc: "Entrada de contactos, canal de conversación, agenda y facturación, por ese orden. Lo exótico espera a que eso esté estable." },
        { title: "Construcción", desc: "Nativa si existe, webhook si puede ser y API para lo demás. Un solo sentido salvo que de verdad haga falta el doble." },
        { title: "Vigilancia", desc: "Reintentos, deduplicación por correo o teléfono desde el primer día y aviso cuando una integración falla." },
      ],
      timeline:
        "Entre 4 y 8 semanas según cuántos sistemas haya que conectar. El número de sistemas pesa mucho más que el volumen de datos.",
      outcomes: [
        "Un CRM en el que el equipo confía",
        "Ningún dato copiado a mano entre herramientas",
        "Aviso al momento si una conexión deja de funcionar",
      ],
      flow: [
        { label: "Pasa algo", text: "Un cliente reserva, paga o rellena un formulario." },
        { label: "Viaja solo", text: "El dato llega al CRM al momento, sin que nadie lo copie." },
        { label: "Cuadra", text: "Agenda, facturación y CRM dicen lo mismo, sin duplicados." },
        { label: "Vigilado", text: "Si una conexión falla, se reintenta y te avisamos." },
      ],
      faqs: [
        {
          q: "¿Se puede integrar GoHighLevel con cualquier herramienta?",
          a: "Casi siempre, por integración nativa, webhooks o API. La pregunta útil es qué integraciones aguantan en producción sin romperse, y eso depende de decidir qué sistema manda en cada dato y de gestionar los fallos.",
        },
        {
          q: "¿Hace falta Make o Zapier?",
          a: "Sirven para validar una idea rápido. Como infraestructura permanente de algo que ocurre mil veces al día salen caros, porque se paga por ejecución. Ahí conviene un webhook o una integración propia.",
        },
        {
          q: "¿Por qué fallan las integraciones a los tres meses?",
          a: "Por cuatro motivos que se repiten: no definir qué sistema manda en cada dato, sincronizar en los dos sentidos sin necesidad, fallos silenciosos que nadie ve y duplicados que nadie limpia. Se resuelven en el diseño, no después.",
        },
        {
          q: "¿Trabajáis con HubSpot o solo con GoHighLevel?",
          a: "Con los dos. Si ya usas HubSpot, lo automatizamos y lo integramos con el resto de tus herramientas sin obligarte a cambiar. Si quieres pasar a GoHighLevel, hacemos la migración completa.",
        },
      ],
    },
    en: {
      seoTitle: "GoHighLevel and HubSpot integration",
      metaDescription:
        "We connect GoHighLevel or HubSpot to your website, calendar, invoicing, ERP and WhatsApp via API and webhooks, with alerts when something fails.",
      answer:
        "Integrating GoHighLevel or HubSpot means your CRM receives what happens on your website, calendar, invoicing and WhatsApp on its own, with nobody copying data by hand. We use the native integration when it exists, webhooks for real-time events and the API for the rest. Every connection retries and alerts when something does not get through.",
      fit: [
        "You use GoHighLevel or HubSpot and data is copied by hand between your website, calendar, invoicing and WhatsApp.",
        "Your team does not trust the CRM because it is incomplete or full of duplicates.",
        "Your CRM works and only lacks pieces: messaging, funnels or invoicing.",
      ],
      notFit: [
        "You pay for several tools that do the same thing and none of them talk to each other: migrating usually beats piping them together.",
        "You do not have a CRM yet: it gets implemented first, then integrated.",
      ],
      steps: [
        { title: "Inventory", desc: "Which tools exist, what data each one moves and which system owns each field. The rest read, they do not write." },
        { title: "Order", desc: "Contact intake, conversation channel, calendar and invoicing, in that order. The exotic stuff waits until those are stable." },
        { title: "Build", desc: "Native if it exists, webhook if possible, API for the rest. One direction unless two are really needed." },
        { title: "Monitoring", desc: "Retries, deduplication by email or phone from day one and an alert when an integration fails." },
      ],
      timeline:
        "Between 4 and 8 weeks depending on how many systems need connecting. The number of systems matters far more than data volume.",
      outcomes: [
        "A CRM the team trusts",
        "No data copied by hand between tools",
        "An alert as soon as a connection stops working",
      ],
      flow: [
        { label: "Something happens", text: "A customer books, pays or fills in a form." },
        { label: "It travels", text: "The data reaches the CRM instantly, with no one copying it." },
        { label: "It matches", text: "Calendar, invoicing and CRM say the same thing, with no duplicates." },
        { label: "Watched", text: "If a connection fails, it retries and we alert you." },
      ],
      faqs: [
        {
          q: "Can GoHighLevel integrate with any tool?",
          a: "Almost always, through a native integration, webhooks or the API. The useful question is which integrations hold up in production, and that depends on deciding which system owns each field and on handling failures.",
        },
        {
          q: "Do I need Make or Zapier?",
          a: "They are good for validating an idea quickly. As permanent infrastructure for something that happens a thousand times a day they get expensive, because you pay per run. A webhook or a custom integration is better there.",
        },
        {
          q: "Why do integrations break after three months?",
          a: "For four recurring reasons: no decision on which system owns each field, two-way sync without need, silent failures nobody sees and duplicates nobody cleans. They are solved in the design, not afterwards.",
        },
        {
          q: "Do you work with HubSpot or only GoHighLevel?",
          a: "Both. If you already use HubSpot, we automate it and integrate it with your other tools without making you switch. If you want to move to GoHighLevel, we handle the full migration.",
        },
      ],
    },
  },

  "migracion-a-gohighlevel": {
    posts: [
      "migrar-de-hubspot-a-gohighlevel-sin-perder-historico",
      "integrar-gohighlevel-con-tu-stack",
    ],
    es: {
      seoTitle: "Migración de HubSpot a GoHighLevel sin perder datos",
      metaDescription:
        "Migramos tu CRM de HubSpot, Pipedrive, Zoho o Salesforce a GoHighLevel con contactos, oportunidades, notas y campos. Prueba, validación y periodo en paralelo.",
      answer:
        "Migrar a GoHighLevel es llevar contactos, empresas, oportunidades, notas, etiquetas y campos personalizados desde HubSpot u otro CRM, y rehacer las automatizaciones, formularios y plantillas, que no se pueden copiar. Lo hacemos con una migración de prueba, validación de los datos y unas semanas con los dos CRM en paralelo, para que no te quedes nunca sin CRM.",
      fit: [
        "Pagas por funcionalidades que no usas o el coste crece con cada contacto que añades.",
        "Necesitas WhatsApp, SMS, embudos y pipeline en el mismo sitio.",
        "Tienes varias herramientas que hacen cosas parecidas y ninguna se habla con las otras.",
      ],
      notFit: [
        "Tu equipo depende de informes avanzados o de integraciones nativas que solo existen en tu CRM actual: ahí sale mejor integrar que mudarse.",
      ],
      steps: [
        { title: "Inventario", desc: "Cuántos contactos, qué campos personalizados, qué automatizaciones están activas de verdad y qué integraciones dependen del CRM actual." },
        { title: "Estructura y prueba", desc: "Campos, pipeline y etiquetas creados en GoHighLevel antes de importar, y una migración de prueba con cien contactos para ver los problemas cuando aún son baratos." },
        { title: "Migración y automatizaciones", desc: "Migración completa y solo las automatizaciones que hacen falta, probadas con casos reales antes de que dependa de ellas una venta." },
        { title: "Paralelo y apagado", desc: "Los dos CRM funcionando a la vez dos o tres semanas. El antiguo se apaga cuando se acaban las dudas y tras guardar fuera una exportación completa." },
      ],
      timeline:
        "Una cuenta pequeña, con pocos miles de contactos y un puñado de automatizaciones, se migra en 2 o 3 semanas contando el paralelo. Una cuenta con integraciones a facturación, web y telefonía se va a 6 u 8.",
      outcomes: [
        "Un solo CRM en lugar de varias herramientas que no se hablan",
        "Todo el histórico conservado: contactos, oportunidades y notas",
        "El equipo trabajando en GoHighLevel desde el primer día",
      ],
      flow: [
        { label: "Inventario", text: "Contactos, campos, automatizaciones e integraciones de tu CRM actual." },
        { label: "Prueba", text: "Una migración de prueba con cien contactos para ver los problemas cuando aún son baratos." },
        { label: "Migración", text: "Pasa todo el histórico y se rehacen las automatizaciones que hacen falta." },
        { label: "Convivencia", text: "Los dos CRM funcionan a la vez hasta que todo cuadra." },
      ],
      faqs: [
        {
          q: "¿Qué se migra al pasar a GoHighLevel?",
          a: "Contactos, empresas, oportunidades con sus etapas, notas, etiquetas y campos personalizados. Las automatizaciones, formularios y plantillas de correo se rehacen en GoHighLevel, porque no se pueden copiar tal cual entre plataformas. Validamos los datos antes del cambio y los dos CRM conviven hasta que todo cuadra.",
        },
        {
          q: "¿Qué no se puede llevar?",
          a: "Los hilos de correo completos rara vez viajan íntegros, y los informes y las automatizaciones se reconstruyen. Las grabaciones de llamadas dependen del proveedor de telefonía: si están alojadas en el CRM antiguo, hay que descargarlas antes de cerrar la cuenta.",
        },
        {
          q: "¿Me quedo sin CRM durante la migración?",
          a: "No. Durante el paralelo el equipo trabaja en GoHighLevel y el CRM antiguo queda de consulta. Cada vez que alguien dice «esto en el otro lo hacía así», se apunta y se resuelve. Se apaga cuando dejan de aparecer esas preguntas.",
        },
        {
          q: "¿También migráis desde Pipedrive, Zoho, Salesforce u hojas de cálculo?",
          a: "Sí. El método es el mismo: inventario, estructura en destino, prueba con una muestra, migración completa y paralelo. Cambia el formato de exportación de cada origen, no el orden.",
        },
        { q: "¿Cuánto cuesta?", a: PRECIO_ES },
      ],
    },
    en: {
      seoTitle: "HubSpot to GoHighLevel migration, no data lost",
      metaDescription:
        "We migrate your CRM from HubSpot, Pipedrive, Zoho or Salesforce to GoHighLevel with contacts, deals, notes and fields. Test run, validation and parallel period.",
      answer:
        "Migrating to GoHighLevel means moving contacts, companies, deals, notes, tags and custom fields from HubSpot or another CRM, and rebuilding the automations, forms and templates, which cannot be copied. We do it with a test migration, data validation and a few weeks with both CRMs running in parallel, so you are never left without a CRM.",
      fit: [
        "You pay for features you do not use, or the cost grows with every contact you add.",
        "You need WhatsApp, SMS, funnels and pipeline in the same place.",
        "You have several tools that do similar things and none of them talk to each other.",
      ],
      notFit: [
        "Your team relies on advanced reporting or native integrations that only exist in your current CRM: integrating beats moving there.",
      ],
      steps: [
        { title: "Inventory", desc: "How many contacts, which custom fields, which automations are really active and which integrations depend on the current CRM." },
        { title: "Structure and test", desc: "Fields, pipeline and tags created in GoHighLevel before importing, and a test migration with a hundred contacts to catch problems while they are cheap." },
        { title: "Migration and automations", desc: "Full migration and only the automations that are needed, tested with real cases before a sale depends on them." },
        { title: "Parallel and switch-off", desc: "Both CRMs running for two or three weeks. The old one is switched off once the questions stop, after storing a full export outside both." },
      ],
      timeline:
        "A small account, with a few thousand contacts and a handful of automations, is migrated in 2 to 3 weeks including the parallel period. An account with invoicing, website and telephony integrations takes 6 to 8.",
      outcomes: [
        "One CRM instead of several tools that don't talk to each other",
        "All history kept: contacts, opportunities and notes",
        "The team working in GoHighLevel from day one",
      ],
      flow: [
        { label: "Inventory", text: "Contacts, fields, automations and integrations in your current CRM." },
        { label: "Test", text: "A test migration with a hundred contacts to catch problems while they are cheap." },
        { label: "Migration", text: "All history moves over and the automations that are needed are rebuilt." },
        { label: "Parallel run", text: "Both CRMs run side by side until everything matches." },
      ],
      faqs: [
        {
          q: "What gets migrated when moving to GoHighLevel?",
          a: "Contacts, companies, deals with their stages, notes, tags and custom fields. Automations, forms and email templates are rebuilt in GoHighLevel, because they cannot be copied between platforms. We validate the data before the switch and both CRMs coexist until everything matches.",
        },
        {
          q: "What cannot be moved?",
          a: "Full email threads rarely travel intact, and reports and automations are rebuilt. Call recordings depend on the telephony provider: if they are stored in the old CRM, they must be downloaded before closing the account.",
        },
        {
          q: "Will I be without a CRM during the migration?",
          a: "No. During the parallel period your team works in GoHighLevel and the old CRM stays available for lookups. Every time someone says “the old one did it this way”, it gets noted and solved. It is switched off when those questions stop.",
        },
        {
          q: "Do you also migrate from Pipedrive, Zoho, Salesforce or spreadsheets?",
          a: "Yes. The method is the same: inventory, structure in the destination, a sample test, full migration and a parallel period. The export format changes with each source, not the order.",
        },
        { q: "How much does it cost?", a: PRECIO_EN },
      ],
    },
  },

  "outbound-b2b": {
    posts: ["prospeccion-b2b-outbound-con-ia", "clay-treg-coldiq-enriquecimiento-prospeccion-b2b", "que-es-gtm-engineering"],
    es: {
      seoTitle: "Prospección B2B automatizada y Go to Market con IA",
      metaDescription:
        "Un sistema en la nube, en tus cuentas, que busca empresas, las puntúa, les escribe por email y LinkedIn y hace el seguimiento solo, con todo en tu CRM.",
      answer:
        "Un sistema de prospección autónomo busca las empresas que encajan con tu cliente ideal, las puntúa, les escribe y hace el seguimiento sin que nadie lo empuje cada día. Lo montamos en la nube y en tus propias cuentas: SABI y Clay para encontrar y enriquecer empresas, Databricks para el scoring, Instantly o Lemlist para el email, Valley para LinkedIn y HubSpot o GoHighLevel como CRM, con dominios aparte para no quemar el tuyo.",
      fit: [
        "Vendes B2B y tu cliente ideal se puede describir: sector, tamaño, facturación y cargo.",
        "Dependes de referidos o del inbound y quieres un sistema que genere reuniones sin que nadie tenga que empujarlo cada día.",
        "Vas a sacar un producto al mercado y necesitas saber a qué empresas vendérselo primero.",
        "Ya prospectas a mano y no escala, o tus correos acaban en spam.",
      ],
      notFit: [
        "Vendes a particulares: el outbound en frío es para B2B.",
        "Todavía no sabes a quién vendes ni qué problema le resuelves: primero eso, después las secuencias.",
      ],
      steps: [
        { title: "Cliente ideal y scoring", desc: "A quién escribimos, qué señal dice que es buen momento y qué le ofrecemos. Con los estados financieros de SABI y las señales de Clay, cada empresa recibe una puntuación; con volumen, el scoring corre en Databricks." },
        { title: "Infraestructura en la nube", desc: "Todo se monta en tus cuentas: dominios y buzones aparte, autenticados y calentados, y los procesos corriendo en la nube, no en el ordenador de nadie." },
        { title: "Mensajes y secuencias", desc: "Email con Instantly o Lemlist y LinkedIn con Valley, coordinados, con mensajes por segmento que hablan del caso de cada cuenta y seguimientos programados hasta que la persona responde." },
        { title: "CRM y aprendizaje", desc: "Cada respuesta se clasifica y entra en HubSpot o GoHighLevel con su historial, y las interesadas acaban en reunión. Lo que termina en reunión o en venta vuelve al scoring para afinar a quién se escribe después." },
      ],
      timeline:
        "El calentamiento de los buzones marca el ritmo: dura de dos a tres semanas, y mientras tanto se preparan las listas y los mensajes. Las primeras campañas suelen salir hacia la semana 4.",
      outcomes: [
        "Empresas que encajan contigo, encontradas y contactadas cada semana",
        "Mensajes personalizados y seguimiento sin que nadie intervenga",
        "Reuniones en tu calendario, no listas en un Excel",
      ],
      flow: [
        { label: "Busca", text: "Encuentra empresas que encajan con tu cliente ideal y las puntúa." },
        { label: "Escribe", text: "Localiza a quien decide y le escribe un mensaje personalizado por email o LinkedIn." },
        { label: "Insiste", text: "Si no contesta, hace el seguimiento; si contesta, la respuesta entra en tu CRM." },
        { label: "Reunión", text: "Quien tiene interés reserva una reunión en tu calendario." },
      ],
      faqs: [
        {
          q: "¿Cuánto cuesta montar un sistema de prospección autónomo?",
          a: PRECIO_ES + " Aparte están las herramientas (Clay, Instantly o Lemlist, Valley, SABI y los dominios), que contratas a tu nombre y pagas directamente.",
        },
        {
          q: "¿El sistema es mío?",
          a: "Sí. Se monta en tus cuentas: tu CRM, tus herramientas de envío y tu nube, todo a tu nombre. Si un día dejamos de trabajar juntos, el sistema sigue funcionando y los datos siguen siendo tuyos.",
        },
        {
          q: "¿Voy a quemar mi dominio?",
          a: "No, si se hace bien. El outbound sale de dominios y buzones aparte, autenticados y calentados antes de enviar, con volúmenes por buzón que no levantan sospechas. Tu dominio principal sigue intacto.",
        },
        {
          q: "¿Email o LinkedIn?",
          a: "Los dos, coordinados. Hay cargos que leen el correo y otros que solo contestan en LinkedIn. Una secuencia que combina los dos canales llega a más gente sin insistir más en ninguno.",
        },
        {
          q: "¿Es legal el email en frío en España?",
          a: "La LSSI limita las comunicaciones comerciales por email no solicitadas y el RGPD exige una base legal para tratar datos de contacto. Por eso trabajamos con mensajes uno a uno a cargos profesionales, con baja sencilla, y combinamos el email con LinkedIn. Si tu sector es sensible, conviene revisarlo con tu asesor legal antes de lanzar.",
        },
        {
          q: "¿Qué pasa con las respuestas?",
          a: "Se clasifican solas (interesado, no ahora, no es la persona, baja) y entran en tu CRM, en HubSpot o GoHighLevel, con el historial de la conversación. Las interesadas reciben enlace para reservar reunión, y quien dice «no ahora» vuelve a la secuencia más adelante.",
        },
      ],
    },
    en: {
      seoTitle: "Automated B2B prospecting and go-to-market with AI",
      metaDescription:
        "A cloud system, in your own accounts, that finds companies, scores them, writes to them by email and LinkedIn and follows up on its own, all in your CRM.",
      answer:
        "An autonomous prospecting system finds the companies that match your ideal customer, scores them, writes to them and follows up without anyone pushing it every day. We build it in the cloud and in your own accounts: SABI and Clay to find and enrich companies, Databricks for scoring, Instantly or Lemlist for email, Valley for LinkedIn and HubSpot or GoHighLevel as the CRM, with separate domains so yours never gets burned.",
      fit: [
        "You sell B2B and your ideal customer can be described: industry, size, revenue and role.",
        "You depend on referrals or inbound and want a system that books meetings without anyone pushing it every day.",
        "You are taking a product to market and need to know which companies to sell it to first.",
        "You already prospect by hand and it does not scale, or your emails land in spam.",
      ],
      notFit: [
        "You sell to consumers: cold outbound is for B2B.",
        "You do not yet know who you sell to or what problem you solve: that first, sequences later.",
      ],
      steps: [
        { title: "Ideal customer and scoring", desc: "Who we write to, which signal says it is a good moment and what we offer. With financial statements from SABI and signals from Clay, every company gets a score; at volume, scoring runs on Databricks." },
        { title: "Cloud infrastructure", desc: "Everything is built in your accounts: separate domains and inboxes, authenticated and warmed up, and the processes running in the cloud, not on anyone's laptop." },
        { title: "Messaging and sequences", desc: "Email with Instantly or Lemlist and LinkedIn with Valley, coordinated, with messaging per segment about each account's case and follow-ups scheduled until the person replies." },
        { title: "CRM and learning", desc: "Every reply is classified and goes into HubSpot or GoHighLevel with its history, and interested ones end in a meeting. What ends in a meeting or a sale feeds back into scoring to sharpen who gets written to next." },
      ],
      timeline:
        "Inbox warm-up sets the pace: it takes two to three weeks, and lists and messaging are prepared meanwhile. The first campaigns usually go out around week 4.",
      outcomes: [
        "Companies that fit you, found and contacted every week",
        "Personalised messages and follow-up with no one involved",
        "Meetings in your calendar, not lists in a spreadsheet",
      ],
      flow: [
        { label: "Finds", text: "It finds companies that fit your ideal client and scores them." },
        { label: "Writes", text: "It finds the decision-maker and sends a personalised email or LinkedIn message." },
        { label: "Follows up", text: "No reply means a follow-up; a reply lands in your CRM." },
        { label: "Meeting", text: "Anyone interested books a meeting in your calendar." },
      ],
      faqs: [
        {
          q: "How much does an autonomous prospecting system cost?",
          a: PRECIO_EN + " Tools (Clay, Instantly or Lemlist, Valley, SABI and the domains) are separate: you subscribe in your name and pay them directly.",
        },
        {
          q: "Is the system mine?",
          a: "Yes. It is built in your accounts: your CRM, your sending tools and your cloud, all in your name. If we stop working together one day, the system keeps running and the data stays yours.",
        },
        {
          q: "Will I burn my domain?",
          a: "Not if it is done right. Outbound goes out from separate domains and inboxes, authenticated and warmed up before sending, with per-inbox volumes that raise no flags. Your main domain stays untouched.",
        },
        {
          q: "Email or LinkedIn?",
          a: "Both, coordinated. Some roles read email and others only reply on LinkedIn. A sequence combining both channels reaches more people without pushing harder on either.",
        },
        {
          q: "Is cold email legal in Spain?",
          a: "Spain's LSSI restricts unsolicited commercial email and the GDPR requires a legal basis to process contact data. That is why we work with one-to-one messages to professional roles, with an easy opt-out, and combine email with LinkedIn. If your sector is sensitive, check it with your legal adviser before launching.",
        },
        {
          q: "What happens to replies?",
          a: "They are classified automatically (interested, not now, wrong person, unsubscribe) and go into your CRM, HubSpot or GoHighLevel, with the conversation history. Interested ones get a link to book a meeting, and \"not now\" replies go back into the sequence later on.",
        },
      ],
    },
  },

  "agente-ia-whatsapp": {
    cases: ["Hospital Capilar"],
    posts: [
      "whatsapp-automatizacion-ventas",
      "automatizar-recepcion-clinica",
      "agentes-de-ia-para-empresas-cuando-compensan",
      "agentes-de-ia-vps-propio-o-nube",
      "proyectos-de-ia-a-medida-ejemplos-plazos-precio",
      "cobrar-la-ia-por-resultado",
      "ai-act-chatbot-decir-que-es-ia",
    ],
    es: {
      seoTitle: "Agente de IA para WhatsApp, Telegram y voz: citas 24/7",
      metaDescription:
        "Agente de IA que contesta por WhatsApp, Telegram o teléfono, cualifica y agenda citas 24/7 en tu calendario. Para peluquerías, clínicas, fisios y gestorías.",
      answer:
        "Un agente de IA para WhatsApp contesta a cada cliente en segundos y a cualquier hora, consulta tu agenda y tu CRM, cualifica al contacto y reserva la cita sin que nadie del equipo toque el móvil. Va sobre la API oficial de WhatsApp Business, también en Telegram, y por teléfono con un agente de voz creado en Vapi. Se conecta a GoHighLevel, HubSpot o tu software de citas y pasa la conversación a una persona cuando hace falta.",
      fit: [
        "Muchas consultas llegan por WhatsApp por la tarde, de noche o en fin de semana, y nadie contesta a tiempo.",
        "Tu equipo responde cien veces lo mismo, pero la respuesta exige mirar algo: la agenda, un precio, unas sesiones pendientes.",
        "Vendes con cita previa: clínicas, talleres mecánicos, peluquerías, fisioterapeutas, centros de estética, gestorías o cualquier negocio de servicios.",
        "Se te escapan llamadas porque estás atendiendo a un cliente y nadie coge el teléfono.",
      ],
      notFit: [
        "Recibes veinte consultas al mes: contesta una persona.",
        "Cada caso depende de matices que solo conoce alguien con años de oficio, o no hay agenda ni CRM a los que conectar el agente.",
      ],
      steps: [
        { title: "Límites", desc: "Qué decide el agente solo y qué pasa siempre por una persona: cancelar una cita, aplicar un descuento, prometer un plazo." },
        { title: "Canales y conexiones", desc: "Alta en la API oficial de WhatsApp Business, bot de Telegram o número de teléfono con el agente de voz en Vapi, y conexión con tu agenda y tu CRM. Aquí está la mayor parte del trabajo, y es lo que convierte un chatbot en un agente." },
        { title: "Casos raros", desc: "Salida a persona cuando un sistema no responde, cuando alguien escribe algo sin sentido o pide algo no previsto." },
        { title: "Despliegue y mantenimiento", desc: "Servicio gestionado o servidor propio en la UE, con vigilancia, copias de seguridad y la información siempre al día." },
      ],
      timeline:
        "Entre 4 y 8 semanas desde el diagnóstico. El primer agente suele estar atendiendo en la semana 4.",
      outcomes: [
        "Ningún mensaje ni llamada sin contestar, 24/7",
        "La cita queda agendada, confirmada y recordada",
        "El equipo deja de responder cien veces lo mismo",
      ],
      flow: [
        { label: "23:40", text: "Un cliente escribe por WhatsApp: ¿tenéis hueco el jueves?" },
        { label: "Al momento", text: "El agente contesta, pregunta lo necesario y ofrece las horas libres de tu agenda." },
        { label: "Cita hecha", text: "La cita entra en tu calendario y en el CRM, con el resumen de la conversación." },
        { label: "El día antes", text: "Sale el recordatorio. Si el cliente pide algo fuera de lo normal, pasa a una persona." },
      ],
      faqs: [
        {
          q: "¿Cuánto cuesta un agente de IA para WhatsApp?",
          a: "La construcción entra en el rango de implementación, de 5.000 € a 25.000 €. Lo que más mueve el precio es cuántos sistemas tiene que consultar el agente y cuántas excepciones tiene tu proceso. Aparte están los costes de uso, que pagas directamente: Meta cobra por los mensajes de plantilla que inicia tu empresa (contestar a quien te escribe dentro de las 24 horas no tiene coste de Meta), Vapi cobra por minuto de llamada si hay agente de voz y el modelo de IA cobra por uso, o tiene coste fijo si va en servidor propio.",
        },
        {
          q: "¿Puede atender llamadas de teléfono?",
          a: "Sí, con un agente de voz creado en Vapi. Contesta en tu número o en uno nuevo al que desvías las llamadas, entiende lo que pide la persona, consulta la agenda y reserva la cita igual que por WhatsApp. Si la llamada se complica, la pasa a una persona.",
        },
        {
          q: "¿Funciona también en Telegram?",
          a: "Sí. El mismo agente puede atender en WhatsApp, Telegram y chat web, con la misma agenda y el mismo CRM detrás. Telegram no cobra por mensaje.",
        },
        {
          q: "¿Sirve la app de WhatsApp Business del móvil?",
          a: "No. El agente necesita la API oficial de WhatsApp Business, que se da de alta con Meta directamente o a través de una plataforma como GoHighLevel. Puedes mantener tu número actual: se migra a la API. Lo que no se puede es seguir usándolo a la vez en la app del móvil.",
        },
        {
          q: "¿Puede agendar citas en mi calendario?",
          a: "Sí. Consulta los huecos libres y reserva directamente en tu agenda: el calendario de GoHighLevel o HubSpot, Google Calendar o tu software de citas si tiene API. Después envía la confirmación y los recordatorios.",
        },
        {
          q: "¿Qué diferencia hay entre un agente de IA y un chatbot?",
          a: "Un chatbot responde con texto. Un agente decide qué hay que hacer y lo hace en tus sistemas: consulta la agenda y reserva, cualifica al contacto y lo mete en el pipeline, avisa a la persona que corresponde. El chatbot descarga a quien escribe; el agente, a quien trabaja.",
        },
        {
          q: "¿Qué pasa si el agente no sabe responder?",
          a: "Pasa la conversación a una persona. Todos los agentes que montamos tienen salida a persona en los casos raros, y los límites de lo que pueden hacer solos se deciden contigo antes de construir.",
        },
        {
          q: "¿Y la protección de datos?",
          a: "Depende de qué datos trate y dónde se procesen. Con datos de salud o financieros, un servidor propio en la Unión Europea permite controlar dónde se guarda cada cosa y durante cuánto tiempo. Con un servicio gestionado necesitas su contrato de encargo del tratamiento y saber dónde están sus servidores.",
        },
      ],
    },
    en: {
      seoTitle: "AI agent for WhatsApp, Telegram and voice: 24/7 bookings",
      metaDescription:
        "An AI agent that answers on WhatsApp, Telegram or the phone, qualifies and books appointments 24/7 into your calendar. For salons, clinics, physios and accountants.",
      answer:
        "An AI agent for WhatsApp replies to every customer within seconds, at any hour, checks your calendar and CRM, qualifies the contact and books the appointment without anyone on the team touching a phone. It runs on the official WhatsApp Business API, on Telegram too, and on the phone with a voice agent built on Vapi. It connects to GoHighLevel, HubSpot or your booking software and hands the conversation to a person when needed.",
      fit: [
        "Many enquiries arrive on WhatsApp in the evening, at night or at weekends, and nobody answers in time.",
        "Your team answers the same thing a hundred times, but the answer requires checking something: the calendar, a price, remaining sessions.",
        "You sell by appointment: clinics, car repair shops, hair salons, physiotherapists, beauty centres, accounting firms or any service business.",
        "You miss calls because you are with a client and nobody picks up the phone.",
      ],
      notFit: [
        "You get twenty enquiries a month: a person answers.",
        "Every case depends on nuances only someone with years of experience knows, or there is no calendar or CRM to connect the agent to.",
      ],
      steps: [
        { title: "Limits", desc: "What the agent decides on its own and what always goes to a person: cancelling an appointment, applying a discount, promising a deadline." },
        { title: "Channels and connections", desc: "Setup on the official WhatsApp Business API, a Telegram bot or a phone number with the voice agent on Vapi, and connection to your calendar and CRM. Most of the work is here, and it is what turns a chatbot into an agent." },
        { title: "Edge cases", desc: "Hand-off to a person when a system does not respond, when someone writes nonsense or asks for something unplanned." },
        { title: "Deployment and maintenance", desc: "Managed service or your own server in the EU, with monitoring, backups and information always up to date." },
      ],
      timeline:
        "Between 4 and 8 weeks from the diagnosis. The first agent is usually answering by week 4.",
      outcomes: [
        "No message or call left unanswered, 24/7",
        "The appointment is booked, confirmed and reminded",
        "The team stops answering the same question a hundred times",
      ],
      flow: [
        { label: "11:40 pm", text: "A customer messages on WhatsApp: any slot on Thursday?" },
        { label: "Instantly", text: "The agent replies, asks what it needs and offers the free times in your calendar." },
        { label: "Booked", text: "The appointment goes into your calendar and CRM, with a summary of the chat." },
        { label: "The day before", text: "The reminder goes out. If the customer asks for something unusual, a person takes over." },
      ],
      faqs: [
        {
          q: "How much does an AI agent for WhatsApp cost?",
          a: "The build falls within the implementation range, €5,000 to €25,000. What moves the price most is how many systems the agent has to check and how many exceptions your process has. Usage costs are separate and you pay them directly: Meta charges for template messages your business initiates (replying to someone who writes to you within 24 hours has no Meta fee), Vapi charges per call minute if there is a voice agent, and the AI model charges per use, or has a fixed cost on your own server.",
        },
        {
          q: "Can it answer phone calls?",
          a: "Yes, with a voice agent built on Vapi. It answers on your number or on a new one you forward calls to, understands what the person wants, checks the calendar and books the appointment just like on WhatsApp. If the call gets complicated, it hands it to a person.",
        },
        {
          q: "Does it work on Telegram too?",
          a: "Yes. The same agent can answer on WhatsApp, Telegram and web chat, with the same calendar and CRM behind it. Telegram does not charge per message.",
        },
        {
          q: "Does the WhatsApp Business phone app work?",
          a: "No. The agent needs the official WhatsApp Business API, set up with Meta directly or through a platform such as GoHighLevel. You can keep your current number: it is migrated to the API. What you cannot do is keep using it in the phone app at the same time.",
        },
        {
          q: "Can it book appointments in my calendar?",
          a: "Yes. It checks free slots and books straight into your calendar: GoHighLevel or HubSpot calendars, Google Calendar or your booking software if it has an API. Then it sends the confirmation and reminders.",
        },
        {
          q: "What is the difference between an AI agent and a chatbot?",
          a: "A chatbot replies with text. An agent decides what needs doing and does it in your systems: checks the calendar and books, qualifies the contact and adds it to the pipeline, alerts the right person. The chatbot relieves whoever writes; the agent relieves whoever works.",
        },
        {
          q: "What if the agent cannot answer?",
          a: "It hands the conversation to a person. Every agent we build has a human hand-off for edge cases, and the limits of what it can do alone are agreed with you before building.",
        },
        {
          q: "What about data protection?",
          a: "It depends on what data it handles and where it is processed. With health or financial data, your own server in the European Union lets you control where everything is stored and for how long. With a managed service you need its data processing agreement and to know where its servers are.",
        },
      ],
    },
  },

  "implementacion-crm-gohighlevel": {
    cases: ["Growth4U", "Eventos Barcelona"],
    posts: [
      "integrar-gohighlevel-con-tu-stack",
      "automatizacion-para-clinicas-captacion-y-agenda",
    ],
    es: {
      seoTitle: "Implantación de CRM: GoHighLevel y HubSpot",
      metaDescription:
        "Configuramos GoHighLevel o HubSpot a tu proceso comercial: pipelines, etapas, automatizaciones, WhatsApp, correo y redes en un solo CRM, con formación incluida.",
      answer:
        "Implantar un CRM, GoHighLevel o HubSpot, es dejarlo configurado a tu proceso real: pipelines y etapas, automatizaciones, formularios y los canales —WhatsApp, correo y redes— entrando en el mismo sitio, con el pipeline a la vista para ver cómo evoluciona cada oportunidad. Partimos de cómo vendes hoy, no de una plantilla, y lo entregamos con formación y 30 días de soporte.",
      fit: [
        "No tienes CRM y todo vive en la cabeza de alguien, en hojas de cálculo y en WhatsApp.",
        "Tienes GoHighLevel o HubSpot contratado pero a medio configurar y el equipo no lo usa.",
        "Quieres mensajería, embudos y pipeline en una sola herramienta.",
      ],
      notFit: [
        "Ya tienes un CRM que funciona y solo le faltan piezas: conviene integrar, no cambiar.",
      ],
      steps: [
        { title: "Proceso", desc: "Cada paso desde el primer contacto hasta la venta, quién hace qué y qué se repite cada día." },
        { title: "Estructura", desc: "Campos, etiquetas, pipelines y etapas creados antes de meter un solo contacto." },
        { title: "Canales y automatizaciones", desc: "Entrada de contactos, WhatsApp, correo y agenda, y las automatizaciones que nadie discute: asignar, acusar recibo, recordar." },
        { title: "Formación y soporte", desc: "El equipo trabajando en el CRM desde el primer día, con 30 días de soporte para lo que salga." },
      ],
      timeline: "Entre 4 y 8 semanas según cuántos canales e integraciones haya que montar.",
      outcomes: [
        "Todos los clientes y oportunidades en un solo sitio",
        "El pipeline a la vista: qué hay en cada etapa y cuánto vale",
        "Ningún contacto sin responsable ni seguimiento",
      ],
      flow: [
        { label: "Contacto", text: "Un cliente escribe por la web, por WhatsApp o por redes." },
        { label: "Entra al CRM", text: "Se crea el contacto y la oportunidad en la etapa que toca." },
        { label: "Se asigna", text: "Le llega a un comercial con su tarea y su recordatorio." },
        { label: "A la vista", text: "Ves en una pantalla qué hay en cada etapa y cuánto vale." },
      ],
      faqs: [
        {
          q: "¿GoHighLevel o HubSpot?",
          a: "Depende de cómo vendes. GoHighLevel junta CRM, WhatsApp, embudos y agenda en una sola herramienta y encaja en negocios de servicios y con cita previa. HubSpot encaja mejor en venta B2B con ciclos largos, varios comerciales e informes avanzados. Lo decidimos en el diagnóstico.",
        },
        {
          q: "¿Es una plantilla o se configura para mi negocio?",
          a: "A medida. Cada automatización se diseña sobre tu proceso real: no hay dos implementaciones iguales, aunque la herramienta sea la misma.",
        },
        {
          q: "¿Puedo traer mis contactos actuales?",
          a: "Sí. Si vienen de hojas de cálculo, se importan sobre la estructura ya creada, con deduplicación por correo o teléfono para no empezar con la base llena de duplicados. Si vienen de otro CRM con histórico, es una migración y se hace con su propio método.",
        },
        {
          q: "¿Cuánto tarda en estar en producción?",
          a: "Entre 4 y 8 semanas desde el diagnóstico, según el alcance. El primer sistema suele estar activo en la semana 4.",
        },
        { q: "¿Cuánto cuesta?", a: PRECIO_ES },
      ],
    },
    en: {
      seoTitle: "CRM implementation: GoHighLevel and HubSpot",
      metaDescription:
        "We set up GoHighLevel or HubSpot around your sales process: pipelines, stages, automations, WhatsApp, email and social in a single CRM, with training included.",
      answer:
        "Implementing a CRM, GoHighLevel or HubSpot, means leaving it configured around your real process: pipelines and stages, automations, forms and the channels —WhatsApp, email and social— all landing in one place, with the pipeline in view to see how every deal progresses. We start from how you sell today, not from a template, and hand it over with training and 30 days of support.",
      fit: [
        "You have no CRM and everything lives in someone's head, in spreadsheets and in WhatsApp.",
        "You pay for GoHighLevel or HubSpot but it is half set up and your team does not use it.",
        "You want messaging, funnels and pipeline in a single tool.",
      ],
      notFit: [
        "You already have a CRM that works and only lacks pieces: integrate, do not switch.",
      ],
      steps: [
        { title: "Process", desc: "Every step from first contact to sale, who does what and what repeats every day." },
        { title: "Structure", desc: "Fields, tags, pipelines and stages created before a single contact goes in." },
        { title: "Channels and automations", desc: "Contact intake, WhatsApp, email and calendar, plus the automations nobody argues about: assign, acknowledge, remind." },
        { title: "Training and support", desc: "Your team working in the CRM from day one, with 30 days of support for whatever comes up." },
      ],
      timeline: "Between 4 and 8 weeks depending on how many channels and integrations are needed.",
      outcomes: [
        "All clients and opportunities in one place",
        "The pipeline in view: what is in each stage and what it is worth",
        "No contact without an owner or follow-up",
      ],
      flow: [
        { label: "Contact", text: "A customer writes via the website, WhatsApp or social media." },
        { label: "Into the CRM", text: "The contact and opportunity are created in the right stage." },
        { label: "Assigned", text: "A salesperson gets it with a task and a reminder." },
        { label: "In view", text: "One screen shows what is in each stage and what it is worth." },
      ],
      faqs: [
        {
          q: "GoHighLevel or HubSpot?",
          a: "It depends on how you sell. GoHighLevel brings CRM, WhatsApp, funnels and calendar together in one tool and suits service and appointment-based businesses. HubSpot suits B2B sales with long cycles, several salespeople and advanced reporting. We decide it in the diagnosis.",
        },
        {
          q: "Is it a template or set up for my business?",
          a: "Custom. Every automation is designed around your real process: no two implementations are the same, even if the tool is.",
        },
        {
          q: "Can I bring my current contacts?",
          a: "Yes. From spreadsheets, they are imported onto the structure already in place, with deduplication by email or phone so you do not start with a database full of duplicates. From another CRM with history, it is a migration and follows its own method.",
        },
        {
          q: "How long until it is live?",
          a: "Between 4 and 8 weeks from the assessment, depending on scope. The first system is usually live by week 4.",
        },
        { q: "How much does it cost?", a: PRECIO_EN },
      ],
    },
  },

  "embudo-de-captacion": {
    cases: ["Hospital Capilar", "Growth4U"],
    posts: [
      "que-es-gtm-engineering",
      "como-cualificar-leads-automaticamente",
      "whatsapp-automatizacion-ventas",
      "cross-selling-por-whatsapp",
      "automatizacion-para-clinicas-captacion-y-agenda",
    ],
    es: {
      seoTitle: "Cualificación de leads de Meta Ads en GoHighLevel",
      metaDescription:
        "Los leads de tus campañas de Meta entran en GoHighLevel, se puntúan solos, los buenos agendan en tu calendario y el resto recibe seguimiento por WhatsApp y correo.",
      answer:
        "Un sistema de captación en GoHighLevel filtra solo quién vale tu tiempo entre los leads de tus campañas de Meta. El lead entra desde un formulario de Meta Lead Ads, una landing o un quiz, recibe una puntuación —frío, templado, caliente o premium— y los buenos agendan en tu calendario con un Booking SDR, mientras el resto entra en seguimiento por WhatsApp y correo. Tu equipo habla solo con quien tiene intención real.",
      fit: [
        "Inviertes en campañas de Meta (Facebook e Instagram) y recibes más de 10 leads al mes.",
        "No sabes qué leads son buenos hasta haber perdido tiempo hablando con ellos.",
        "Los contactos se enfrían porque nadie les responde a tiempo, y no sabes en qué paso se pierden.",
      ],
      notFit: [
        "Recibes pocos leads y todos acaban en una conversación: el embudo no tiene nada que filtrar.",
      ],
      steps: [
        { title: "Criterios", desc: "Qué hace bueno a un lead en tu negocio: el servicio que busca, la urgencia, el presupuesto." },
        { title: "Captación", desc: "Formulario de Meta Lead Ads, landing o quiz con lógica condicional que pregunta solo lo que importa, conectados a GoHighLevel para que cada lead entre al momento." },
        { title: "Scoring y agenda", desc: "Puntuación automática y Booking SDR que cita a los leads buenos directamente en tu calendario o tu software de citas." },
        { title: "Seguimiento y medida", desc: "Nurturing por correo y WhatsApp para el resto, y el embudo medido de punta a punta: conversión, abandono, citas y ventas." },
      ],
      timeline:
        "Entre 4 y 8 semanas según el alcance. Desde que el embudo está activo, la medición empieza el primer día.",
      outcomes: [
        "Hablas solo con los leads que encajan",
        "Cada lead recibe respuesta en minutos, también de noche",
        "Sabes qué campaña trae clientes, no solo leads",
      ],
      flow: [
        { label: "Anuncio", text: "Alguien rellena el formulario de tu anuncio en Facebook o Instagram." },
        { label: "Puntuación", text: "Entra en GoHighLevel con una nota según el servicio, la urgencia y el presupuesto." },
        { label: "Si encaja", text: "Recibe un WhatsApp al momento y el Booking SDR le ofrece cita." },
        { label: "Si aún no", text: "Recibe seguimiento por correo y WhatsApp hasta que esté listo." },
      ],
      faqs: [
        {
          q: "¿Funciona con los formularios nativos de Meta?",
          a: "Sí. Los leads de Meta Lead Ads entran en GoHighLevel por su integración con Facebook en cuanto alguien envía el formulario, sin exportar hojas de cálculo. Si prefieres llevar el tráfico a una landing o a un quiz propio, también.",
        },
        {
          q: "¿Cómo se puntúa un lead?",
          a: "Con sus respuestas al formulario o al quiz. Cada respuesta suma según lo que importa en tu negocio, como el servicio que busca, la urgencia o el presupuesto. El total lo clasifica en frío, templado, caliente o premium, y cada tramo recibe un trato distinto.",
        },
        {
          q: "¿Qué es un Booking SDR?",
          a: "Un sistema que, en vez de esperar a que un comercial llame, ofrece al lead cualificado los huecos libres y agenda la cita directamente en tu calendario o en tu software de citas. En Hospital Capilar agenda en Koibox.",
        },
        {
          q: "¿Qué pasa con los leads que aún no están listos?",
          a: "No se descartan: entran en una secuencia de seguimiento por correo y WhatsApp, y vuelven al equipo cuando muestran intención.",
        },
        { q: "¿Cuánto cuesta?", a: PRECIO_ES },
      ],
    },
    en: {
      seoTitle: "Qualifying Meta Ads leads on GoHighLevel",
      metaDescription:
        "Leads from your Meta campaigns land in GoHighLevel, get scored on their own, the good ones book into your calendar and the rest get WhatsApp and email follow-up.",
      answer:
        "A lead capture system on GoHighLevel filters out, on its own, the leads from your Meta campaigns that are not worth your time. The lead comes in through a Meta Lead Ads form, a landing page or a quiz, gets a score —cold, warm, hot or premium— and the good ones book into your calendar through a Booking SDR, while the rest go into WhatsApp and email follow-up. Your team only talks to people with real intent.",
      fit: [
        "You run Meta campaigns (Facebook and Instagram) and get more than 10 leads a month.",
        "You do not know which leads are good until you have wasted time talking to them.",
        "Contacts go cold because nobody answers in time, and you do not know at which step they drop.",
      ],
      notFit: [
        "You get few leads and all of them end up in a conversation: the funnel has nothing to filter.",
      ],
      steps: [
        { title: "Criteria", desc: "What makes a good lead in your business: the service they want, urgency, budget." },
        { title: "Capture", desc: "Meta Lead Ads form, landing page or quiz with conditional logic that only asks what matters, connected to GoHighLevel so every lead lands instantly." },
        { title: "Scoring and booking", desc: "Automatic scoring and a Booking SDR that books good leads straight into your calendar or booking software." },
        { title: "Follow-up and measurement", desc: "Email and WhatsApp nurturing for the rest, and the funnel measured end to end: conversion, drop-off, appointments and sales." },
      ],
      timeline:
        "Between 4 and 8 weeks depending on scope. Once the funnel is live, measurement starts on day one.",
      outcomes: [
        "You only talk to leads that fit",
        "Every lead gets a reply within minutes, at night too",
        "You know which campaign brings clients, not just leads",
      ],
      flow: [
        { label: "Ad", text: "Someone fills in the form on your Facebook or Instagram ad." },
        { label: "Score", text: "They land in GoHighLevel with a score based on service, urgency and budget." },
        { label: "If they fit", text: "They get a WhatsApp message right away and the Booking SDR offers an appointment." },
        { label: "If not yet", text: "They get email and WhatsApp follow-up until they are ready." },
      ],
      faqs: [
        {
          q: "Does it work with Meta's native forms?",
          a: "Yes. Meta Lead Ads leads land in GoHighLevel through its Facebook integration as soon as someone submits the form, with no spreadsheet exports. If you prefer to send traffic to your own landing page or quiz, that works too.",
        },
        {
          q: "How is a lead scored?",
          a: "From their answers to the form or quiz. Each answer adds points based on what matters in your business, such as the service they want, urgency or budget. The total classifies them as cold, warm, hot or premium, and each band is treated differently.",
        },
        {
          q: "What is a Booking SDR?",
          a: "A system that, instead of waiting for a salesperson to call, offers the qualified lead the free slots and books the appointment straight into your calendar or booking software. At Hospital Capilar it books into Koibox.",
        },
        {
          q: "What happens to leads that are not ready yet?",
          a: "They are not discarded: they go into an email and WhatsApp follow-up sequence and return to the team when they show intent.",
        },
        { q: "How much does it cost?", a: PRECIO_EN },
      ],
    },
  },

  "generador-de-propuestas": {
    cases: ["Eventos Barcelona"],
    posts: ["propuestas-comerciales-automaticas"],
    es: {
      seoTitle: "Generador automático de propuestas comerciales",
      metaDescription:
        "Un formulario al colgar la llamada, la propuesta en web y PDF al momento en una aplicación en Vercel y su seguimiento en el pipeline de tu CRM. En minutos, no días.",
      answer:
        "Un generador de propuestas convierte lo que hablas en la llamada en una propuesta lista para revisar y enviar en minutos. Rellenas un formulario de intake al colgar, una aplicación en Vercel genera la propuesta en web y PDF, la vincula a la oportunidad en tu CRM y programa los recordatorios de seguimiento. En el pipeline ves cómo evoluciona cada propuesta, y llega mientras el cliente todavía está interesado.",
      fit: [
        "Haces varias propuestas al mes y cada una tarda días en salir.",
        "Pierdes clientes que, cuando llega tu propuesta, ya han pedido presupuesto a otro.",
        "Tus propuestas comparten estructura aunque cambie el contenido de cada cliente.",
      ],
      notFit: [
        "Cada propuesta es un proyecto único que se diseña desde cero: el generador ayuda con la estructura, no con el contenido.",
      ],
      steps: [
        { title: "Plantilla", desc: "La estructura de tus propuestas: secciones, precios, condiciones y tu marca." },
        { title: "Intake", desc: "El formulario que se rellena justo al colgar, con lo que cambia en cada cliente." },
        { title: "Generación", desc: "Propuesta en web y en PDF creadas en una aplicación en Vercel vinculada a tu CRM, listas para revisar y enviar." },
        { title: "Seguimiento", desc: "Cada propuesta es una oportunidad en el pipeline del CRM, con su etapa y recordatorios programados para que ninguna se quede sin respuesta." },
      ],
      timeline: "Entre 4 y 8 semanas según cuántas variantes de propuesta tengas.",
      outcomes: [
        "La propuesta sale el mismo día de la llamada",
        "Todas con el mismo formato, precios y condiciones",
        "Ninguna propuesta sin seguimiento",
      ],
      flow: [
        { label: "Llamada", text: "Terminas la llamada con el cliente." },
        { label: "Formulario", text: "Rellenas un formulario corto con lo que ha pedido: fecha, servicio y opciones." },
        { label: "Propuesta", text: "Se genera en web y en PDF, con tu marca y tus precios, lista para revisar." },
        { label: "Seguimiento", text: "Sale en minutos y el CRM programa los recordatorios si no hay respuesta." },
      ],
      faqs: [
        {
          q: "¿La propuesta sale sola, sin que nadie la revise?",
          a: "Sale lista para revisar. Una persona la lee y la envía: el sistema elimina la parte lenta, que es montarla, no el criterio.",
        },
        {
          q: "¿En qué formato le llega al cliente?",
          a: "En web, publicada en tu propia aplicación en Vercel, y en PDF, las dos generadas desde el mismo formulario de intake.",
        },
        {
          q: "¿Cuánto tiempo ahorra?",
          a: "En Eventos Barcelona cada propuesta tardaba entre 1 y 3 días en salir. Con el generador sale en minutos tras la llamada, y el tiempo de respuesta al cliente bajó un 85%.",
        },
        { q: "¿Cuánto cuesta?", a: PRECIO_ES },
      ],
    },
    en: {
      seoTitle: "Automated sales proposal generator",
      metaDescription:
        "A form when you hang up, the proposal as web and PDF instantly in an app on Vercel, and its follow-up in your CRM pipeline. Proposals in minutes, not days.",
      answer:
        "A proposal generator turns what you discuss on the call into a proposal ready to review and send in minutes. You fill in an intake form when you hang up, an app on Vercel generates the proposal as a web page and PDF, links it to the deal in your CRM and schedules the follow-up reminders. The pipeline shows how every proposal progresses, and it arrives while the client is still interested.",
      fit: [
        "You send several proposals a month and each one takes days to go out.",
        "You lose clients who, by the time your proposal arrives, have already asked someone else for a quote.",
        "Your proposals share a structure even though the content changes for each client.",
      ],
      notFit: [
        "Every proposal is a unique project designed from scratch: the generator helps with structure, not content.",
      ],
      steps: [
        { title: "Template", desc: "The structure of your proposals: sections, prices, terms and your branding." },
        { title: "Intake", desc: "The form filled in right after the call, with what changes for each client." },
        { title: "Generation", desc: "Proposal as a web page and PDF created in an app on Vercel linked to your CRM, ready to review and send." },
        { title: "Follow-up", desc: "Every proposal is a deal in the CRM pipeline, with its stage and scheduled reminders so none goes unanswered." },
      ],
      timeline: "Between 4 and 8 weeks depending on how many proposal variants you have.",
      outcomes: [
        "The proposal goes out the same day as the call",
        "All with the same format, prices and terms",
        "No proposal left without follow-up",
      ],
      flow: [
        { label: "Call", text: "You finish the call with the client." },
        { label: "Form", text: "You fill in a short form with what they asked for: date, service and options." },
        { label: "Proposal", text: "It is generated as a web page and a PDF, with your brand and prices, ready to review." },
        { label: "Follow-up", text: "It goes out in minutes and the CRM schedules reminders if there is no reply." },
      ],
      faqs: [
        {
          q: "Does the proposal go out without anyone reviewing it?",
          a: "It comes out ready to review. A person reads and sends it: the system removes the slow part, which is assembling it, not the judgement.",
        },
        {
          q: "In what format does the client receive it?",
          a: "As a web page, published on your own app on Vercel, and a PDF, both generated from the same intake form.",
        },
        {
          q: "How much time does it save?",
          a: "At Eventos Barcelona each proposal took 1 to 3 days to go out. With the generator it goes out minutes after the call, and client response time dropped by 85%.",
        },
        { q: "How much does it cost?", a: PRECIO_EN },
      ],
    },
  },

  // ── Otros servicios: que el equipo use la IA (nov-2026) ─────────────────

  "kit-ia": {
    price: "quote",
    posts: [
      "como-implementar-ia-en-tu-empresa",
      "herramientas-ia-para-automatizar-procesos",
      "rgpd-y-automatizacion-con-ia",
      "automatizar-procesos-con-ia-por-donde-empezar",
    ],
    es: {
      seoTitle: "Kit IA para empresas: el equipo usando IA con orden",
      metaDescription:
        "Configuramos Claude o ChatGPT para tu empresa, un asistente con vuestros documentos, plantillas por puesto y una guía de uso, y formamos al equipo.",
      answer:
        "El Kit IA es un paquete cerrado para que tu equipo use la IA en su trabajo diario con orden. Configuramos Claude o ChatGPT con cuentas de empresa, montamos un asistente que responde con vuestros documentos, dejamos plantillas por puesto y una guía de qué datos se pueden usar, y formamos al equipo. Es el primer paso antes de automatizar procesos.",
      outcomes: [
        "Todo el equipo usando IA con cuentas de empresa, no personales",
        "Respuestas al momento sobre vuestros propios documentos",
        "Reglas claras de qué datos se pueden usar y cuáles no",
      ],
      flow: [
        { label: "Semana 1", text: "Vemos qué hace cada área, qué documentos consulta y qué herramientas usa." },
        { label: "Semana 2", text: "Montamos las cuentas, el asistente con vuestros documentos y las plantillas por puesto." },
        { label: "Formación", text: "Sesión práctica con las tareas reales del equipo." },
        { label: "30 días", text: "Resolvemos dudas y te decimos qué conviene automatizar después." },
      ],
      fit: [
        "Varias personas ya usan ChatGPT o Claude con cuentas personales y quieres ponerle orden.",
        "El equipo pierde tiempo buscando información en documentos, correos o carpetas compartidas.",
        "Quieres empezar con la IA por algo que se note en semanas, antes de un proyecto de automatización.",
      ],
      notFit: [
        "Quieres automatizar un proceso de punta a punta: eso es una implantación y empieza en la consultoría gratuita.",
        "Nadie en la empresa va a tener tiempo de usarlo durante el primer mes.",
      ],
      steps: [
        { title: "Cómo trabajáis", desc: "Una entrevista corta con cada área: qué tareas repiten, qué documentos consultan y qué herramientas usan." },
        { title: "Configuración", desc: "Espacio de trabajo con cuentas de empresa, un asistente con vuestros documentos y plantillas para cada puesto." },
        { title: "Formación", desc: "Una sesión práctica con las tareas reales del equipo, no con ejemplos genéricos." },
        { title: "Acompañamiento", desc: "30 días resolviendo dudas y ajustando plantillas. Al final, la lista de lo que conviene automatizar después." },
      ],
      timeline:
        "Entre 2 y 3 semanas desde la consultoría gratuita, según el número de personas y de documentos.",
      priceNote:
        "Precio cerrado según el número de personas, que te damos en la consultoría gratuita. Las licencias de Claude o ChatGPT van a nombre de tu empresa y se pagan directamente al proveedor.",
      faqs: [
        {
          q: "¿Qué herramienta usáis, ChatGPT o Claude?",
          a: "La que mejor encaje con lo que ya usáis y con el tipo de trabajo del equipo. Si trabajáis con Google Workspace o Microsoft 365, lo tenemos en cuenta. Las cuentas son de tu empresa, no nuestras.",
        },
        {
          q: "¿Se usan nuestros datos para entrenar la IA?",
          a: "Con los planes de empresa de Claude y de ChatGPT, por defecto no. Aun así, la guía de uso deja por escrito qué datos de clientes y de personas no deben entrar, y el asistente solo lee los documentos que decidáis.",
        },
        {
          q: "¿En qué se diferencia de una formación?",
          a: "La formación enseña a usar la IA. El Kit, además, deja montado lo necesario para usarla desde el día siguiente: las cuentas, el asistente con vuestros documentos, las plantillas y la guía. La formación va incluida.",
        },
        {
          q: "¿Qué pasa después?",
          a: "Al terminar sabéis qué tareas se pueden automatizar del todo y cuánto valdría hacerlo. Si queréis seguir, el siguiente paso es una implantación o el asesoramiento mensual. Si no, lo montado sigue funcionando sin nosotros.",
        },
      ],
    },
    en: {
      seoTitle: "AI Kit for businesses: your team using AI properly",
      metaDescription:
        "We set up Claude or ChatGPT for your company, an assistant that answers from your documents, templates for each role and usage rules, and train the team.",
      answer:
        "The AI Kit is a fixed-scope package so your team uses AI in their daily work, properly. We set up Claude or ChatGPT with company accounts, build an assistant that answers from your documents, leave templates for each role and a guide on which data can be used, and train the team. It is the first step before automating processes.",
      outcomes: [
        "The whole team using AI on company accounts, not personal ones",
        "Instant answers from your own documents",
        "Clear rules on which data can and cannot be used",
      ],
      flow: [
        { label: "Week 1", text: "We see what each area does, which documents it checks and which tools it uses." },
        { label: "Week 2", text: "We set up the accounts, the assistant on your documents and the templates for each role." },
        { label: "Training", text: "A hands-on session with the team's real tasks." },
        { label: "30 days", text: "We answer questions and tell you what is worth automating next." },
      ],
      fit: [
        "Several people already use ChatGPT or Claude on personal accounts and you want to bring order to it.",
        "The team loses time looking for information in documents, emails or shared folders.",
        "You want to start with AI through something that shows in weeks, before an automation project.",
      ],
      notFit: [
        "You want to automate a process end to end: that is an implementation, and it starts with the free consultation.",
        "Nobody in the company will have time to use it during the first month.",
      ],
      steps: [
        { title: "How you work", desc: "A short interview with each area: which tasks they repeat, which documents they check and which tools they use." },
        { title: "Setup", desc: "A workspace with company accounts, an assistant on your documents and templates for each role." },
        { title: "Training", desc: "A hands-on session with the team's real tasks, not generic examples." },
        { title: "Support", desc: "30 days of questions answered and templates adjusted. At the end, the list of what is worth automating next." },
      ],
      timeline: "2 to 3 weeks from the free consultation, depending on the number of people and documents.",
      priceNote:
        "A fixed price based on the number of people, which we give you in the free consultation. Claude or ChatGPT licences are in your company's name and paid directly to the provider.",
      faqs: [
        {
          q: "Which tool do you use, ChatGPT or Claude?",
          a: "Whichever fits best with what you already use and the kind of work the team does. If you work with Google Workspace or Microsoft 365, we take it into account. The accounts belong to your company, not to us.",
        },
        {
          q: "Is our data used to train the AI?",
          a: "On the business plans of Claude and ChatGPT, not by default. Even so, the usage guide sets out in writing which customer and personal data must stay out, and the assistant only reads the documents you choose.",
        },
        {
          q: "How is it different from a training course?",
          a: "Training teaches people to use AI. The Kit also leaves everything set up to use it the next day: the accounts, the assistant on your documents, the templates and the guide. Training is included.",
        },
        {
          q: "What happens afterwards?",
          a: "At the end you know which tasks can be fully automated and what that would be worth. If you want to continue, the next step is an implementation or monthly advisory. If not, what we set up keeps working without us.",
        },
      ],
    },
  },

  "formacion-ia-empresas": {
    price: "quote",
    posts: [
      "como-implementar-ia-en-tu-empresa",
      "ejemplos-automatizacion-procesos-con-ia",
      "herramientas-ia-para-automatizar-procesos",
      "rgpd-y-automatizacion-con-ia",
    ],
    es: {
      seoTitle: "Formación en IA para empresas y equipos",
      metaDescription:
        "Talleres prácticos de IA para dirección, ventas, atención y administración, con los procesos y documentos de tu empresa. Presenciales o en remoto.",
      answer:
        "Formamos a tu equipo en el uso práctico de la IA con sus propias tareas: cómo pedirle las cosas a ChatGPT o Claude, cómo usarla en ventas, atención y administración, qué datos no deben entrar y qué se puede automatizar. Son talleres prácticos, presenciales o en remoto, que imparte Ramiro Pérez, ingeniero industrial y profesor de Industria 4.0 en un máster universitario.",
      outcomes: [
        "El equipo aplica la IA a sus tareas al día siguiente",
        "Plantillas que se quedan en la empresa",
        "Criterio para saber cuándo hay que revisar lo que hace la IA",
      ],
      flow: [
        { label: "Antes", text: "Cada persona cuenta qué tareas hace y con qué herramientas." },
        { label: "Taller", text: "Practican con sus propios correos, propuestas, informes o consultas." },
        { label: "Plantillas", text: "Lo que funciona se guarda como plantilla para el día a día." },
        { label: "Después", text: "Sesión de dudas cuando ya lo han usado unas semanas." },
      ],
      fit: [
        "Quieres que el equipo use la IA en su trabajo, no que aprenda teoría.",
        "Hay tareas de escritura, búsqueda o análisis que se repiten: correos, propuestas, informes o atención al cliente.",
        "Vais a automatizar procesos y quieres que el equipo entienda qué hace la IA y cuándo revisarla.",
      ],
      notFit: [
        "Buscas un curso técnico de programación o de entrenamiento de modelos.",
        "Necesitas un título o una certificación oficial.",
      ],
      steps: [
        { title: "Antes del taller", desc: "Un cuestionario breve para saber qué tareas hace cada persona y con qué herramientas." },
        { title: "Taller práctico", desc: "Cada persona trabaja con sus propios casos: correos, propuestas, informes o consultas de clientes." },
        { title: "Plantillas", desc: "Lo que funciona en el taller se guarda como plantilla para el día a día." },
        { title: "Seguimiento", desc: "Una sesión de dudas a las dos o tres semanas, cuando ya lo han usado de verdad." },
      ],
      timeline:
        "Un taller se prepara en una o dos semanas. Un itinerario para varios perfiles se reparte en varias sesiones a lo largo de un mes.",
      priceNote: "Depende del número de sesiones y de personas. Te lo damos en la consultoría gratuita.",
      faqs: [
        {
          q: "¿Presencial o en remoto?",
          a: "Las dos. Presencial en España y en remoto para España y Latinoamérica. En remoto trabajamos en grupos pequeños para que todo el mundo practique.",
        },
        {
          q: "¿Qué herramientas se enseñan?",
          a: "ChatGPT y Claude para el día a día y, si el equipo lo necesita, cómo funcionan las automatizaciones con n8n, Make o Zapier. Nos adaptamos a lo que ya usáis: Google Workspace, Microsoft 365 o vuestro CRM.",
        },
        {
          q: "¿Qué perfiles podéis formar?",
          a: "Dirección (qué automatizar, cuánto vale y cómo medirlo), ventas (prospección, propuestas y seguimiento), atención al cliente, administración y perfiles técnicos que van a mantener automatizaciones.",
        },
        {
          q: "¿Qué diferencia hay con el Kit IA?",
          a: "La formación enseña a usar la IA. El Kit IA incluye la formación y, además, deja montadas las cuentas de empresa, un asistente que responde con vuestros documentos y las plantillas por puesto.",
        },
      ],
    },
    en: {
      seoTitle: "AI training for companies and teams",
      metaDescription:
        "Hands-on AI workshops for management, sales, customer service and admin, built on your company's processes and documents. On site or remote.",
      answer:
        "We train your team in the practical use of AI on their own tasks: how to ask ChatGPT or Claude for things, how to use it in sales, customer service and admin, which data must stay out and what can be automated. They are hands-on workshops, on site or remote, run by Ramiro Pérez, an industrial engineer who teaches Industry 4.0 on a university master's programme.",
      outcomes: [
        "The team applies AI to their tasks the next day",
        "Templates that stay in the company",
        "Judgement on when to check what the AI does",
      ],
      flow: [
        { label: "Before", text: "Each person tells us which tasks they do and with which tools." },
        { label: "Workshop", text: "They practise with their own emails, proposals, reports or enquiries." },
        { label: "Templates", text: "What works is saved as a template for everyday use." },
        { label: "After", text: "A Q&A session once they have used it for a few weeks." },
      ],
      fit: [
        "You want the team to use AI in their work, not to learn theory.",
        "There are writing, search or analysis tasks that repeat: emails, proposals, reports or customer service.",
        "You are about to automate processes and want the team to understand what the AI does and when to check it.",
      ],
      notFit: [
        "You are looking for a technical course in programming or model training.",
        "You need an official qualification or certificate.",
      ],
      steps: [
        { title: "Before the workshop", desc: "A short questionnaire to learn which tasks each person does and with which tools." },
        { title: "Hands-on workshop", desc: "Each person works on their own cases: emails, proposals, reports or customer enquiries." },
        { title: "Templates", desc: "What works in the workshop is saved as a template for everyday use." },
        { title: "Follow-up", desc: "A Q&A session two or three weeks later, once they have really used it." },
      ],
      timeline:
        "A workshop takes one or two weeks to prepare. A programme for several profiles is spread over several sessions across a month.",
      priceNote: "It depends on the number of sessions and people. We give it to you in the free consultation.",
      faqs: [
        {
          q: "On site or remote?",
          a: "Both. On site in Spain and remote for Spain and Latin America. Remote sessions run in small groups so everyone practises.",
        },
        {
          q: "Which tools do you teach?",
          a: "ChatGPT and Claude for everyday work and, if the team needs it, how automations work with n8n, Make or Zapier. We adapt to what you already use: Google Workspace, Microsoft 365 or your CRM.",
        },
        {
          q: "Which profiles can you train?",
          a: "Management (what to automate, what it is worth and how to measure it), sales (prospecting, proposals and follow-up), customer service, admin and technical profiles who will maintain automations.",
        },
        {
          q: "How is it different from the AI Kit?",
          a: "Training teaches people to use AI. The AI Kit includes the training and also sets up company accounts, an assistant that answers from your documents and templates for each role.",
        },
      ],
    },
  },

  "asesoramiento-ia": {
    cases: ["Tribeca Media"],
    price: "advisory",
    posts: [
      "automatizar-procesos-con-ia-por-donde-empezar",
      "medir-un-proceso-antes-de-automatizarlo",
      "cuanto-cuesta-automatizar-un-proceso-con-ia",
      "revisar-sistema-de-agentes-ia-antes-de-escalar",
      "coste-agente-de-ia-en-produccion",
    ],
    es: {
      seoTitle: "Asesoramiento en IA para empresas",
      metaDescription:
        "Hoja de ruta de IA por orden de impacto, elección de herramientas y proveedores, y seguimiento mensual con dirección. Un responsable de IA sin contratarlo.",
      answer:
        "El asesoramiento en IA es acompañamiento para dirección: ordenamos qué procesos automatizar y en qué orden, te ayudamos a elegir herramientas y proveedores, revisamos con datos lo que ya está en marcha y decidimos contigo el siguiente paso cada mes. Es tener un responsable de IA a tiempo parcial, sin contratarlo.",
      outcomes: [
        "Una hoja de ruta de IA con orden y prioridades",
        "Herramientas y proveedores elegidos con criterio",
        "El coste y el resultado de la IA, medidos cada mes",
      ],
      flow: [
        { label: "Mapa", text: "Dónde se van el tiempo y el dinero, medido." },
        { label: "Hoja de ruta", text: "Qué automatizar primero, con qué herramienta y cuánto cuesta." },
        { label: "Cada mes", text: "Revisión de lo que está en marcha, de los proveedores y del coste de la IA." },
        { label: "Siguiente paso", text: "Decidimos qué viene después con los datos delante." },
      ],
      fit: [
        "Tienes varias ideas de IA a la vez y no sabes cuál hacer primero.",
        "Te llegan propuestas de proveedores y no sabes si están bien planteadas ni bien de precio.",
        "Ya tienes automatizaciones o agentes en marcha y quieres que alguien vigile que funcionan y cuánto cuestan.",
      ],
      notFit: [
        "Quieres que lo construyamos todo nosotros: eso es una implantación, aunque puede ir acompañada de asesoramiento.",
        "Buscas una sola reunión para orientarte: para eso está la consultoría gratuita.",
      ],
      steps: [
        { title: "Mapa de procesos", desc: "Dónde se van el tiempo y el dinero, con los datos del punto de partida." },
        { title: "Hoja de ruta", desc: "Qué automatizar primero, con qué herramienta, cuánto cuesta y qué se espera ganar." },
        { title: "Seguimiento mensual", desc: "Revisión con dirección de lo que está en marcha, de los proveedores y del coste de la IA." },
        { title: "Ajuste", desc: "El orden cambia cuando los datos lo piden, no cuando aparece una herramienta nueva." },
      ],
      timeline: "El mapa y la hoja de ruta están en 2 a 4 semanas. Después, el seguimiento es mensual.",
      caseFocus: {
        "Tribeca Media":
          "Antes de construir nada, un diagnóstico técnico del código y del sistema en vivo, y un plan de corrección por fases priorizado por riesgo. Después, observabilidad: chequeos de salud con avisos, el coste de cada llamada a la IA registrado y un tope de gasto por cliente.",
      },
      faqs: [
        {
          q: "¿Necesito tener algo automatizado ya?",
          a: "No. Muchas empresas empiezan por aquí precisamente para no equivocarse con la primera automatización. Si ya tenéis algo en marcha, es lo primero que revisamos.",
        },
        {
          q: "¿Trabajáis con nuestros proveedores actuales?",
          a: "Sí. El asesoramiento no obliga a que lo construyamos nosotros. Revisamos las propuestas y el trabajo de otros proveedores con el mismo criterio que aplicamos al nuestro.",
        },
        {
          q: "¿Qué se revisa cada mes?",
          a: "Lo que ya funciona (volumen, tiempo ahorrado y errores), lo que cuesta la IA en uso, lo que está en construcción y si el siguiente paso de la hoja de ruta sigue siendo el correcto.",
        },
        {
          q: "¿Cuánto cuesta?",
          a: "El mapa de procesos y la hoja de ruta son un discovery, que arranca en 1.500 €. El seguimiento mensual va de 1.000 € a 5.000 € al mes según el alcance. El precio exacto se confirma tras la consultoría gratuita.",
        },
      ],
    },
    en: {
      seoTitle: "AI advisory for businesses",
      metaDescription:
        "An AI roadmap ordered by impact, help choosing tools and vendors, and monthly follow-up with management. An AI lead without hiring one.",
      answer:
        "AI advisory is support for management: we put in order which processes to automate and when, help you choose tools and vendors, review what is already running with data and decide the next step with you every month. It is like having a part-time head of AI, without hiring one.",
      outcomes: [
        "An AI roadmap with clear order and priorities",
        "Tools and vendors chosen with judgement",
        "The cost and the result of AI, measured every month",
      ],
      flow: [
        { label: "Map", text: "Where time and money go, measured." },
        { label: "Roadmap", text: "What to automate first, with which tool and at what cost." },
        { label: "Every month", text: "A review of what is running, the vendors and the cost of AI." },
        { label: "Next step", text: "We decide what comes next with the data in front of us." },
      ],
      fit: [
        "You have several AI ideas at once and don't know which to do first.",
        "You receive vendor proposals and can't tell whether they are well designed or well priced.",
        "You already have automations or agents running and want someone to check that they work and what they cost.",
      ],
      notFit: [
        "You want us to build everything: that is an implementation, although it can come with advisory.",
        "You want a single meeting to get your bearings: that is what the free consultation is for.",
      ],
      steps: [
        { title: "Process map", desc: "Where time and money go, with baseline data." },
        { title: "Roadmap", desc: "What to automate first, with which tool, at what cost and with what expected gain." },
        { title: "Monthly follow-up", desc: "A review with management of what is running, the vendors and the cost of AI." },
        { title: "Adjust", desc: "The order changes when the data says so, not when a new tool appears." },
      ],
      timeline: "The map and roadmap take 2 to 4 weeks. After that, follow-up is monthly.",
      caseFocus: {
        "Tribeca Media":
          "Before building anything, a technical review of the code and the live system, and a phased fix plan prioritised by risk. Then observability: health checks with alerts, the cost of every AI call recorded and a spending cap per client.",
      },
      faqs: [
        {
          q: "Do I need to have something automated already?",
          a: "No. Many companies start here precisely so they don't get the first automation wrong. If you already have something running, that is the first thing we review.",
        },
        {
          q: "Do you work with our current vendors?",
          a: "Yes. Advisory does not require us to build anything. We review other vendors' proposals and work with the same criteria we apply to our own.",
        },
        {
          q: "What gets reviewed each month?",
          a: "What is already working (volume, time saved and errors), what the AI costs in use, what is being built and whether the next step on the roadmap is still the right one.",
        },
        {
          q: "How much does it cost?",
          a: "The process map and roadmap are a discovery, starting at €1,500. Monthly follow-up runs from €1,000 to €5,000 a month depending on scope. The exact price is confirmed after the free consultation.",
        },
      ],
    },
  },
};

export const SERVICIO_SLUGS = Object.keys(SERVICIOS);

export function getServicio(slug: string, lang: Lang) {
  const s = SERVICIOS[slug];
  if (!s) return null;
  return { ...s[lang], cases: s.cases ?? [], price: s.price ?? "tiers", posts: s.posts };
}
