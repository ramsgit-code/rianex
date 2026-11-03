import type { Lang } from "@/lib/i18n";

// ──────────────────────────────────────────────────────────────────────────
// Copia de la home (ES / EN). La home vende el RESULTADO, no el servicio:
// agenda llena, más ventas, horas devueltas. Los agentes y automatizaciones
// son el cómo y van en segundo plano. Los servicios de content.ts cuelgan de
// cada resultado y conservan sus URLs.
//
// Las tareas y horas del tablero del hero son un EJEMPLO ilustrativo y la
// página lo dice; las cifras reales salen solo de casos publicados.
// ──────────────────────────────────────────────────────────────────────────

export type BoardStage = 0 | 1 | 2; // 0 llega, 1 la IA lo gestiona, 2 hecho

export type BoardTask = { title: string; area: string; hours: number; start: BoardStage };

type AreaBlock = {
  name: string;
  line: string;
  examples: string[];
  slugs: string[];
};

type HomeCopy = {
  hero: {
    title: [string, string];
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    note: string;
    lanes: [string, string, string];
    boardLabel: string;
    hoursLabel: string;
    tasks: BoardTask[];
    proof: { metric: string; label: string }[];
    proofClient: string;
    logosLabel: string;
  };
  offer: {
    title: string;
    lead: string;
    steps: {
      kicker: string;
      name: string;
      price: string;
      desc: string;
      points: string[];
      cta?: string;
    }[];
  };
  areas: {
    title: string;
    lead: string;
    more: string;
    items: AreaBlock[];
    test: { title: string; items: string[] };
  };
  method: {
    title: string;
    steps: { name: string; time: string; desc: string }[];
  };
  cases: { title: string; lead: string; cta: string; read: string };
  tools: string;
  testimonialsTitle: string;
  guides: { title: string; note?: string };
  faqTitle: string;
  close: { title: string; highlight: string; lead: string; button: string; mail: string };
};

