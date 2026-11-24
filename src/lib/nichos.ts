import type { CaseClient } from "@/lib/servicios";
import { getServicio } from "@/lib/servicios";
import { SECTORES } from "@/lib/sectores";
import { SERVICIO_VIDEO } from "@/lib/servicio-media";
import { CASOS } from "@/lib/casos";

// Landings de campaña por nicho (/l/<nicho>): los sectores de "Para quién
// trabajamos". Para Meta, LinkedIn y outbound, que segmentan por público:
// quien llega tiene que reconocerse en el titular, en los problemas y en el
// caso. Solo en castellano y con noindex; las que posicionan son las páginas
// de /soluciones.
//
// Clínicas y eventos reutilizan los problemas, lo que automatizamos y las
// preguntas de sectores.ts, que ya están publicados. Agencias, inmobiliarias y
// negocios con cita llevan copia propia. Regla de siempre: ni cifras ni
// clientes que no estén publicados; Hospital Capilar, siempre "con Growth4U".
//
// Control con cámaras e IA (24-nov-2026): una landing por sector
// (/l/camaras-ia-<sector>) del servicio control-con-camaras-ia. No hay caso
// propio todavía, así que la banda de prueba ofrece la prueba con las
// grabaciones del cliente. Las preguntas comunes (cámaras, caras, ley y
// precio) salen de la ficha del servicio para que digan siempre lo mismo.

type Item = { title: string; desc: string };
type Faq = { q: string; a: string };
type Video = { src: string; poster: string; demo?: boolean; caption?: string };

export type Nicho = {
  /** Title de la pestaña y de la tarjeta social. */
  title: string;
  h1: string;
  lead: string;
  outcomes: string[];
  painsTitle: string;
  pains: Item[];
  /** Título de la lista de soluciones; por defecto "Qué automatizamos". */
  automationsTitle?: string;
  automations: Item[];
  /** Ejemplo de cuatro pasos (sale en el titular si no hay vídeo). */
  flow: { label: string; text: string }[];
  /** Servicios que lo componen, con enlace a su ficha. */
  services: string[];
  cases: CaseClient[];
  /** Frase de la banda de prueba cuando el nicho no tiene caso propio. */
  proofLine?: string;
  video?: Video;
  /** Captura de lo que ve quien dirige el negocio (el panel de control con cámaras). */
  panel?: { title: string; lead: string; src: string; alt: string; caption: string };
  care?: { title: string; items: string[] };
  timeline: string;
  faqs: Faq[];
  /** Página de /soluciones del sector, si existe (canonical). */
  sector?: string;
};

const PRECIO =
  "Depende del alcance: el discovery arranca en 1.500 €, la implementación completa va de 5.000 € a 25.000 € y hay un retainer mensual opcional de mantenimiento. El precio exacto se confirma tras la consultoría gratuita, no antes.";

const clinicas = SECTORES.clinicas.es;
const eventos = SECTORES.eventos.es;
const agente = getServicio("agente-ia-whatsapp", "es")!;
const faqAgente = (q: string) => {
  const f = agente.faqs.find((x) => x.q === q);
  if (!f) throw new Error(`FAQ del agente no encontrada: ${q}`);
  return f;
};

const videoCaso = (slug: string, caption: string): Video | undefined => {
  const v = CASOS[slug]?.video;
  return v ? { src: v.src, poster: v.poster, caption } : undefined;
};

const PROOF_SIN_CASO =
  "Sistemas de IA en producción en empresas de eventos, marketing y salud. Te enseñamos los casos en la consultoría.";

// ── Control con cámaras e IA ───────────────────────────────────────────────
const camaras = getServicio("control-con-camaras-ia", "es")!;
const faqCamaras = (q: string) => {
  const f = camaras.faqs.find((x) => x.q === q);
  if (!f) throw new Error(`FAQ de cámaras no encontrada: ${q}`);
  return f;
};
const FAQ_CAMARAS_SIRVEN = faqCamaras("¿Sirven las cámaras que ya tengo?");
const FAQ_CAMARAS_CARAS = faqCamaras("¿Reconoce caras o identifica a las personas?");
const FAQ_CAMARAS_LEY = faqCamaras("¿Se puede analizar con IA el vídeo de las cámaras?");
const FAQ_CAMARAS_PRECIO = faqCamaras("¿Cuánto cuesta?");

const PROOF_CAMARAS =
  "Sin comprar equipos: antes de instalar nada, una prueba con unas horas de grabación de tus propias cámaras para ver qué se puede medir y con qué fiabilidad.";

const CUIDADO_CAMARAS = [
  "Detecta personas, vehículos y objetos como formas: no sabe quién es quién ni guarda caras.",
  "Mide la operación (mesas, plazas, colas, muelles), no a cada empleado: los datos van por zona y por franja.",
  "El vídeo se analiza en tus propios sistemas, sin comprar equipos, y solo salen tiempos, recuentos y avisos.",
  "Te damos el texto para informar a la plantilla y la descripción técnica para tu asesor de protección de datos.",
];

const cuidadoCamaras = (extra?: string) => ({
  title: "Sin reconocimiento facial y con la ley en regla",
  items: extra ? [...CUIDADO_CAMARAS, extra] : CUIDADO_CAMARAS,
});

const PLAZO_CAMARAS =
  "Entre 3 y 6 semanas desde la consultoría. Lo primero es la prueba con unas horas de grabación de tus cámaras, en un día normal de trabajo: va aparte de la consultoría y con precio cerrado.";

