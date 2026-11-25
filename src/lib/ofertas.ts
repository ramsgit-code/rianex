import type { Lang } from "@/lib/i18n";

// Ofertas cerradas (/ofertas y /en/ofertas): trabajos con alcance, plazo y
// precio de partida publicados.
//
// Fuente unica de precios, plazos y pruebas: el posicionamiento decidido por
// Ramiro el 25-nov-2026. Precios recomendados, sin IVA, pendientes de su
// validacion. Las pruebas usan solo las cifras aprobadas y solo estos
// nombres: Eventos Barcelona, Tribeca Media, Growth4U y Hospital Capilar.
// Nunca clientes de esas empresas.
//
// Las lineas van en el mismo orden que en la web, LinkedIn y el bot. El slug
// de cada oferta es su ancla: /ofertas#auditoria-agentes-ia.

export type LineaId = "automatizacion" | "captacion" | "software" | "auditoria";

type LineaCopy = { name: string; summary: string };

export const LINEAS: { id: LineaId; es: LineaCopy; en: LineaCopy }[] = [
  {
    id: "automatizacion",
    es: {
      name: "Automatización de procesos con IA",
      summary: "Operativa, correo, documentos, CRM y ERP.",
    },
    en: {
      name: "AI process automation",
      summary: "Operations, email, documents, CRM and ERP.",
    },
  },
  {
    id: "captacion",
    es: {
      name: "Captación y go-to-market",
      summary:
        "Outbound en LinkedIn, listas enriquecidas con coste por acierto, cold calling, email marketing, webs y señales de compra.",
    },
    en: {
      name: "Lead generation and go-to-market",
      summary:
        "LinkedIn outbound, enriched lists priced per valid contact, cold calling, email marketing, websites and buying signals.",
    },
  },
  {
    id: "software",
    es: {
      name: "Software e IA a medida",
      summary: "Aplicaciones internas, portales, agentes e integraciones con ERP y MES.",
    },
    en: {
      name: "Custom software and AI",
      summary: "Internal apps, portals, agents and integrations with ERP and MES.",
    },
  },
  {
    id: "auditoria",
    es: {
      name: "Auditoría y consultoría de IA",
      summary:
        "Auditoría técnica de agentes, gasto en IA, revisión independiente de otro proveedor, formación y Kit IA.",
    },
    en: {
      name: "AI audits and consulting",
      summary:
        "Technical audits of agents, AI spend, independent review of another provider's work, training and the AI Kit.",
    },
  },
];

/** Importe en euros, sin IVA. `from`: es un precio de partida ("desde"). */
export type Precio = { amount: number; from: boolean };

/**
 * De donde sale la prueba: un caso publicado, una herramienta que usamos en
 * Rianex o la experiencia de quien lo hace.
 */
export type ProofKind = "caso" | "propio" | "fundador";

type OfertaCopy = {
  name: string;
  forWho: string;
  problem: string;
  deliverables: string[];
  timeline: string;
  proof: string;
  /** Enlaces sin prefijo de idioma; la vista los localiza. */
  links: { label: string; href: string }[];
};

export type Oferta = {
  slug: string;
  linea: LineaId;
  /** Precio del proyecto o de la puesta en marcha. */
  price: Precio;
  /** El precio principal es una puesta en marcha seguida de una cuota. */
  setup?: boolean;
  /** Cuota mensual, si la hay. */
  monthly?: Precio;
  proofKind: ProofKind;
  es: OfertaCopy;
  en: OfertaCopy;
};

const CASO_TRIBECA = "/casos-de-exito/tribeca-media";
const CASO_EB = "/casos-de-exito/eventos-barcelona";

