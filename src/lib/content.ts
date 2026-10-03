// ──────────────────────────────────────────────────────────────────────────
// Fuente única de contenido de la web (bilingüe ES / EN).
// El español va con tildes y ñ correctas. Toda copia visible sale de aquí.
// ──────────────────────────────────────────────────────────────────────────

export type Lang = "es" | "en";

export const LOGOS = {
  hospitalCapilar: "/logos/hospital-capilar-dark.png",
  eventosBarcelona: "/logos/eventos-barcelona-dark.png",
  growth4u: "/logos/growth4u-dark.png",
  tribeca: "/logos/tribeca-dark.png",
};

export const content = {
  es: {
    nav: {
      links: [
        { href: "/servicios", label: "Servicios" },
        { href: "/casos-de-exito", label: "Casos de éxito" },
        { href: "/blog", label: "Blog" },
        { href: "/sobre-mi", label: "Sobre mí" },
      ],
      cta: "Auditoría gratis",
      switchTo: "EN",
      switchLabel: "Ver en inglés",
    },

    hero: {
      eyebrow: "Automatización y desarrollo con IA",
      titlePre: "Automatiza ",
      titleRotating: [
        "la captación de leads",
        "el seguimiento de clientes",
        "tus propuestas comerciales",
        "tus procesos con IA",
      ],
      titlePost: " y recupera 10 horas/semana.",
      subtitle:
        "Automatizamos procesos, desarrollamos agentes y herramientas con IA, conectamos tu CRM con el resto de tu stack y te migramos a GoHighLevel con todo tu histórico.",
      ctaPrimary: "Obtén mi Auditoría Gratuita",
      ctaSecondary: "Ver los servicios",
      note: "Primeros resultados en 4 semanas · Sin compromiso",
      proofMetric: "−32%",
      proofLabel: "coste por paciente (CPP) en 6 semanas",
      proofClient: "Hospital Capilar",
      offeringTitle: "Qué hacemos",
      offering: [
        "Automatización de procesos con IA",
        "Integración de GoHighLevel y HubSpot",
        "Migraciones a GoHighLevel",
        "Desarrollo a medida con IA",
        "Agentes de IA para WhatsApp y web",
        "Embudos y CRM en GoHighLevel",
      ],
      logosLabel: "Clientes con sistema activo",
    },

    capabilities: {
      tag: "Servicios",
      title: "Qué hacemos",
      subtitle:
        "Automatización y desarrollo con IA sobre el CRM que ya usas, o sobre el que te conviene usar.",
      chatLabel: "Ejemplo en vivo",
      kpiLabel: "En cifras",
      scrollHint: "Ver más servicios",
      more: "Ver el servicio en detalle",
      items: [
        {
          title: "Automatización de procesos con IA",
          slug: "automatizacion-procesos-ia",
          desc: "Eliminamos tareas repetitivas: tu operativa funciona sola.",
          kpis: [
            { value: "8 min", label: "de la llamada a la propuesta enviada, antes 1-3 días (Eventos Barcelona)" },
            { value: "−85%", label: "tiempo de respuesta al cliente (Eventos Barcelona)" },
            { value: "4-6 sem", label: "para tener el primer proceso en producción" },
          ],
        },
        {
          title: "Integración de GoHighLevel y HubSpot",
          slug: "integracion-gohighlevel-hubspot",
          desc: "Tu CRM conectado con ERP, facturación, agenda y WhatsApp, por API y webhooks.",
          kpis: [
            { value: "4", label: "integraciones base: entrada de contactos, conversación, agenda y facturación" },
            { value: "1", label: "sistema manda en cada dato; el resto lee, así nada se pisa" },
            { value: "0", label: "fallos silenciosos: cada integración reintenta y avisa si algo no entra" },
          ],
        },
        {
          title: "Migraciones a GoHighLevel",
          slug: "migracion-a-gohighlevel",
          desc: "Te pasamos de HubSpot u otro CRM a GoHighLevel sin perder tu histórico.",
          kpis: [
            { value: "0", label: "días sin CRM: los dos conviven hasta el cambio" },
            { value: "100", label: "contactos en una migración de prueba antes de mover el resto" },
            { value: "2-3 sem", label: "en una cuenta pequeña, contando el periodo en paralelo" },
          ],
        },
        {
          title: "Desarrollo a medida con IA",
          slug: "desarrollo-ia-a-medida",
          desc: "Herramientas internas, apps y MVPs, de la idea a producción.",
          kpis: [
            { value: "4-8 sem", label: "de la idea al producto en producción" },
            { value: "100%", label: "del código y la infraestructura, tuyos" },
            { value: "30 días", label: "de soporte incluidos tras la entrega" },
          ],
        },
        {
          title: "Embudos y CRM en GoHighLevel",
          slug: "embudo-de-captacion",
          desc: "De la captación al cierre, cualificando en automático.",
          kpis: [
            { value: "−32%", label: "coste por paciente (Hospital Capilar)" },
            { value: "< 1 min", label: "en dar la primera respuesta a cada lead nuevo" },
            { value: "4", label: "niveles de scoring: frío, templado, caliente y premium" },
          ],
        },
        {
          title: "Agentes de IA a medida",
          slug: "agentes-ia-vps",
          desc: "Asistentes en WhatsApp y web que atienden, cualifican y agendan 24/7.",
          kpis: [
            { value: "24/7", label: "atención y agenda, también de noche y en fin de semana" },
            { value: "Sem. 4", label: "primer agente atendiendo en producción" },
            { value: "UE", label: "servidor propio en Europa si manejas datos sensibles" },
          ],
        },
      ],
    },

    cases: {
      tag: "Resultados",
      title: "Casos reales, sin maquetas.",
      subtitle:
        "Negocios reales con GoHighLevel como base de cada implementación.",
      cta: "Leer casos completos",
      items: [
        {
          client: "Hospital Capilar",
          logo: LOGOS.hospitalCapilar,
          sector: "Salud · Madrid",
          tag: "Cualificación de leads + Booking SDR",
          challenge:
            "Captaban muchos leads pero sin ningún filtro previo ni visibilidad del embudo: no sabían qué contactos merecía la pena trabajar ni en qué paso se perdían las oportunidades.",
          solution:
            "Montamos un sistema en GoHighLevel que cualifica cada lead con un quiz de scoring, hace seguimiento automático por WhatsApp y, con un Booking SDR, agenda la cita directamente en Koibox. Todo el embudo queda medido de punta a punta: conversión, abandono, citas y ventas.",
          stack: ["GoHighLevel", "WhatsApp", "Koibox"],
          metric: "−32%",
          metricLabel: "coste por paciente (CPP)",
        },
        {
          client: "Eventos Barcelona",
          logo: LOGOS.eventosBarcelona,
          sector: "Eventos · Barcelona",
          tag: "Automatización de propuestas",
          challenge:
            "Cada propuesta tardaba entre 1 y 3 días en salir. Para cuando llegaba, el cliente ya se había enfriado o había pedido presupuesto a la competencia.",
          solution:
            "Creamos un formulario de intake que se rellena justo después de la llamada y genera la propuesta automáticamente en GoHighLevel, lista para revisar y enviar en minutos, con recordatorios de seguimiento programados.",
          stack: ["GoHighLevel"],
          metric: "−85%",
          metricLabel: "tiempo de respuesta al cliente",
        },
        {
          client: "Growth4U",
          logo: LOGOS.growth4u,
          sector: "Marketing · Captación",
          tag: "Automatización de CRM",
          challenge:
            "La captación era 100% manual y sin cualificación ni seguimiento sistemático: los leads se enfriaban en hojas de cálculo y se perdía la trazabilidad de cada oportunidad.",
          solution:
            "Implementamos un funnel de captación con scoring automático y seguimiento en GoHighLevel, dejando todo el proceso comercial medido de punta a punta, desde el primer contacto hasta el cierre.",
          stack: ["GoHighLevel"],
          metric: "100%",
          metricLabel: "del proceso comercial automatizado",
        },
      ],
    },

    testimonials: {
      tag: "Testimonios",
      title: "Lo que dicen los clientes",
      addCta: "Deja tu testimonio",
      pageTitle: "Testimonios",
      pageDesc:
        "Opiniones reales de clientes con sistema activo. ¿Trabajaste con nosotros? Cuéntalo.",
      formTitle: "Deja tu testimonio",
      nameLabel: "Tu nombre *",
      companyLabel: "Empresa",
      roleLabel: "Cargo",
      quoteLabel: "Tu testimonio *",
      namePh: "Nombre y apellido",
      companyPh: "Tu empresa",
      rolePh: "Tu cargo",
      quotePh: "Cuéntanos qué montamos y qué resultado tuviste...",
      submit: "Enviar testimonio",
      sending: "Enviando...",
      success: "¡Gracias! Lo revisaremos antes de publicarlo.",
      error: "No se pudo enviar. Inténtalo de nuevo.",
      empty: "Aún no hay testimonios publicados.",
    },

    process: {
      tag: "Cómo trabajamos",
      title: "Cuatro pasos. Sin sorpresas.",
      steps: [
        { title: "Diagnóstico", desc: "30 min. Vemos tu proceso y qué sistema encaja." },
        { title: "Diseño", desc: "Arquitectura, integraciones y plan de migración si hace falta." },
        { title: "Implementación", desc: "Automatizaciones, agentes e integraciones en producción." },
        { title: "Entrega", desc: "Sistema activo + formación. Soporte de 30 días incluido." },
      ],
    },

    pricing: {
      tag: "Inversión",
      title: "Cuánto cuesta automatizar tu negocio",
      subtitle:
        "Rangos de referencia del sector. El alcance exacto —y el precio— se confirma en la auditoría gratuita, no antes.",
      tiers: [
        {
          name: "Discovery",
          range: "1.500 € – 15.000 €",
          desc: "Diagnóstico, arquitectura y diseño del sistema antes de construir nada.",
        },
        {
          name: "Implementación",
          range: "5.000 € – 25.000 €",
          desc: "Construcción y despliegue del sistema completo en producción.",
        },
        {
          name: "Retainer mensual",
          range: "1.000 € – 5.000 €/mes",
          desc: "Mantenimiento, monitorización y mejoras continuas del sistema.",
        },
      ],
      note: "Para proyectos de mayor escala también trabajamos con pricing por valor: un % del ahorro o la venta adicional que genera el sistema.",
    },

    faq: {
      tag: "Preguntas frecuentes",
      title: "Antes de que preguntes",
      items: [
        {
          q: "¿Cómo funciona vuestra IA exactamente?",
          a: "No es una caja negra: usamos agentes de IA (LLMs) conectados a tu propio CRM, sea GoHighLevel o HubSpot, con reglas y flujos que diseñamos contigo en la auditoría. Ves exactamente qué automatiza cada paso, y el código y la infraestructura son tuyos.",
        },
        {
          q: "¿Trabajáis con HubSpot o solo con GoHighLevel?",
          a: "Con los dos. Si ya usas HubSpot, lo automatizamos y lo integramos con el resto de tus herramientas sin obligarte a cambiar. Si quieres pasar a GoHighLevel, hacemos la migración completa.",
        },
        {
          q: "¿Qué se migra al pasar a GoHighLevel?",
          a: "Contactos, empresas, oportunidades con sus etapas, notas, etiquetas y campos personalizados. Las automatizaciones, formularios y plantillas de correo se rehacen en GoHighLevel, porque no se pueden copiar tal cual entre plataformas. Validamos los datos antes de hacer el cambio y los dos CRM conviven hasta que todo cuadra.",
        },
        {
          q: "¿Es un sistema a medida o una plantilla?",
          a: "A medida. Cada automatización se diseña sobre tu proceso real — no hay dos implementaciones iguales, aunque el stack (GoHighLevel, HubSpot, n8n, agentes de IA) sea el mismo.",
        },
        {
          q: "¿Cuánto tarda en estar en producción?",
          a: "Entre 4 y 8 semanas desde el diagnóstico, según el alcance. El primer sistema suele estar activo en la semana 4.",
        },
        {
          q: "¿Qué pasa si no encaja con mi negocio?",
          a: "Te lo decimos en la auditoría gratuita de 30 minutos, sin coste ni compromiso. Si no tiene sentido trabajar juntos, te lo decimos directamente.",
        },
        {
          q: "¿Cuánto cuesta?",
          a: "Depende del alcance: el discovery arranca en 1.500 €, la implementación completa va de 5.000 € a 25.000 €, y hay un retainer mensual opcional para mantenimiento. El precio exacto se confirma tras la auditoría.",
        },
      ],
    },

    finalCta: {
      titlePre: "¿Quieres saber qué ",
      titleHighlight: "sistema necesitas?",
      subtitle:
        "Auditoría de automatización gratuita de 30 minutos. Te decimos si tiene sentido trabajar juntos, sin compromiso.",
      button: "Obtén mi Auditoría Gratuita",
    },

    pageCta: {
      title: "¿Quieres saber qué sistema necesitas?",
      subtitle: "Auditoría de automatización gratuita de 30 minutos, sobre GoHighLevel o HubSpot.",
      button: "Obtén mi Auditoría Gratuita",
    },

    footer: {
      tagline: "Automatización y desarrollo con IA. Integraciones de GoHighLevel y HubSpot, y migraciones a GoHighLevel.",
      cta: "Obtén mi Auditoría Gratuita",
      links: [
        { href: "/servicios", label: "Servicios" },
        { href: "/casos-de-exito", label: "Casos de éxito" },
        { href: "/soluciones", label: "Soluciones" },
        { href: "/sobre-mi", label: "Sobre mí" },
        { href: "/blog", label: "Blog" },
        { href: "/diagnostico", label: "Auditoría gratuita" },
      ],
      rights: "Automatización y desarrollo con IA",
      servicesLabel: "Servicios",
      pagesLabel: "Rianex",
    },

    servicios: {
      tag: "Servicios",
      title: "Automatización, desarrollo con IA, integraciones y migraciones",
      description:
        "Trabajamos sobre GoHighLevel y HubSpot. Cada servicio se contrata por separado o como parte de un mismo proyecto.",
      problemLabel: "Problema:",
      forWhoLabel: "Para quién:",
      cta: "Obtén mi Auditoría Gratuita",
      more: "Ver el servicio en detalle",
      builtOn: "Construido sobre",
      items: [
        {
          slug: "automatizacion-procesos-ia",
          title: "Automatización de procesos con IA",
          tagline: "Las tareas repetitivas, hechas solas.",
          problem:
            "Tu equipo pierde horas copiando datos, contestando lo mismo y persiguiendo tareas que una máquina haría sin fallos.",
          forWho: "Negocios con procesos manuales que se repiten cada semana.",
          deliverables: [
            "Mapa de procesos y qué automatizar primero",
            "Flujos con IA en GoHighLevel, HubSpot o n8n",
            "Documentos, correos y propuestas generados con IA",
            "Alertas y tareas automáticas para el equipo",
          ],
        },
        {
          slug: "integracion-gohighlevel-hubspot",
          title: "Integración de GoHighLevel y HubSpot",
          tagline: "Tu CRM hablando con el resto de tus herramientas.",
          problem:
            "El CRM vive aislado: los datos se copian a mano entre la web, la agenda, la facturación y WhatsApp, y nadie se fía de lo que pone.",
          forWho: "Empresas que usan GoHighLevel o HubSpot junto a otras herramientas.",
          deliverables: [
            "Integraciones por API, webhooks y MCP",
            "Sincronización con ERP, facturación, agenda y formularios",
            "Conexión de WhatsApp, correo y chat web",
            "Monitorización y avisos si una integración falla",
          ],
        },
        {
          slug: "migracion-a-gohighlevel",
          title: "Migración a GoHighLevel",
          tagline: "De HubSpot u otro CRM a GoHighLevel, con todo tu histórico.",
          problem:
            "Pagas varias herramientas que no se hablan entre sí, o tu CRM actual se ha quedado caro o corto, pero cambiar da miedo por lo que se puede perder.",
          forWho: "Empresas en HubSpot, Pipedrive, Zoho, Salesforce u hojas de cálculo que quieren unificar en GoHighLevel.",
          deliverables: [
            "Auditoría del CRM actual y plan de migración",
            "Migración de contactos, empresas, oportunidades, notas y campos",
            "Automatizaciones, formularios y plantillas rehechos en GoHighLevel",
            "Validación de datos, convivencia de ambos CRM y formación del equipo",
          ],
        },
        {
          slug: "desarrollo-ia-a-medida",
          title: "Desarrollo a medida con IA",
          tagline: "Herramientas, apps y MVPs construidos con IA.",
          problem:
            "Necesitas algo que ninguna herramienta estándar hace: un portal, un generador, un panel interno o un producto nuevo.",
          forWho: "Negocios que necesitan software propio sin montar un equipo de desarrollo.",
          deliverables: [
            "Diseño funcional y arquitectura",
            "Desarrollo de la app o herramienta con IA integrada",
            "Conexión con tu CRM y tus datos",
            "Despliegue en producción; el código es tuyo",
          ],
        },
        {
          slug: "agentes-ia-vps",
          title: "Agentes de IA a medida",
          tagline: "Asistentes que atienden, cualifican y agendan 24/7.",
          problem:
            "Los leads escriben a cualquier hora y nadie contesta a tiempo, o tu equipo responde cien veces lo mismo.",
          forWho: "Negocios que quieren agentes de IA propios, conectados a su CRM y bajo su control.",
          deliverables: [
            "Agentes de IA para WhatsApp, chat web y correo",
            "Conectados a GoHighLevel o HubSpot",
            "Despliegue en tu propio servidor (VPS) si lo necesitas",
            "Mantenimiento y monitorización",
          ],
        },
        {
          slug: "implementacion-crm-gohighlevel",
          title: "Implementación de GoHighLevel",
          tagline: "Tu CRM montado y configurado a tu proceso.",
          problem:
            "Sin un CRM central, todo vive en la cabeza, en hojas de cálculo y en WhatsApp.",
          forWho: "Negocios sin CRM o con uno desordenado.",
          deliverables: [
            "GoHighLevel configurado a tu proceso",
            "Pipelines, etapas y automatizaciones",
            "Integración de canales (WhatsApp, correo, redes)",
            "Formación de uso para tu equipo",
          ],
        },
        {
          slug: "embudo-de-captacion",
          title: "Embudos de captación y cualificación",
          tagline: "Filtra automáticamente quién vale tu tiempo.",
          problem:
            "Traes tráfico y leads, pero no sabes cuáles son buenos hasta perder tiempo hablando con ellos.",
          forWho: "Negocios con más de 10 leads al mes que invierten en ads o contenido.",
          deliverables: [
            "Landing, formulario o quiz de precualificación",
            "Scoring automático (frío / templado / caliente / premium)",
            "Booking SDR que agenda en tu calendario",
            "Nurturing por correo y WhatsApp",
          ],
        },
        {
          slug: "generador-de-propuestas",
          title: "Generador de propuestas automático",
          tagline: "Propuestas en minutos, no en días.",
          problem:
            "Crear propuestas a mano es lento y pierdes el momento con el cliente.",
          forWho: "Empresas de servicios con varias propuestas al mes.",
          deliverables: [
            "Formulario de intake tras la llamada",
            "Propuesta web y PDF automáticas",
            "Pipeline de propuesta en tu CRM",
            "Recordatorios de seguimiento",
          ],
        },
      ],
    },

    soluciones: {
      tag: "Soluciones",
      title: "Adaptado a tu sector",
      description:
        "El mismo enfoque, ajustado al ciclo de venta de cada negocio.",
      problemLabel: "Problema:",
      solutionLabel: "Solución:",
      caseLabel: "Caso:",
      link: "Ver los tres sistemas",
      more: "Ver la solución para el sector",
      items: [
        {
          sector: "Salud",
          slug: "clinicas",
          title: "Clínicas y Hospitales",
          pain: "Llamadas sin conversión por falta de filtro previo.",
          solution: "Precualificación por tratamiento, urgencia y presupuesto en GoHighLevel.",
          reference: "Hospital Capilar",
        },
        {
          sector: "Eventos",
          slug: "eventos",
          title: "Empresas de Eventos",
          pain: "Presupuestos que tardan días; el cliente ya eligió a otro.",
          solution: "Propuesta automática tras el formulario de intake.",
          reference: "EB Eventos Barcelona",
        },
        {
          sector: "Formación",
          slug: "academias",
          title: "Academias y Formación",
          pain: "Muchos interesados, pocos matriculados y sin seguimiento.",
          solution: "Captación y nurturing automático en GoHighLevel.",
        },
      ],
    },

    casos: {
      tag: "Casos de éxito",
      title: "Sistemas que funcionan hoy",
      description:
        "Tres negocios reales, tres problemas comerciales distintos y un mismo enfoque: diagnosticar el cuello de botella, montar el sistema en GoHighLevel y medir el resultado desde el primer día.",
      stackLabel: "Stack implementado",
    },

    sobreMi: {
      tag: "Sobre mí",
      title: "Ramiro Pérez Rodero, ingeniero industrial que automatiza negocios con IA",
      intro: [
        "Soy Ramiro Pérez Rodero, ingeniero industrial. Vengo de trabajar en plantas industriales y hoy aplico ese rigor de procesos a la automatización con IA de negocios.",
        "Rianex es mi estudio, con base en Ávila: diseño y monto sistemas de IA de extremo a extremo —del diagnóstico al despliegue en producción— sobre GoHighLevel y HubSpot, para empresas de España y Latinoamérica.",
      ],
      linkedin: "Ver mi perfil en LinkedIn",
      pillarsLabel: "Mi terreno",
      pillars: [
        {
          title: "Ingeniería industrial",
          desc: "Rigor de procesos, control y sistemas aplicado a tu operativa comercial.",
        },
        {
          title: "Plantas industriales",
          desc: "Experiencia en entornos productivos reales y en la integración OT/IT.",
        },
        {
          title: "Automatización con IA",
          desc: "Agentes, datos e integraciones funcionando en producción, no en demo.",
        },
      ],
      specialtiesLabel: "Especialidades técnicas",
      specialties: [
        "Automatización de procesos y flujos de trabajo",
        "Integraciones de GoHighLevel y HubSpot con ERP, MES y otras herramientas vía API y MCP",
        "Migraciones de CRM a GoHighLevel",
        "Agentes de IA (LLMs) a medida en servidor propio (VPS)",
        "Embudos de captación, cualificación y cierre",
        "Orquestación con n8n, Make, GoHighLevel y HubSpot",
        "Datos, scoring y métricas de todo el embudo",
      ],
      principlesLabel: "Cómo trabajo",
      principles: [
        "Diagnóstico y arquitectura antes de construir",
        "Entregables claros y medibles",
        "Sistemas en producción, no prototipos",
        "El sistema es tuyo: código e infraestructura propios, sin dependencias",
        "Soporte de 30 días incluido",
      ],
      stackLabel: "Stack técnico",
      stack: [
        "GoHighLevel",
        "HubSpot",
        "n8n",
        "Make",
        "OpenAI / LLMs",
        "Python",
        "Node.js",
        "PostgreSQL / Supabase",
        "API REST & MCP",
        "VPS / Docker",
        "WhatsApp / Telegram",
      ],
      ctaTitle: "¿Hablamos de tu proceso?",
      ctaSubtitle: "30 minutos para ver si tiene sentido trabajar juntos.",
      ctaButton: "Obtén mi Auditoría Gratuita",
    },

    diagnostico: {
      tag: "Auditoría de Automatización Gratuita",
      title: "30 minutos para saber qué necesitas",
      description: "Rellena el formulario. Lo revisamos antes de la llamada.",
      bullets: [
        "Sin compromiso ni venta agresiva",
        "Análisis de tu proceso actual",
        "Recomendación concreta de sistema",
        "Para negocios con más de 10 leads al mes",
      ],
    },

    blog: {
      tag: "Blog",
      title: "Guías prácticas",
      description: "Automatización con IA, GoHighLevel y HubSpot. Sin teoría vacía.",
      empty: "Próximamente nuevos artículos.",
    },
  },

  en: {
    nav: {
      links: [
        { href: "/servicios", label: "Services" },
        { href: "/casos-de-exito", label: "Case studies" },
        { href: "/blog", label: "Blog" },
        { href: "/sobre-mi", label: "About" },
      ],
      cta: "Get my free audit",
      switchTo: "ES",
      switchLabel: "View in Spanish",
    },

    hero: {
      eyebrow: "AI automation and development",
      titlePre: "Automate ",
      titleRotating: [
        "your lead capture",
        "your client follow-up",
        "your sales proposals",
        "your processes with AI",
      ],
      titlePost: " and get 10 hours/week back.",
      subtitle:
        "We automate processes, build AI agents and tools, connect your CRM to the rest of your stack, and move you to GoHighLevel with your full history.",
      ctaPrimary: "Get my Free Automation Audit",
      ctaSecondary: "See the services",
      note: "First results in 4 weeks · No commitment",
      proofMetric: "−32%",
      proofLabel: "cost per patient (CPP) in 6 weeks",
      proofClient: "Hospital Capilar",
      offeringTitle: "What we do",
      offering: [
        "AI process automation",
        "GoHighLevel and HubSpot integration",
        "Migrations to GoHighLevel",
        "Custom AI development",
        "AI agents for WhatsApp and web",
        "Funnels and CRM on GoHighLevel",
      ],
      logosLabel: "Clients with a live system",
    },

    capabilities: {
      tag: "Services",
      title: "What we do",
      subtitle:
        "AI automation and development on the CRM you already use, or on the one that suits you better.",
      chatLabel: "Live example",
      kpiLabel: "By the numbers",
      scrollHint: "See more services",
      more: "See the service in detail",
      items: [
        {
          title: "AI process automation",
          slug: "automatizacion-procesos-ia",
          desc: "We remove repetitive work: your operation runs itself.",
          kpis: [
            { value: "8 min", label: "from the call to the proposal sent, previously 1-3 days (Eventos Barcelona)" },
            { value: "−85%", label: "client response time (Eventos Barcelona)" },
            { value: "4-6 wks", label: "to get the first process into production" },
          ],
        },
        {
          title: "GoHighLevel and HubSpot integration",
          slug: "integracion-gohighlevel-hubspot",
          desc: "Your CRM connected to ERP, invoicing, calendar and WhatsApp, via API and webhooks.",
          kpis: [
            { value: "4", label: "core integrations: contact intake, conversation, calendar and invoicing" },
            { value: "1", label: "system owns each field; the rest read, so nothing gets overwritten" },
            { value: "0", label: "silent failures: every integration retries and alerts if something fails" },
          ],
        },
        {
          title: "Migrations to GoHighLevel",
          slug: "migracion-a-gohighlevel",
          desc: "We move you from HubSpot or another CRM to GoHighLevel without losing your history.",
          kpis: [
            { value: "0", label: "days without a CRM: both run side by side until the switch" },
            { value: "100", label: "contacts in a test migration before moving the rest" },
            { value: "2-3 wks", label: "for a small account, including the parallel period" },
          ],
        },
        {
          title: "Custom AI development",
          slug: "desarrollo-ia-a-medida",
          desc: "Internal tools, apps and MVPs, from idea to production.",
          kpis: [
            { value: "4-8 wks", label: "from idea to product in production" },
            { value: "100%", label: "of the code and infrastructure, yours" },
            { value: "30 days", label: "of support included after delivery" },
          ],
        },
        {
          title: "Funnels and CRM on GoHighLevel",
          slug: "embudo-de-captacion",
          desc: "From capture to close, qualifying on autopilot.",
          kpis: [
            { value: "−32%", label: "cost per patient (Hospital Capilar)" },
            { value: "< 1 min", label: "to give every new lead a first reply" },
            { value: "4", label: "scoring levels: cold, warm, hot and premium" },
          ],
        },
        {
          title: "Custom AI agents",
          slug: "agentes-ia-vps",
          desc: "Assistants on WhatsApp and web that answer, qualify and book 24/7.",
          kpis: [
            { value: "24/7", label: "answering and booking, nights and weekends too" },
            { value: "Wk 4", label: "first agent live in production" },
            { value: "EU", label: "your own server in Europe if you handle sensitive data" },
          ],
        },
      ],
    },

    cases: {
      tag: "Results",
      title: "Real cases, no mockups.",
      subtitle: "Real businesses, with GoHighLevel behind every build.",
      cta: "Read the full cases",
      items: [
        {
          client: "Hospital Capilar",
          logo: LOGOS.hospitalCapilar,
          sector: "Healthcare · Madrid",
          tag: "Lead qualification + Booking SDR",
          challenge:
            "They captured plenty of leads but with no upfront filtering or visibility into the funnel: they didn't know which contacts were worth working or where opportunities were being lost.",
          solution:
            "We built a GoHighLevel system that qualifies every lead with a scoring quiz, runs automated WhatsApp follow-up and, with a Booking SDR, books the appointment straight into Koibox. The whole funnel is measured end to end: conversion, drop-off, appointments and sales.",
          stack: ["GoHighLevel", "WhatsApp", "Koibox"],
          metric: "−32%",
          metricLabel: "cost per patient (CPP)",
        },
        {
          client: "Eventos Barcelona",
          logo: LOGOS.eventosBarcelona,
          sector: "Events · Barcelona",
          tag: "Proposal automation",
          challenge:
            "Each proposal took 1 to 3 days to go out. By the time it landed, the client had cooled off or already asked a competitor for a quote.",
          solution:
            "We created an intake form filled right after the call, which generates the proposal automatically in GoHighLevel, ready to review and send in minutes, with follow-up reminders scheduled in.",
          stack: ["GoHighLevel"],
          metric: "−85%",
          metricLabel: "client response time",
        },
        {
          client: "Growth4U",
          logo: LOGOS.growth4u,
          sector: "Marketing · Lead gen",
          tag: "CRM automation",
          challenge:
            "Capture was 100% manual, with no qualification or systematic follow-up: leads went cold in spreadsheets and traceability was lost on every opportunity.",
          solution:
            "We implemented a capture funnel with automatic scoring and follow-up in GoHighLevel, leaving the entire sales process measured end to end, from first contact to close.",
          stack: ["GoHighLevel"],
          metric: "100%",
          metricLabel: "of the sales process automated",
        },
      ],
    },

    testimonials: {
      tag: "Testimonials",
      title: "What clients say",
      addCta: "Leave a testimonial",
      pageTitle: "Testimonials",
      pageDesc:
        "Real feedback from clients with a live system. Worked with us? Share it.",
      formTitle: "Leave a testimonial",
      nameLabel: "Your name *",
      companyLabel: "Company",
      roleLabel: "Role",
      quoteLabel: "Your testimonial *",
      namePh: "First and last name",
      companyPh: "Your company",
      rolePh: "Your role",
      quotePh: "Tell us what we built and the result you got...",
      submit: "Send testimonial",
      sending: "Sending...",
      success: "Thanks! We'll review it before publishing.",
      error: "Couldn't send. Please try again.",
      empty: "No testimonials published yet.",
    },

    process: {
      tag: "How we work",
      title: "Four steps. No surprises.",
      steps: [
        { title: "Diagnosis", desc: "30 min. We review your process and which system fits." },
        { title: "Design", desc: "Architecture, integrations and a migration plan if needed." },
        { title: "Build", desc: "Automations, agents and integrations in production." },
        { title: "Handover", desc: "Live system + training. 30 days of support included." },
      ],
    },

    pricing: {
      tag: "Investment",
      title: "What automating your business costs",
      subtitle:
        "Industry reference ranges. The exact scope — and price — gets confirmed on the free audit call, not before.",
      tiers: [
        {
          name: "Discovery",
          range: "€1,500 – €15,000",
          desc: "Diagnosis, architecture and system design before we build anything.",
        },
        {
          name: "Implementation",
          range: "€5,000 – €25,000",
          desc: "Building and deploying the full system in production.",
        },
        {
          name: "Monthly retainer",
          range: "€1,000 – €5,000/mo",
          desc: "Ongoing maintenance, monitoring and improvements.",
        },
      ],
      note: "For larger-scale projects we also work on value-based pricing: a % of the savings or extra revenue the system generates.",
    },

    faq: {
      tag: "FAQ",
      title: "Before you ask",
      items: [
        {
          q: "How does your AI actually work?",
          a: "It's not a black box: we use AI agents (LLMs) connected to your own CRM, whether that's GoHighLevel or HubSpot, with rules and flows we design with you during the audit. You see exactly what each step automates, and the code and infrastructure are yours.",
        },
        {
          q: "Do you work with HubSpot or only GoHighLevel?",
          a: "Both. If you already use HubSpot, we automate it and integrate it with the rest of your tools without forcing you to switch. If you want to move to GoHighLevel, we handle the full migration.",
        },
        {
          q: "What gets migrated when moving to GoHighLevel?",
          a: "Contacts, companies, deals with their stages, notes, tags and custom fields. Automations, forms and email templates are rebuilt in GoHighLevel, since they can't be copied as-is between platforms. We validate the data before switching over, and both CRMs run in parallel until everything checks out.",
        },
        {
          q: "Is it custom-built or a template?",
          a: "Custom-built. Every automation is designed around your real process — no two implementations are the same, even though the stack (GoHighLevel, HubSpot, n8n, AI agents) is.",
        },
        {
          q: "How long until it's live?",
          a: "4 to 8 weeks from the diagnosis, depending on scope. The first full system is usually live by week 4.",
        },
        {
          q: "What if it's not a fit for my business?",
          a: "We tell you on the free 30-minute audit, no cost or commitment. If it doesn't make sense to work together, we say so directly.",
        },
        {
          q: "How much does it cost?",
          a: "It depends on scope: discovery starts at €1,500, full implementation runs €5,000–€25,000, and there's an optional monthly retainer for maintenance. Exact price is confirmed after the audit.",
        },
      ],
    },

    finalCta: {
      titlePre: "Want to know which ",
      titleHighlight: "system you need?",
      subtitle:
        "A free 30-minute automation audit. I tell you whether it makes sense to work together — no commitment.",
      button: "Get my Free Audit",
    },

    pageCta: {
      title: "Want to know which system you need?",
      subtitle: "A free 30-minute automation audit, on GoHighLevel or HubSpot.",
      button: "Get my Free Audit",
    },

    footer: {
      tagline: "AI automation and development. GoHighLevel and HubSpot integrations, and migrations to GoHighLevel.",
      cta: "Get my Free Audit",
      links: [
        { href: "/servicios", label: "Services" },
        { href: "/casos-de-exito", label: "Case studies" },
        { href: "/soluciones", label: "Solutions" },
        { href: "/sobre-mi", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/diagnostico", label: "Free audit" },
      ],
      rights: "AI automation and development",
      servicesLabel: "Services",
      pagesLabel: "Rianex",
    },

    servicios: {
      tag: "Services",
      title: "Automation, AI development, integrations and migrations",
      description:
        "We work on GoHighLevel and HubSpot. Each service can be hired on its own or as part of one project.",
      problemLabel: "Problem:",
      forWhoLabel: "For whom:",
      cta: "Get my Free Audit",
      more: "See the service in detail",
      builtOn: "Built on",
      items: [
        {
          slug: "automatizacion-procesos-ia",
          title: "AI process automation",
          tagline: "Repetitive work, done on its own.",
          problem:
            "Your team loses hours copying data, answering the same questions and chasing tasks a machine would do without mistakes.",
          forWho: "Businesses with manual processes that repeat every week.",
          deliverables: [
            "Process map and what to automate first",
            "AI workflows in GoHighLevel, HubSpot or n8n",
            "AI-generated documents, emails and proposals",
            "Automatic alerts and tasks for the team",
          ],
        },
        {
          slug: "integracion-gohighlevel-hubspot",
          title: "GoHighLevel and HubSpot integration",
          tagline: "Your CRM talking to the rest of your tools.",
          problem:
            "The CRM lives in isolation: data gets copied by hand between the website, calendar, invoicing and WhatsApp, and nobody trusts what it says.",
          forWho: "Companies using GoHighLevel or HubSpot alongside other tools.",
          deliverables: [
            "Integrations via API, webhooks and MCP",
            "Sync with ERP, invoicing, calendar and forms",
            "WhatsApp, email and web chat connected",
            "Monitoring and alerts if an integration fails",
          ],
        },
        {
          slug: "migracion-a-gohighlevel",
          title: "Migration to GoHighLevel",
          tagline: "From HubSpot or another CRM to GoHighLevel, history included.",
          problem:
            "You pay for several tools that don't talk to each other, or your current CRM has become too expensive or too limited, but switching is scary because of what could get lost.",
          forWho: "Companies on HubSpot, Pipedrive, Zoho, Salesforce or spreadsheets that want to consolidate on GoHighLevel.",
          deliverables: [
            "Audit of your current CRM and migration plan",
            "Migration of contacts, companies, deals, notes and fields",
            "Automations, forms and templates rebuilt in GoHighLevel",
            "Data validation, both CRMs running in parallel and team training",
          ],
        },
        {
          slug: "desarrollo-ia-a-medida",
          title: "Custom AI development",
          tagline: "Tools, apps and MVPs built with AI.",
          problem:
            "You need something no off-the-shelf tool does: a portal, a generator, an internal dashboard or a new product.",
          forWho: "Businesses that need their own software without hiring a dev team.",
          deliverables: [
            "Functional design and architecture",
            "App or tool development with AI built in",
            "Connected to your CRM and your data",
            "Deployed to production; the code is yours",
          ],
        },
        {
          slug: "agentes-ia-vps",
          title: "Custom AI agents",
          tagline: "Assistants that answer, qualify and book 24/7.",
          problem:
            "Leads write at any hour and nobody replies in time, or your team answers the same thing a hundred times.",
          forWho: "Businesses wanting their own AI agents, connected to their CRM and under their control.",
          deliverables: [
            "AI agents for WhatsApp, web chat and email",
            "Connected to GoHighLevel or HubSpot",
            "Deployed on your own server (VPS) if needed",
            "Maintenance and monitoring",
          ],
        },
        {
          slug: "implementacion-crm-gohighlevel",
          title: "GoHighLevel implementation",
          tagline: "Your CRM set up and configured to your process.",
          problem:
            "Without a central CRM, everything lives in your head, spreadsheets and WhatsApp.",
          forWho: "Businesses with no CRM or a messy one.",
          deliverables: [
            "GoHighLevel set up to your process",
            "Pipelines, stages and automations",
            "Channel integration (WhatsApp, email, social)",
            "Training for your team",
          ],
        },
        {
          slug: "embudo-de-captacion",
          title: "Capture and qualification funnels",
          tagline: "Automatically filter who is worth your time.",
          problem:
            "You bring traffic and leads, but can't tell which are good until you've wasted time talking to them.",
          forWho: "Businesses with 10+ leads a month running ads or content.",
          deliverables: [
            "Landing, form or pre-qualification quiz",
            "Automatic scoring (cold / warm / hot / premium)",
            "Booking SDR that books into your calendar",
            "Nurturing over email and WhatsApp",
          ],
        },
        {
          slug: "generador-de-propuestas",
          title: "Automated proposal generator",
          tagline: "Proposals in minutes, not days.",
          problem:
            "Building proposals by hand is slow and you lose momentum with the client.",
          forWho: "Service businesses sending several proposals a month.",
          deliverables: [
            "Post-call intake form",
            "Automated web and PDF proposals",
            "Proposal pipeline in your CRM",
            "Follow-up reminders",
          ],
        },
      ],
    },

    soluciones: {
      tag: "Solutions",
      title: "Tailored to your sector",
      description:
        "The same approach, tuned to each business's sales cycle.",
      problemLabel: "Problem:",
      solutionLabel: "Solution:",
      caseLabel: "Case:",
      link: "See the three systems",
      more: "See the solution for this sector",
      items: [
        {
          sector: "Healthcare",
          slug: "clinicas",
          title: "Clinics & Hospitals",
          pain: "Calls with no conversion due to a lack of upfront filtering.",
          solution: "Pre-qualification by treatment, urgency and budget on GoHighLevel.",
          reference: "Hospital Capilar",
        },
        {
          sector: "Events",
          slug: "eventos",
          title: "Event Companies",
          pain: "Quotes that take days; the client already picked someone else.",
          solution: "Automated proposal after the intake form.",
          reference: "EB Eventos Barcelona",
        },
        {
          sector: "Education",
          slug: "academias",
          title: "Academies & Training",
          pain: "Lots of interest, few enrolments and no follow-up.",
          solution: "Automated capture and nurturing on GoHighLevel.",
        },
      ],
    },

    casos: {
      tag: "Case studies",
      title: "Systems that work today",
      description:
        "Three real businesses, three different commercial bottlenecks, one same approach: diagnose the bottleneck, build the system in GoHighLevel, and measure the result from day one.",
      stackLabel: "Stack we built",
    },

    sobreMi: {
      tag: "About me",
      title: "Ramiro Pérez Rodero, an industrial engineer who automates businesses with AI",
      intro: [
        "I'm Ramiro Pérez Rodero, an industrial engineer. I come from working in industrial plants and now bring that process rigour to AI automation for businesses.",
        "Rianex is my studio, based in Ávila, Spain: I design and build end-to-end AI systems —from diagnosis to production— on GoHighLevel and HubSpot, for companies in Spain and Latin America.",
      ],
      linkedin: "See my LinkedIn profile",
      pillarsLabel: "My ground",
      pillars: [
        {
          title: "Industrial engineering",
          desc: "Process, control and systems rigor applied to your sales operation.",
        },
        {
          title: "Industrial plants",
          desc: "Experience in real production environments and OT/IT integration.",
        },
        {
          title: "AI automation",
          desc: "Agents, data and integrations running in production, not in a demo.",
        },
      ],
      specialtiesLabel: "Technical specialties",
      specialties: [
        "Process and workflow automation",
        "GoHighLevel and HubSpot integrations with ERP, MES and other tools via API and MCP",
        "CRM migrations to GoHighLevel",
        "Custom AI agents (LLMs) on your own server (VPS)",
        "Capture, qualification and closing funnels",
        "Orchestration with n8n, Make, GoHighLevel and HubSpot",
        "Data, scoring and full-funnel metrics",
      ],
      principlesLabel: "How I work",
      principles: [
        "Diagnosis and architecture before building",
        "Clear, measurable deliverables",
        "Systems in production, not prototypes",
        "The system is yours: your own code and infrastructure, no lock-in",
        "30 days of support included",
      ],
      stackLabel: "Tech stack",
      stack: [
        "GoHighLevel",
        "HubSpot",
        "n8n",
        "Make",
        "OpenAI / LLMs",
        "Python",
        "Node.js",
        "PostgreSQL / Supabase",
        "API REST & MCP",
        "VPS / Docker",
        "WhatsApp / Telegram",
      ],
      ctaTitle: "Want to talk about your process?",
      ctaSubtitle: "30 minutes to see if it's worth working together.",
      ctaButton: "Get my Free Audit",
    },

    diagnostico: {
      tag: "Free Automation Audit",
      title: "30 minutes to know what you need",
      description: "Fill in the form. We review it before the call.",
      bullets: [
        "No commitment, no hard selling",
        "Analysis of your current process",
        "A concrete system recommendation",
        "For businesses with 10+ leads a month",
      ],
    },

    blog: {
      tag: "Blog",
      title: "Practical guides",
      description: "AI automation, GoHighLevel and HubSpot. No empty theory.",
      empty: "New articles coming soon.",
    },
  },
} as const;

export type Content = (typeof content)["es"];
