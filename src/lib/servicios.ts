import type { Lang } from "@/lib/i18n";

// Contenido de las paginas de cada servicio (/servicios/<slug>).
//
// El titulo, el problema, el "para quien" y los entregables viven en
// content.ts y los comparte el listado de /servicios. Aqui va lo que solo
// tiene la pagina propia: la respuesta directa (lo primero que lee un buscador
// o un asistente de IA), cuando encaja y cuando no, el metodo, el plazo, las
// preguntas frecuentes, el caso y los articulos relacionados.
//
// Regla: nada de cifras ni clientes que no esten ya publicados en la web o en
// el blog. Precios y plazos salen de pricing y faq de content.ts; los criterios,
// de los articulos enlazados.

export type CaseClient = "Hospital Capilar" | "Eventos Barcelona" | "Growth4U";

type Step = { title: string; desc: string };
type Faq = { q: string; a: string };

export type ServicioDetalle = {
  /** Title para la SERP, sin la marca (la añade pageMetadata). */
  seoTitle: string;
  metaDescription: string;
  /** Respuesta directa de 40-70 palabras: que es y como lo hacemos. */
  answer: string;
  fit: string[];
  notFit: string[];
  steps: Step[];
  timeline: string;
  faqs: Faq[];
};

type Servicio = {
  caseClient?: CaseClient;
  /** Slugs de articulos del blog (solo existen en castellano). */
  posts: string[];
  es: ServicioDetalle;
  en: ServicioDetalle;
};

const PRECIO_ES =
  "Depende del alcance: el discovery arranca en 1.500 €, la implementación completa va de 5.000 € a 25.000 € y hay un retainer mensual opcional de mantenimiento. El precio exacto se confirma tras la auditoría gratuita, no antes.";
const PRECIO_EN =
  "It depends on scope: discovery starts at €1,500, a full build runs from €5,000 to €25,000, and there is an optional monthly maintenance retainer. The exact price is confirmed after the free audit, not before.";