export const OFERTAS: Oferta[] = [
  // ── Automatizacion de procesos con IA ──────────────────────────────────
  {
    slug: "clasificador-correo-ia",
    linea: "automatizacion",
    price: { amount: 4500, from: true },
    monthly: { amount: 150, from: false },
    proofKind: "caso",
    es: {
      name: "Clasificador de correo con IA en servidor propio",
      forWho:
        "Empresas que reciben clientes, proveedores y colaboradores en el mismo buzón y pasan cada petición al CRM a mano.",
      problem:
        "Las oportunidades llegan por correo mezcladas con todo lo demás y alguna se queda sin registrar en el CRM.",
      deliverables: [
        "Lectura del buzón y clasificación de cada correo con IA: cliente, proveedor, colaborador, spam u otro.",
        "Alta o actualización de la oportunidad en tu CRM, sin duplicados.",
        "Modelo de IA en un servidor propio: el correo no sale a un proveedor de IA externo y no hay coste por uso.",
        "Batería de pruebas con correos reales que se pasa antes de cada cambio.",
        "Avisos por Telegram de los errores y de los correos que la IA no sabe clasificar.",
      ],
      timeline: "3-4 semanas",
      proof:
        "Eventos Barcelona: la IA en servidor propio que lee su correo creó 17 de las 50 oportunidades nuevas en 7 semanas. El flujo tiene 155 casos de prueba y una corrección medida que cambió 19 decisiones sobre 122 correos reales.",
      links: [{ label: "Leer el caso de Eventos Barcelona", href: CASO_EB }],
    },
    en: {
      name: "AI email classifier on your own server",
      forWho:
        "Companies that get clients, suppliers and partners in the same inbox and copy each request into the CRM by hand.",
      problem:
        "Opportunities arrive by email mixed in with everything else, and some never make it into the CRM.",
      deliverables: [
        "The inbox is read and every email is classified by AI: client, supplier, partner, spam or other.",
        "The opportunity is created or updated in your CRM, with no duplicates.",
        "The AI model runs on your own server: email never goes to an outside AI provider and there is no per-use cost.",
        "A test suite built from real emails that runs before every change.",
        "Telegram alerts for errors and for emails the AI cannot classify.",
      ],
      timeline: "3-4 weeks",
      proof:
        "Eventos Barcelona: the AI on its own server that reads its email created 17 of the 50 new opportunities in 7 weeks. The flow has 155 test cases and a measured fix that changed 19 decisions across 122 real emails.",
      links: [{ label: "Read the Eventos Barcelona case", href: CASO_EB }],
    },
  },

  // ── Captacion y go-to-market ───────────────────────────────────────────
  {
    slug: "outbound-linkedin-listas",
    linea: "captacion",
    price: { amount: 2500, from: true },
    setup: true,
    monthly: { amount: 600, from: true },
    proofKind: "caso",
    es: {
      name: "Outbound en LinkedIn con listas enriquecidas",
      forWho:
        "Empresas B2B con un cliente ideal claro que quieren abrir conversaciones con decisores todas las semanas.",
      problem:
        "La lista de prospección tiene emails que rebotan y casi ningún móvil, y las invitaciones de LinkedIn salen a mano cuando hay tiempo.",
      deliverables: [
        "Lista de empresas y decisores según tu cliente ideal.",
        "Enriquecimiento con email verificado y móvil, con el coste por contacto acertado medido.",
        "Mensajes por sector y secuencia de invitación y seguimiento desde tu cuenta de LinkedIn, con topes diarios.",
        "Aceptaciones y respuestas volcadas en tu CRM.",
        "Informe mensual de invitaciones, aceptación y conversaciones.",
      ],
      timeline: "A fijar en la consultoría gratuita",
      proof:
        "Eventos Barcelona: 1.298 invitaciones, 477 aceptadas (37 %) y 62 conversaciones. Growth4U: los contactos con móvil pasaron del 9 % al 26 % en un día, a unos 0,17 $ por contacto, y 144 de 167 emails salieron válidos.",
      links: [
        { label: "Leer el caso de Eventos Barcelona", href: CASO_EB },
        { label: "Servicio de outbound en LinkedIn", href: "/servicios/outbound-linkedin" },
      ],
    },
    en: {
      name: "LinkedIn outbound with enriched lists",
      forWho:
        "B2B companies with a clear ideal customer that want to open conversations with decision-makers every week.",
      problem:
        "The prospect list is full of bouncing emails and almost no mobile numbers, and LinkedIn invitations go out by hand whenever someone has time.",
      deliverables: [
        "A list of companies and decision-makers that match your ideal customer.",
        "Enrichment with a verified email and mobile number, with the cost per valid contact measured.",
        "Messages by industry and an invitation and follow-up sequence from your LinkedIn account, with daily caps.",
        "Acceptances and replies logged in your CRM.",
        "A monthly report on invitations, acceptance and conversations.",
      ],
      timeline: "Agreed in the free consultation",
      proof:
        "Eventos Barcelona: 1,298 invitations, 477 accepted (37%) and 62 conversations. Growth4U: contacts with a mobile number went from 9% to 26% in one day, at about $0.17 per contact, and 144 of 167 emails came back valid.",
      links: [
        { label: "Read the Eventos Barcelona case", href: CASO_EB },
        { label: "LinkedIn outbound service", href: "/servicios/outbound-linkedin" },
      ],
    },
  },
  {
    slug: "radar-contenido",
    linea: "captacion",
    price: { amount: 3100, from: false },
    monthly: { amount: 190, from: false },
    proofKind: "propio",
    es: {
      name: "Radar de contenido para una marca",
      forWho:
        "Agencias de marketing (un radar por marca), direcciones de marketing y consultoras que publican cada semana en LinkedIn o en su blog.",
      problem:
        "Cada semana alguien tiene que leer el sector, decidir de qué hablar y empezar el post desde cero.",
      deliverables: [
        "Informe semanal con las noticias, empresas y herramientas del sector que importan a la marca.",
        "Borradores de post y briefs de artículo a partir de esas noticias.",
        "Seguimiento de los competidores que nos indiques.",
        "Resumen por Telegram o correo; el radar aprende de las respuestas del equipo y deja de traer lo que se descarta.",
        "Informe publicado en una página privada con acceso por enlace.",
      ],
      timeline: "3-4 semanas",
      proof:
        "Es el radar que usamos en Rianex: cada lunes nos llega el informe con borradores y lo vamos ajustando con nuestras respuestas.",
      links: [],
    },
    en: {
      name: "Content radar for a brand",
      forWho:
        "Marketing agencies (one radar per brand), in-house marketing teams and consultancies that publish every week on LinkedIn or their blog.",
      problem:
        "Every week someone has to read up on the industry, decide what to talk about and start the post from a blank page.",
      deliverables: [
        "A weekly report with the industry news, companies and tools that matter to the brand.",
        "Post drafts and article briefs based on that news.",
        "Tracking of the competitors you point us to.",
        "A summary by Telegram or email; the radar learns from the team's replies and stops bringing what gets discarded.",
        "The report published on a private page with link access.",
      ],
      timeline: "3-4 weeks",
      proof:
        "It is the radar we use at Rianex: every Monday we get the report with drafts and keep tuning it with our replies.",
      links: [],
    },
  },
  {
    slug: "senales-compra-empresas",
    linea: "captacion",
    price: { amount: 3500, from: true },
    monthly: { amount: 290, from: false },
    proofKind: "propio",
    es: {
      name: "Señales de compra de empresas",
      forWho:
        "Pymes B2B que venden a empresas españolas: software, consultoría o servicios industriales.",
      problem:
        "Las empresas que acaban de constituirse, ampliar capital, ganar un contrato o abrir vacantes son las que compran, y nadie las vigila a diario.",
      deliverables: [
        "Recogida diaria de señales del BORME, la Plataforma de Contratación del Sector Público, noticias y LinkedIn.",
        "Puntuación de cada señal con IA según tu cliente ideal.",
        "Empresa, decisor y datos de contacto de las señales que superan el corte.",
        "Mensajes redactados y secuencia de LinkedIn y correo con topes diarios, con panel para pausar o vetar cualquier envío.",
        "Aviso aparte de las licitaciones que encajan, para preparar la oferta.",
      ],
      timeline: "3-4 semanas",
      proof:
        "Es el sistema con el que buscamos clientes en Rianex: de lunes a viernes, a primera hora, nos manda por Telegram las señales del día.",
      links: [],
    },
    en: {
      name: "Company buying signals",
      forWho:
        "B2B SMEs that sell to Spanish companies: software, consulting or industrial services.",
      problem:
        "Companies that have just been incorporated, raised capital, won a contract or opened vacancies are the ones that buy, and nobody watches for them every day.",
      deliverables: [
        "Daily collection of signals from BORME (the Spanish companies register), the public procurement platform, news and LinkedIn.",
        "Each signal scored by AI against your ideal customer.",
        "Company, decision-maker and contact details for the signals above the cut-off.",
        "Drafted messages and a LinkedIn and email sequence with daily caps, with a panel to pause or veto any send.",
        "A separate alert for matching public tenders, so you can prepare the bid.",
      ],
      timeline: "3-4 weeks",
      proof:
        "It is the system we use to find clients at Rianex: every weekday morning it sends us the day's signals by Telegram.",
      links: [],
    },
  },

  // ── Software e IA a medida ─────────────────────────────────────────────
  {
    slug: "app-interna-hoja-de-calculo",
    linea: "software",
    price: { amount: 6000, from: true },
    monthly: { amount: 200, from: false },
    proofKind: "fundador",
    es: {
      name: "App interna que sustituye una hoja de cálculo",
      forWho:
        "Empresas que llevan producción, comisiones, pedidos o turnos en una hoja de cálculo que comparten varias personas.",
      problem:
        "La hoja crece, alguien rompe una fórmula, nadie sabe quién cambió qué y el cierre de mes depende de una sola persona.",
      deliverables: [
        "Aplicación web con usuarios y permisos por rol.",
        "Las reglas de cálculo de la hoja pasadas a código y probadas con tus datos.",
        "Historial de cambios: quién tocó qué y cuándo.",
        "Migración de los datos actuales y exportación a Excel.",
        "Alojamiento y mantenimiento con la cuota mensual.",
      ],
      timeline: "2-4 semanas",
      proof:
        "Detrás hay un ingeniero industrial que coordina la migración del ERP de la cadena de suministro de Nissan, con cuadros de mando para responsables en varios países.",
      links: [{ label: "Quién está detrás", href: "/sobre-mi" }],
    },
    en: {
      name: "Internal app to replace a spreadsheet",
      forWho:
        "Companies that run production, commissions, orders or shifts on a spreadsheet shared by several people.",
      problem:
        "The spreadsheet grows, someone breaks a formula, nobody knows who changed what and the month-end close depends on one person.",
      deliverables: [
        "A web app with users and role-based permissions.",
        "The spreadsheet's calculation rules turned into code and tested with your data.",
        "A change log: who changed what, and when.",
        "Migration of your current data and export to Excel.",
        "Hosting and maintenance covered by the monthly fee.",
      ],
      timeline: "2-4 weeks",
      proof:
        "Behind it is an industrial engineer who coordinates the ERP migration in Nissan's supply chain, with dashboards for managers in several countries.",
      links: [{ label: "Who is behind it", href: "/sobre-mi" }],
    },
  },

  // ── Auditoria y consultoria de IA ──────────────────────────────────────
  {
    slug: "auditoria-agentes-ia",
    linea: "auditoria",
    price: { amount: 2000, from: true },
    proofKind: "caso",
    es: {
      name: "Auditoría técnica de un sistema de agentes de IA",
      forWho:
        "Empresas y agencias que tienen agentes de IA en producción, o a punto de estarlo, y van a sumar clientes o usuarios.",
      problem:
        "Un sistema de agentes que aguanta con tres clientes puede romperse, exponer datos o disparar el coste con treinta, y nadie de fuera lo ha revisado.",
      deliverables: [
        "Revisión del código, la base de datos y el servidor en producción.",
        "Informe de hallazgos ordenados por gravedad: críticos, altos y medios.",
        "Medición del coste de los modelos y de dónde se va el gasto.",
        "Arquitectura de destino y plan de corrección por fases, con horas estimadas.",
        "Presupuesto cerrado para la corrección, si quieres que la hagamos nosotros.",
      ],
      timeline: "2 semanas",
      proof:
        "Tribeca Media: auditoría técnica de 16 horas con 3 hallazgos críticos, 9 altos y 6 medios, y un plan de corrección a precio cerrado.",
      links: [{ label: "Leer el caso de Tribeca Media", href: CASO_TRIBECA }],
    },
    en: {
      name: "Technical audit of an AI agent system",
      forWho:
        "Companies and agencies with AI agents in production, or about to be, that are going to add clients or users.",
      problem:
        "An agent system that holds up with three clients can break, expose data or blow up its costs with thirty, and nobody from outside has reviewed it.",
      deliverables: [
        "Review of the code, the database and the production server.",
        "A findings report ranked by severity: critical, high and medium.",
        "Measurement of model costs and where the spend goes.",
        "A target architecture and a phased fix plan with estimated hours.",
        "A fixed quote for the fixes, if you want us to do them.",
      ],
      timeline: "2 weeks",
      proof:
        "Tribeca Media: a 16-hour technical audit with 3 critical, 9 high and 6 medium findings, and a fixed-price fix plan.",
      links: [{ label: "Read the Tribeca Media case", href: CASO_TRIBECA }],
    },
  },
  {
    slug: "auditoria-gasto-ia",
    linea: "auditoria",
    price: { amount: 1500, from: true },
    proofKind: "caso",
    es: {
      name: "Auditoría del gasto en IA",
      forWho:
        "Empresas cuya factura de OpenAI, Anthropic u otro proveedor de modelos crece cada mes sin que nadie sepa qué parte está justificada.",
      problem:
        "La factura de IA sube con el uso y nadie sabe qué llamadas la pagan, qué cliente la consume ni qué tareas podrían ir a un modelo más barato o sin IA.",
      deliverables: [
        "Registro de las llamadas a los modelos: cuántas, a qué modelo y para qué tarea.",
        "Reparto del gasto por cliente, tarea y modelo.",
        "Lista de tareas que pueden pasar a un modelo más barato, a reglas en código o a proceso por lotes.",
        "Plan de ahorro con el impacto estimado de cada cambio.",
      ],
      timeline: "1-2 semanas",
      proof:
        "Tribeca Media: el 64 % de las llamadas iba al modelo caro y el 73 % de los tokens se consumía sin cliente asignado.",
      links: [
        { label: "Leer el caso de Tribeca Media", href: CASO_TRIBECA },
        { label: "Cómo trabajamos la IA selectiva", href: "/servicios/ia-selectiva" },
      ],
    },
    en: {
      name: "AI spend audit",
      forWho:
        "Companies whose OpenAI, Anthropic or other model provider bill grows every month without anyone knowing which part is justified.",
      problem:
        "The AI bill rises with usage and nobody knows which calls drive it, which client consumes it or which tasks could go to a cheaper model or need no AI at all.",
      deliverables: [
        "A log of model calls: how many, to which model and for which task.",
        "Spend broken down by client, task and model.",
        "A list of tasks that can move to a cheaper model, to rules in code or to batch processing.",
        "A savings plan with the estimated impact of each change.",
      ],
      timeline: "1-2 weeks",
      proof:
        "Tribeca Media: 64% of calls went to the expensive model and 73% of tokens were used with no client assigned.",
      links: [
        { label: "Read the Tribeca Media case", href: CASO_TRIBECA },
        { label: "How we approach selective AI", href: "/servicios/ia-selectiva" },
      ],
    },
  },
  {
    slug: "revision-independiente-ia",
    linea: "auditoria",
    price: { amount: 1500, from: true },
    proofKind: "caso",
    es: {
      name: "Revisión independiente de un desarrollo con IA",
      forWho:
        "Empresas que han encargado un desarrollo con IA a otro proveedor o a su equipo interno y quieren una segunda opinión antes de darlo por bueno.",
      problem:
        "Quien construye el sistema es quien dice que está terminado, y dirección no tiene forma de comprobarlo.",
      deliverables: [
        "Comprobación en el código y en el servidor de lo que se ha dado por hecho.",
        "Lista de puntos abiertos, cada uno con su responsable.",
        "Resumen para dirección: qué está bien, qué falta y qué riesgo tiene cada punto.",
        "Calendario propuesto para cerrar lo pendiente.",
      ],
      timeline: "1-2 semanas",
      proof:
        "Tribeca Media: revisamos de forma independiente el trabajo de su equipo y dejamos 9 puntos abiertos, cada uno con su responsable.",
      links: [{ label: "Leer el caso de Tribeca Media", href: CASO_TRIBECA }],
    },
    en: {
      name: "Independent review of an AI build",
      forWho:
        "Companies that have commissioned an AI build from another provider or their in-house team and want a second opinion before signing it off.",
      problem:
        "The people who build the system are the ones who say it is finished, and management has no way to check.",
      deliverables: [
        "Verification in the code and on the server of what has been reported as done.",
        "A list of open items, each with an owner.",
        "A summary for management: what is fine, what is missing and the risk of each item.",
        "A proposed schedule to close what is pending.",
      ],
      timeline: "1-2 weeks",
      proof:
        "Tribeca Media: we independently reviewed their team's work and left 9 open items, each with an owner.",
      links: [{ label: "Read the Tribeca Media case", href: CASO_TRIBECA }],
    },
  },
];