const es: HomeCopy = {
  hero: {
    title: ["Más clientes,", "sin más horas."],
    lead: "Montamos agentes de IA y automatizaciones que contestan a cada cliente, llenan la agenda, hacen el seguimiento comercial, persiguen los cobros y se encargan del papeleo. Tú lo notas donde importa: más ventas, cobros a tiempo y un equipo que deja de repetir tareas.",
    ctaPrimary: "Pide tu consultoría gratuita",
    ctaSecondary: "Qué resultados conseguimos",
    note: "30 minutos · Sin coste ni compromiso",
    lanes: ["Llega", "La IA lo gestiona", "Hecho"],
    boardLabel: "Tablero de ejemplo",
    hoursLabel: "h/semana que tu equipo ya no dedica a esto",
    tasks: [
      { title: "Un lead pide precio a las 23:40", area: "Ventas", hours: 3, start: 0 },
      { title: "Un cliente quiere cita para el jueves", area: "Agenda", hours: 3, start: 0 },
      { title: "Llega un pedido por correo", area: "Operaciones", hours: 2, start: 0 },
      { title: "Llamada terminada: falta la propuesta", area: "Ventas", hours: 5, start: 1 },
      { title: "Las mismas dudas por WhatsApp", area: "Atención", hours: 6, start: 1 },
      { title: "Mañana hay 12 citas sin confirmar", area: "Agenda", hours: 3, start: 2 },
    ],
    proof: [
      { metric: "8 min", label: "de la llamada a la propuesta enviada, antes 1-3 días" },
      { metric: "−85%", label: "tiempo de respuesta al cliente" },
    ],
    proofClient: "Eventos Barcelona",
    logosLabel: "Empresas con sistema activo",
  },
  offer: {
    title: "Tú pones el objetivo. Nosotros, el sistema.",
    lead: "No vendemos agentes ni software. Vendemos lo que consiguen: citas en la agenda, propuestas enviadas, clientes atendidos y horas recuperadas. Medimos tu punto de partida antes de empezar y te enseñamos el resultado después.",
    steps: [
      {
        kicker: "Paso 1",
        name: "Consultoría gratuita",
        price: "Gratis · 30 min",
        desc: "Buscamos dónde se te escapan clientes, citas o horas, y te decimos qué resultado puedes conseguir con IA, por dónde empezar y en cuánto tiempo.",
        points: [
          "Dónde estás perdiendo leads, citas o ventas",
          "Qué resultado conseguir primero y cuánto vale",
          "Qué haría falta, con lo que ya usas",
          "Si no compensa, te lo decimos",
        ],
        cta: "Reservar la consultoría",
      },
      {
        kicker: "Paso 2",
        name: "Lo ponemos a funcionar",
        price: "Según alcance",
        desc: "Construimos el sistema, lo conectamos a tus herramientas y acompañamos al equipo hasta que el resultado se ve en el día a día: en la agenda, en las ventas y en las horas.",
        points: [
          "Agentes de IA y automatizaciones hechos a tu proceso",
          "Conectados a tu CRM, correo, calendario y WhatsApp",
          "Formación y un asistente interno que responde con los documentos de tu empresa",
          "Seguimiento del resultado, soporte y mejoras",
        ],
      },
    ],
  },
  areas: {
    title: "Resultados que entregamos",
    lead: "Así se nota en tu negocio. Debajo de cada resultado hay agentes de IA y automatizaciones, pero de eso nos ocupamos nosotros.",
    more: "Cómo lo hacemos",
    items: [
      {
        name: "Más ventas con los mismos leads",
        line: "Los contactos que ya tienes, convertidos en clientes.",
        examples: [
          "Cada lead recibe respuesta en minutos, también de noche",
          "Seguimiento automático hasta que dice sí o no",
          "Contactos antiguos y presupuestos no aceptados, reactivados",
        ],
        slugs: ["embudo-de-captacion", "generador-de-propuestas", "implementacion-crm-gohighlevel"],
      },
      {
        name: "Clientes nuevos cada semana",
        line: "Prospección que no depende de que alguien tenga tiempo.",
        examples: [
          "Empresas que encajan contigo, encontradas y contactadas",
          "Mensajes personalizados y seguimiento sin intervención",
          "Reuniones en tu calendario, no listas en un Excel",
        ],
        slugs: ["outbound-b2b"],
      },
      {
        name: "Agenda llena",
        line: "Cada interesado acaba con una cita, sin que nadie coja el teléfono.",
        examples: [
          "Ninguna llamada ni mensaje sin contestar, 24/7",
          "La cita queda agendada, confirmada y recordada",
          "Menos huecos vacíos y menos ausencias",
        ],
        slugs: ["agente-ia-whatsapp"],
      },
      {
        name: "Clientes atendidos al momento",
        line: "Respuesta inmediata sin ampliar el equipo.",
        examples: [
          "Las preguntas de siempre, resueltas al instante",
          "Incidencias clasificadas y enviadas a quien toca",
          "El estado del pedido, sin tener que llamar",
        ],
        slugs: ["agente-ia-whatsapp"],
      },
      {
        name: "Cobrar antes",
        line: "Facturas al día y menos dinero pendiente.",
        examples: [
          "Facturas leídas y registradas sin teclear",
          "Pagos conciliados con pedidos y extractos",
          "Recordatorios de cobro que salen solos",
        ],
        slugs: ["automatizacion-procesos-ia"],
      },
      {
        name: "Horas devueltas al equipo",
        line: "El trabajo administrativo, hecho sin que nadie lo toque.",
        examples: [
          "Los datos pasan entre herramientas sin copiar y pegar",
          "Pedidos, contratos y documentos que se preparan solos",
          "El informe del lunes ya está hecho",
        ],
        slugs: ["automatizacion-procesos-ia", "integracion-gohighlevel-hubspot", "migracion-a-gohighlevel"],
      },
    ],
    test: {
      title: "¿Dónde puedes ganar?",
      items: [
        "tardas horas en contestar a un lead",
        "tienes contactos y presupuestos olvidados",
        "se pierden llamadas o citas",
        "persigues facturas y cobros a mano",
        "el equipo repite las mismas tareas cada semana",
      ],
    },
  },
  method: {
    title: "Cómo trabajamos",
    steps: [
      { name: "Consultoría gratuita", time: "30 min", desc: "Vemos dónde está el resultado más rápido, cuánto vale y medimos el punto de partida." },
      { name: "Diseño", time: "Tras la consultoría", desc: "El objetivo, cómo lo vamos a conseguir y el precio, por escrito." },
      { name: "Puesta en marcha", time: "Semana 4", desc: "El primer resultado suele verse en la semana 4." },
      { name: "Seguimiento", time: "30 días incluidos", desc: "Comparamos con el punto de partida, formamos al equipo y ajustamos lo que haga falta." },
    ],
  },
  cases: {
    title: "Resultados reales",
    lead: "Empresas que ya lo notan en sus números.",
    cta: "Ver todos los casos",
    read: "Leer el caso",
  },
  tools: "Funciona con las herramientas que ya usas",
  testimonialsTitle: "Lo que dicen los clientes",
  guides: { title: "Antes de automatizar nada" },
  faqTitle: "Preguntas frecuentes",
  close: {
    title: "¿Más citas, más ventas",
    highlight: "o más horas libres?",
    lead: "En 30 minutos te decimos qué puedes conseguir con IA, cuánto tardaría y qué haría falta. Gratis, sin compromiso y con un plan concreto aunque no trabajemos juntos.",
    button: "Pide tu consultoría gratuita",
    mail: "o escríbenos a hola@rianex.es",
  },
};

