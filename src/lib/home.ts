import type { Lang } from "@/lib/i18n";

// ──────────────────────────────────────────────────────────────────────────
// Copia de la home (ES / EN). La home vende dos cosas, en este orden:
// la consultoría gratuita y el asesoramiento para implantar la automatización
// y la adopción de la IA. Los servicios de content.ts se presentan como
// ejemplos de "qué podemos automatizar" y conservan sus URLs.
//
// Las tareas y horas del tablero del hero son un EJEMPLO ilustrativo y la
// página lo dice; las cifras reales salen solo de casos publicados.
// ──────────────────────────────────────────────────────────────────────────

export type BoardStage = 0 | 1 | 2; // 0 manual, 1 en consultoría, 2 automatizado

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
    title: ["Si se repite,", "se automatiza."],
    lead: "Somos una agencia de automatización con IA. Revisamos tus procesos gratis, te decimos qué puede hacer la IA por tu equipo y te acompañamos a ponerlo en marcha con las herramientas que ya usas.",
    ctaPrimary: "Pide tu consultoría gratuita",
    ctaSecondary: "Qué podemos automatizar",
    note: "30 minutos · Sin coste ni compromiso",
    lanes: ["Manual", "En consultoría", "Automatizado"],
    boardLabel: "Tablero de ejemplo",
    hoursLabel: "h/semana devueltas al equipo",
    tasks: [
      { title: "Pasar los leads del formulario al CRM", area: "Ventas", hours: 3, start: 0 },
      { title: "Responder las mismas dudas por WhatsApp", area: "Atención", hours: 6, start: 0 },
      { title: "Preparar el informe semanal", area: "Operaciones", hours: 2, start: 0 },
      { title: "Redactar propuestas comerciales", area: "Ventas", hours: 5, start: 1 },
      { title: "Conciliar facturas y pedidos", area: "Finanzas", hours: 4, start: 1 },
      { title: "Agendar citas y recordatorios", area: "Atención", hours: 3, start: 2 },
    ],
    proof: [
      { metric: "8 min", label: "de la llamada a la propuesta enviada, antes 1-3 días" },
      { metric: "−85%", label: "tiempo de respuesta al cliente" },
    ],
    proofClient: "Eventos Barcelona",
    logosLabel: "Empresas con sistema activo",
  },
  offer: {
    title: "Dos pasos. El primero es gratis.",
    lead: "No vendemos herramientas ni software a medida. Empezamos por tu proceso y terminamos cuando tu equipo trabaja con la automatización en el día a día.",
    steps: [
      {
        kicker: "Paso 1",
        name: "Consultoría gratuita",
        price: "Gratis · 30 min",
        desc: "Revisamos contigo cómo trabaja tu empresa y señalamos qué procesos se pueden automatizar o agilizar con IA, cuál atacar primero y qué ganarías.",
        points: [
          "Mapa de los procesos que se repiten",
          "Qué automatizar primero y por qué",
          "Herramientas que encajan con lo que ya usas",
          "Si no tiene sentido, te lo decimos",
        ],
        cta: "Reservar la consultoría",
      },
      {
        kicker: "Paso 2",
        name: "Asesoramiento e implantación",
        price: "Según alcance",
        desc: "Te acompañamos a integrar las automatizaciones y a que el equipo adopte la IA: lo diseñamos, lo construimos, lo ponemos en producción y formamos a quien lo va a usar.",
        points: [
          "Diseño y construcción de las automatizaciones",
          "Integración con tu CRM, ERP, correo y WhatsApp",
          "Formación y adopción de la IA en el equipo",
          "Soporte, mantenimiento y mejoras continuas",
        ],
      },
    ],
  },
  areas: {
    title: "Qué podemos automatizar",
    lead: "Casi cualquier tarea que se repite cada semana. Estos son los procesos que más automatizamos, por área.",
    more: "Ver el servicio",
    items: [
      {
        name: "Operativa y back-office",
        line: "El trabajo administrativo que se come las horas.",
        examples: [
          "Pasar datos entre herramientas sin copiar y pegar",
          "Informes y documentos que se generan solos",
          "Facturas, pedidos y correos clasificados",
        ],
        slugs: ["automatizacion-procesos-ia", "integracion-gohighlevel-hubspot"],
      },
      {
        name: "Ventas y captación",
        line: "Del primer contacto a la propuesta, sin esperas.",
        examples: [
          "Prospección B2B que busca, escribe y hace seguimiento",
          "Leads de Meta cualificados y agendados",
          "Propuestas listas en minutos tras la llamada",
        ],
        slugs: ["outbound-b2b", "embudo-de-captacion", "generador-de-propuestas"],
      },
      {
        name: "Atención al cliente",
        line: "Respuesta inmediata, también de noche.",
        examples: [
          "Agentes de IA en WhatsApp, Telegram y teléfono",
          "Citas y recordatorios sin intervención",
          "Las preguntas de siempre, contestadas al momento",
        ],
        slugs: ["agente-ia-whatsapp"],
      },
      {
        name: "CRM y datos",
        line: "Un solo sitio donde está todo, y fiable.",
        examples: [
          "Implantación de GoHighLevel o HubSpot",
          "Migración de CRM sin perder histórico",
          "Integraciones por API, webhooks y MCP",
        ],
        slugs: ["implementacion-crm-gohighlevel", "migracion-a-gohighlevel"],
      },
    ],
    test: {
      title: "Un proceso es buen candidato si…",
      items: [
        "se repite cada semana",
        "sigue unas reglas que se pueden explicar",
        "pasa datos de una herramienta a otra",
        "si se retrasa o falla, cuesta dinero",
      ],
    },
  },
  method: {
    title: "Cómo trabajamos",
    steps: [
      { name: "Consultoría gratuita", time: "30 min", desc: "Vemos tus procesos y qué conviene automatizar primero." },
      { name: "Diseño", time: "Tras la consultoría", desc: "Arquitectura, integraciones y plan de trabajo, con el alcance y el precio por escrito." },
      { name: "Implantación", time: "Semana 4", desc: "La primera automatización suele estar en producción en la semana 4." },
      { name: "Adopción y soporte", time: "30 días incluidos", desc: "Formación al equipo, soporte y, si quieres, mantenimiento y mejoras continuas." },
    ],
  },
  cases: {
    title: "Ya funcionando",
    lead: "Empresas reales con procesos automatizados en producción.",
    cta: "Ver todos los casos",
    read: "Leer el caso",
  },
  tools: "Trabajamos con las herramientas que ya usas",
  testimonialsTitle: "Lo que dicen los clientes",
  guides: { title: "Antes de automatizar nada" },
  faqTitle: "Preguntas frecuentes",
  close: {
    title: "¿Qué procesos de tu empresa",
    highlight: "se pueden automatizar?",
    lead: "En 30 minutos te lo decimos. Gratis, sin compromiso y con un plan concreto aunque no trabajemos juntos.",
    button: "Pide tu consultoría gratuita",
    mail: "o escríbenos a hola@rianex.es",
  },
};