export const NICHOS: Record<string, Nicho> = {
  "agencias-de-marketing": {
    title: "Automatización con IA para agencias de marketing",
    h1: "Tu agencia lleva más clientes sin contratar a más gente.",
    lead: "Agentes de IA que revisan las campañas de Meta y Google Ads y proponen cambios con aprobación humana, captación con scoring en GoHighLevel, e informes y propuestas que se hacen solos.",
    outcomes: [
      "Campañas revisadas cada día, no cuando hay tiempo",
      "Los leads de tus clientes, contestados y cualificados al momento",
      "Informes y propuestas sin horas de copiar y pegar",
    ],
    painsTitle: "Dónde se le va el margen a una agencia",
    pains: [
      { title: "Campañas revisadas tarde", desc: "Un anuncio fatigado o un presupuesto mal repartido se ve en la reunión semanal, cuando ya ha gastado." },
      { title: "Informes a mano", desc: "Cada mes, horas sacando datos de Meta, Google y el CRM para montar el mismo informe para cada cliente." },
      { title: "Leads que nadie sigue", desc: "La campaña trae leads, pero el cliente tarda en contestarlos y acaba diciendo que la agencia no le trae ventas." },
      { title: "Propuestas y altas lentas", desc: "Cada cliente nuevo pide una propuesta a medida y un alta que el equipo monta a mano." },
    ],
    automations: [
      { title: "Agente de performance", desc: "Revisa Meta y Google Ads, detecta lo que deja de funcionar y propone pausar, bajar presupuesto o crear campañas. Nada se ejecuta sin aprobación." },
      { title: "Creatividades cuando un anuncio se fatiga", desc: "Genera una imagen nueva y la deja lista para revisar. Solo se sube lo que se aprueba." },
      { title: "Captación con scoring", desc: "Cada lead entra en GoHighLevel con una puntuación y su seguimiento automático, para la agencia o para sus clientes." },
      { title: "Respuesta a los leads de tus clientes", desc: "Un agente de WhatsApp que contesta y agenda por ellos: el resultado de la campaña se ve en ventas, no solo en leads." },
      { title: "Informes que se hacen solos", desc: "Los datos de las plataformas y del CRM, en el mismo informe cada semana, sin montarlo a mano." },
      { title: "Propuestas en minutos", desc: "Un formulario corto tras la llamada y la propuesta sale en web y PDF, con tu marca." },
    ],
    flow: [
      { label: "Cada mañana", text: "El agente revisa las campañas de cada cliente en Meta y Google Ads." },
      { label: "Detecta", text: "Un anuncio fatigado o un conjunto que gasta sin convertir." },
      { label: "Propone", text: "Pausar, bajar presupuesto o una creatividad nueva, con el motivo." },
      { label: "Aprobado", text: "Una persona lo aprueba y se ejecuta; todo queda registrado." },
    ],
    services: ["automatizacion-procesos-ia", "embudo-de-captacion", "agente-ia-whatsapp", "generador-de-propuestas"],
    cases: ["Tribeca Media", "Growth4U"],
    video: videoCaso("tribeca-media", "El caso de Tribeca Media, en vídeo."),
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
        q: "¿Con qué herramientas trabajáis?",
        a: "Meta Ads y Google Ads; GoHighLevel o HubSpot como CRM; Claude u OpenAI para los agentes, y n8n, Make o Zapier para conectar el resto. Partimos de lo que ya usáis.",
      },
      { q: "¿Cuánto cuesta?", a: PRECIO },
    ],
  },

  "empresas-de-eventos": {
    title: "Automatización con IA para empresas de eventos",
    h1: "Tu propuesta llega antes que la de la competencia.",
    lead: "Propuesta en web y PDF minutos después de la llamada, cada correo de clientes, artistas y proveedores en su sitio y seguimiento automático. En Eventos Barcelona, de 1-3 días a 8 minutos.",
    outcomes: [
      "La propuesta sale el mismo día de la llamada",
      "Todas con el mismo formato, precios y margen",
      "Seguimiento de cada presupuesto hasta que dice sí o no",
    ],
    painsTitle: eventos.painsTitle,
    pains: eventos.pains,
    automations: eventos.automations,
    flow: getServicio("generador-de-propuestas", "es")!.flow,
    services: ["generador-de-propuestas", "implementacion-crm-gohighlevel", "automatizacion-procesos-ia"],
    cases: ["Eventos Barcelona"],
    video: videoCaso("eventos-barcelona", "El caso de Eventos Barcelona, en vídeo."),
    timeline: eventos.timeline,
    faqs: eventos.faqs.slice(0, 4),
    sector: "eventos",
  },

  clinicas: {
    title: "Automatización con IA para clínicas y hospitales",
    h1: "Ni una llamada sin coger ni un hueco vacío en la agenda.",
    lead: "Respuesta inmediata por WhatsApp y teléfono, recordatorios con confirmación, lista de espera y precualificación por tratamiento, conectados a tu software de citas.",
    outcomes: [
      "Cada paciente recibe respuesta en minutos, también fuera de horario",
      "Menos ausencias, con recordatorios que se confirman solos",
      "Las cancelaciones se convierten en citas con la lista de espera",
    ],
    painsTitle: clinicas.painsTitle,
    pains: clinicas.pains,
    automations: clinicas.automations,
    flow: agente.flow,
    services: ["agente-ia-whatsapp", "embudo-de-captacion", "integracion-gohighlevel-hubspot"],
    cases: ["Hospital Capilar"],
    video: { ...SERVICIO_VIDEO["agente-ia-whatsapp"] },
    care: clinicas.care,
    timeline: clinicas.timeline,
    faqs: clinicas.faqs.slice(0, 4),
    sector: "clinicas",
  },

  inmobiliarias: {
    title: "Automatización con IA para inmobiliarias",
    h1: "Cada lead de los portales, atendido antes de que llame a otra agencia.",
    lead: "Respuesta al momento a los contactos de los portales y de tu web, cualificación por presupuesto y zona, visitas agendadas y cada operación en el CRM.",
    outcomes: [
      "Respuesta en minutos a cada lead, también el fin de semana",
      "Solo visitas con compradores que encajan en presupuesto y zona",
      "Inmuebles, compradores y visitas en un solo CRM",
    ],
    painsTitle: "Dónde se pierden operaciones",
    pains: [
      { title: "El lead que se enfría", desc: "Quien pregunta por un piso escribe a varias agencias. Si contestas al día siguiente, ya ha quedado con otra." },
      { title: "Visitas que no encajan", desc: "Se enseñan pisos a quien no tiene el presupuesto ni la financiación, y la tarde se va en visitas que no acaban en nada." },
      { title: "Contactos repartidos", desc: "Los leads viven en el correo de cada agente, en WhatsApp y en una hoja de cálculo. Cuando alguien se va, se lleva su cartera." },
      { title: "Propietarios sin noticias", desc: "El propietario no sabe cuántas visitas ha tenido su inmueble y llama para preguntar." },
    ],
    automations: [
      { title: "Respuesta inmediata", desc: "El aviso del portal o el formulario de la web se lee solo, se crea el contacto y sale una respuesta por WhatsApp o correo en minutos." },
      { title: "Cualificación", desc: "Presupuesto, zona, plazo y si necesita financiación, antes de proponer una visita." },
      { title: "Visitas agendadas", desc: "El comprador elige hueco en la agenda del comercial y recibe recordatorio; si cancela, el hueco se libera." },
      { title: "El CRM de la agencia", desc: "Inmuebles, compradores, propietarios y operaciones en GoHighLevel o HubSpot, con el pipeline a la vista." },
      { title: "Informe al propietario", desc: "Las visitas y el interés que ha tenido su inmueble, enviados solos cada semana." },
    ],
    flow: [
      { label: "Sábado 20:15", text: "Llega un contacto de un portal por un piso de tres habitaciones." },
      { label: "Al momento", text: "El agente responde por WhatsApp y pregunta presupuesto, zona y financiación." },
      { label: "Si encaja", text: "Ofrece huecos para visitar y la visita queda en la agenda del comercial." },
      { label: "Lunes", text: "El comercial llega con la visita confirmada y la ficha del comprador en el CRM." },
    ],
    services: ["agente-ia-whatsapp", "implementacion-crm-gohighlevel", "automatizacion-procesos-ia"],
    cases: [],
    proofLine: PROOF_SIN_CASO,
    timeline:
      "Entre 4 y 8 semanas desde la consultoría. Lo primero suele ser la respuesta inmediata a los leads de los portales: es lo que antes se nota.",
    faqs: [
      {
        q: "¿Se conecta con los portales inmobiliarios?",
        a: "Los portales avisan de cada contacto por correo, y ese aviso es la entrada: el sistema lo lee, crea el contacto y responde. Si tu software inmobiliario tiene API, también se conecta a él.",
      },
      {
        q: "¿El agente negocia o valora inmuebles?",
        a: "No. Informa de lo que está publicado, pregunta lo necesario y agenda la visita. Negociar y valorar es cosa del comercial: lo que se sale de ahí pasa a una persona.",
      },
      {
        q: "¿De quién son los datos de los compradores?",
        a: "De la agencia. Se guardan en tu CRM, con el consentimiento registrado, y las cuentas están a tu nombre, no al nuestro.",
      },
      { q: "¿Cuánto cuesta?", a: PRECIO },
    ],
  },

  "negocios-con-cita": {
    title: "Agente de IA para negocios con cita previa",
    h1: "Tu agenda se llena sola, aunque estés con un cliente.",
    lead: "Peluquerías, estética, fisioterapia, consultas o centros deportivos: un agente de IA contesta por WhatsApp y por teléfono, da la cita, la recuerda y cubre las cancelaciones.",
    outcomes: [
      "Ningún mensaje ni llamada sin contestar, aunque tengas las manos ocupadas",
      "Menos ausencias, con recordatorios que se confirman solos",
      "Las cancelaciones se cubren con la lista de espera",
    ],
    painsTitle: "Dónde se pierden citas",
    pains: [
      { title: "El teléfono que no puedes coger", desc: "Estás con un cliente y suena el teléfono. Quien llama no deja mensaje: llama al siguiente." },
      { title: "Mensajes a deshoras", desc: "Se piden citas por WhatsApp a las once de la noche y se contestan al día siguiente, cuando ya han reservado en otro sitio." },
      { title: "El hueco vacío", desc: "Una cita a la que no viene nadie es una hora que ya no se puede volver a vender." },
      { title: "El cliente que no repite", desc: "Quedó contento, pero nadie le recordó que ya tocaba volver." },
    ],
    automations: [
      { title: "Agente de WhatsApp y voz", desc: "Contesta, resuelve las dudas de siempre (precios, horarios y servicios) y da la cita en tu agenda." },
      { title: "Recordatorios con confirmación", desc: "Al reservar y el día antes. Si cancela, el hueco se libera solo." },
      { title: "Lista de espera", desc: "Cuando se libera un hueco, se avisa a quien lo estaba esperando." },
      { title: "Vuelta del cliente", desc: "Un mensaje cuando toca repetir: el corte, la revisión o la siguiente sesión." },
      { title: "Reseñas", desc: "Después de la cita, se pide la reseña a los clientes contentos." },
    ],
    flow: agente.flow,
    services: ["agente-ia-whatsapp", "implementacion-crm-gohighlevel"],
    cases: [],
    proofLine: PROOF_SIN_CASO,
    video: { ...SERVICIO_VIDEO["agente-ia-whatsapp"] },
    timeline: agente.timeline,
    faqs: [
      faqAgente("¿Puede agendar citas en mi calendario?"),
      faqAgente("¿Sirve la app de WhatsApp Business del móvil?"),
      faqAgente("¿Qué pasa si el agente no sabe responder?"),
      faqAgente("¿Cuánto cuesta un agente de IA para WhatsApp?"),
    ],
  },

  // ── Control con cámaras e IA ─────────────────────────────────────────────

  "camaras-ia-restaurantes": {
    title: "Cámaras con IA para restaurantes",
    h1: "Ninguna mesa esperando sin que nadie lo sepa.",
    lead: "Tus cámaras miden cuánto espera cada mesa a que la atiendan, cuánto tarda en recogerse y cuánto dura cada comida, y avisan al encargado en cuanto algo se pasa de tiempo.",
    outcomes: [
      "Aviso al encargado cuando una mesa lleva demasiado sin atender",
      "Mesas recogidas antes, cuando hay gente esperando en la puerta",
      "Cuánto dura cada comida y cuántas vueltas da cada mesa, por franja",
    ],
    painsTitle: "Dónde se pierde el servicio",
    pains: [
      { title: "La mesa olvidada", desc: "Se sientan, nadie se acerca y a los diez minutos se levantan o escriben una reseña de una estrella. Nadie se entera hasta que ya ha pasado." },
      { title: "Mesas sin recoger", desc: "Los clientes se han ido, pero la mesa sigue con los platos mientras otros esperan en la puerta para sentarse." },
      { title: "Rotación a ojo", desc: "No sabes cuánto dura de verdad una comida en cada franja ni cuántos turnos caben en una noche." },
      { title: "El encargado no llega a todo", desc: "Una persona no puede vigilar a la vez el salón, la terraza y la puerta en plena hora punta." },
    ],
    automationsTitle: "Qué medimos",
    automations: [
      { title: "Mesa sin atender", desc: "Cuenta los minutos desde que se sienta un cliente hasta que se acerca alguien del equipo, y avisa si se pasa del límite que fijes." },
      { title: "Mesa sin recoger", desc: "Detecta cuándo se levantan los clientes y cuánto tarda la mesa en quedar lista para los siguientes." },
      { title: "Duración de cada comida", desc: "Desde que se sientan hasta que se van, por mesa, zona y franja: la rotación real de cada servicio." },
      { title: "Espera hasta el primer plato", desc: "Cuánto pasa desde que se sientan hasta que llega la comida, en las mesas que la cámara ve bien." },
      { title: "Cola en la puerta", desc: "Cuántas personas esperan mesa y cuánto tiempo, para saber a qué horas se va clientela." },
      { title: "Informe de cada servicio", desc: "Al cierre, un resumen con las esperas, las mesas que más tardaron y las horas de más presión." },
    ],
    flow: [
      { label: "21:10", text: "Una pareja se sienta en la mesa 12 de la terraza." },
      { label: "21:15", text: "Nadie se ha acercado todavía: la IA lo ve en la cámara de la terraza." },
      { label: "Aviso", text: "El encargado recibe en el móvil: «Mesa 12, terraza: 5 minutos sin atender»." },
      { label: "Al cierre", text: "El informe del servicio recoge cada espera, la rotación por mesa y las horas punta." },
    ],
    services: ["control-con-camaras-ia", "automatizacion-procesos-ia"],
    cases: [],
    proofLine: PROOF_CAMARAS,
    video: {
      ...SERVICIO_VIDEO["control-con-camaras-ia"],
      caption: "Simulación con un restaurante y datos ficticios: la cámara, el aviso y el panel del gerente.",
    },
    panel: {
      title: "Lo que ve el gerente",
      lead: "Un panel web con el plano del local en directo, la espera media hasta atender, las mesas sin recoger, lo que dura cada comida y los avisos de la noche. Y la espera por franja horaria, para ajustar los turnos.",
      src: "/videos/panel-gerente-restaurante.jpg",
      alt: "Panel de control de sala de un restaurante: plano con el estado de cada mesa, indicadores de espera, mesas sin recoger y duración de la comida, avisos de la noche y espera media por franja horaria.",
      caption: "Ejemplo con datos ficticios. El panel se adapta a lo que quieras medir.",
    },
    care: cuidadoCamaras(),
    timeline: PLAZO_CAMARAS,
    faqs: [
      {
        q: "¿Cómo distingue a un camarero de un cliente?",
        a: "Por cómo se mueve y, si lo hay, por el uniforme: el cliente se sienta y se queda; el camarero llega de pie, se para un momento y se va. Se ajusta en la prueba con tus grabaciones, en un servicio de verdad.",
      },
      FAQ_CAMARAS_SIRVEN,
      FAQ_CAMARAS_CARAS,
      FAQ_CAMARAS_LEY,
      FAQ_CAMARAS_PRECIO,
    ],
  },

  "camaras-ia-parkings": {
    title: "Cámaras con IA para parkings",
    h1: "Cuántas plazas quedan libres, sin dar una vuelta.",
    lead: "Las cámaras del parking cuentan las plazas libres por planta o zona, miden cuánto lleva cada vehículo y avisan cuando alguien se pasa del tiempo, aparca donde no debe o se forma cola en la barrera.",
    outcomes: [
      "Plazas libres en tiempo real por planta o zona, en una pantalla o en tu web",
      "Aviso cuando un vehículo supera el tiempo permitido",
      "Plazas de recarga y zonas de carga libres para quien las necesita",
    ],
    painsTitle: "Dónde se pierde dinero en un parking",
    pains: [
      { title: "Vueltas buscando sitio", desc: "El cliente entra, da vueltas sin encontrar plaza y se va, aunque quedaban libres en otra planta." },
      { title: "Estancias sin control", desc: "En el parking de clientes de un súper, un hotel o un centro comercial hay coches que pasan el día entero sin consumir." },
      { title: "Plazas mal usadas", desc: "Plazas de recarga ocupadas por quien no carga, zonas de carga llenas y coches en zonas de paso, y nadie lo ve a tiempo." },
      { title: "Datos que no existen", desc: "No sabes a qué horas se llena, cuánto dura una estancia media ni qué plantas quedan siempre vacías." },
    ],
    automationsTitle: "Qué medimos",
    automations: [
      { title: "Plazas libres en tiempo real", desc: "Ocupación por plaza, planta o zona, para los paneles de la entrada, tu web o tu app." },
      { title: "Tiempo de estancia", desc: "Cuánto lleva cada vehículo, con aviso cuando supera el límite del parking de clientes o de la zona de carga." },
      { title: "Plazas y zonas mal usadas", desc: "Plazas de recarga ocupadas sin cargar, zonas de carga ocupadas más de lo permitido y vehículos en zonas de paso." },
      { title: "Entradas, salidas y colas", desc: "Vehículos por hora y aviso cuando se forma cola en la barrera de entrada o de salida." },
      { title: "Lectura de matrículas", desc: "En la entrada y la salida, para cruzar estancias con tickets o abonados, si la cámara tiene el ángulo y la resolución." },
      { title: "Informe de ocupación", desc: "Horas de más ocupación, estancia media y plantas infrautilizadas, cada semana." },
    ],
    flow: [
      { label: "Sábado 11:30", text: "La planta −1 se llena; en la −2 quedan plazas libres." },
      { label: "Al momento", text: "El panel de la entrada y la web muestran las plazas libres de cada planta." },
      { label: "13:45", text: "Un coche lleva más de 3 horas en el parking de clientes, que tiene un límite de 2." },
      { label: "Aviso", text: "El vigilante recibe la plaza y la hora de entrada para actuar." },
    ],
    services: ["control-con-camaras-ia", "automatizacion-procesos-ia"],
    cases: [],
    proofLine: PROOF_CAMARAS,
    care: cuidadoCamaras(
      "La matrícula es un dato personal: si se lee, se guarda solo el tiempo necesario para calcular la estancia o el cobro.",
    ),
    timeline: PLAZO_CAMARAS,
    faqs: [
      {
        q: "¿Hace falta un sensor en cada plaza?",
        a: "No. Una cámara bien colocada cubre muchas plazas a la vez; usamos las que ya tienes y, si alguna zona queda ciega, te decimos dónde poner una más. Además de la ocupación, mide estancias, plazas mal usadas y colas, que un sensor por plaza no ve.",
      },
      {
        q: "¿Se conecta con la barrera o con el sistema de cobro?",
        a: "Si tu sistema de control de accesos tiene API o exporta los tickets, cruzamos los datos: estancias por ticket, abonados y ocupación. Si no, el análisis de las cámaras funciona igual por su cuenta.",
      },
      FAQ_CAMARAS_SIRVEN,
      FAQ_CAMARAS_LEY,
      FAQ_CAMARAS_PRECIO,
    ],
  },

  "camaras-ia-tiendas": {
    title: "Cámaras con IA para tiendas",
    h1: "Abre otra caja antes de que la cola se vaya.",
    lead: "Tus cámaras cuentan quién entra, miden la cola de cada caja y mostrador y avisan cuando hay que abrir otra. Cruzado con los tickets, sabes cuántos de los que entran acaban comprando.",
    outcomes: [
      "Aviso para abrir caja cuando la cola pasa del límite",
      "Visitantes por hora y cuántos compran, con los tickets del TPV",
      "Turnos ajustados a la afluencia real, no a ojo",
    ],
    painsTitle: "Dónde se van las ventas",
    pains: [
      { title: "La cola que abandona", desc: "Una cola larga en caja o en el mostrador de charcutería, y el cliente deja la cesta o se va sin pedir." },
      { title: "Turnos a ojo", desc: "Los horarios del equipo se hacen por intuición, sin saber a qué horas entra de verdad la gente." },
      { title: "Ventas sin contexto", desc: "Sabes lo que facturas, pero no cuánta gente entró: un mal día no sabes si fue por menos visitas o por menos compras." },
      { title: "Zonas que nadie mira", desc: "No sabes qué zonas o escaparates hacen pararse a la gente y cuáles se cruzan sin mirar." },
    ],
    automationsTitle: "Qué medimos",
    automations: [
      { title: "Colas en caja y mostrador", desc: "Personas en cola y tiempo de espera, con aviso al encargado para abrir otra caja." },
      { title: "Entradas por hora", desc: "Visitantes en la puerta por hora y por día, sin identificar a nadie." },
      { title: "Conversión de la tienda", desc: "Visitantes cruzados con los tickets del TPV: qué parte de los que entran acaba comprando." },
      { title: "Aforo", desc: "Personas dentro en cada momento, con aviso si se acerca al máximo permitido." },
      { title: "Zonas calientes", desc: "Por dónde pasa la gente y dónde se para, para decidir dónde va cada producto." },
      { title: "Informe semanal", desc: "Afluencia, colas y conversión por día y franja, para ajustar los turnos." },
    ],
    flow: [
      { label: "Sábado 12:40", text: "Cinco personas en la cola de la caja 1; la caja 2 está cerrada." },
      { label: "La IA mide", text: "La espera pasa de 4 minutos, el límite que fijaste." },
      { label: "Aviso", text: "El encargado recibe «Caja 1: 5 en cola, abrir caja 2» en el móvil o en la pantalla del almacén." },
      { label: "Al cierre", text: "El informe del día cruza las visitas con los tickets y marca las horas con más cola." },
    ],
    services: ["control-con-camaras-ia", "automatizacion-procesos-ia"],
    cases: [],
    proofLine: PROOF_CAMARAS,
    care: cuidadoCamaras(),
    timeline: PLAZO_CAMARAS,
    faqs: [
      {
        q: "¿Se conecta con mi TPV?",
        a: "Si tu TPV o tu programa de gestión exporta los tickets por API o en un fichero diario, sí: es lo que permite calcular la conversión. Si no, el recuento de visitantes y las colas funcionan igual.",
      },
      FAQ_CAMARAS_SIRVEN,
      FAQ_CAMARAS_CARAS,
      FAQ_CAMARAS_PRECIO,
    ],
  },

  "camaras-ia-supermercados": {
    title: "Cámaras con IA para supermercados",
    h1: "Sabes cuándo se va a llenar la tienda antes de que pase.",
    lead: "Las cámaras del parking cuentan los coches que entran y cuánto se queda cada uno; las de dentro miden las colas y avisan de un derrame. Con eso abres cajas a tiempo, repones y limpias en las horas flojas y decides cuándo lanzar una promoción.",
    outcomes: [
      "Visitas por día y hora, contadas en el parking",
      "Aviso para abrir caja antes de que se forme la cola",
      "Derrames y aseos atendidos según el uso, no según la hora",
    ],
    painsTitle: "Dónde se te escapan ventas",
    pains: [
      { title: "Colas que espantan", desc: "El sábado a mediodía la cola llega al pasillo y hay quien deja el carro y se va. La caja se abre cuando ya es tarde." },
      { title: "Visitas que nadie cuenta", desc: "Sabes lo que facturas cada día, pero no cuánta gente vino ni a qué hora: un mal día no sabes si fue por menos clientes o por menos compra." },
      { title: "Promociones a ciegas", desc: "Las ofertas se lanzan sin saber qué horas están flojas ni si traen a más gente al parking." },
      { title: "Limpieza a horario fijo", desc: "Se limpia cada dos horas aunque no haya pasado nadie, y un derrame en un pasillo espera a que alguien lo vea." },
    ],
    automationsTitle: "Qué medimos",
    automations: [
      { title: "Coches que entran", desc: "Entradas al parking cada 15 minutos, por día y por hora: el mapa de cuándo viene tu clientela." },
      { title: "Duración de la compra", desc: "Cuánto se queda cada coche en su plaza, sin leer matrículas: casi lo que dura la compra." },
      { title: "Previsión de cola", desc: "Si entran muchos coches de golpe, aviso para abrir caja antes de que se forme la cola." },
      { title: "Espera en caja", desc: "Personas en cola y tiempo de espera en cada caja y en cada mostrador." },
      { title: "Derrames en los pasillos", desc: "Un líquido o un objeto en el suelo, avisado al equipo de limpieza con el pasillo exacto." },
      { title: "Aseos según el uso", desc: "Entradas contadas desde el pasillo, sin cámaras dentro: se limpia cuando toca, no cada dos horas." },
    ],
    flow: [
      { label: "Sábado 11:30", text: "Entran 26 coches al parking en un cuarto de hora." },
      { label: "Previsión", text: "En unos 10 minutos, esos clientes estarán en caja." },
      { label: "Aviso", text: "El encargado recibe «Abre la caja 3» antes de que se forme la cola." },
      { label: "El lunes", text: "El panel enseña el pico del sábado y la hora más floja de la semana, para ajustar turnos y promociones." },
    ],
    services: ["control-con-camaras-ia", "automatizacion-procesos-ia"],
    cases: [],
    proofLine: PROOF_CAMARAS,
    video: {
      src: "/videos/camaras-supermercado.mp4",
      poster: "/videos/camaras-supermercado.jpg",
      caption: "Simulación con un supermercado y datos ficticios: parking, cajas, limpieza y panel del gerente.",
    },
    panel: {
      title: "Lo que ve el gerente",
      lead: "Un panel web con las visitas por día y hora, la duración media de la compra, la espera en caja y los avisos de limpieza. Y sugerencias concretas: cuántas cajas abrir el sábado, qué hora floja aprovechar con una promoción y cuándo reponer y limpiar sin molestar.",
      src: "/videos/panel-gerente-supermercado.jpg",
      alt: "Panel de un supermercado: mapa de calor de visitas por día y hora, coches hoy, duración de la compra, espera en caja, avisos de limpieza, sugerencias de la semana y entradas cada 15 minutos con previsión.",
      caption: "Ejemplo con datos ficticios. El panel se adapta a lo que quieras medir.",
    },
    care: cuidadoCamaras(
      "No se leen matrículas para medir la estancia: cada coche se sigue en su plaza mientras está aparcado.",
    ),
    timeline: PLAZO_CAMARAS,
    faqs: [
      {
        q: "¿Cómo ayuda a vender más?",
        a: "Con datos que hoy no tienes: a qué horas viene la gente, cuánto se queda y cuánta cola aguanta. Con eso se abren cajas antes de perder clientes en la cola, se lanzan promociones en las horas flojas y se mide si traen más coches. Si además cruzamos las visitas con los tickets del TPV, ves qué parte de los que vienen compran y cuánto, hora a hora.",
      },
      {
        q: "¿Hace falta leer las matrículas?",
        a: "No. Para contar entradas y medir cuánto se queda cada coche basta con seguirlo en su plaza mientras está aparcado. Si algún día hiciera falta leerlas, por ejemplo para limitar el tiempo en un parking gratuito, se guardan solo el tiempo necesario.",
      },
      {
        q: "¿Hay cámaras en los aseos?",
        a: "No, nunca. Se cuentan las entradas desde el pasillo con la cámara que ya vigila esa zona, y el aviso de limpieza salta al llegar al número de usos que fijes.",
      },
      FAQ_CAMARAS_SIRVEN,
      FAQ_CAMARAS_PRECIO,
    ],
  },

  "camaras-ia-limpieza": {
    title: "Cámaras con IA para el servicio de limpieza",
    h1: "Limpiar donde hace falta, cuando hace falta.",
    lead: "Para empresas de limpieza y responsables de instalaciones: las cámaras que ya hay cuentan cuánta gente pasa por cada zona y detectan derrames o papeleras llenas, para limpiar según el uso real y no a horario fijo.",
    outcomes: [
      "Limpieza según el uso de cada zona, no a horario fijo",
      "Derrames y papeleras llenas avisados al momento",
      "Un informe por zona para enseñar el servicio con datos",
    ],
    painsTitle: "Dónde se va el tiempo de limpieza",
    pains: [
      { title: "Limpiar lo que ya está limpio", desc: "Las rondas a horario fijo pasan igual por una zona vacía que por la que han usado doscientas personas." },
      { title: "El derrame que nadie ve", desc: "Un líquido en el suelo de un pasillo o un vestíbulo espera a que alguien lo vea o, peor, a que alguien resbale." },
      { title: "Papeleras desbordadas", desc: "Se vacían cuando toca la ronda, aunque lleven una hora llenas." },
      { title: "Sin datos ante el cliente", desc: "Cuando el cliente se queja, no hay datos de cuánta gente pasó ni de cuánto se tardó en atender cada aviso." },
    ],
    automationsTitle: "Qué medimos",
    automations: [
      { title: "Usos por zona", desc: "Personas que entran en aseos, vestíbulos o salas, contadas desde fuera. Nunca con cámaras dentro de aseos o vestuarios." },
      { title: "Limpieza según el uso", desc: "Aviso al equipo al llegar al número de usos que fijes para cada zona." },
      { title: "Derrames y objetos en el suelo", desc: "Detectados en pasillos y vestíbulos y avisados con la zona exacta." },
      { title: "Papeleras y contenedores", desc: "Aviso cuando una papelera o un contenedor está lleno o desbordado, si la cámara lo ve." },
      { title: "Tiempo de respuesta", desc: "Cuánto pasa desde el aviso hasta que la incidencia desaparece de la imagen, por zona y por turno." },
      { title: "Informe para el cliente", desc: "Usos, avisos y tiempos de respuesta por zona, cada semana, para enseñar el servicio con datos." },
    ],
    flow: [
      { label: "12:40", text: "Han entrado 60 personas en los aseos de la planta 1 desde la última limpieza." },
      { label: "Aviso", text: "El equipo recibe en el móvil: «Aseos planta 1: 60 usos, toca limpiar»." },
      { label: "12:52", text: "La cámara del vestíbulo detecta un derrame junto a la entrada y avisa con la zona." },
      { label: "Viernes", text: "El informe del cliente muestra usos, avisos y tiempos de respuesta por zona." },
    ],
    services: ["control-con-camaras-ia", "automatizacion-procesos-ia"],
    cases: [],
    proofLine: PROOF_CAMARAS,
    care: cuidadoCamaras("Nunca hay cámaras dentro de aseos, vestuarios ni zonas de descanso: se cuenta desde fuera."),
    timeline: PLAZO_CAMARAS,
    faqs: [
      {
        q: "¿Sirve para empresas de limpieza o para el propio negocio?",
        a: "Para los dos. Una empresa de limpieza lo usa para organizar las rondas y enseñar datos a su cliente; un centro comercial, unas oficinas o un supermercado, para avisar a su propio equipo. Las cámaras son las del edificio.",
      },
      {
        q: "¿Controla al personal de limpieza?",
        a: "No es su objetivo: mide zonas, usos e incidencias, no a personas. El tiempo de respuesta se calcula desde el aviso hasta que la incidencia desaparece de la imagen, por zona y por turno. Si los datos se usan también para organizar el trabajo, la plantilla tiene que saberlo antes (art. 89 de la LOPDGDD).",
      },
      FAQ_CAMARAS_SIRVEN,
      FAQ_CAMARAS_LEY,
      FAQ_CAMARAS_PRECIO,
    ],
  },

  "camaras-ia-almacenes": {
    title: "Cámaras con IA para almacenes y logística",
    h1: "Cada muelle, cada camión y cada pasillo, medidos solos.",
    lead: "Las cámaras del almacén miden cuánto pasa cada camión en el muelle, avisan cuando un pasillo o una salida de emergencia queda bloqueada y comprueban el chaleco o el casco en las zonas que lo exigen.",
    outcomes: [
      "Tiempo de carga y descarga de cada camión, por muelle y por franja",
      "Aviso al momento si una salida de emergencia o un pasillo queda bloqueado",
      "Avisos al jefe de turno en las zonas de carretillas",
    ],
    painsTitle: "Dónde se pierde tiempo (y seguridad)",
    pains: [
      { title: "Camiones esperando", desc: "Un muelle ocupado más de la cuenta y los camiones se acumulan en la puerta, con esperas que luego se pagan." },
      { title: "Pasillos y salidas bloqueados", desc: "Un palé mal dejado tapa un pasillo o una salida de emergencia, y nadie lo ve hasta la inspección." },
      { title: "Peatones entre carretillas", desc: "Gente cruzando por donde circulan carretillas, o sin chaleco en las zonas donde es obligatorio." },
      { title: "Tiempos que no se miden", desc: "No sabes cuánto tarda de verdad una descarga ni qué turnos o muelles se atascan." },
    ],
    automationsTitle: "Qué medimos",
    automations: [
      { title: "Ocupación de muelles", desc: "Cuándo atraca y se va cada camión de cada muelle, y cuánto tarda la carga o la descarga." },
      { title: "Cola de camiones", desc: "Vehículos esperando en la entrada o en la campa, con aviso cuando la espera se alarga." },
      { title: "Pasillos y salidas libres", desc: "Aviso si un palé u otro objeto bloquea una salida de emergencia, un extintor o un pasillo marcado." },
      { title: "EPI en zonas obligatorias", desc: "Chaleco reflectante o casco donde son obligatorios, con aviso al jefe de turno sin identificar a la persona." },
      { title: "Peatones y carretillas", desc: "Aviso cuando una persona entra en una zona de circulación de carretillas." },
      { title: "Informe por turno", desc: "Tiempos por muelle, incidencias y horas punta, cada día." },
    ],
    flow: [
      { label: "07:20", text: "Un camión atraca en el muelle 3 para descargar." },
      { label: "La IA mide", text: "Cuenta el tiempo de descarga y ve que otro camión espera en la entrada." },
      { label: "08:05", text: "La descarga pasa de 45 minutos: el jefe de turno recibe el aviso con el muelle y la espera en la puerta." },
      { label: "Al cierre", text: "El informe del turno recoge cada muelle, cada espera y las incidencias de seguridad." },
    ],
    services: ["control-con-camaras-ia", "automatizacion-procesos-ia", "integracion-gohighlevel-hubspot"],
    cases: [],
    proofLine: PROOF_CAMARAS,
    care: cuidadoCamaras(
      "Los avisos de seguridad van al jefe de turno para corregir en el momento, no para sancionar: el sistema no sabe quién es cada persona.",
    ),
    timeline: PLAZO_CAMARAS,
    faqs: [
      {
        q: "¿Se conecta con mi SGA o con las citas de muelle?",
        a: "Si tu programa de almacén o tu sistema de citas de transportistas tiene API, cruzamos cada camión con su cita y su pedido. Si no, los tiempos por muelle se miden igual.",
      },
      {
        q: "¿Sustituye a las medidas de prevención?",
        a: "No. No sustituye a la señalización ni a las medidas obligatorias, y la evaluación de riesgos sigue siendo de tu servicio de prevención. Es una ayuda para ver a tiempo lo que hoy se ve tarde.",
      },
      FAQ_CAMARAS_SIRVEN,
      FAQ_CAMARAS_LEY,
      FAQ_CAMARAS_PRECIO,
    ],
  },

  "camaras-ia-talleres": {
    title: "Cámaras con IA para talleres mecánicos",
    h1: "Qué elevador está parado y qué coche se ha pasado de horas.",
    lead: "Las cámaras del taller miden cuánto pasa cada coche en cada elevador, avisan cuando un trabajo supera las horas presupuestadas y cuando hay clientes esperando en recepción.",
    outcomes: [
      "Ocupación real de cada elevador y cada box, día a día",
      "Aviso cuando un coche supera las horas previstas",
      "Clientes en recepción atendidos antes",
    ],
    painsTitle: "Dónde se van las horas del taller",
    pains: [
      { title: "Elevadores bloqueados", desc: "Un elevador ocupado por un coche que espera una pieza mientras otros esperan fuera." },
      { title: "Horas que se comen el margen", desc: "El trabajo presupuestado en dos horas lleva cinco, y nadie lo ve hasta que se factura." },
      { title: "Recepción sin atender", desc: "El cliente que viene a dejar o a recoger el coche espera de pie mientras todos están en el foso." },
      { title: "Capacidad a ojo", desc: "No sabes cuántas horas de elevador usas de verdad ni cuántas citas más cabrían." },
    ],
    automationsTitle: "Qué medimos",
    automations: [
      { title: "Ocupación de elevadores y boxes", desc: "Cuándo entra y sale cada coche de cada puesto y cuánto tiempo está ocupado." },
      { title: "Horas reales frente a las previstas", desc: "Cruzado con la orden de trabajo, aviso cuando un coche se pasa de las horas presupuestadas." },
      { title: "Clientes en recepción", desc: "Aviso cuando alguien espera en recepción más de unos minutos sin que nadie le atienda." },
      { title: "Coches en la campa", desc: "Cuántos coches esperan fuera y cuánto llevan, para planificar el día." },
      { title: "Informe semanal", desc: "Ocupación por elevador, horas reales por tipo de trabajo y huecos para más citas." },
    ],
    flow: [
      { label: "09:00", text: "Entra un coche al elevador 2 para un cambio de embrague presupuestado en 4 horas." },
      { label: "La IA mide", text: "Cuenta el tiempo que el coche lleva en el elevador." },
      { label: "14:30", text: "Lleva cinco horas y media: el jefe de taller recibe el aviso con el elevador y la orden." },
      { label: "Viernes", text: "El informe semanal muestra la ocupación de cada elevador y cuántas citas más caben." },
    ],
    services: ["control-con-camaras-ia", "agente-ia-whatsapp", "automatizacion-procesos-ia"],
    cases: [],
    proofLine: PROOF_CAMARAS,
    care: cuidadoCamaras(),
    timeline: PLAZO_CAMARAS,
    faqs: [
      {
        q: "¿Se conecta con mi programa de gestión del taller?",
        a: "Si tu programa exporta las órdenes de trabajo con las horas previstas, por API o en un fichero, cruzamos cada coche con su orden. Si no, la ocupación de los elevadores se mide igual.",
      },
      FAQ_CAMARAS_SIRVEN,
      FAQ_CAMARAS_LEY,
      FAQ_CAMARAS_PRECIO,
    ],
  },
};

export const NICHO_SLUGS = Object.keys(NICHOS);
