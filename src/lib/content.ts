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
        { href: "/sobre-mi", label: "Nosotros" },
      ],
      cta: "Auditoría gratis",
      switchTo: "EN",
      switchLabel: "Ver en inglés",
    },

    hero: {
      eyebrow: "IA para agencias de marketing",
      titlePre: "Automatiza la captación de leads de tu agencia y ",
      titleHighlight: "recupera 10 horas/semana.",
      titlePost: "",
      subtitle:
        "Montamos sistemas de IA que eliminan el trabajo repetitivo de tu agencia: reportes automáticos, onboarding de clientes, propuestas con IA y cualificación de leads. Tu equipo se enfoca en estrategia, no en tareas.",
      ctaPrimary: "Obtén mi Auditoría Gratuita",
      ctaSecondary: "Ver los sistemas",
      note: "Primeros resultados en 4 semanas · Sin compromiso",
      proofMetric: "−32%",
      proofLabel: "coste por paciente (CPP) en 6 semanas",
      proofClient: "Hospital Capilar",
      offeringTitle: "Qué hacemos con IA",
      offering: [
        "Automatización de procesos con IA",
        "Embudos de venta (captación → cierre)",
        "Go-to-Market Engineering",
        "Founding Engineering (producto y MVPs)",
        "Integraciones con tu CRM",
        "Agentes de IA a medida",
      ],
      logosLabel: "Clientes con sistema activo",
    },

    capabilities: {
      tag: "Servicios",
      title: "Qué hacemos con IA",
      subtitle: "Sistemas de IA de punta a punta: del primer lead al producto.",
      chatLabel: "Ejemplo en vivo",
      kpiLabel: "Resultados",
      scrollHint: "Ver más servicios",
      items: [
        {
          title: "Automatización de procesos con IA",
          desc: "Eliminamos tareas repetitivas: tu operativa funciona sola.",
          kpis: [
            { value: "-70%", label: "tiempo en tareas manuales" },
            { value: "1 min", label: "en enviar una propuesta (antes, 4 días)" },
            { value: "24/7", label: "operativa funcionando sin intervención" },
          ],
        },
        {
          title: "Embudos de venta",
          desc: "De la captación al cierre, cualificando en automático.",
          kpis: [
            { value: "+64%", label: "leads cualificados antes de hablar con ventas" },
            { value: "< 5 min", label: "en responder a cada lead nuevo" },
            { value: "3.2x", label: "más citas agendadas por lead" },
          ],
        },
        {
          title: "Go-to-Market Engineering",
          desc: "Sistemas para lanzar y escalar tu venta con método.",
          kpis: [
            { value: "+320%", label: "en ventas tras el lanzamiento" },
            { value: "6 sem", label: "de diseño del sistema a primeras ventas" },
            { value: "100%", label: "del embudo medido: conversión, citas y ventas" },
          ],
        },
        {
          title: "Founding Engineering",
          desc: "Del prototipo al producto en producción, MVPs incluidos.",
          kpis: [
            { value: "4-8 sem", label: "de la idea al producto en producción" },
            { value: "1", label: "MVP listo para los primeros usuarios" },
            { value: "0", label: "deuda técnica heredada: build desde cero" },
          ],
        },
        {
          title: "Integraciones",
          desc: "Conectamos tu CRM, ERP y MES por API y MCP.",
          kpis: [
            { value: "6+", label: "sistemas conectados por cliente" },
            { value: "-90%", label: "trabajo manual entre herramientas" },
            { value: "100%", label: "datos sincronizados en tiempo real" },
          ],
        },
        {
          title: "Agentes de IA a medida",
          desc: "Asistentes que trabajan por ti, 24/7.",
          kpis: [
            { value: "24/7", label: "disponibilidad sin turnos ni festivos" },
            { value: "< 10 s", label: "en responder a cualquier lead" },
            { value: "-80%", label: "carga en el equipo comercial" },
          ],
        },
      ],
    },

    cases: {
      tag: "Resultados",
      title: "Casos reales, sin maquetas.",
      subtitle:
        "Negocios reales con Go High Level como base de cada implementación.",
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
            "Montamos un sistema en Go High Level que cualifica cada lead con un quiz de scoring, hace seguimiento automático por WhatsApp y, con un Booking SDR, agenda la cita directamente en Koibox. Todo el embudo queda medido de punta a punta: conversión, abandono, citas y ventas.",
          stack: ["Go High Level", "WhatsApp", "Koibox"],
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
            "Creamos un formulario de intake que se rellena justo después de la llamada y genera la propuesta automáticamente en Go High Level, lista para revisar y enviar en minutos, con recordatorios de seguimiento programados.",
          stack: ["Go High Level"],
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
            "Implementamos un funnel de captación con scoring automático y seguimiento en Go High Level, dejando todo el proceso comercial medido de punta a punta, desde el primer contacto hasta el cierre.",
          stack: ["Go High Level"],
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
        { title: "Diseño", desc: "Funnel, pipeline y automatizaciones en Go High Level." },
        { title: "Implementación", desc: "Formularios, WhatsApp, correos y propuestas conectados." },
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
          a: "No es una caja negra: usamos agentes de IA (LLMs) sobre tu propio CRM en Go High Level, con reglas de scoring y flujos que diseñamos contigo en la auditoría. Ves exactamente qué automatiza cada paso, y el código y la infraestructura son tuyos.",
        },
        {
          q: "¿Es un sistema a medida o una plantilla?",
          a: "A medida. Cada automatización se diseña sobre tu proceso comercial real — no hay dos implementaciones iguales, aunque el stack (Go High Level, n8n, agentes de IA) sea el mismo.",
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
      subtitle: "Auditoría de automatización gratuita de 30 minutos en Go High Level.",
      button: "Obtén mi Auditoría Gratuita",
    },

    footer: {
      tagline: "Sistemas de IA para negocios: automatización, embudos de venta e integraciones.",
      cta: "Obtén mi Auditoría Gratuita",
      links: [
        { href: "/servicios", label: "Servicios" },
        { href: "/casos-de-exito", label: "Casos de éxito" },
        { href: "/soluciones", label: "Soluciones" },
        { href: "/sobre-mi", label: "Nosotros" },
        { href: "/blog", label: "Blog" },
        { href: "/diagnostico", label: "Auditoría gratuita" },
      ],
      rights: "IA para negocios",
    },

    servicios: {
      tag: "Servicios",
      title: "Lo que construimos en Go High Level",
      description:
        "Servicios que cubren todo el proceso comercial. Se implementan juntos o por separado.",
      problemLabel: "Problema:",
      forWhoLabel: "Para quién:",
      cta: "Obtén mi Auditoría Gratuita",
      builtOn: "Construido sobre",
      items: [
        {
          slug: "cualificacion-de-leads",
          title: "Sistema de cualificación de leads",
          tagline: "Filtra automáticamente quién vale tu tiempo.",
          problem:
            "Recibes leads pero no sabes cuáles son buenos hasta perder tiempo hablando con ellos.",
          forWho: "Negocios con más de 10 leads al mes.",
          deliverables: [
            "Formulario o quiz de precualificación",
            "Scoring automático (frío / templado / caliente / premium)",
            "Pipeline en Go High Level",
            "Avisos automáticos de leads calificados",
          ],
        },
        {
          slug: "embudo-de-captacion",
          title: "Embudo de captación de clientes",
          tagline: "Un funnel que atrae y convierte en automático.",
          problem:
            "Traes tráfico pero la captación es manual y sin sistema; se pierden oportunidades.",
          forWho: "Negocios que invierten en ads o contenido y quieren capturar mejor.",
          deliverables: [
            "Landing y funnel de captación optimizados",
            "Formularios de captación integrados",
            "Segmentación y etiquetado automático",
            "Nurturing por correo y WhatsApp",
          ],
        },
        {
          slug: "booking-sdr",
          title: "Booking SDR (agendado de reuniones)",
          tagline: "Un SDR que cualifica y agenda reuniones por ti.",
          problem:
            "Leads cualificados que nunca acaban en reuniones agendadas; seguimiento manual e inconsistente.",
          forWho:
            "Negocios que necesitan más reuniones agendadas sin montar un equipo comercial entero.",
          deliverables: [
            "SDR (con IA o asistido) que contacta y cualifica leads",
            "Agendado directo en tu calendario o agenda",
            "Recordatorios y recuperación de no-shows",
            "Todo registrado en Go High Level",
          ],
        },
        {
          slug: "generador-de-propuestas",
          title: "Generador de propuestas automático",
          tagline: "Propuestas en minutos, no en días.",
          problem:
            "Crear propuestas a mano es lento y pierdes el momento con el cliente.",
          forWho: "Agencias y servicios con varias propuestas al mes.",
          deliverables: [
            "Formulario de intake tras la llamada",
            "Propuesta web y PDF automáticas",
            "Pipeline de propuesta en Go High Level",
            "Recordatorios de seguimiento",
          ],
        },
        {
          slug: "automatizacion-proceso-comercial",
          title: "Automatización del proceso comercial",
          tagline: "De la primera respuesta al cierre, en automático.",
          problem:
            "Tareas comerciales manuales y seguimiento inconsistente que hacen perder ventas.",
          forWho: "Equipos que pierden tiempo en tareas repetitivas.",
          deliverables: [
            "Flujos de seguimiento automáticos",
            "Recordatorios y tareas para el equipo",
            "Notificaciones y asignación de leads",
            "Métricas del embudo (conversión, citas, ventas)",
          ],
        },
        {
          slug: "implementacion-crm-gohighlevel",
          title: "Implementación CRM GoHighLevel",
          tagline: "Tu CRM montado y configurado a tu proceso.",
          problem:
            "Sin un CRM central, todo vive en la cabeza, en hojas de cálculo y en WhatsApp.",
          forWho: "Negocios sin CRM o con uno desordenado.",
          deliverables: [
            "CRM de Go High Level configurado a tu proceso",
            "Pipelines, etapas y automatizaciones",
            "Integración de canales (WhatsApp, correo, redes)",
            "Formación de uso para tu equipo",
          ],
        },
        {
          slug: "agentes-ia-vps",
          title: "Creación de Agentes con IA en servidor VPS",
          tagline: "Agentes de IA a medida, alojados en tu propio servidor.",
          problem:
            "Quieres IA propia y control total, no depender de una sola plataforma cerrada.",
          forWho: "Negocios que quieren agentes de IA personalizados y escalables.",
          deliverables: [
            "Agentes de IA a medida para tu operativa",
            "Despliegue en servidor VPS propio",
            "Integraciones por API y MCP",
            "Mantenimiento y monitorización",
          ],
        },
      ],
    },

    soluciones: {
      tag: "Soluciones",
      title: "Adaptado a tu sector",
      description:
        "El mismo enfoque en Go High Level, ajustado al ciclo de venta de cada negocio.",
      problemLabel: "Problema:",
      solutionLabel: "Solución:",
      caseLabel: "Caso:",
      link: "Ver los tres sistemas",
      items: [
        {
          sector: "Salud",
          title: "Clínicas y Hospitales",
          pain: "Llamadas sin conversión por falta de filtro previo.",
          solution: "Precualificación por tratamiento, urgencia y presupuesto en Go High Level.",
          reference: "Hospital Capilar",
        },
        {
          sector: "Eventos",
          title: "Empresas de Eventos",
          pain: "Presupuestos que tardan días; el cliente ya eligió a otro.",
          solution: "Propuesta automática tras el formulario de intake.",
          reference: "EB Eventos Barcelona",
        },
        {
          sector: "Formación",
          title: "Academias y Formación",
          pain: "Muchos interesados, pocos matriculados y sin seguimiento.",
          solution: "Captación y nurturing automático en Go High Level.",
          reference: "Growth4U",
        },
        {
          sector: "Consultoría",
          title: "Servicios Profesionales",
          pain: "Cierre lento e inconsistente con los referidos.",
          solution: "Diagnóstico, propuesta y seguimiento automatizado.",
          reference: "Hermetic",
        },
      ],
    },

    casos: {
      tag: "Casos de éxito",
      title: "Sistemas que funcionan hoy",
      description:
        "Tres negocios reales, tres problemas comerciales distintos y un mismo enfoque: diagnosticar el cuello de botella, montar el sistema en Go High Level y medir el resultado desde el primer día.",
      stackLabel: "Stack implementado",
    },

    sobreMi: {
      tag: "Nosotros",
      title: "Ingenieros industriales que automatizan tu negocio con IA",
      intro: [
        "Somos un grupo de ingenieros industriales con experiencia en plantas industriales y en automatización con IA.",
        "Diseñamos y montamos sistemas de IA de extremo a extremo —del diagnóstico al despliegue en producción— con el rigor de la ingeniería aplicado a tu negocio.",
      ],
      pillarsLabel: "Nuestro terreno",
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
        "Integraciones con CRM / ERP / MES vía API y MCP",
        "Agentes de IA (LLMs) a medida en servidor propio (VPS)",
        "Embudos de captación, cualificación y cierre",
        "Orquestación con n8n, Make y Go High Level",
        "Datos, scoring y métricas de todo el embudo",
      ],
      principlesLabel: "Cómo trabajamos",
      principles: [
        "Diagnóstico y arquitectura antes de construir",
        "Entregables claros y medibles",
        "Sistemas en producción, no prototipos",
        "El sistema es tuyo: código e infraestructura propios, sin dependencias",
        "Soporte de 30 días incluido",
      ],
      stackLabel: "Stack técnico",
      stack: [
        "Go High Level",
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
      description: "Automatización comercial y Go High Level. Sin teoría vacía.",
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
      eyebrow: "AI for marketing agencies",
      titlePre: "Automate your agency's lead capture and ",
      titleHighlight: "get 10 hours/week back.",
      titlePost: "",
      subtitle:
        "We build AI systems that eliminate repetitive work for marketing agencies: automated reports, client onboarding, AI-powered proposals and lead qualification. Your team focuses on strategy, not tasks.",
      ctaPrimary: "Get my Free Automation Audit",
      ctaSecondary: "See the systems",
      note: "First results in 4 weeks · No commitment",
      proofMetric: "−32%",
      proofLabel: "cost per patient (CPP) in 6 weeks",
      proofClient: "Hospital Capilar",
      offeringTitle: "What we do with AI",
      offering: [
        "AI process automation",
        "Sales funnels (capture → close)",
        "Go-to-Market Engineering",
        "Founding Engineering (product & MVPs)",
        "Integrations with your CRM",
        "Custom AI agents",
      ],
      logosLabel: "Clients with a live system",
    },

    capabilities: {
      tag: "Services",
      title: "What we do with AI",
      subtitle: "End-to-end AI systems: from the first lead to the product.",
      chatLabel: "Live example",
      kpiLabel: "Results",
      scrollHint: "See more services",
      items: [
        {
          title: "AI process automation",
          desc: "We remove repetitive work: your operation runs itself.",
          kpis: [
            { value: "-70%", label: "time spent on manual tasks" },
            { value: "1 min", label: "to send a proposal (was 4 days)" },
            { value: "24/7", label: "operation running with no intervention" },
          ],
        },
        {
          title: "Sales funnels",
          desc: "From capture to close, qualifying on autopilot.",
          kpis: [
            { value: "+64%", label: "leads qualified before sales talks to them" },
            { value: "< 5 min", label: "to respond to every new lead" },
            { value: "3.2x", label: "more meetings booked per lead" },
          ],
        },
        {
          title: "Go-to-Market Engineering",
          desc: "Systems to launch and scale your sales with method.",
          kpis: [
            { value: "+320%", label: "in sales after launch" },
            { value: "6 wks", label: "from system design to first sales" },
            { value: "100%", label: "of the funnel measured: conversion, bookings, sales" },
          ],
        },
        {
          title: "Founding Engineering",
          desc: "From prototype to production-ready product, MVPs included.",
          kpis: [
            { value: "4-8 wks", label: "from idea to product in production" },
            { value: "1", label: "MVP ready for first users" },
            { value: "0", label: "legacy tech debt: built from scratch" },
          ],
        },
        {
          title: "Integrations",
          desc: "We connect your CRM, ERP and MES via API and MCP.",
          kpis: [
            { value: "6+", label: "systems connected per client" },
            { value: "-90%", label: "manual work between tools" },
            { value: "100%", label: "data synced in real time" },
          ],
        },
        {
          title: "Custom AI agents",
          desc: "Assistants that work for you, 24/7.",
          kpis: [
            { value: "24/7", label: "availability, no shifts or holidays" },
            { value: "< 10 s", label: "to respond to any lead" },
            { value: "-80%", label: "load on the sales team" },
          ],
        },
      ],
    },

    cases: {
      tag: "Results",
      title: "Real cases, no mockups.",
      subtitle: "Real businesses, with Go High Level behind every build.",
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
            "We built a Go High Level system that qualifies every lead with a scoring quiz, runs automated WhatsApp follow-up and, with a Booking SDR, books the appointment straight into Koibox. The whole funnel is measured end to end: conversion, drop-off, appointments and sales.",
          stack: ["Go High Level", "WhatsApp", "Koibox"],
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
            "We created an intake form filled right after the call, which generates the proposal automatically in Go High Level, ready to review and send in minutes, with follow-up reminders scheduled in.",
          stack: ["Go High Level"],
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
            "We implemented a capture funnel with automatic scoring and follow-up in Go High Level, leaving the entire sales process measured end to end, from first contact to close.",
          stack: ["Go High Level"],
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
        { title: "Design", desc: "Funnel, pipeline and automations on Go High Level." },
        { title: "Build", desc: "Forms, WhatsApp, emails and proposals connected." },
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
          a: "It's not a black box: we use AI agents (LLMs) on top of your own Go High Level CRM, with scoring rules and flows we design with you during the audit. You see exactly what each step automates, and the code and infrastructure are yours.",
        },
        {
          q: "Is it custom-built or a template?",
          a: "Custom-built. Every automation is designed around your real sales process — no two implementations are the same, even though the stack (Go High Level, n8n, AI agents) is.",
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
      subtitle: "A free 30-minute automation audit on Go High Level.",
      button: "Get my Free Audit",
    },

    footer: {
      tagline: "AI systems for business: automation, sales funnels and integrations.",
      cta: "Get my Free Audit",
      links: [
        { href: "/servicios", label: "Services" },
        { href: "/casos-de-exito", label: "Case studies" },
        { href: "/soluciones", label: "Solutions" },
        { href: "/sobre-mi", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/diagnostico", label: "Free audit" },
      ],
      rights: "AI for business",
    },

    servicios: {
      tag: "Services",
      title: "What we build on Go High Level",
      description:
        "Services covering the whole sales process. Built together or separately.",
      problemLabel: "Problem:",
      forWhoLabel: "For whom:",
      cta: "Get my Free Audit",
      builtOn: "Built on",
      items: [
        {
          slug: "cualificacion-de-leads",
          title: "Lead qualification system",
          tagline: "Automatically filter who is worth your time.",
          problem:
            "You get leads but can't tell which are good until you've wasted time talking to them.",
          forWho: "Businesses with 10+ leads a month.",
          deliverables: [
            "Pre-qualification form or quiz",
            "Automatic scoring (cold / warm / hot / premium)",
            "Pipeline on Go High Level",
            "Automatic alerts for qualified leads",
          ],
        },
        {
          slug: "embudo-de-captacion",
          title: "Client acquisition funnel",
          tagline: "A funnel that attracts and converts on autopilot.",
          problem:
            "You bring traffic but capture is manual and unsystematic; opportunities slip away.",
          forWho: "Businesses running ads or content that want to capture better.",
          deliverables: [
            "Optimized landing and capture funnel",
            "Integrated capture forms",
            "Automatic segmentation and tagging",
            "Nurturing over email and WhatsApp",
          ],
        },
        {
          slug: "booking-sdr",
          title: "SDR booking service",
          tagline: "An SDR that qualifies and books meetings for you.",
          problem:
            "Qualified leads that never turn into booked meetings; manual, inconsistent follow-up.",
          forWho:
            "Businesses that need more booked meetings without hiring a full sales team.",
          deliverables: [
            "SDR (AI or assisted) that contacts and qualifies leads",
            "Booking straight into your calendar or agenda",
            "Reminders and no-show recovery",
            "Everything logged in Go High Level",
          ],
        },
        {
          slug: "generador-de-propuestas",
          title: "Automated proposal generator",
          tagline: "Proposals in minutes, not days.",
          problem:
            "Building proposals by hand is slow and you lose momentum with the client.",
          forWho: "Agencies and services with several proposals a month.",
          deliverables: [
            "Post-call intake form",
            "Automated web and PDF proposals",
            "Proposal pipeline on Go High Level",
            "Follow-up reminders",
          ],
        },
        {
          slug: "automatizacion-proceso-comercial",
          title: "Sales process automation",
          tagline: "From first reply to close, on autopilot.",
          problem:
            "Manual sales tasks and inconsistent follow-up that cost you deals.",
          forWho: "Teams losing time on repetitive tasks.",
          deliverables: [
            "Automated follow-up flows",
            "Reminders and tasks for the team",
            "Lead alerts and assignment",
            "Funnel metrics (conversion, bookings, sales)",
          ],
        },
        {
          slug: "implementacion-crm-gohighlevel",
          title: "Go High Level CRM implementation",
          tagline: "Your CRM set up and configured to your process.",
          problem:
            "Without a central CRM, everything lives in your head, spreadsheets and WhatsApp.",
          forWho: "Businesses with no CRM or a messy one.",
          deliverables: [
            "Go High Level CRM set up to your process",
            "Pipelines, stages and automations",
            "Channel integration (WhatsApp, email, social)",
            "Training for your team",
          ],
        },
        {
          slug: "agentes-ia-vps",
          title: "AI agent development on a VPS server",
          tagline: "Custom AI agents, hosted on your own server.",
          problem:
            "You want your own AI and full control, not to depend on a single closed platform.",
          forWho: "Businesses wanting custom, scalable AI agents.",
          deliverables: [
            "Custom AI agents for your operation",
            "Deployment on your own VPS server",
            "API and MCP integrations",
            "Maintenance and monitoring",
          ],
        },
      ],
    },

    soluciones: {
      tag: "Solutions",
      title: "Tailored to your sector",
      description:
        "The same approach on Go High Level, tuned to each business's sales cycle.",
      problemLabel: "Problem:",
      solutionLabel: "Solution:",
      caseLabel: "Case:",
      link: "See the three systems",
      items: [
        {
          sector: "Healthcare",
          title: "Clinics & Hospitals",
          pain: "Calls with no conversion due to a lack of upfront filtering.",
          solution: "Pre-qualification by treatment, urgency and budget on Go High Level.",
          reference: "Hospital Capilar",
        },
        {
          sector: "Events",
          title: "Event Companies",
          pain: "Quotes that take days; the client already picked someone else.",
          solution: "Automated proposal after the intake form.",
          reference: "EB Eventos Barcelona",
        },
        {
          sector: "Education",
          title: "Academies & Training",
          pain: "Lots of interest, few enrolments and no follow-up.",
          solution: "Automated capture and nurturing on Go High Level.",
          reference: "Growth4U",
        },
        {
          sector: "Consulting",
          title: "Professional Services",
          pain: "Slow, inconsistent closing on referrals.",
          solution: "Diagnosis, proposal and automated follow-up.",
          reference: "Hermetic",
        },
      ],
    },

    casos: {
      tag: "Case studies",
      title: "Systems that work today",
      description:
        "Three real businesses, three different commercial bottlenecks, one same approach: diagnose the bottleneck, build the system in Go High Level, and measure the result from day one.",
      stackLabel: "Stack we built",
    },

    sobreMi: {
      tag: "About",
      title: "Industrial engineers who automate your business with AI",
      intro: [
        "We're a team of industrial engineers with experience in industrial plants and AI automation.",
        "We design and build end-to-end AI systems —from diagnosis to production— bringing engineering rigor to your business.",
      ],
      pillarsLabel: "Our ground",
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
        "CRM / ERP / MES integrations via API and MCP",
        "Custom AI agents (LLMs) on your own server (VPS)",
        "Capture, qualification and closing funnels",
        "Orchestration with n8n, Make and Go High Level",
        "Data, scoring and full-funnel metrics",
      ],
      principlesLabel: "How we work",
      principles: [
        "Diagnosis and architecture before building",
        "Clear, measurable deliverables",
        "Systems in production, not prototypes",
        "The system is yours: your own code and infrastructure, no lock-in",
        "30 days of support included",
      ],
      stackLabel: "Tech stack",
      stack: [
        "Go High Level",
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
      description: "Sales automation and Go High Level. No empty theory.",
      empty: "New articles coming soon.",
    },
  },
} as const;

export type Content = (typeof content)["es"];