const en: HomeCopy = {
  hero: {
    title: ["If it repeats,", "automate it."],
    lead: "We are an AI automation agency. We review your processes for free, tell you what AI can do for your team, and help you put it to work with the tools you already use.",
    ctaPrimary: "Book your free consultation",
    ctaSecondary: "What we can automate",
    note: "30 minutes · Free, no commitment",
    lanes: ["Manual", "In consultation", "Automated"],
    boardLabel: "Example board",
    hoursLabel: "h/week given back to the team",
    tasks: [
      { title: "Copy form leads into the CRM", area: "Sales", hours: 3, start: 0 },
      { title: "Answer the same WhatsApp questions", area: "Support", hours: 6, start: 0 },
      { title: "Prepare the weekly report", area: "Operations", hours: 2, start: 0 },
      { title: "Write sales proposals", area: "Sales", hours: 5, start: 1 },
      { title: "Reconcile invoices and orders", area: "Finance", hours: 4, start: 1 },
      { title: "Book appointments and reminders", area: "Support", hours: 3, start: 2 },
    ],
    proof: [
      { metric: "8 min", label: "from call to proposal sent, previously 1-3 days" },
      { metric: "−85%", label: "customer response time" },
    ],
    proofClient: "Eventos Barcelona",
    logosLabel: "Companies with a live system",
  },
  offer: {
    title: "Two steps. The first one is free.",
    lead: "We don't sell tools or custom software. We start from your process and finish when your team works with the automation every day.",
    steps: [
      {
        kicker: "Step 1",
        name: "Free consultation",
        price: "Free · 30 min",
        desc: "We review how your company works and point out which processes AI can automate or speed up, which one to tackle first and what you would gain.",
        points: [
          "Map of the processes that repeat",
          "What to automate first and why",
          "Tools that fit what you already use",
          "If it makes no sense, we tell you",
        ],
        cta: "Book the consultation",
      },
      {
        kicker: "Step 2",
        name: "Advisory and implementation",
        price: "Depends on scope",
        desc: "We help you integrate the automations and get your team to adopt AI: we design it, build it, put it into production and train the people who will use it.",
        points: [
          "Design and build of the automations",
          "Integration with your CRM, ERP, email and WhatsApp",
          "Training and AI adoption across the team",
          "Support, maintenance and continuous improvement",
        ],
      },
    ],
  },
  areas: {
    title: "What we can automate",
    lead: "Almost any task that repeats every week. These are the processes we automate most, by area.",
    more: "See the service",
    items: [
      {
        name: "Operations and back office",
        line: "The admin work that eats the hours.",
        examples: [
          "Moving data between tools without copy and paste",
          "Reports and documents that build themselves",
          "Invoices, orders and emails sorted automatically",
        ],
        slugs: ["automatizacion-procesos-ia", "integracion-gohighlevel-hubspot"],
      },
      {
        name: "Sales and lead generation",
        line: "From first contact to proposal, with no waiting.",
        examples: [
          "B2B prospecting that finds, writes and follows up",
          "Meta leads qualified and booked",
          "Proposals ready minutes after the call",
        ],
        slugs: ["outbound-b2b", "embudo-de-captacion", "generador-de-propuestas"],
      },
      {
        name: "Customer support",
        line: "Instant answers, at night too.",
        examples: [
          "AI agents on WhatsApp, Telegram and phone",
          "Appointments and reminders with no one involved",
          "The usual questions, answered on the spot",
        ],
        slugs: ["agente-ia-whatsapp"],
      },
      {
        name: "CRM and data",
        line: "One reliable place where everything lives.",
        examples: [
          "GoHighLevel or HubSpot rollout",
          "CRM migration without losing history",
          "Integrations via API, webhooks and MCP",
        ],
        slugs: ["implementacion-crm-gohighlevel", "migracion-a-gohighlevel"],
      },
    ],
    test: {
      title: "A process is a good candidate if…",
      items: [
        "it repeats every week",
        "it follows rules you can explain",
        "it moves data from one tool to another",
        "a delay or mistake costs money",
      ],
    },
  },
  method: {
    title: "How we work",
    steps: [
      { name: "Free consultation", time: "30 min", desc: "We look at your processes and what to automate first." },
      { name: "Design", time: "After the consultation", desc: "Architecture, integrations and work plan, with scope and price in writing." },
      { name: "Implementation", time: "Week 4", desc: "The first automation is usually in production by week 4." },
      { name: "Adoption and support", time: "30 days included", desc: "Team training, support and, if you want, maintenance and continuous improvement." },
    ],
  },
  cases: {
    title: "Already running",
    lead: "Real companies with automated processes in production.",
    cta: "See all cases",
    read: "Read the case",
  },
  tools: "We work with the tools you already use",
  testimonialsTitle: "What clients say",
  guides: { title: "Before you automate anything", note: "Guides in Spanish" },
  faqTitle: "Frequently asked questions",
  close: {
    title: "Which processes in your company",
    highlight: "can be automated?",
    lead: "We'll tell you in 30 minutes. Free, no commitment, and with a concrete plan even if we don't work together.",
    button: "Book your free consultation",
    mail: "or email us at hola@rianex.es",
  },
};

export const home: Record<Lang, HomeCopy> = { es, en };
