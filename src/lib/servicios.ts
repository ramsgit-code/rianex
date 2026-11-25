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
// (docs/PENDIENTES-SEO.md). Lo mismo el control con camaras e IA (24-nov-2026),
// que ademas no tiene caso propio todavia: ni cifras ni clientes. Y la IA
// selectiva (25-nov-2026): plazos y forma de precio sin validar. Y los cuatro
// de canal (25-nov-2026): creacion de webs, email marketing, outbound en
// LinkedIn y cold calling. Sin casos ni plazos publicados; precio "quote". Las
// FAQ legales citan la LGTel art. 66, la Circular 1/2023 de la AEPD, la LOPDGDD
// arts. 19 y 23, la LSSI art. 21, el Reglamento de IA art. 50 y el Acuerdo de
// usuario de LinkedIn (8.2 y 3.4), comprobados el 25-nov-2026.

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
  /**
   * Donde se usa, por tipo de negocio (control con camaras). Cada uno enlaza
   * a su landing de /l/ si la tiene (solo en castellano).
   */
  uses?: { title: string; desc: string; href?: string }[];
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
  /** Muestra el bloque fijo "Mantenimiento mensual" (mantenimiento.ts). */
  maintenance?: boolean;
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
    maintenance: true,
    posts: [
      "automatizar-procesos-con-ia-por-donde-empezar",
      "como-implementar-ia-en-tu-empresa",
      "ejemplos-automatizacion-procesos-con-ia",
      "herramientas-ia-para-automatizar-procesos",
      "proyectos-de-ia-a-medida-ejemplos-plazos-precio",
      "rgpd-y-automatizacion-con-ia",
      "n8n-3-que-se-rompe-y-como-prepararte",
      "n8n-vs-make-vs-zapier",
      "agencia-automatizacion-vs-freelance-vs-equipo-interno",
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
          a: "Multiplica cuántas veces ocurre a la semana, cuántos minutos lleva y el coste por hora de quien lo hace: es lo que cuesta seguir haciéndolo a mano. Luego suma lo que se pierde. En un proceso comercial, los contactos que se pierden sin respuesta suelen pesar más que las horas: cuenta cuántos fueron el último mes.",
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
          a: "Multiply how often it happens per week, how many minutes it takes and the hourly cost of whoever does it: that is the cost of keeping it manual. Then add what is lost. In a sales process, the contacts lost without a reply usually outweigh the hours: count how many there were last month.",
        },
        { q: "How much does it cost?", a: PRECIO_EN },
      ],
    },
  },

  "integracion-gohighlevel-hubspot": {
    cases: ["Hospital Capilar"],
    posts: ["integrar-gohighlevel-con-tu-stack", "whatsapp-automatizacion-ventas", "gohighlevel-vs-hubspot"],
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
      "gohighlevel-vs-hubspot",
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
    posts: ["prospeccion-b2b-outbound-con-ia", "clay-treg-coldiq-enriquecimiento-prospeccion-b2b", "que-es-gtm-engineering", "gtm-engineering-no-es-mandar-emails-con-clay"],
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
          a: "Los dos, coordinados. Hay cargos que leen el correo y otros que solo contestan en LinkedIn. Una secuencia que combina los dos canales llega a más gente sin insistir más en ninguno. Si solo quieres LinkedIn, o llamar por teléfono, el outbound en LinkedIn y el cold calling B2B se contratan por separado.",
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
          a: "Both, coordinated. Some roles read email and others only reply on LinkedIn. A sequence combining both channels reaches more people without pushing harder on either. If you only want LinkedIn, or phone calls, LinkedIn outbound and B2B cold calling are available as separate services.",
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

  "creacion-de-webs": {
    price: "quote",
    posts: [
      "como-cualificar-leads-automaticamente",
      "integrar-gohighlevel-con-tu-stack",
      "que-es-gohighlevel",
      "gohighlevel-vs-hubspot",
    ],
    es: {
      seoTitle: "Creación de páginas web para empresas",
      metaDescription:
        "Webs para empresas que captan y cualifican contactos: rápidas, indexables, con SEO y GEO de base y cada formulario conectado a GoHighLevel o HubSpot.",
      answer:
        "Creamos páginas web para empresas pensadas para captar y cualificar contactos: rápidas, legibles para Google y para los asistentes de IA, y con cada formulario conectado a tu CRM, GoHighLevel o HubSpot. Las hacemos en Next.js sobre Vercel, como esta web, o con los embudos de GoHighLevel cuando lo que hace falta son landings que tu equipo edite sin programar. Cada contacto entra en el CRM con su origen y el equipo recibe el aviso al momento.",
      outcomes: [
        "Una web que carga rápido y que Google puede indexar entera",
        "Cada formulario crea el contacto en tu CRM con su origen",
        "Sabes qué páginas y qué campañas traen contactos",
      ],
      flow: [
        { label: "Visita", text: "Alguien llega desde Google, un anuncio o un asistente de IA." },
        { label: "Formulario", text: "Rellena un formulario o un cuestionario corto que pregunta solo lo que importa." },
        { label: "CRM", text: "El contacto entra en GoHighLevel o HubSpot con su origen y sus respuestas." },
        { label: "Respuesta", text: "El equipo recibe el aviso y el contacto recibe el correo o el WhatsApp que toca." },
      ],
      fit: [
        "No tienes web, o la que tienes no trae contactos y no sabes por qué.",
        "Tu web es lenta, no aparece en Google o nadie en la empresa puede tocarla.",
        "Quieres que cada contacto de la web entre en el CRM con su origen, sin copiar nada a mano.",
      ],
      notFit: [
        "Buscas una tienda online con un catálogo grande y pasarela de pago: hay plataformas hechas para eso.",
        "Solo quieres cambiar el diseño, sin tocar formularios ni CRM.",
      ],
      steps: [
        { title: "Objetivo y estructura", desc: "Qué tiene que conseguir la web, para quién es cada página y a qué búsquedas tiene que responder. Sale un mapa de páginas antes de diseñar nada." },
        { title: "Diseño y textos", desc: "Diseño propio, textos que responden en la primera frase a lo que busca cada visita y formularios que preguntan solo lo necesario." },
        { title: "Desarrollo y CRM", desc: "Next.js sobre Vercel o embudos de GoHighLevel, con cada formulario conectado a tu CRM y avisos al equipo." },
        { title: "SEO, GEO y medida", desc: "Velocidad, sitemap, metadatos por página, datos estructurados y llms.txt, y Google Analytics 4 y Search Console configurados para ver qué trae contactos." },
      ],
      timeline:
        "Depende del número de páginas, de los textos que haya que escribir y de las integraciones. Te lo damos por escrito en la consultoría gratuita, antes de empezar.",
      priceNote:
        "Precio cerrado según el número de páginas y de integraciones, que te damos en la consultoría gratuita. El dominio y el alojamiento van a nombre de tu empresa y se pagan directamente al proveedor.",
      faqs: [
        {
          q: "¿Next.js o GoHighLevel?",
          a: "Next.js sobre Vercel cuando la web tiene que posicionar en Google, cargar muy rápido y crecer con artículos y páginas de servicio. Los embudos de GoHighLevel cuando lo que necesitas son landings de campaña que tu equipo cree y edite sin programar, ya dentro del CRM. Se pueden combinar: la web en Next.js y las landings de campaña en GoHighLevel.",
        },
        {
          q: "¿La web es mía?",
          a: "Sí. El dominio, el código y la cuenta de alojamiento van a nombre de tu empresa. Si un día dejamos de trabajar juntos, la web sigue funcionando y puedes llevarla a otro proveedor.",
        },
        {
          q: "¿Qué es el GEO?",
          a: "Preparar la web para que los asistentes de IA, como ChatGPT, Perplexity o los resúmenes de Google, puedan leerla y citarla: cada página responde en su primera frase a lo que se busca, el texto está en el HTML que leen los rastreadores y la web publica datos estructurados y un llms.txt. No garantiza que te citen, pero sin eso es difícil que lo hagan.",
        },
        {
          q: "¿Podéis rehacer la web que ya tengo?",
          a: "Sí. Revisamos qué páginas tienen visitas o enlaces, las conservamos o las redirigimos a su nueva dirección para no perder lo ganado en Google y, si el CRM ya recibe contactos de la web, mantenemos los mismos campos.",
        },
        {
          q: "¿Quién la actualiza después?",
          a: "Si está en GoHighLevel, tu equipo edita las páginas desde el propio CRM. Si está en Next.js, el contenido vive en el código: los cambios los hacemos nosotros con el mantenimiento mensual o los hace tu equipo técnico.",
        },
      ],
    },
    en: {
      seoTitle: "Website creation for businesses",
      metaDescription:
        "Business websites that capture and qualify leads: fast, indexable, with SEO and GEO basics and every form connected to GoHighLevel or HubSpot.",
      answer:
        "We build business websites designed to capture and qualify leads: fast, readable by Google and by AI assistants, and with every form connected to your CRM, GoHighLevel or HubSpot. We build them in Next.js on Vercel, like this site, or with GoHighLevel funnels when what you need are landing pages your team can edit without coding. Every contact lands in the CRM with its source and the team is notified straight away.",
      outcomes: [
        "A website that loads fast and that Google can index in full",
        "Every form creates the contact in your CRM with its source",
        "You know which pages and campaigns bring in contacts",
      ],
      flow: [
        { label: "Visit", text: "Someone arrives from Google, an ad or an AI assistant." },
        { label: "Form", text: "They fill in a form or a short quiz that only asks what matters." },
        { label: "CRM", text: "The contact lands in GoHighLevel or HubSpot with its source and answers." },
        { label: "Reply", text: "The team gets notified and the contact gets the right email or WhatsApp message." },
      ],
      fit: [
        "You have no website, or the one you have brings no contacts and you don't know why.",
        "Your site is slow, doesn't show up on Google or nobody in the company can change it.",
        "You want every website contact to land in the CRM with its source, with no copying by hand.",
      ],
      notFit: [
        "You need an online shop with a large catalogue and payment gateway: there are platforms built for that.",
        "You only want a new look, without touching forms or the CRM.",
      ],
      steps: [
        { title: "Goal and structure", desc: "What the site has to achieve, who each page is for and which searches it has to answer. A page map comes out before any design." },
        { title: "Design and copy", desc: "Custom design, copy that answers what each visitor is looking for in the first sentence, and forms that only ask what is needed." },
        { title: "Build and CRM", desc: "Next.js on Vercel or GoHighLevel funnels, with every form connected to your CRM and alerts to the team." },
        { title: "SEO, GEO and measurement", desc: "Speed, sitemap, per-page metadata, structured data and llms.txt, plus Google Analytics 4 and Search Console set up to see what brings in contacts." },
      ],
      timeline:
        "It depends on the number of pages, the copy to be written and the integrations. We give it to you in writing in the free consultation, before we start.",
      priceNote:
        "A fixed price based on the number of pages and integrations, which we give you in the free consultation. The domain and hosting are in your company's name and paid directly to the provider.",
      faqs: [
        {
          q: "Next.js or GoHighLevel?",
          a: "Next.js on Vercel when the site has to rank on Google, load very fast and grow with articles and service pages. GoHighLevel funnels when you need campaign landing pages your team can create and edit without coding, already inside the CRM. They can be combined: the site in Next.js and the campaign landing pages in GoHighLevel.",
        },
        {
          q: "Is the website mine?",
          a: "Yes. The domain, the code and the hosting account are in your company's name. If we stop working together one day, the site keeps running and you can take it to another provider.",
        },
        {
          q: "What is GEO?",
          a: "Preparing the site so AI assistants such as ChatGPT, Perplexity or Google's AI summaries can read and cite it: every page answers the query in its first sentence, the text is in the HTML that crawlers read, and the site publishes structured data and an llms.txt file. It does not guarantee being cited, but without it being cited is unlikely.",
        },
        {
          q: "Can you rebuild the website I already have?",
          a: "Yes. We check which pages have traffic or links, keep them or redirect them to their new address so you don't lose what you have earned on Google and, if the CRM already receives contacts from the site, we keep the same fields.",
        },
        {
          q: "Who updates it afterwards?",
          a: "On GoHighLevel, your team edits the pages from the CRM itself. On Next.js, the content lives in the code: changes are made by us under monthly maintenance or by your technical team.",
        },
      ],
    },
  },

  "email-marketing": {
    price: "quote",
    posts: [
      "rgpd-y-automatizacion-con-ia",
      "como-cualificar-leads-automaticamente",
      "cross-selling-por-whatsapp",
      "gohighlevel-vs-hubspot",
    ],
    es: {
      seoTitle: "Email marketing automatizado para empresas",
      metaDescription:
        "Newsletters, secuencias de nurturing y reactivación para tus propios contactos, segmentadas en GoHighLevel o HubSpot y con el dominio autenticado.",
      answer:
        "El email marketing automatizado es enviar a tus propios contactos el correo que toca según quiénes son y qué han hecho, sin prepararlo a mano cada vez. Lo montamos en tu CRM, GoHighLevel o HubSpot: segmentamos la base, dejamos secuencias de bienvenida, nurturing, reactivación y postventa, una newsletter con plantilla propia y el dominio autenticado para llegar a la bandeja de entrada. La IA ayuda a redactar; lo que se envía lo apruebas tú.",
      outcomes: [
        "Cada contacto recibe el correo que toca según su etapa y su interés",
        "Los contactos dormidos reciben una secuencia de reactivación, no se quedan olvidados",
        "Sabes qué correo acaba en reunión o en venta, no solo cuántos lo abrieron",
      ],
      flow: [
        { label: "Contacto", text: "Alguien descarga una guía, pide presupuesto o compra por primera vez." },
        { label: "Segmento", text: "El CRM lo etiqueta según lo que pidió y la etapa en la que está." },
        { label: "Secuencia", text: "Recibe los correos de su secuencia; si hace clic o contesta, se avisa al comercial." },
        { label: "Venta", text: "Quien muestra interés pasa al pipeline y quien se da de baja sale de todos los envíos." },
      ],
      fit: [
        "Tienes una base de clientes y contactos propia que hoy no recibe nada, o recibe lo mismo todo el mundo.",
        "Captas leads que no compran en el primer contacto y necesitan seguimiento durante semanas o meses.",
        "Ya usas GoHighLevel o HubSpot, o vas a implantarlo, y quieres que el correo salga desde ahí.",
      ],
      notFit: [
        "Quieres escribir en frío a empresas que no te conocen: eso es la prospección autónoma, con dominios y buzones aparte.",
        "Tus contactos no han dado permiso para recibir comunicaciones comerciales ni son clientes tuyos: primero hay que construir la base.",
      ],
      steps: [
        { title: "Base y permisos", desc: "Revisamos de dónde viene cada contacto y si puede recibir comunicaciones comerciales, quitamos duplicados y rebotes y definimos los segmentos." },
        { title: "Dominio y entregabilidad", desc: "Autenticamos el dominio de envío con SPF, DKIM y DMARC, configuramos las bajas y el tratamiento de rebotes, y subimos el volumen poco a poco si el dominio no enviaba antes." },
        { title: "Secuencias y newsletter", desc: "Bienvenida, nurturing, reactivación y postventa, disparadas por lo que hace cada contacto en la web o en el CRM. La newsletter, con plantilla propia y calendario." },
        { title: "Medida", desc: "Aperturas y clics, pero sobre todo respuestas, reuniones y ventas por secuencia, en el panel del CRM." },
      ],
      timeline:
        "Depende del tamaño de la base y del número de secuencias. Te lo damos por escrito en la consultoría gratuita, antes de empezar.",
      priceNote:
        "Precio cerrado según el número de secuencias y el estado de la base, que te damos en la consultoría gratuita. La herramienta de envío va a nombre de tu empresa y se paga directamente al proveedor.",
      faqs: [
        {
          q: "¿Es legal enviar email marketing a mis contactos?",
          a: "Sí, con permiso. El artículo 21 de la LSSI prohíbe enviar publicidad por correo electrónico que el destinatario no haya solicitado o autorizado expresamente, salvo que haya una relación contractual previa: entonces puedes escribir a tus clientes sobre productos o servicios de tu empresa parecidos a los que contrataron, si obtuviste sus datos de forma lícita. En todos los casos, cada correo tiene que incluir una forma sencilla y gratuita de darse de baja. Por eso lo primero que revisamos es de dónde viene cada contacto, y las bajas se aplican solas en el CRM.",
        },
        {
          q: "¿En qué se diferencia de la prospección por email?",
          a: "En a quién se escribe. El email marketing va a tus propios contactos: clientes, leads y gente que se ha suscrito. La prospección en frío escribe a empresas que no te conocen, sale de dominios y buzones aparte y tiene su propio servicio, la prospección autónoma B2B.",
        },
        {
          q: "¿Qué herramienta usáis?",
          a: "La que ya tengas, si sirve. GoHighLevel y HubSpot envían correo desde el propio CRM, y así cada apertura, clic y respuesta queda en la ficha del contacto. Si envías con otra herramienta, la conectamos al CRM para no perder ese historial.",
        },
        {
          q: "¿Por qué mis correos acaban en spam?",
          a: "Las causas habituales son un dominio sin autenticar, listas con direcciones que ya no existen, envíos masivos de golpe desde un dominio que no enviaba y correos sin forma de darse de baja. Lo revisamos todo antes del primer envío y vigilamos rebotes y quejas después.",
        },
        {
          q: "¿Qué hace la IA?",
          a: "Ayuda a redactar variantes de asunto y de texto, a resumir qué ha hecho cada contacto para elegir su secuencia y a clasificar las respuestas. Ningún correo nuevo sale sin que lo revise una persona.",
        },
      ],
    },
    en: {
      seoTitle: "Automated email marketing for businesses",
      metaDescription:
        "Newsletters, nurturing and reactivation sequences for your own contacts, segmented in GoHighLevel or HubSpot and sent from an authenticated domain.",
      answer:
        "Automated email marketing means sending your own contacts the right email based on who they are and what they have done, without preparing it by hand each time. We build it in your CRM, GoHighLevel or HubSpot: we segment the database and set up welcome, nurturing, reactivation and after-sales sequences, a newsletter with its own template and an authenticated domain to reach the inbox. AI helps write; you approve what gets sent.",
      outcomes: [
        "Every contact gets the right email for their stage and interest",
        "Dormant contacts get a reactivation sequence instead of being forgotten",
        "You know which email ends in a meeting or a sale, not just how many opened it",
      ],
      flow: [
        { label: "Contact", text: "Someone downloads a guide, asks for a quote or buys for the first time." },
        { label: "Segment", text: "The CRM tags them by what they asked for and the stage they are in." },
        { label: "Sequence", text: "They get the emails in their sequence; if they click or reply, a salesperson is alerted." },
        { label: "Sale", text: "Anyone showing interest moves to the pipeline, and anyone who unsubscribes leaves every send." },
      ],
      fit: [
        "You have your own base of customers and contacts that gets nothing today, or everyone gets the same.",
        "You capture leads that don't buy on first contact and need follow-up for weeks or months.",
        "You already use GoHighLevel or HubSpot, or are about to, and want email to go out from there.",
      ],
      notFit: [
        "You want to cold-email companies that don't know you: that is autonomous prospecting, with separate domains and inboxes.",
        "Your contacts have not agreed to receive marketing and are not your customers: the base has to be built first.",
      ],
      steps: [
        { title: "Database and permissions", desc: "We check where each contact came from and whether they can receive marketing, remove duplicates and bounces and define the segments." },
        { title: "Domain and deliverability", desc: "We authenticate the sending domain with SPF, DKIM and DMARC, set up unsubscribes and bounce handling, and raise volume gradually if the domain did not send before." },
        { title: "Sequences and newsletter", desc: "Welcome, nurturing, reactivation and after-sales, triggered by what each contact does on the website or in the CRM. The newsletter, with its own template and calendar." },
        { title: "Measurement", desc: "Opens and clicks, but above all replies, meetings and sales per sequence, on the CRM dashboard." },
      ],
      timeline:
        "It depends on the size of the database and the number of sequences. We give it to you in writing in the free consultation, before we start.",
      priceNote:
        "A fixed price based on the number of sequences and the state of the database, which we give you in the free consultation. The sending tool is in your company's name and paid directly to the provider.",
      faqs: [
        {
          q: "Is it legal to send email marketing to my contacts in Spain?",
          a: "Yes, with permission. Article 21 of Spain's LSSI prohibits sending advertising by email that the recipient has not requested or expressly authorised, unless there is a prior contractual relationship: then you may write to your customers about your own company's products or services similar to the ones they bought, provided you obtained their details lawfully. In every case, each email must include a simple, free way to unsubscribe. That is why the first thing we check is where each contact came from, and unsubscribes are applied automatically in the CRM.",
        },
        {
          q: "How is it different from email prospecting?",
          a: "In who gets the email. Email marketing goes to your own contacts: customers, leads and people who subscribed. Cold prospecting writes to companies that don't know you, goes out from separate domains and inboxes, and is its own service, autonomous B2B prospecting.",
        },
        {
          q: "Which tool do you use?",
          a: "Whatever you already have, if it works. GoHighLevel and HubSpot send email from the CRM itself, so every open, click and reply is recorded on the contact. If you send with another tool, we connect it to the CRM so that history is not lost.",
        },
        {
          q: "Why do my emails land in spam?",
          a: "The usual causes are an unauthenticated domain, lists with addresses that no longer exist, sudden mass sends from a domain that was not sending before, and emails with no way to unsubscribe. We check all of it before the first send and watch bounces and complaints afterwards.",
        },
        {
          q: "What does the AI do?",
          a: "It helps write subject and body variants, summarises what each contact has done to pick their sequence, and classifies replies. No new email goes out without a person reviewing it.",
        },
      ],
    },
  },

  "outbound-linkedin": {
    price: "quote",
    posts: [
      "prospeccion-b2b-outbound-con-ia",
      "que-es-gtm-engineering",
      "clay-treg-coldiq-enriquecimiento-prospeccion-b2b",
      "gtm-engineering-no-es-mandar-emails-con-clay",
    ],
    es: {
      seoTitle: "Outbound en LinkedIn para empresas B2B",
      metaDescription:
        "Invitaciones y mensajes en LinkedIn a quien decide: perfil preparado, búsquedas en Sales Navigator, secuencias en Valley y respuestas en tu CRM.",
      answer:
        "El outbound en LinkedIn es escribir a quien decide en las empresas que encajan contigo, con invitaciones y mensajes personalizados y seguimiento programado, desde tu propio perfil. Preparamos el perfil, buscamos a las personas con Sales Navigator, montamos las secuencias en Valley con mensajes que revisa una persona antes de salir, y cada respuesta entra en GoHighLevel o HubSpot con un enlace para reservar reunión.",
      outcomes: [
        "Invitaciones y mensajes a los cargos que deciden, cada semana",
        "Un perfil que explica qué haces a quien lo visita después de la invitación",
        "Cada respuesta en tu CRM, clasificada y con su siguiente paso",
      ],
      flow: [
        { label: "Búsqueda", text: "Sales Navigator encuentra a los cargos que encajan en las empresas objetivo." },
        { label: "Invitación", text: "Sale una invitación con una nota corta que habla de su empresa." },
        { label: "Mensajes", text: "Si acepta, recibe mensajes espaciados; si contesta, la secuencia se para." },
        { label: "Reunión", text: "La respuesta entra en tu CRM y quien tiene interés reserva reunión." },
      ],
      fit: [
        "Vendes B2B y tu comprador es un cargo concreto que usa LinkedIn.",
        "Ya escribes a mano por LinkedIn y no te da la semana para hacerlo con constancia.",
        "Quieres un canal de prospección sin montar dominios ni buzones de email.",
      ],
      notFit: [
        "Vendes a particulares: LinkedIn sirve para hablar con profesionales.",
        "No quieres que se escriba desde tu perfil ni desde el de tu equipo: el canal funciona porque escribe una persona real.",
      ],
      steps: [
        { title: "Cliente ideal y perfil", desc: "A quién escribimos y por qué, y el perfil de quien envía preparado: titular, extracto y publicaciones que expliquen qué hace la empresa." },
        { title: "Listas en Sales Navigator", desc: "Búsquedas guardadas por sector, tamaño, cargo y zona, que alimentan las campañas." },
        { title: "Secuencias en Valley", desc: "Invitación y mensajes de seguimiento con volúmenes diarios prudentes, ritmo de persona y aprobación de los mensajes antes de enviarlos." },
        { title: "CRM y ajuste", desc: "Las respuestas se clasifican y entran en GoHighLevel o HubSpot. Con los datos de las primeras semanas cambiamos el segmento o el mensaje que no acaba en reunión." },
      ],
      timeline:
        "Depende de si hay que preparar el perfil y de cuántos segmentos se lancen. Te lo damos por escrito en la consultoría gratuita. A diferencia del email en frío, no hay buzones que calentar.",
      priceNote:
        "Precio cerrado según el número de perfiles y de segmentos, que te damos en la consultoría gratuita. Sales Navigator y Valley van a nombre de tu empresa y se pagan directamente al proveedor.",
      faqs: [
        {
          q: "¿Me pueden restringir la cuenta de LinkedIn?",
          a: "Puede pasar, y te lo decimos antes de empezar. El Acuerdo de usuario de LinkedIn (apartado 8.2) prohíbe usar software o scripts para extraer perfiles y datos, y usar bots u otros métodos automatizados no autorizados para añadir contactos o enviar mensajes; LinkedIn se reserva el derecho a restringir, suspender o cerrar la cuenta de quien lo incumpla (apartado 3.4). Para reducir ese riesgo trabajamos con volúmenes diarios prudentes, ritmo de persona, búsquedas en Sales Navigator, que es la herramienta de LinkedIn, y mensajes personalizados que alguien revisa antes de salir. Aun así, cualquier herramienta de automatización de terceros tiene riesgo, y la decisión de usarla es tuya.",
        },
        {
          q: "¿Desde qué perfil se escribe?",
          a: "Desde el tuyo o el de quien vende en tu equipo. Es lo que hace que la gente conteste: ve a una persona real de una empresa real. Por eso preparamos el perfil antes de enviar nada.",
        },
        {
          q: "¿Necesito Sales Navigator?",
          a: "Es lo que recomendamos. Es la herramienta de búsqueda de LinkedIn para ventas, con filtros por sector, tamaño, cargo y zona que la búsqueda normal no tiene. La licencia va a nombre de quien envía.",
        },
        {
          q: "¿En qué se diferencia de la prospección autónoma?",
          a: "La prospección autónoma combina email y LinkedIn, con scoring de empresas y dominios aparte. Este servicio es solo LinkedIn: tiene sentido si tu comprador está ahí o si quieres empezar por un canal antes de montar el sistema completo.",
        },
        {
          q: "¿Qué pasa con las respuestas?",
          a: "Se clasifican (interesado, no ahora, no es la persona, no le interesa) y entran en GoHighLevel o HubSpot con la conversación. A quien tiene interés le llega el enlace para reservar reunión, y quien dice «no ahora» vuelve a la lista más adelante.",
        },
      ],
    },
    en: {
      seoTitle: "LinkedIn outbound for B2B companies",
      metaDescription:
        "LinkedIn invitations and messages to decision-makers: profile ready, Sales Navigator searches, Valley sequences and every reply in your CRM.",
      answer:
        "LinkedIn outbound means writing to the decision-makers at the companies that fit you, with personalised invitations and messages and scheduled follow-up, from your own profile. We prepare the profile, find the people with Sales Navigator, build the sequences in Valley with messages a person reviews before they go out, and every reply lands in GoHighLevel or HubSpot with a link to book a meeting.",
      outcomes: [
        "Invitations and messages to the roles that decide, every week",
        "A profile that explains what you do to anyone who visits it after the invitation",
        "Every reply in your CRM, classified and with its next step",
      ],
      flow: [
        { label: "Search", text: "Sales Navigator finds the roles that fit at the target companies." },
        { label: "Invitation", text: "An invitation goes out with a short note about their company." },
        { label: "Messages", text: "If they accept, they get spaced-out messages; if they reply, the sequence stops." },
        { label: "Meeting", text: "The reply lands in your CRM and anyone interested books a meeting." },
      ],
      fit: [
        "You sell B2B and your buyer is a specific role that uses LinkedIn.",
        "You already write on LinkedIn by hand and the week is too short to do it consistently.",
        "You want a prospecting channel without setting up email domains or inboxes.",
      ],
      notFit: [
        "You sell to consumers: LinkedIn is for talking to professionals.",
        "You don't want messages sent from your profile or your team's: the channel works because a real person is writing.",
      ],
      steps: [
        { title: "Ideal customer and profile", desc: "Who we write to and why, and the sender's profile ready: headline, summary and posts that explain what the company does." },
        { title: "Sales Navigator lists", desc: "Saved searches by industry, size, role and region that feed the campaigns." },
        { title: "Valley sequences", desc: "Invitation and follow-up messages with careful daily volumes, a human pace and messages approved before they are sent." },
        { title: "CRM and tuning", desc: "Replies are classified and go into GoHighLevel or HubSpot. With the data from the first weeks we change the segment or message that does not end in meetings." },
      ],
      timeline:
        "It depends on whether the profile needs work and how many segments are launched. We give it to you in writing in the free consultation. Unlike cold email, there are no inboxes to warm up.",
      priceNote:
        "A fixed price based on the number of profiles and segments, which we give you in the free consultation. Sales Navigator and Valley are in your company's name and paid directly to the provider.",
      faqs: [
        {
          q: "Can my LinkedIn account be restricted?",
          a: "It can happen, and we tell you before we start. LinkedIn's User Agreement (section 8.2) prohibits using software or scripts to scrape profiles and data, and using bots or other unauthorised automated methods to add contacts or send messages; LinkedIn reserves the right to restrict, suspend or terminate the account of anyone who breaches it (section 3.4). To reduce that risk we work with careful daily volumes, a human pace, searches in Sales Navigator, which is LinkedIn's own tool, and personalised messages someone reviews before they go out. Even so, any third-party automation tool carries risk, and the decision to use it is yours.",
        },
        {
          q: "Which profile are messages sent from?",
          a: "Yours, or that of whoever sells in your team. That is what makes people reply: they see a real person from a real company. That is why we prepare the profile before anything is sent.",
        },
        {
          q: "Do I need Sales Navigator?",
          a: "It is what we recommend. It is LinkedIn's search tool for sales, with filters by industry, size, role and region that normal search lacks. The licence is in the sender's name.",
        },
        {
          q: "How is it different from autonomous prospecting?",
          a: "Autonomous prospecting combines email and LinkedIn, with company scoring and separate domains. This service is LinkedIn only: it makes sense if your buyer is there or if you want to start with one channel before building the full system.",
        },
        {
          q: "What happens to replies?",
          a: "They are classified (interested, not now, wrong person, not interested) and go into GoHighLevel or HubSpot with the conversation. Interested people get the link to book a meeting, and \"not now\" replies go back on the list later on.",
        },
      ],
    },
  },

  "cold-calling": {
    price: "quote",
    posts: [
      "prospeccion-b2b-outbound-con-ia",
      "rgpd-y-automatizacion-con-ia",
      "ai-act-chatbot-decir-que-es-ia",
      "vapi-vs-retell",
    ],
    es: {
      seoTitle: "Cold calling B2B: llamadas en frío con CRM",
      metaDescription:
        "Llamadas en frío a empresas con lista cruzada con la Lista Robinson, guiones por segmento, marcador y cada llamada registrada en GoHighLevel o HubSpot.",
      answer:
        "El cold calling B2B es llamar a empresas que no te conocen para abrir una conversación con quien decide. Lo montamos conectado a tu CRM, GoHighLevel o HubSpot: listas de empresas y cargos cruzadas con los sistemas de exclusión publicitaria, guiones por segmento, bloques de llamadas con marcador y cada llamada registrada con su resultado. La IA resume las llamadas y, solo donde la ley lo permite, llama un agente de voz que avisa de que es una IA.",
      outcomes: [
        "Quien llama tiene la lista, el guion y el historial en una sola pantalla",
        "Cada llamada registrada en el CRM con su resultado y su siguiente paso",
        "Ningún interesado sin seguimiento: la reunión o la tarea se crean al colgar",
      ],
      flow: [
        { label: "Lista", text: "Empresas y cargos que encajan, con teléfono y sin quien está en los sistemas de exclusión." },
        { label: "Bloque", text: "Quien llama marca desde el CRM con el guion de su segmento delante." },
        { label: "Registro", text: "Al colgar, el resultado queda en la ficha con un resumen de la conversación." },
        { label: "Siguiente paso", text: "Si hay interés, se agenda la reunión; si no, el CRM programa la siguiente llamada o el correo." },
      ],
      fit: [
        "Vendes B2B con un ticket que justifica una conversación por teléfono.",
        "Tu comprador contesta antes al teléfono que al email o a LinkedIn.",
        "Ya llamáis, pero sin una lista ordenada, sin guion y sin registro de lo que pasa en cada llamada.",
      ],
      notFit: [
        "Quieres llamar a particulares que no te conocen: la ley lo restringe desde 2023 y este servicio es para B2B.",
        "Todavía no sabes a quién vendes ni qué le ofreces: primero eso, después la lista.",
      ],
      steps: [
        { title: "Cliente ideal y lista", desc: "Empresas y cargos que encajan, con teléfono de contacto profesional verificado y cruzados con los sistemas de exclusión publicitaria antes de llamar." },
        { title: "Guion y objeciones", desc: "Una apertura que dice quién llama y para qué, preguntas para cualificar y respuestas a las objeciones habituales de cada segmento." },
        { title: "Marcador y CRM", desc: "El marcador del propio CRM o uno externo conectado, los resultados de llamada configurados y las tareas y reuniones que se crean solas según el resultado." },
        { title: "Bloques y medida", desc: "Llamadas en bloques fijos de tiempo y un panel con llamadas, conversaciones, reuniones y ventas por segmento y por guion." },
      ],
      timeline:
        "Depende del tamaño de la lista y de si hay que montar el CRM o solo conectarlo. Te lo damos por escrito en la consultoría gratuita, antes de empezar.",
      priceNote:
        "Precio cerrado según el alcance, que te damos en la consultoría gratuita. Las líneas, el marcador y las bases de datos de contactos van a nombre de tu empresa y se pagan directamente al proveedor.",
      faqs: [
        {
          q: "¿Es legal hacer llamadas en frío a empresas en España?",
          a: "Sí, con condiciones. Desde el 29 de junio de 2023, el artículo 66.1.b de la Ley 11/2022 General de Telecomunicaciones reconoce el derecho a no recibir llamadas comerciales no deseadas, salvo que haya consentimiento previo u otra base legal del RGPD, que en la práctica es el interés legítimo. La Circular 1/2023 de la AEPD presume lícito llamar a personas que trabajan en una empresa, a autónomos y a profesionales cuando la llamada tiene que ver con su actividad profesional (artículo 19 de la LOPDGDD), pero pide ponderar ese interés legítimo antes de empezar, consultar los sistemas de exclusión publicitaria, como la Lista Robinson (artículo 23 de la LOPDGDD), y al inicio de cada llamada decir quién llama, que es una llamada comercial y que la persona puede oponerse. Si dice que no, no se la vuelve a llamar. Si tu sector es sensible, revísalo con tu asesor legal.",
        },
        {
          q: "¿Puede llamar un agente de IA?",
          a: "Solo en casos concretos. El artículo 66.1.a de la misma ley exige consentimiento previo para las llamadas comerciales automáticas sin intervención humana, así que un agente de voz no hace llamadas comerciales en frío. Lo usamos para llamar a quien lo ha pedido, por ejemplo un lead que deja su teléfono en un formulario, para confirmar citas o para atender las llamadas que entran. Además, desde el 2 de agosto de 2026 el artículo 50 del Reglamento europeo de IA obliga a informar a la persona de que habla con una IA, de forma clara y a más tardar en la primera interacción, así que el agente lo dice al empezar. Lo montamos en Vapi.",
        },
        {
          q: "¿Se graban las llamadas?",
          a: "Se puede, y la Circular 1/2023 de la AEPD cita la grabación como forma de demostrar que la llamada cumple la normativa. Si se graba, se avisa al empezar. Con la grabación, la IA transcribe y resume la llamada en la ficha del contacto.",
        },
        {
          q: "¿De dónde salen los teléfonos?",
          a: "De tus propios contactos y de bases de datos de empresas y herramientas de enriquecimiento como Clay. Se verifican antes de llamar para no perder bloques en números que no existen, y se cruzan con los sistemas de exclusión publicitaria.",
        },
        {
          q: "¿En qué se diferencia de la prospección autónoma?",
          a: "La prospección autónoma escribe por email y LinkedIn sin que nadie intervenga. El cold calling necesita a una persona al teléfono y encaja cuando tu comprador contesta antes una llamada que un mensaje. Se pueden combinar: llamar a las empresas que ya han contestado un correo o aceptado una invitación.",
        },
      ],
    },
    en: {
      seoTitle: "B2B cold calling with every call in your CRM",
      metaDescription:
        "Cold calls to companies with lists checked against Spain's opt-out registers, scripts per segment, a dialler and every call logged in GoHighLevel or HubSpot.",
      answer:
        "B2B cold calling means calling companies that don't know you to open a conversation with the decision-maker. We build it connected to your CRM, GoHighLevel or HubSpot: lists of companies and roles checked against advertising opt-out registers, scripts per segment, call blocks with a dialler and every call logged with its outcome. AI summarises the calls and, only where the law allows it, a voice agent calls and says it is an AI.",
      outcomes: [
        "The caller has the list, the script and the history on one screen",
        "Every call logged in the CRM with its outcome and next step",
        "No interested prospect left without follow-up: the meeting or task is created on hang-up",
      ],
      flow: [
        { label: "List", text: "Companies and roles that fit, with phone numbers and without anyone on the opt-out registers." },
        { label: "Block", text: "The caller dials from the CRM with the script for their segment in front of them." },
        { label: "Log", text: "On hang-up, the outcome is saved on the record with a summary of the conversation." },
        { label: "Next step", text: "If there is interest, the meeting is booked; if not, the CRM schedules the next call or email." },
      ],
      fit: [
        "You sell B2B with a deal size that justifies a phone conversation.",
        "Your buyer picks up the phone sooner than they answer email or LinkedIn.",
        "You already call, but without an ordered list, a script or a record of what happens on each call.",
      ],
      notFit: [
        "You want to call consumers who don't know you: Spanish law restricts it since 2023 and this service is for B2B.",
        "You don't yet know who you sell to or what you offer: that first, the list later.",
      ],
      steps: [
        { title: "Ideal customer and list", desc: "Companies and roles that fit, with verified business contact numbers, checked against the advertising opt-out registers before calling." },
        { title: "Script and objections", desc: "An opening that says who is calling and why, questions to qualify and answers to each segment's usual objections." },
        { title: "Dialler and CRM", desc: "The CRM's own dialler or an external one connected to it, call outcomes set up, and tasks and meetings created automatically from each outcome." },
        { title: "Blocks and measurement", desc: "Calls in fixed time blocks and a dashboard with calls, conversations, meetings and sales by segment and script." },
      ],
      timeline:
        "It depends on the size of the list and whether the CRM has to be built or only connected. We give it to you in writing in the free consultation, before we start.",
      priceNote:
        "A fixed price based on scope, which we give you in the free consultation. Phone lines, the dialler and contact databases are in your company's name and paid directly to the provider.",
      faqs: [
        {
          q: "Is cold calling companies legal in Spain?",
          a: "Yes, with conditions. Since 29 June 2023, article 66.1.b of Spain's General Telecommunications Law (Ley 11/2022) gives people the right not to receive unwanted commercial calls unless there is prior consent or another legal basis under the GDPR, which in practice means legitimate interest. Circular 1/2023 of the Spanish data protection authority (AEPD) presumes it lawful to call people who work at a company, the self-employed and professionals when the call concerns their professional activity (article 19 of the LOPDGDD), but requires weighing that legitimate interest before starting, checking the advertising opt-out registers such as the Lista Robinson (article 23 of the LOPDGDD), and, at the start of every call, saying who is calling, that it is a sales call and that the person can object. If they say no, they are not called again. If your sector is sensitive, check it with your legal adviser.",
        },
        {
          q: "Can an AI agent make the calls?",
          a: "Only in specific cases. Article 66.1.a of the same law requires prior consent for automated commercial calls without human intervention, so a voice agent does not make cold sales calls. We use it to call people who asked for it, such as a lead who leaves their number on a form, to confirm appointments or to answer incoming calls. In addition, from 2 August 2026 article 50 of the EU AI Act requires telling people they are talking to an AI, clearly and at the latest at the first interaction, so the agent says so at the start. We build it on Vapi.",
        },
        {
          q: "Are calls recorded?",
          a: "They can be, and the AEPD's Circular 1/2023 cites recording as a way to show the call complies with the rules. If a call is recorded, the person is told at the start. With the recording, AI transcribes and summarises the call on the contact's record.",
        },
        {
          q: "Where do the phone numbers come from?",
          a: "From your own contacts and from company databases and enrichment tools such as Clay. They are verified before calling so blocks are not wasted on numbers that don't exist, and checked against the advertising opt-out registers.",
        },
        {
          q: "How is it different from autonomous prospecting?",
          a: "Autonomous prospecting writes by email and LinkedIn with no one involved. Cold calling needs a person on the phone and fits when your buyer picks up a call sooner than they answer a message. They can be combined: calling the companies that have already replied to an email or accepted an invitation.",
        },
      ],
    },
  },

  "agente-ia-whatsapp": {
    cases: ["Hospital Capilar"],
    maintenance: true,
    posts: [
      "whatsapp-automatizacion-ventas",
      "automatizar-recepcion-clinica",
      "agentes-de-ia-para-empresas-cuando-compensan",
      "agentes-de-ia-vps-propio-o-nube",
      "proyectos-de-ia-a-medida-ejemplos-plazos-precio",
      "cobrar-la-ia-por-resultado",
      "ai-act-chatbot-decir-que-es-ia",
      "agente-de-voz-whatsapp-agenda-citas",
      "vapi-vs-retell",
      "cross-selling-por-whatsapp",
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
    maintenance: true,
    posts: [
      "integrar-gohighlevel-con-tu-stack",
      "automatizacion-para-clinicas-captacion-y-agenda",
      "que-es-gohighlevel",
      "gohighlevel-vs-hubspot",
      "gohighlevel-levelup-day-2026-agentes-ia",
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
          a: "Un sistema que, en vez de esperar a que un comercial llame, ofrece al lead cualificado los huecos libres y agenda la cita directamente en tu calendario o en tu software de citas. En Hospital Capilar, un proyecto con Growth4U, agenda en Koibox.",
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
          a: "A system that, instead of waiting for a salesperson to call, offers the qualified lead the free slots and books the appointment straight into your calendar or booking software. At Hospital Capilar, a project with Growth4U, it books into Koibox.",
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
    posts: ["propuestas-comerciales-automaticas", "propuestas-licitaciones-con-ia"],
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

  // ── IA selectiva (25-nov-2026) ──────────────────────────────────────────
  // Para empresas que ya tienen agentes o flujos con IA en marcha: medir el
  // coste de cada tarea, pasar a reglas lo que siempre se resuelve igual y
  // dejar el modelo solo donde aporta. Incluye el antiguo complementario
  // "Control del coste de la IA". Cifras: solo las de la prueba del vídeo (n8n
  // con un modelo local pequeño y un pedido inventado: 13 veces menos tokens,
  // 19 veces más rápido) y el caso de Eventos Barcelona tal como lo cuenta el
  // artículo reducir-gasto-tokens-ia-selectiva. Plazos y forma de precio,
  // pendientes de validar por Ramiro (docs/PENDIENTES-SEO.md).

  "ia-selectiva": {
    cases: ["Eventos Barcelona", "Tribeca Media"],
    maintenance: true,
    posts: [
      "reducir-gasto-tokens-ia-selectiva",
      "coste-agente-de-ia-en-produccion",
      "revisar-sistema-de-agentes-ia-antes-de-escalar",
      "agentes-de-ia-para-empresas-cuando-compensan",
      "medir-un-proceso-antes-de-automatizarlo",
      "cobrar-la-ia-por-resultado",
    ],
    es: {
      seoTitle: "IA selectiva: menos coste y errores en tus agentes de IA",
      metaDescription:
        "Medimos cuánto cuesta cada tarea de tus agentes de IA y pasamos a reglas lo que siempre se resuelve igual. Menos tokens, respuestas más rápidas y menos errores.",
      answer:
        "La IA selectiva consiste en que tus agentes y flujos funcionen casi siempre con reglas, código o n8n, y llamen al modelo de IA solo donde hay que entender texto libre o decidir con criterio. Revisamos lo que ya tienes en marcha, medimos cuánto cuesta cada tarea en tokens, tiempo y errores, y pasamos a lógica fija lo que se resuelve siempre igual.",
      outcomes: [
        "Menos tokens por tarea, con el mismo modelo",
        "Respuestas en segundos y siempre con las mismas reglas",
        "El coste de cada tarea de IA, medido y con tope",
      ],
      flow: [
        { label: "Llega", text: "Un pedido por correo: «40 cajas del modelo B, que no lleguen antes del día 15»." },
        { label: "Reglas", text: "El flujo identifica al cliente, comprueba el stock y calcula el precio. Siempre se resuelve igual, así que no pasa por el modelo." },
        { label: "La IA, solo aquí", text: "Un modelo lee la frase libre y devuelve un dato con formato fijo: entrega a partir del día 15." },
        { label: "Hecho", text: "El flujo registra el pedido y contesta con la fecha correcta. Una llamada al modelo en lugar de seis." },
      ],
      fit: [
        "Ya tienes agentes o flujos con IA en marcha, en atención al cliente, correos, pedidos o documentos, y se ejecutan cientos de veces a la semana.",
        "La factura de IA sube cada mes y nadie sabe qué tarea la paga, o el agente se equivoca de vez en cuando y no está claro por qué.",
        "Vas a montar un sistema nuevo con IA y quieres que salga barato de mantener desde el primer día.",
      ],
      notFit: [
        "La IA se usa unas pocas veces al mes: el ahorro no paga el trabajo y lo mejor es dejarla como está.",
        "La tarea es abierta y distinta cada vez, como investigar, programar o analizar: ahí un agente es la herramienta correcta y lo que toca es medirlo y ponerle tope, no quitarle la IA.",
      ],
      steps: [
        { title: "Registrar y medir", desc: "Durante una o dos semanas registramos cada llamada al modelo con su tarea, sus tokens, su tiempo y su resultado. Así sale el coste real de cada tarea completa, que la factura del mes no enseña." },
        { title: "Separar", desc: "Dibujamos el flujo paso a paso y en cada uno hacemos la misma pregunta: ante la misma entrada, ¿la respuesta correcta es siempre la misma? Si lo es, ese paso no necesita un modelo." },
        { title: "Rediseñar", desc: "Lo fijo pasa a n8n, Make, tu CRM o código. Donde se queda el modelo elegimos el más pequeño que acierte, le mandamos solo el contexto que necesita y le pedimos un dato, no que ejecute la acción." },
        { title: "Comparar y vigilar", desc: "Medimos lo mismo que al principio: coste por tarea, tiempo, errores y casos que pasan a una persona. Y dejamos avisos y un tope de gasto por si algo se dispara." },
      ],
      timeline:
        "La medición y el mapa del flujo están en 1 a 2 semanas. El rediseño de un flujo lleva de 2 a 4 semanas más, según cuántos pasos cambien y si hay que tocar el CRM.",
      caseFocus: {
        "Eventos Barcelona":
          "Ocho pasos entre el correo que entra y el seguimiento de la propuesta, y la IA decide solo en dos: qué tipo de contacto escribe y si habla de un proyecto nuevo. Esos dos los resuelve un modelo abierto en un servidor propio, sin coste por uso. La propuesta con su marca, el paso más vistoso, es una plantilla.",
        "Tribeca Media":
          "El coste de cada llamada a la IA se registra por cliente y tiene un tope diario, y el modelo se elige por su coste por respuesta correcta, no por el precio por token.",
      },
      uses: [
        {
          title: "Atención al cliente",
          desc: "Horarios, precios, estado del pedido y citas, con botones y reglas. El modelo entiende las preguntas que no encajan y resume el caso cuando pasa a una persona.",
        },
        {
          title: "Correos y pedidos",
          desc: "Remitente, formato y alta en el CRM, con reglas. El modelo lee el texto libre: qué piden, para cuándo y si corre prisa.",
        },
        {
          title: "Propuestas y documentos",
          desc: "Plantilla con tu marca y los datos del CRM. El modelo redacta solo la parte que cambia de un cliente a otro, si la hay.",
        },
        {
          title: "Flujos de n8n, Make o Zapier",
          desc: "Muchos nodos de IA hacen lo que haría un filtro o un «Si». Los cambiamos y dejamos el modelo en los nodos donde aporta.",
        },
        {
          title: "Asistentes internos",
          desc: "Respuestas guardadas para las preguntas que se repiten y solo los documentos que hacen falta en cada consulta, en vez de mandar toda la base cada vez.",
        },
        {
          title: "Agentes con herramientas",
          desc: "Un agente que encadena diez pasos se queda con los que necesitan criterio; el resto lo hace un flujo fijo, y cuando algo falla se ve en qué paso.",
        },
      ],
      faqs: [
        {
          q: "¿Qué es la IA selectiva?",
          a: "Es diseñar los sistemas para que funcionen casi siempre con reglas, código o flujos, y llamen al modelo de IA solo en los pasos que necesitan entender lenguaje libre o decidir algo ambiguo. La IA se usa para construir el sistema y para esos pasos concretos, no para ejecutar cada paso.",
        },
        {
          q: "¿Cuánto se ahorra?",
          a: "Depende de cuántas veces se ejecute el proceso y de cuántos pasos pasen hoy por el modelo. En una prueba con el mismo pedido en n8n y el mismo modelo, la versión con IA selectiva gastó 13 veces menos tokens y contestó 19 veces más rápido que la que razonaba cada paso. Con poco volumen el ahorro en euros es pequeño y lo que más se nota es que el sistema deja de equivocarse; por eso medimos antes de prometer una cifra.",
        },
        {
          q: "¿Sirve para un agente que montó otro proveedor?",
          a: "Sí. Revisamos el sistema tal como está, en n8n, Make, Zapier, GoHighLevel o código, y te damos el mapa con lo que cambiaríamos y por qué. El rediseño lo podemos hacer nosotros o tu proveedor.",
        },
        {
          q: "¿Usar menos la IA no empeora el resultado?",
          a: "En los pasos que siempre se resuelven igual pasa lo contrario: una regla da siempre la misma respuesta correcta y un modelo no. Donde hace falta entender lenguaje, el modelo se queda. Antes y después comparamos el coste por tarea y la tasa de error, no el número de llamadas.",
        },
        {
          q: "¿Hay que cambiar de modelo o de proveedor?",
          a: "No hace falta. La mayor parte del ahorro sale de llamadas que desaparecen, y eso no lo iguala ningún modelo barato. Si en algún paso un modelo más pequeño acierta igual, lo proponemos comparando el coste por respuesta correcta, no el precio por token.",
        },
        {
          q: "¿Cuánto cuesta?",
          a: "La medición y el mapa del flujo se hacen como un discovery, desde 1.500 €. El rediseño es una implantación y su precio depende de cuántos flujos y pasos cambien. El precio exacto se confirma tras la consultoría gratuita, no antes.",
        },
      ],
    },
    en: {
      seoTitle: "Selective AI: lower cost and fewer errors in your AI agents",
      metaDescription:
        "We measure what each task of your AI agents costs and move to rules whatever is always solved the same way. Fewer tokens, faster answers and fewer errors.",
      answer:
        "Selective AI means your agents and workflows run almost entirely on rules, code or n8n, and call the AI model only where free text has to be understood or a judgement call made. We review what you already have running, measure what each task costs in tokens, time and errors, and move to fixed logic whatever is always solved the same way.",
      outcomes: [
        "Fewer tokens per task, with the same model",
        "Answers in seconds, always following the same rules",
        "The cost of each AI task, measured and capped",
      ],
      flow: [
        { label: "It arrives", text: "An order by email: “40 boxes of model B, not to arrive before the 15th”." },
        { label: "Rules", text: "The workflow identifies the customer, checks stock and works out the price. It is always solved the same way, so it never reaches the model." },
        { label: "AI, only here", text: "A model reads the free-text sentence and returns one piece of data in a fixed format: delivery from the 15th." },
        { label: "Done", text: "The workflow logs the order and replies with the right date. One call to the model instead of six." },
      ],
      fit: [
        "You already have AI agents or workflows running, in customer service, email, orders or documents, and they run hundreds of times a week.",
        "The AI bill goes up every month and nobody knows which task is paying for it, or the agent gets things wrong now and then and it is not clear why.",
        "You are about to build a new AI system and want it to be cheap to run from day one.",
      ],
      notFit: [
        "AI is used a few times a month: the savings do not pay for the work and it is best left as it is.",
        "The task is open-ended and different every time, like research, coding or analysis: there an agent is the right tool, and what it needs is measuring and a cap, not less AI.",
      ],
      steps: [
        { title: "Log and measure", desc: "For one or two weeks we log every call to the model with its task, tokens, time and result. That gives the real cost of each complete task, which the monthly bill does not show." },
        { title: "Separate", desc: "We draw the workflow step by step and ask the same question at each one: given the same input, is the right answer always the same? If so, that step does not need a model." },
        { title: "Redesign", desc: "Fixed logic moves to n8n, Make, your CRM or code. Where the model stays, we pick the smallest one that gets it right, send it only the context it needs and ask it for a piece of data, not to carry out the action." },
        { title: "Compare and watch", desc: "We measure the same things as at the start: cost per task, time, errors and cases handed to a person. And we leave alerts and a spending cap in case something spikes." },
      ],
      timeline:
        "Measuring and mapping the workflow takes 1 to 2 weeks. Redesigning a workflow takes another 2 to 4 weeks, depending on how many steps change and whether the CRM has to be touched.",
      caseFocus: {
        "Eventos Barcelona":
          "Eight steps between the incoming email and the proposal follow-up, and AI decides in only two: what kind of contact is writing and whether it is about a new project. Those two run on an open model on its own server, with no per-use cost. The branded proposal, the flashiest step, is a template.",
        "Tribeca Media":
          "The cost of every AI call is logged per client and has a daily cap, and the model is chosen by its cost per correct answer, not by price per token.",
      },
      uses: [
        {
          title: "Customer service",
          desc: "Opening hours, prices, order status and bookings, with buttons and rules. The model understands the questions that do not fit and summarises the case when it goes to a person.",
        },
        {
          title: "Email and orders",
          desc: "Sender, format and CRM entry, with rules. The model reads the free text: what they want, by when and whether it is urgent.",
        },
        {
          title: "Proposals and documents",
          desc: "A template with your brand and CRM data. The model only writes the part that changes from one client to the next, if there is one.",
        },
        {
          title: "n8n, Make or Zapier workflows",
          desc: "Many AI nodes do what a filter or an “If” node would do. We swap them and keep the model in the nodes where it adds value.",
        },
        {
          title: "Internal assistants",
          desc: "Saved answers for repeated questions and only the documents each query needs, instead of sending the whole knowledge base every time.",
        },
        {
          title: "Agents with tools",
          desc: "An agent that chains ten steps keeps the ones that need judgement; a fixed workflow does the rest, and when something fails you can see which step.",
        },
      ],
      faqs: [
        {
          q: "What is selective AI?",
          a: "It means designing systems so they run almost entirely on rules, code or workflows, and call the AI model only in the steps that need to understand free text or decide something ambiguous. AI is used to build the system and for those specific steps, not to execute every step.",
        },
        {
          q: "How much does it save?",
          a: "It depends on how often the process runs and how many steps go through the model today. In a test with the same order in n8n and the same model, the selective AI version used 13 times fewer tokens and answered 19 times faster than the one that reasoned through every step. With low volume the saving in euros is small and what you notice most is that the system stops getting things wrong; that is why we measure before promising a figure.",
        },
        {
          q: "Does it work for an agent another vendor built?",
          a: "Yes. We review the system as it is, in n8n, Make, Zapier, GoHighLevel or code, and give you the map of what we would change and why. The redesign can be done by us or by your vendor.",
        },
        {
          q: "Doesn't using AI less make the result worse?",
          a: "In steps that are always solved the same way, the opposite happens: a rule always gives the same right answer and a model does not. Where language has to be understood, the model stays. Before and after we compare cost per task and error rate, not the number of calls.",
        },
        {
          q: "Do we need to change model or provider?",
          a: "No. Most of the saving comes from calls that disappear, and no cheap model can match that. If a smaller model gets a step just as right, we suggest it by comparing cost per correct answer, not price per token.",
        },
        {
          q: "How much does it cost?",
          a: "Measuring and mapping the workflow is done as a discovery, starting at €1,500. The redesign is an implementation and its price depends on how many workflows and steps change. The exact price is confirmed after the free consultation, not before.",
        },
      ],
    },
  },

  // ── Control con cámaras e IA (24-nov-2026) ──────────────────────────────
  // Análisis de vídeo de las cámaras que ya tiene el cliente: tiempos, colas y
  // ocupación por zona, con avisos. Sin reconocimiento facial ni control
  // individual. Landings por sector en nichos.ts (/l/camaras-ia-<sector>).

  "control-con-camaras-ia": {
    price: "quote",
    posts: ["camaras-con-ia-para-controlar-tu-negocio", "camaras-con-ia-en-supermercados", "rgpd-y-automatizacion-con-ia", "medir-un-proceso-antes-de-automatizarlo"],
    es: {
      seoTitle: "Control con cámaras e IA: mesas, plazas y colas",
      metaDescription:
        "Conectamos tus cámaras a una IA que mide mesas sin atender, plazas libres, colas y muelles ocupados, y avisa al encargado. Sin reconocimiento facial.",
      answer:
        "Controlar con cámaras e IA es usar las cámaras que ya tienes para medir lo que pasa en tu negocio sin que nadie lo apunte: cuánto espera una mesa a que la atiendan, cuánto tarda en recogerse, cuántas plazas quedan libres o cuánta gente hay en la cola. Un modelo de visión analiza el vídeo, guarda tiempos y recuentos por zona y avisa al encargado cuando algo se pasa del límite. No identifica a nadie.",
      outcomes: [
        "Avisos al momento cuando algo se pasa de tiempo, no al revisar la grabación",
        "Esperas, colas y ocupación medidas cada día, por zona y por franja",
        "Las cámaras que ya pagas, trabajando también para la operación",
      ],
      flow: [
        { label: "La cámara ve", text: "A las 21:10 se sienta una pareja en la mesa 12 y nadie se acerca." },
        { label: "La IA mide", text: "Cuenta el tiempo desde que se sientan hasta que llega alguien del equipo." },
        { label: "Avisa", text: "A los 5 minutos, el encargado recibe en el móvil: «Mesa 12, terraza: sin atender»." },
        { label: "Queda medido", text: "Cada espera se guarda por mesa, zona y franja, para ver dónde se atasca el servicio." },
      ],
      fit: [
        "Tienes cámaras IP o un grabador al que se puede conectar, y ven bien lo que importa: mesas, plazas, cajas o muelles.",
        "Lo que quieres controlar se ve: si una persona lo sabría mirando la pantalla, la IA lo puede medir.",
        "Hoy lo controla alguien a ojo, o nadie, y un descuido cuesta dinero: una mesa que se va, una plaza mal usada, una cola que abandona.",
      ],
      notFit: [
        "Quieres saber quién es cada persona o vigilar a un empleado concreto: no hacemos reconocimiento facial ni control individual.",
        "Las cámaras no cubren la zona o graban casi a oscuras: antes hay que mover o añadir una cámara, y te lo decimos en la prueba.",
      ],
      steps: [
        { title: "Prueba con tus grabaciones", desc: "Nos pasas unas horas de vídeo de tus cámaras y comprobamos qué se puede medir con fiabilidad y qué cámara no llega. Es la primera fase, con su propio precio cerrado." },
        { title: "Zonas y reglas", desc: "Marcamos sobre la imagen cada mesa, plaza, caja o muelle y fijamos los límites: a partir de cuántos minutos se avisa y a quién." },
        { title: "Instalación", desc: "En tus propios sistemas, sin comprar equipos: un ordenador o servidor que ya tengas en el local, o la nube de tu empresa. Lee las cámaras y lo que sale son tiempos, recuentos y avisos." },
        { title: "Avisos y panel", desc: "Avisos por WhatsApp, Telegram o una pantalla, y un panel con las esperas y la ocupación. Ajustamos los límites con las primeras semanas de uso." },
      ],
      timeline:
        "Entre 3 y 6 semanas desde la consultoría gratuita: la primera para la prueba con tus grabaciones y el resto para instalar y ajustar los avisos, según cuántas cámaras y zonas haya.",
      priceNote:
        "Primero, la prueba con tus grabaciones: va aparte de la consultoría gratuita y tiene un precio cerrado, que te damos en ella. Después, la instalación y una cuota mensual por el análisis, los avisos y el mantenimiento, según cuántas cámaras y zonas se analicen; se cierran tras la prueba. No hay que comprar equipos: funciona con tus cámaras y en tus sistemas.",
      uses: [
        {
          title: "Restaurantes",
          desc: "Cuánto espera cada mesa a que la atiendan, cuánto tarda en recogerse y cuánto dura cada comida, por mesa y por franja.",
          href: "/l/camaras-ia-restaurantes",
        },
        {
          title: "Parkings",
          desc: "Plazas libres en tiempo real, vehículos que se pasan de tiempo, plazas reservadas mal usadas y colas en la barrera.",
          href: "/l/camaras-ia-parkings",
        },
        {
          title: "Supermercados",
          desc: "Coches que entran al parking por hora, cuánto dura la compra, aviso para abrir caja antes de la cola y limpieza según el uso.",
          href: "/l/camaras-ia-supermercados",
        },
        {
          title: "Tiendas",
          desc: "Colas en caja y mostrador, visitantes por hora, aforo y cuántos de los que entran acaban comprando.",
          href: "/l/camaras-ia-tiendas",
        },
        {
          title: "Almacenes y logística",
          desc: "Tiempo de cada camión en el muelle, pasillos y salidas de emergencia bloqueados y chaleco o casco donde son obligatorios.",
          href: "/l/camaras-ia-almacenes",
        },
        {
          title: "Talleres mecánicos",
          desc: "Ocupación de cada elevador, horas reales de cada coche frente a las previstas y clientes esperando en recepción.",
          href: "/l/camaras-ia-talleres",
        },
        {
          title: "Limpieza",
          desc: "Usos por zona contados desde fuera, derrames y papeleras llenas avisados al momento y limpieza según el uso, no a horario fijo.",
          href: "/l/camaras-ia-limpieza",
        },
        {
          title: "Y también",
          desc: "Gimnasios (aforo por sala), hoteles (recepción y bufé), gasolineras y túneles de lavado (colas) y centros comerciales (afluencia por zona).",
        },
      ],
      faqs: [
        {
          q: "¿Sirven las cámaras que ya tengo?",
          a: "Casi siempre. Trabajamos con cámaras IP y grabadores que dan la imagen por RTSP u ONVIF, lo habitual en Hikvision, Dahua, Axis, Uniview y la mayoría de marcas. Lo que importa es el ángulo y la luz: en la prueba con tus grabaciones te decimos qué cámaras valen y dónde haría falta otra. Y no hay que comprar ningún equipo: el análisis se instala en tus sistemas.",
        },
        {
          q: "¿Reconoce caras o identifica a las personas?",
          a: "No. El sistema detecta personas, vehículos y objetos como formas, sin saber quién es quién, y no guarda caras ni perfiles. Lo que se registra son tiempos, recuentos y ocupación por zona. Tampoco detecta emociones: en el trabajo está prohibido por la ley europea de IA.",
        },
        {
          q: "¿Se puede analizar con IA el vídeo de las cámaras?",
          a: "Sí, con condiciones. Las cámaras tienen que tener ya sus carteles y una finalidad declarada; si el análisis sirve también para medir la operación, hay que informar antes a la plantilla (art. 89 de la LOPDGDD) y, según el caso, hacer una evaluación de impacto. Te damos los textos y la descripción técnica para que los revise tu asesor de protección de datos.",
        },
        {
          q: "¿El vídeo sale de mi local?",
          a: "No tiene por qué. El análisis se instala en un ordenador o servidor que ya tengas en el local y lo único que sale son tiempos, recuentos y avisos. Si prefieres la nube, se hace en una cuenta a nombre de tu empresa y se deja por escrito dónde se procesa, cuánto se guarda y quién puede verlo.",
        },
        {
          q: "¿Cuánto cuesta?",
          a: "Primero, la prueba con tus grabaciones, con un precio cerrado y aparte de la consultoría gratuita. Después, la instalación y una cuota mensual por el análisis, los avisos y el mantenimiento, que dependen de cuántas cámaras y zonas se analicen y se cierran tras la prueba. No hay que comprar equipos.",
        },
      ],
    },
    en: {
      seoTitle: "AI camera monitoring: tables, parking and queues",
      metaDescription:
        "We connect your cameras to an AI that measures unattended tables, free parking spaces, queues and busy loading docks, and alerts the manager. No facial recognition.",
      answer:
        "Camera monitoring with AI means using the cameras you already have to measure what happens in your business without anyone writing it down: how long a table waits to be served, how long it takes to clear, how many parking spaces are free or how many people are queuing. A vision model analyses the video, stores times and counts by zone and alerts the manager when something goes over the limit. It does not identify anyone.",
      outcomes: [
        "Alerts the moment something runs over time, not when someone reviews the footage",
        "Waits, queues and occupancy measured every day, by zone and time slot",
        "The cameras you already pay for, also working for your operations",
      ],
      flow: [
        { label: "The camera sees", text: "At 21:10 a couple sits down at table 12 and nobody comes over." },
        { label: "The AI measures", text: "It counts the time from when they sit down until someone from the team arrives." },
        { label: "It alerts", text: "After 5 minutes, the manager gets a message: “Table 12, terrace: not attended”." },
        { label: "It is recorded", text: "Every wait is stored by table, zone and time slot, to see where service gets stuck." },
      ],
      fit: [
        "You have IP cameras or a recorder that can be connected, and they clearly see what matters: tables, spaces, tills or docks.",
        "What you want to monitor is visible: if a person could tell by looking at the screen, the AI can measure it.",
        "Today someone keeps an eye on it, or nobody does, and a slip costs money: a table that leaves, a misused space, a queue that walks out.",
      ],
      notFit: [
        "You want to know who each person is or watch a specific employee: we do not do facial recognition or individual monitoring.",
        "The cameras do not cover the area or record almost in the dark: a camera has to be moved or added first, and we tell you in the trial.",
      ],
      steps: [
        { title: "Trial with your footage", desc: "You send us a few hours of video from your cameras and we check what can be measured reliably and which camera falls short. It is the first phase, with its own fixed price." },
        { title: "Zones and rules", desc: "We mark each table, space, till or dock on the image and set the limits: after how many minutes an alert goes out, and to whom." },
        { title: "Installation", desc: "On your own systems, with nothing to buy: a computer or server you already have on site, or your company's cloud. It reads the cameras, and what comes out is times, counts and alerts." },
        { title: "Alerts and dashboard", desc: "Alerts via WhatsApp, Telegram or a screen, and a dashboard with waits and occupancy. We fine-tune the limits during the first weeks of use." },
      ],
      timeline:
        "3 to 6 weeks from the free consultation: the first for the trial with your footage and the rest to install and tune the alerts, depending on the number of cameras and zones.",
      priceNote:
        "First, the trial with your footage: it is separate from the free consultation and has a fixed price, which we give you there. Then a setup fee and a monthly fee for analysis, alerts and maintenance, depending on how many cameras and zones are analysed; both are fixed after the trial. There is no equipment to buy: it works with your cameras and on your systems.",
      uses: [
        { title: "Restaurants", desc: "How long each table waits to be served, how long it takes to clear and how long each meal lasts, by table and time slot." },
        { title: "Car parks", desc: "Free spaces in real time, vehicles that overstay, misused reserved spaces and queues at the barrier." },
        { title: "Supermarkets", desc: "Cars entering the car park per hour, how long the shop takes, an alert to open a till before the queue forms and cleaning based on use." },
        { title: "Shops", desc: "Queues at tills and counters, visitors per hour, capacity and how many of those who come in end up buying." },
        { title: "Warehouses and logistics", desc: "Time each lorry spends at the dock, blocked aisles and emergency exits, and hi-vis vests or helmets where they are required." },
        { title: "Car repair shops", desc: "Occupancy of each lift, actual hours per car against the estimate and customers waiting at reception." },
        { title: "Cleaning", desc: "Use per zone counted from outside, spills and full bins flagged at once, and cleaning based on use, not a fixed schedule." },
        { title: "And also", desc: "Gyms (capacity per room), hotels (reception and buffet), petrol stations and car washes (queues) and shopping centres (footfall by zone)." },
      ],
      faqs: [
        {
          q: "Do my existing cameras work?",
          a: "Almost always. We work with IP cameras and recorders that stream over RTSP or ONVIF, which is standard for Hikvision, Dahua, Axis, Uniview and most brands. What matters is the angle and the light: in the trial with your footage we tell you which cameras work and where another one would be needed. And there is no equipment to buy: the analysis is installed on your systems.",
        },
        {
          q: "Does it recognise faces or identify people?",
          a: "No. The system detects people, vehicles and objects as shapes, without knowing who is who, and stores no faces or profiles. What is recorded is times, counts and occupancy by zone. Nor does it detect emotions: in the workplace that is banned by the EU AI Act.",
        },
        {
          q: "Is it legal to analyse camera footage with AI?",
          a: "Yes, under conditions. The cameras must already have their signs and a declared purpose; if the analysis is also used to measure operations, staff must be informed beforehand (in Spain, article 89 of the LOPDGDD) and, depending on the case, an impact assessment carried out. We give you the texts and the technical description for your data protection adviser to review.",
        },
        {
          q: "Does the video leave my premises?",
          a: "It does not have to. The analysis is installed on a computer or server you already have on site, and only times, counts and alerts leave it. If you prefer the cloud, it runs on an account in your company's name and we agree in writing where it is processed, how long it is kept and who can see it.",
        },
        {
          q: "How much does it cost?",
          a: "First, the trial with your footage, at a fixed price and separate from the free consultation. Then a setup fee and a monthly fee for analysis, alerts and maintenance, which depend on how many cameras and zones are analysed and are fixed after the trial. There is no equipment to buy.",
        },
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
        "Talleres prácticos de IA para dirección, ventas, atención y administración, con tus procesos y documentos. Presenciales o en remoto, bonificables por FUNDAE.",
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
      priceNote: "Depende del número de sesiones y de personas, y se puede bonificar con el crédito de formación de FUNDAE (lo explicamos en las preguntas frecuentes). Te lo damos en la consultoría gratuita.",
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
          q: "¿Se puede bonificar con FUNDAE?",
          a: "Sí, si tu empresa cotiza por formación profesional y está al corriente con Hacienda y la Seguridad Social, porque un taller de IA aplicada a vuestro trabajo guarda relación con la actividad de la empresa. El coste se descuenta de las cotizaciones a la Seguridad Social con el crédito de formación del año: las empresas de 1 a 5 personas tienen garantizados 420 €, y las de más de 5 tienen un porcentaje de lo que cotizaron por formación profesional el año anterior y ponen una parte (la cofinanciación). La gestión la hace tu empresa en la aplicación de FUNDAE o una entidad organizadora, como tu gestoría: se comunica el inicio de cada grupo hasta dos días antes de empezar y la finalización al terminar, y la bonificación se aplica después. Nosotros impartimos el taller y te damos el programa, las horas, el control de asistencia y la factura. Una charla o una jornada suelta no es bonificable; un taller con programa, sí.",
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
        "Hands-on AI workshops for management, sales, service and admin, on your own processes and documents. On site or remote, FUNDAE-eligible in Spain.",
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
      priceNote: "It depends on the number of sessions and people, and in Spain it can be funded with your FUNDAE training credit (see the FAQ). We give it to you in the free consultation.",
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
          q: "Can it be funded through FUNDAE?",
          a: "Yes, for Spanish companies that pay the vocational training contribution and are up to date with tax and Social Security, since a workshop on AI applied to your work relates to the company's activity. The cost is deducted from Social Security contributions using the year's training credit: companies with 1 to 5 people are guaranteed €420, and larger ones get a percentage of what they paid in training contributions the year before and cover part of the cost themselves (co-financing). Your company handles it in the FUNDAE application, or an organising entity such as your accountancy firm does: the start of each group is notified up to two days before it begins and the end once it finishes, and the credit is applied afterwards. We run the workshop and give you the programme, hours, attendance record and invoice. A one-off talk or event is not eligible; a workshop with a programme is.",
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
      "proyectos-de-ia-a-medida-ejemplos-plazos-precio",
      "revisar-sistema-de-agentes-ia-antes-de-escalar",
      "coste-agente-de-ia-en-produccion",
      "agencia-automatizacion-vs-freelance-vs-equipo-interno",
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
  return { ...s[lang], cases: s.cases ?? [], price: s.price ?? "tiers", maintenance: s.maintenance ?? false, posts: s.posts };
}