export const SERVICIOS: Record<string, Servicio> = {
  "automatizacion-procesos-ia": {
    caseClient: "Eventos Barcelona",
    posts: [
      "automatizar-procesos-con-ia-por-donde-empezar",
      "cuanto-cuesta-automatizar-un-proceso-con-ia",
      "rgpd-y-automatizacion-con-ia",
    ],
    es: {
      seoTitle: "Automatización de procesos con IA para empresas",
      metaDescription:
        "Automatizamos con IA y reglas los procesos que se repiten cada semana, del primer contacto al cierre. Qué automatizar primero, en qué orden, plazo y precio.",
      answer:
        "Automatizar procesos con IA es conseguir que las tareas repetitivas —copiar datos, contestar lo mismo, perseguir pendientes— se hagan solas sobre tu CRM. Empezamos por el proceso que más dinero pierde, casi siempre el que va del primer contacto a la venta, y usamos IA solo donde hace falta criterio. El resto son reglas, más baratas y predecibles.",
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
        "AI process automation means the repetitive work —copying data, answering the same questions, chasing follow-ups— runs on its own on top of your CRM. We start with the process that loses the most money, almost always the one between first contact and the sale, and use AI only where judgement is needed. The rest is rules, which are cheaper and predictable.",
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
    caseClient: "Hospital Capilar",
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

  "desarrollo-ia-a-medida": {
    posts: ["desarrollo-a-medida-con-ia-cuando-construir"],
    es: {
      seoTitle: "Desarrollo de software a medida con IA",
      metaDescription:
        "Portales, generadores, paneles internos y MVPs construidos con IA y conectados a tu CRM. Cuándo compensa construir, qué hay que asumir y el código es tuyo.",
      answer:
        "Desarrollo a medida con IA es construir la pieza que ninguna herramienta estándar hace —un portal para clientes, un generador, un panel interno o un producto nuevo— y conectarla a tu CRM y a tus datos. Solo lo recomendamos cuando esa pieza te diferencia de tu competencia: lo genérico se compra. El código y la infraestructura son tuyos.",
      fit: [
        "El proceso es tu ventaja y meterlo en una herramienta genérica te obliga a trabajar como los demás.",
        "Ninguna herramienta cubre el hueco. No que lo haga imperfecto: que no lo haga.",
        "Necesitas dar acceso a clientes o proveedores con un portal propio.",
        "El coste por usuario o por contacto de tus herramientas ya duele.",
      ],
      notFit: [
        "Es para ahorrarte una suscripción de unas decenas de euros al mes.",
        "El proceso aún no está claro o hay que resolverlo este mes: primero se estabiliza con herramientas estándar y automatizaciones.",
      ],
      steps: [
        { title: "Diseño funcional", desc: "Qué tiene que hacer, para quién, y cuál es lo mínimo que resuelve el caso principal." },
        { title: "Arquitectura", desc: "Una herramienta estándar como base y una pieza a medida solo para lo que de verdad es tuyo. Construir menos es construir mejor." },
        { title: "Desarrollo y conexión", desc: "La aplicación con IA integrada, conectada a tu CRM y con la forma de exportar todos los datos desde el primer día." },
        { title: "Despliegue", desc: "En producción, documentado y con el código en tu repositorio. Después se amplía con lo que pidan los usuarios reales." },
      ],
      timeline: "Entre 4 y 8 semanas para una primera versión en producción, según el alcance.",
      faqs: [
        {
          q: "¿Con IA no sale mucho más barato?",
          a: "Escribir código sí es más barato que hace tres años. Decidir qué construir, integrarlo con lo que ya existe, probarlo con datos reales, desplegarlo y mantenerlo cuesta casi lo mismo que siempre, y es la mayor parte del proyecto.",
        },
        {
          q: "¿De quién es el código?",
          a: "Tuyo: código e infraestructura propios, sin dependencias. Se entrega documentado y con la forma de exportar todos los datos, para que el día que quieras cambiar de enfoque puedas hacerlo.",
        },
        {
          q: "¿Qué pasa después de la entrega?",
          a: "Incluye 30 días de soporte. Después hay un retainer mensual opcional de mantenimiento, porque un sistema sin mantenimiento no se queda igual: las dependencias y las API de los proveedores cambian y empeora.",
        },
        { q: "¿Cuánto cuesta?", a: PRECIO_ES },
      ],
    },
    en: {
      seoTitle: "Custom software development with AI",
      metaDescription:
        "Portals, generators, internal dashboards and MVPs built with AI and connected to your CRM. When building pays off, what to accept, and the code is yours.",
      answer:
        "Custom AI development means building the piece no off-the-shelf tool does —a client portal, a generator, an internal dashboard or a new product— and connecting it to your CRM and data. We only recommend it when that piece sets you apart from your competitors: generic things are bought. The code and the infrastructure are yours.",
      fit: [
        "The process is your edge and forcing it into a generic tool makes you work like everyone else.",
        "No tool covers the gap. Not that it does it imperfectly: that it does not do it.",
        "You need to give clients or suppliers access through your own portal.",
        "Per-user or per-contact pricing of your tools already hurts.",
      ],
      notFit: [
        "It is to save a subscription that costs a few dozen euros a month.",
        "The process is not clear yet or must be solved this month: stabilise it first with standard tools and automations.",
      ],
      steps: [
        { title: "Functional design", desc: "What it must do, for whom, and the minimum that solves the main case." },
        { title: "Architecture", desc: "A standard tool as the base and a custom piece only for what is truly yours. Building less is building better." },
        { title: "Build and connect", desc: "The application with AI built in, connected to your CRM and with a way to export all data from day one." },
        { title: "Deployment", desc: "In production, documented and with the code in your repository. Then it grows with what real users ask for." },
      ],
      timeline: "Between 4 and 8 weeks for a first version in production, depending on scope.",
      faqs: [
        {
          q: "Isn't it much cheaper with AI?",
          a: "Writing code is cheaper than three years ago. Deciding what to build, integrating it, testing it with real data, deploying and maintaining it costs about the same as ever, and that is most of the project.",
        },
        {
          q: "Who owns the code?",
          a: "You do: your own code and infrastructure, no lock-in. It is delivered documented and with a way to export all the data, so you can change course whenever you want.",
        },
        {
          q: "What happens after delivery?",
          a: "30 days of support are included. After that there is an optional monthly maintenance retainer, because an unmaintained system does not stay the same: dependencies and provider APIs change and it degrades.",
        },
        { q: "How much does it cost?", a: PRECIO_EN },
      ],
    },
  },

  "agentes-ia-vps": {
    caseClient: "Hospital Capilar",
    posts: [
      "agentes-de-ia-para-empresas-cuando-compensan",
      "agentes-de-ia-vps-propio-o-nube",
      "whatsapp-automatizacion-ventas",
    ],
    es: {
      seoTitle: "Agentes de IA a medida para WhatsApp y web",
      metaDescription:
        "Agentes de IA que atienden, cualifican y agendan 24/7 en WhatsApp, chat web y correo, conectados a GoHighLevel o HubSpot y en tu propio servidor si hace falta.",
      answer:
        "Un agente de IA a medida atiende por WhatsApp, chat web o correo, consulta tu CRM y tu agenda, cualifica al contacto y reserva la cita, también fuera de horario. A diferencia de un chatbot, actúa en tus sistemas. Lo conectamos a GoHighLevel o HubSpot y, si manejas datos sensibles o mucho volumen, lo desplegamos en tu propio servidor.",
      fit: [
        "Muchos contactos llegan por la tarde, de noche o en fin de semana, y nadie contesta a tiempo.",
        "Tu equipo responde cien veces lo mismo, pero la respuesta exige mirar algo: una agenda, un pedido, unas sesiones pendientes.",
        "El proceso empieza con gente contando su problema con sus palabras, en texto libre.",
      ],
      notFit: [
        "Recibes veinte consultas al mes: contesta una persona.",
        "Cada caso depende de matices que solo conoce alguien con años de oficio, o no hay sistemas a los que conectar el agente.",
      ],
      steps: [
        { title: "Límites", desc: "Qué decide el agente solo y qué pasa siempre por una persona: cancelar una cita, aplicar un descuento, prometer un plazo." },
        { title: "Conexiones", desc: "CRM, agenda y canales. Aquí está la mayor parte del trabajo, y es lo que convierte un chatbot en un agente." },
        { title: "Casos raros", desc: "Salida a persona cuando un sistema no responde, cuando alguien escribe algo sin sentido o pide algo no previsto." },
        { title: "Despliegue y mantenimiento", desc: "Servicio gestionado o servidor propio en la UE, con vigilancia, copias de seguridad y la información siempre al día." },
      ],
      timeline:
        "Entre 4 y 8 semanas desde el diagnóstico. El primer agente suele estar atendiendo en la semana 4.",
      faqs: [
        {
          q: "¿Qué diferencia hay entre un agente de IA y un chatbot?",
          a: "Un chatbot responde con texto. Un agente decide qué hay que hacer y lo hace en tus sistemas: consulta la agenda y reserva, cualifica al contacto y lo mete en el pipeline, avisa a la persona que corresponde. El chatbot descarga a quien escribe; el agente, a quien trabaja.",
        },
        {
          q: "¿Servidor propio o servicio en la nube?",
          a: "Un servicio gestionado cobra por uso y es bueno para validar. Un servidor propio tiene coste fijo, te da control sobre dónde se procesan los datos y permite cambiar de modelo sin rehacer nada. Lo habitual es empezar en gestionado, medir dos o tres meses y decidir con datos, sin atar la lógica del agente a la plataforma.",
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
      seoTitle: "Custom AI agents for WhatsApp and web",
      metaDescription:
        "AI agents that answer, qualify and book 24/7 on WhatsApp, web chat and email, connected to GoHighLevel or HubSpot and on your own server when needed.",
      answer:
        "A custom AI agent answers on WhatsApp, web chat or email, checks your CRM and calendar, qualifies the contact and books the appointment, outside business hours too. Unlike a chatbot, it acts in your systems. We connect it to GoHighLevel or HubSpot and, if you handle sensitive data or high volume, deploy it on your own server.",
      fit: [
        "Many contacts arrive in the evening, at night or at weekends, and nobody answers in time.",
        "Your team answers the same thing a hundred times, but the answer requires checking something: a calendar, an order, remaining sessions.",
        "The process starts with people describing their problem in their own words, as free text.",
      ],
      notFit: [
        "You get twenty enquiries a month: a person answers.",
        "Every case depends on nuances only someone with years of experience knows, or there are no systems to connect the agent to.",
      ],
      steps: [
        { title: "Limits", desc: "What the agent decides on its own and what always goes to a person: cancelling an appointment, applying a discount, promising a deadline." },
        { title: "Connections", desc: "CRM, calendar and channels. Most of the work is here, and it is what turns a chatbot into an agent." },
        { title: "Edge cases", desc: "Hand-off to a person when a system does not respond, when someone writes nonsense or asks for something unplanned." },
        { title: "Deployment and maintenance", desc: "Managed service or your own server in the EU, with monitoring, backups and information always up to date." },
      ],
      timeline:
        "Between 4 and 8 weeks from the assessment. The first agent is usually answering by week 4.",
      faqs: [
        {
          q: "What is the difference between an AI agent and a chatbot?",
          a: "A chatbot replies with text. An agent decides what needs doing and does it in your systems: checks the calendar and books, qualifies the contact and adds it to the pipeline, alerts the right person. The chatbot relieves whoever writes; the agent relieves whoever works.",
        },
        {
          q: "Own server or cloud service?",
          a: "A managed service charges per use and is good for validating. Your own server has a fixed cost, gives you control over where data is processed and lets you switch models without rebuilding. The usual path is to start managed, measure for two or three months and decide with data, without tying the agent's logic to the platform.",
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
    caseClient: "Growth4U",
    posts: [
      "integrar-gohighlevel-con-tu-stack",
      "automatizacion-para-clinicas-captacion-y-agenda",
    ],
    es: {
      seoTitle: "Implementación de GoHighLevel para empresas",
      metaDescription:
        "Configuramos GoHighLevel a tu proceso comercial: pipelines, etapas, automatizaciones, WhatsApp, correo y redes en un solo CRM, con formación para tu equipo.",
      answer:
        "Implementar GoHighLevel es dejar el CRM configurado a tu proceso real: pipelines y etapas, automatizaciones, formularios y los canales —WhatsApp, correo y redes— entrando en el mismo sitio. Partimos de cómo vendes hoy, no de una plantilla, y lo entregamos con formación para tu equipo y 30 días de soporte.",
      fit: [
        "No tienes CRM y todo vive en la cabeza de alguien, en hojas de cálculo y en WhatsApp.",
        "Tienes GoHighLevel contratado pero a medio configurar y el equipo no lo usa.",
        "Quieres mensajería, embudos y pipeline en una sola herramienta.",
      ],
      notFit: [
        "Ya tienes un CRM que funciona y solo le faltan piezas: conviene integrar, no cambiar.",
        "Tu equipo depende de informes muy avanzados, que es donde GoHighLevel se queda más corto.",
      ],
      steps: [
        { title: "Proceso", desc: "Cada paso desde el primer contacto hasta la venta, quién hace qué y qué se repite cada día." },
        { title: "Estructura", desc: "Campos, etiquetas, pipelines y etapas creados antes de meter un solo contacto." },
        { title: "Canales y automatizaciones", desc: "Entrada de contactos, WhatsApp, correo y agenda, y las automatizaciones que nadie discute: asignar, acusar recibo, recordar." },
        { title: "Formación y soporte", desc: "El equipo trabajando en el CRM desde el primer día, con 30 días de soporte para lo que salga." },
      ],
      timeline: "Entre 4 y 8 semanas según cuántos canales e integraciones haya que montar.",
      faqs: [
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
      seoTitle: "GoHighLevel implementation for businesses",
      metaDescription:
        "We set up GoHighLevel around your sales process: pipelines, stages, automations, WhatsApp, email and social in a single CRM, with training for your team.",
      answer:
        "Implementing GoHighLevel means leaving the CRM configured around your real process: pipelines and stages, automations, forms and the channels —WhatsApp, email and social— all landing in one place. We start from how you sell today, not from a template, and hand it over with team training and 30 days of support.",
      fit: [
        "You have no CRM and everything lives in someone's head, in spreadsheets and in WhatsApp.",
        "You pay for GoHighLevel but it is half set up and your team does not use it.",
        "You want messaging, funnels and pipeline in a single tool.",
      ],
      notFit: [
        "You already have a CRM that works and only lacks pieces: integrate, do not switch.",
        "Your team relies on very advanced reporting, which is where GoHighLevel falls shortest.",
      ],
      steps: [
        { title: "Process", desc: "Every step from first contact to sale, who does what and what repeats every day." },
        { title: "Structure", desc: "Fields, tags, pipelines and stages created before a single contact goes in." },
        { title: "Channels and automations", desc: "Contact intake, WhatsApp, email and calendar, plus the automations nobody argues about: assign, acknowledge, remind." },
        { title: "Training and support", desc: "Your team working in the CRM from day one, with 30 days of support for whatever comes up." },
      ],
      timeline: "Between 4 and 8 weeks depending on how many channels and integrations are needed.",
      faqs: [
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
    caseClient: "Hospital Capilar",
    posts: [
      "como-cualificar-leads-automaticamente",
      "whatsapp-automatizacion-ventas",
      "automatizacion-para-clinicas-captacion-y-agenda",
    ],
    es: {
      seoTitle: "Embudos de captación y cualificación de leads",
      metaDescription:
        "Landing, quiz de precualificación, scoring automático y Booking SDR que agenda en tu calendario, con seguimiento por correo y WhatsApp. Todo el embudo medido.",
      answer:
        "Un embudo de captación y cualificación filtra solo quién vale tu tiempo. El lead entra por una landing o un quiz, recibe una puntuación —frío, templado, caliente o premium— y los buenos agendan en tu calendario con un Booking SDR, mientras el resto entra en seguimiento por correo y WhatsApp. Tu equipo habla solo con quien tiene intención real.",
      fit: [
        "Recibes más de 10 leads al mes e inviertes en anuncios o contenido.",
        "No sabes qué leads son buenos hasta haber perdido tiempo hablando con ellos.",
        "Los contactos se enfrían porque nadie les responde a tiempo, y no sabes en qué paso se pierden.",
      ],
      notFit: [
        "Recibes pocos leads y todos acaban en una conversación: el embudo no tiene nada que filtrar.",
      ],
      steps: [
        { title: "Criterios", desc: "Qué hace bueno a un lead en tu negocio: el servicio que busca, la urgencia, el presupuesto." },
        { title: "Captación", desc: "Landing, formulario o quiz con lógica condicional que pregunta solo lo que importa." },
        { title: "Scoring y agenda", desc: "Puntuación automática y Booking SDR que cita a los leads buenos directamente en tu calendario o tu software de citas." },
        { title: "Seguimiento y medida", desc: "Nurturing por correo y WhatsApp para el resto, y el embudo medido de punta a punta: conversión, abandono, citas y ventas." },
      ],
      timeline:
        "Entre 4 y 8 semanas según el alcance. Desde que el embudo está activo, la medición empieza el primer día.",
      faqs: [
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
      seoTitle: "Lead capture and qualification funnels",
      metaDescription:
        "Landing page, pre-qualification quiz, automatic scoring and a Booking SDR that books into your calendar, with email and WhatsApp follow-up. Fully measured.",
      answer:
        "A lead capture and qualification funnel filters out who is not worth your time on its own. The lead comes in through a landing page or a quiz, gets a score —cold, warm, hot or premium— and the good ones book into your calendar through a Booking SDR, while the rest go into email and WhatsApp follow-up. Your team only talks to people with real intent.",
      fit: [
        "You get more than 10 leads a month and invest in ads or content.",
        "You do not know which leads are good until you have wasted time talking to them.",
        "Contacts go cold because nobody answers in time, and you do not know at which step they drop.",
      ],
      notFit: [
        "You get few leads and all of them end up in a conversation: the funnel has nothing to filter.",
      ],
      steps: [
        { title: "Criteria", desc: "What makes a good lead in your business: the service they want, urgency, budget." },
        { title: "Capture", desc: "Landing page, form or quiz with conditional logic that only asks what matters." },
        { title: "Scoring and booking", desc: "Automatic scoring and a Booking SDR that books good leads straight into your calendar or booking software." },
        { title: "Follow-up and measurement", desc: "Email and WhatsApp nurturing for the rest, and the funnel measured end to end: conversion, drop-off, appointments and sales." },
      ],
      timeline:
        "Between 4 and 8 weeks depending on scope. Once the funnel is live, measurement starts on day one.",
      faqs: [
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
    caseClient: "Eventos Barcelona",
    posts: ["propuestas-comerciales-automaticas"],
    es: {
      seoTitle: "Generador automático de propuestas comerciales",
      metaDescription:
        "Un formulario al colgar la llamada y la propuesta en web y PDF generada al momento en tu CRM, con recordatorios de seguimiento. Propuestas en minutos, no en días.",
      answer:
        "Un generador de propuestas convierte lo que hablas en la llamada en una propuesta lista para revisar y enviar en minutos. Rellenas un formulario de intake al colgar, el sistema genera la propuesta en web y PDF dentro de tu CRM y programa los recordatorios de seguimiento. La propuesta llega mientras el cliente todavía está interesado.",
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
        { title: "Generación", desc: "Propuesta en web y en PDF creadas en el CRM, listas para revisar y enviar." },
        { title: "Seguimiento", desc: "Pipeline de propuestas y recordatorios programados para que ninguna se quede sin respuesta." },
      ],
      timeline: "Entre 4 y 8 semanas según cuántas variantes de propuesta tengas.",
      faqs: [
        {
          q: "¿La propuesta sale sola, sin que nadie la revise?",
          a: "Sale lista para revisar. Una persona la lee y la envía: el sistema elimina la parte lenta, que es montarla, no el criterio.",
        },
        {
          q: "¿En qué formato le llega al cliente?",
          a: "En web y en PDF, las dos generadas desde el mismo formulario de intake.",
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
        "A form when you hang up and the proposal in web and PDF generated instantly in your CRM, with follow-up reminders. Proposals in minutes, not days.",
      answer:
        "A proposal generator turns what you discuss on the call into a proposal ready to review and send in minutes. You fill in an intake form when you hang up, the system generates the proposal as a web page and PDF inside your CRM and schedules the follow-up reminders. The proposal arrives while the client is still interested.",
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
        { title: "Generation", desc: "Proposal as a web page and PDF created in the CRM, ready to review and send." },
        { title: "Follow-up", desc: "A proposal pipeline and scheduled reminders so none goes unanswered." },
      ],
      timeline: "Between 4 and 8 weeks depending on how many proposal variants you have.",
      faqs: [
        {
          q: "Does the proposal go out without anyone reviewing it?",
          a: "It comes out ready to review. A person reads and sends it: the system removes the slow part, which is assembling it, not the judgement.",
        },
        {
          q: "In what format does the client receive it?",
          a: "As a web page and a PDF, both generated from the same intake form.",
        },
        {
          q: "How much time does it save?",
          a: "At Eventos Barcelona each proposal took 1 to 3 days to go out. With the generator it goes out minutes after the call, and client response time dropped by 85%.",
        },
        { q: "How much does it cost?", a: PRECIO_EN },
      ],
    },
  },
};

export const SERVICIO_SLUGS = Object.keys(SERVICIOS);

export function getServicio(slug: string, lang: Lang) {
  const s = SERVICIOS[slug];
  if (!s) return null;
  return { ...s[lang], caseClient: s.caseClient, posts: s.posts };
}