export const OFERTA_SLUGS = OFERTAS.map((o) => o.slug);

export function ofertasDeLinea(linea: LineaId) {
  return OFERTAS.filter((o) => o.linea === linea);
}

/** 2000 -> "2.000 €" / "€2,000". A mano: Intl en es-ES no agrupa los miles de 4 cifras. */
export function eur(amount: number, lang: Lang): string {
  const grouped = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, lang === "es" ? "." : ",");
  return lang === "es" ? `${grouped} €` : `€${grouped}`;
}

const T = {
  es: { from: "desde", vat: "+ IVA", month: "/mes", setup: "Puesta en marcha" },
  en: { from: "from", vat: "+ VAT", month: "/month", setup: "Setup" },
} as const;

/** Rotulo del precio principal: "Puesta en marcha" o "Proyecto". */
export function rotuloPrecio(o: Oferta, lang: Lang): string {
  if (o.setup) return T[lang].setup;
  return lang === "es" ? "Proyecto" : "Project";
}

/** "desde 2.000 € + IVA" / "from €2,000 + VAT" */
export function precioProyecto(o: Oferta, lang: Lang): string {
  const t = T[lang];
  return `${o.price.from ? `${t.from} ` : ""}${eur(o.price.amount, lang)} ${t.vat}`;
}

/** "150 €/mes + IVA", "desde 600 €/mes + IVA"; null si no hay cuota. */
export function precioCuota(o: Oferta, lang: Lang): string | null {
  if (!o.monthly) return null;
  const t = T[lang];
  return `${o.monthly.from ? `${t.from} ` : ""}${eur(o.monthly.amount, lang)}${t.month} ${t.vat}`;
}

/** Precio en una linea, para llms.txt y textos cortos. */
export function precioTexto(o: Oferta, lang: Lang): string {
  const t = T[lang];
  const proyecto = `${o.setup ? `${t.setup.toLowerCase()} ` : ""}${precioProyecto(o, lang)}`;
  const cuota = precioCuota(o, lang);
  return cuota ? `${proyecto} ${lang === "es" ? "y" : "and"} ${cuota}` : proyecto;
}