const en: HomeCopy = {
  hero: {
    title: ["More clients,", "no extra hours."],
    lead: "We build AI agents and automations that answer every customer, fill your calendar, run sales follow-up, chase payments and handle the paperwork. You see it where it matters: more sales, payments on time and a team that stops repeating tasks.",
    ctaPrimary: "Book your free consultation",
    ctaSecondary: "Results we deliver",
    note: "30 minutes · Free, no commitment",
    lanes: ["Comes in", "AI handles it", "Done"],
    boardLabel: "Example board",
    hoursLabel: "h/week your team no longer spends on this",
    tasks: [
      { title: "A lead asks for a price at 11:40 pm", area: "Sales", hours: 3, start: 0 },
      { title: "A client wants a Thursday appointment", area: "Calendar", hours: 3, start: 0 },
      { title: "An order arrives by email", area: "Operations", hours: 2, start: 0 },
      { title: "Call finished: proposal pending", area: "Sales", hours: 5, start: 1 },
      { title: "The same WhatsApp questions", area: "Support", hours: 6, start: 1 },
      { title: "12 appointments tomorrow, unconfirmed", area: "Calendar", hours: 3, start: 2 },
    ],
    proof: [
      { metric: "8 min", label: "from call to proposal sent, previously 1-3 days" },
      { metric: "−85%", label: "customer response time" },
    ],
    proofClient: "Eventos Barcelona",
    logosLabel: "Companies with a live system",
  },
  offer: {
    title: "You set the goal. We build the system.",
    lead: "We don't sell agents or software. We sell what they achieve: appointments in the calendar, proposals sent, customers answered and hours recovered. We measure your starting point before we begin and show you the result afterwards.",
    steps: [
      {
        kicker: "Step 1",
        name: "Free consultation",
        price: "Free · 30 min",
        desc: "We find where you are losing clients, appointments or hours, and tell you what result AI can get you, where to start and how long it takes.",
        points: [
          "Where you are losing leads, appointments or sales",
          "Which result to go for first and what it is worth",
          "What it would take, with what you already use",
          "If it doesn't pay off, we tell you",
        ],
        cta: "Book the consultation",
      },
      {
        kicker: "Step 2",
        name: "We make it work",
        price: "Depends on scope",
        desc: "We build the system, connect it to your tools and stay with your team until the result shows up day to day: in the calendar, in sales and in hours.",
        points: [
          "AI agents and automations built around your process",
          "Connected to your CRM, email, calendar and WhatsApp",
          "Training and an internal assistant that answers from your company's documents",
          "Result tracking, support and improvements",
        ],
      },
    ],
  },
  areas: {
    title: "Results we deliver",
    lead: "This is how it shows in your business. Under each result there are AI agents and automations, but that part is on us.",
    more: "How we do it",
    items: [
      {
        name: "More sales from the same leads",
        line: "The contacts you already have, turned into clients.",
        examples: [
          "Every lead gets an answer within minutes, at night too",
          "Automatic follow-up until they say yes or no",
          "Old contacts and unaccepted quotes, brought back",
        ],
        slugs: ["embudo-de-captacion", "generador-de-propuestas", "implementacion-crm-gohighlevel"],
      },
      {
        name: "New clients every week",
        line: "Prospecting that doesn't depend on someone having time.",
        examples: [
          "Companies that fit you, found and contacted",
          "Personalised messages and follow-up with no one involved",
          "Meetings in your calendar, not lists in a spreadsheet",
        ],
        slugs: ["outbound-b2b"],
      },
      {
        name: "A full calendar",
        line: "Every interested lead ends up with an appointment, with no one picking up the phone.",
        examples: [
          "No call or message left unanswered, 24/7",
          "The appointment is booked, confirmed and reminded",
          "Fewer empty slots and fewer no-shows",
        ],
        slugs: ["agente-ia-whatsapp"],
      },
      {
        name: "Customers answered instantly",
        line: "Instant answers without growing the team.",
        examples: [
          "The usual questions, solved on the spot",
          "Issues sorted and sent to the right person",
          "Order status, without having to call",
        ],
        slugs: ["agente-ia-whatsapp"],
      },
      {
        name: "Get paid sooner",
        line: "Invoices up to date and less money outstanding.",
        examples: [
          "Invoices read and recorded with no typing",
          "Payments matched to orders and statements",
          "Payment reminders that go out on their own",
        ],
        slugs: ["automatizacion-procesos-ia"],
      },
      {
        name: "Hours back for the team",
        line: "Admin work, done without anyone touching it.",
        examples: [
          "Data moves between tools without copy and paste",
          "Orders, contracts and documents that prepare themselves",
          "Monday's report is already done",
        ],
        slugs: ["automatizacion-procesos-ia", "integracion-gohighlevel-hubspot", "migracion-a-gohighlevel"],
      },
    ],
    test: {
      title: "Where can you gain?",
      items: [
        "it takes you hours to answer a lead",
        "you have forgotten contacts and quotes",
        "calls or appointments get lost",
        "you chase invoices and payments by hand",
        "the team repeats the same tasks every week",
      ],
    },
  },
  method: {
    title: "How we work",
    steps: [
      { name: "Free consultation", time: "30 min", desc: "We find the fastest result, what it is worth, and measure the starting point." },
      { name: "Design", time: "After the consultation", desc: "The goal, how we will reach it and the price, in writing." },
      { name: "Go live", time: "Week 4", desc: "The first result usually shows by week 4." },
      { name: "Follow-up", time: "30 days included", desc: "We compare against the starting point, train the team and adjust what's needed." },
    ],
  },
  cases: {
    title: "Real results",
    lead: "Companies that already see it in their numbers.",
    cta: "See all cases",
    read: "Read the case",
  },
  tools: "Works with the tools you already use",
  testimonialsTitle: "What clients say",
  guides: { title: "Before you automate anything", note: "Guides in Spanish" },
  faqTitle: "Frequently asked questions",
  close: {
    title: "More appointments, more sales",
    highlight: "or more free hours?",
    lead: "In 30 minutes we tell you what AI can get you, how long it would take and what it would need. Free, no commitment, and with a concrete plan even if we don't work together.",
    button: "Book your free consultation",
    mail: "or email us at hola@rianex.es",
  },
};

export const home: Record<Lang, HomeCopy> = { es, en };
