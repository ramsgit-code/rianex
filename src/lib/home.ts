import type { Lang } from "@/lib/i18n";

// ──────────────────────────────────────────────────────────────────────────
// Copia de la home (ES / EN). Orden pensado para que se entienda en segundos:
// qué hacemos (tres pasos, el primero gratis) → qué servicios damos (las
// fichas de content.ts, con sus URLs intactas) → para quién trabajamos (con
// las empresas reales y la llamada a la consultoría) → prueba y cierre.
//
// Las tareas y horas del tablero del hero son un EJEMPLO ilustrativo y la
// página lo dice; las cifras reales salen solo de casos publicados.
// ──────────────────────────────────────────────────────────────────────────

export type BoardStage = 0 | 1 | 2; // 0 llega, 1 la IA lo gestiona, 2 hecho

export type BoardTask = { title: string; area: string; hours: number; start: BoardStage };

type Chip = { name: string; href?: string };

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
  whatWeDo: {
    title: string;
    lead: string;
    steps: {
      kicker: string;
      name: string;
      chip: string;
      desc: string;
      points: string[];
      cta?: string;
    }[];
  };
  services: {
    title: string;
    lead: string;
    all: string;
  };
  audience: {
    title: string;
    lead: string;
    profilesTitle: string;
    profiles: { name: string; line: string }[];
    fitTitle: string;
    fit: string[];
    sectorsTitle: string;
    sectors: Chip[];
    alsoTitle: string;
    also: Chip[];
    clientsTitle: string;
    clientCta: string;
    cta: { title: string; text: string; button: string; note: string };
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
    lead: "Somos una agencia de automatización con IA. Montamos agentes y automatizaciones que contestan a cada cliente, llenan la agenda, hacen el seguimiento comercial y se encargan del papeleo, y formamos a tu equipo para usar la IA en su día a día.",
    ctaPrimary: "Pide tu consultoría gratuita",
    ctaSecondary: "Ver servicios",
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
  whatWeDo: {
    title: "Qué hacemos",
    lead: "Automatizamos con IA el trabajo que tu equipo repite cada semana —atender, vender, agendar, facturar y el papeleo— y nos quedamos hasta que se nota en la agenda, en las ventas y en las horas. Siempre en este orden:",
    steps: [
      {
        kicker: "Paso 1",
        name: "Consultoría gratuita",
        chip: "Gratis · 30 min",
        desc: "Revisamos tus procesos y te decimos qué automatizar primero, qué ganarías y cuánto costaría. Si no compensa, te lo decimos.",
        points: [
          "Dónde se te escapan clientes, citas u horas",
          "Qué resultado conseguir primero y cuánto vale",
          "Qué haría falta, con las herramientas que ya usas",
        ],
        cta: "Reservar la consultoría",
      },
      {
        kicker: "Paso 2",
        name: "Implantación",
        chip: "Primer resultado: semana 4",
        desc: "Diseñamos y construimos los agentes de IA y las automatizaciones, conectados a tu CRM, correo, calendario y WhatsApp. El objetivo y el precio, por escrito antes de empezar.",
        points: [
          "Hecho sobre tu proceso, no una plantilla",
          "Con las herramientas que ya usas",
          "El código y las cuentas son tuyos",
        ],
      },
      {
        kicker: "Paso 3",
        name: "Formación y acompañamiento",
        chip: "30 días incluidos",
        desc: "Formamos al equipo para que use el sistema y la IA en su día a día, comparamos el resultado con el punto de partida y ajustamos lo que haga falta.",
        points: [
          "Formación práctica para el equipo",
          "Resultado medido contra el punto de partida",
          "Soporte, mantenimiento y mejoras",
        ],
      },
    ],
  },
  services: {
    title: "Servicios",
    lead: "Ocho servicios para automatizar lo que más se repite y tres para que tu equipo aprenda a usar la IA. Se contratan por separado o juntos en un mismo proyecto.",
    all: "Ver todos los servicios en detalle",
  },
  audience: {
    title: "Para quién trabajamos",
    lead: "Pymes y empresas medianas de España y Latinoamérica con trabajo que se repite cada semana. El sector importa menos que el proceso: si una tarea es frecuente, sigue reglas y fallar cuesta dinero, se puede automatizar.",
    profilesTitle: "Quién nos llama",
    profiles: [
      { name: "Dueños y gerentes", line: "Quieren crecer sin ampliar plantilla y saber qué automatizar primero." },
      { name: "Responsables de ventas", line: "Pierden leads por no contestar a tiempo y quieren más reuniones cada semana." },
      { name: "Operaciones y administración", line: "Pasan horas copiando datos, persiguiendo papeles y preparando informes." },
      { name: "Equipos que empiezan con la IA", line: "Ya la usan cada uno a su manera y quieren hacerlo con orden y criterio." },
    ],
    fitTitle: "Encaja si…",
    fit: [
      "tardas horas en contestar a un lead",
      "tienes contactos y presupuestos olvidados",
      "se pierden llamadas o citas",
      "el equipo repite las mismas tareas cada semana",
      "cada uno usa la IA por su cuenta, sin reglas",
    ],
    sectorsTitle: "Dónde ya lo hemos aplicado",
    sectors: [
      { name: "Eventos", href: "/soluciones/eventos" },
      { name: "Marketing y agencias" },
      { name: "Clínicas (con Growth4U)", href: "/soluciones/clinicas" },
    ],
    alsoTitle: "Y también encaja en",
    also: [
      { name: "Academias y formación", href: "/soluciones/academias" },
      { name: "Gestorías y asesorías" },
      { name: "Servicios profesionales B2B" },
      { name: "Inmobiliarias" },
      { name: "Distribución y logística" },
    ],
    clientsTitle: "Empresas para las que trabajamos",
    clientCta: "Ver el caso",
    cta: {
      title: "¿Tu empresa encaja?",
      text: "En 30 minutos lo vemos juntos y te llevas un plan concreto, aunque no trabajemos juntos.",
      button: "Agenda tu consultoría gratuita",
      note: "Gratis · Sin compromiso",
    },
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
    lead: "We are an AI automation agency. We build agents and automations that answer every customer, fill your calendar, run sales follow-up and handle the paperwork, and we train your team to use AI day to day.",
    ctaPrimary: "Book your free consultation",
    ctaSecondary: "See services",
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
  whatWeDo: {
    title: "What we do",
    lead: "We use AI to automate the work your team repeats every week —answering customers, selling, booking, invoicing and the paperwork— and we stay until it shows in your calendar, your sales and your hours. Always in this order:",
    steps: [
      {
        kicker: "Step 1",
        name: "Free consultation",
        chip: "Free · 30 min",
        desc: "We review your processes and tell you what to automate first, what you would gain and what it would cost. If it doesn't pay off, we tell you.",
        points: [
          "Where you are losing clients, appointments or hours",
          "Which result to go for first and what it is worth",
          "What it would take, with the tools you already use",
        ],
        cta: "Book the consultation",
      },
      {
        kicker: "Step 2",
        name: "Implementation",
        chip: "First result: week 4",
        desc: "We design and build the AI agents and automations, connected to your CRM, email, calendar and WhatsApp. The goal and the price, in writing before we start.",
        points: [
          "Built around your process, not a template",
          "With the tools you already use",
          "The code and the accounts are yours",
        ],
      },
      {
        kicker: "Step 3",
        name: "Training and support",
        chip: "30 days included",
        desc: "We train the team to use the system and AI day to day, compare the result with the starting point and adjust whatever is needed.",
        points: [
          "Hands-on training for the team",
          "Result measured against the starting point",
          "Support, maintenance and improvements",
        ],
      },
    ],
  },
  services: {
    title: "Services",
    lead: "Eight services to automate what repeats most and three to help your team learn to use AI. Hire them on their own or together in one project.",
    all: "See every service in detail",
  },
  audience: {
    title: "Who we work with",
    lead: "Small and mid-sized companies in Spain and Latin America with work that repeats every week. The industry matters less than the process: if a task is frequent, follows rules and costs money when it fails, it can be automated.",
    profilesTitle: "Who calls us",
    profiles: [
      { name: "Owners and managers", line: "They want to grow without hiring more people and to know what to automate first." },
      { name: "Sales leads", line: "They lose leads by not replying in time and want more meetings every week." },
      { name: "Operations and admin", line: "They spend hours copying data, chasing paperwork and preparing reports." },
      { name: "Teams starting with AI", line: "Everyone already uses it their own way and they want to do it with order and judgement." },
    ],
    fitTitle: "A good fit if…",
    fit: [
      "it takes you hours to answer a lead",
      "you have forgotten contacts and quotes",
      "calls or appointments get lost",
      "the team repeats the same tasks every week",
      "everyone uses AI on their own, with no rules",
    ],
    sectorsTitle: "Where we have already applied it",
    sectors: [
      { name: "Events", href: "/soluciones/eventos" },
      { name: "Marketing and agencies" },
      { name: "Clinics (with Growth4U)", href: "/soluciones/clinicas" },
    ],
    alsoTitle: "It also fits",
    also: [
      { name: "Academies and training", href: "/soluciones/academias" },
      { name: "Accounting and advisory firms" },
      { name: "B2B professional services" },
      { name: "Real estate" },
      { name: "Distribution and logistics" },
    ],
    clientsTitle: "Companies we work for",
    clientCta: "See the case",
    cta: {
      title: "Is your company a fit?",
      text: "In 30 minutes we look at it together and you leave with a concrete plan, even if we don't work together.",
      button: "Book your free consultation",
      note: "Free · No commitment",
    },
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
