// ──────────────────────────────────────────────────────────────────────────
// Fuente única de contenido de la web (bilingüe ES / EN).
// El español va con tildes y ñ correctas. Toda copia visible sale de aquí.
// ──────────────────────────────────────────────────────────────────────────

export type Lang = "es" | "en";

export const LOGOS = {
  hospitalCapilar: "/logos/hospital-capilar.png",
  eventosBarcelona: "/logos/eventos-barcelona.png",
  growth4u: "/logos/growth4u.png",
  tribeca: "/logos/tribeca.png",
};

export const content = {
  es: {
    nav: {
      links: [
        { href: "/casos-de-exito", label: "Casos" },
        { href: "/blog", label: "Blog" },
        { href: "/sobre-mi", label: "Nosotros" },
      ],
      cta: "Diagnóstico",
      switchTo: "EN",
      switchLabel: "Ver en inglés",
    },

    hero: {
      eyebrow: "IA para negocios",
      titlePre: "Automatiza tu negocio y ",
      titleHighlight: "vende más con IA.",
      titlePost: "",
      subtitle:
        "Diseñamos y montamos sistemas de IA para tu negocio: automatización de procesos, embudos de venta, integraciones con tu CRM/ERP/MES y creamos agentes a medida. Del go-to-market al producto.",
      ctaPrimary: "Solicitar diagnóstico gratuito",
      ctaSecondary: "Ver los sistemas",
      note: "30 min · Sin compromiso · Respuesta en 24 h",
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

    metrics: [
      { value: "1 min", label: "en enviar una propuesta (antes, 4 días)" },
      { value: "< 5 min", label: "en responder a cada lead nuevo" },
      { value: "24/7", label: "captación y seguimiento automático" },
      { value: "100%", label: "del embudo medido: conversión, citas y ventas" },
    ],

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
            "Captaban muchos leads pero sin filtro previo ni métricas del embudo: no sabían qué contactos valían la pena ni en qué punto se perdían las oportunidades.",
          solution:
            "Montamos un sistema en Go High Level que capta y cualifica los leads con un quiz de scoring, automatiza el seguimiento por WhatsApp y, con un Booking SDR, agenda las citas directamente en Koibox. Todo el embudo queda medido: conversión, abandono, citas y ventas.",
          metric: "−32%",
          metricLabel: "coste por paciente (CPP)",
        },
        {
          client: "Eventos Barcelona",
          logo: LOGOS.eventosBarcelona,
          sector: "Eventos · Barcelona",
          tag: "Automatización de propuestas",
          challenge:
            "Cada propuesta tardaba entre 1 y 3 días en salir, y para entonces el cliente ya se había enfriado o había pedido presupuesto a la competencia.",
          solution:
            "Creamos un formulario de intake tras la llamada que genera la propuesta automáticamente en Go High Level, lista para revisar y enviar en minutos, con recordatorios de seguimiento.",
          metric: "−85%",
          metricLabel: "tiempo de respuesta al cliente",
        },
        {
          client: "Growth4U",
          logo: LOGOS.growth4u,
          sector: "Marketing · Captación",
          tag: "Automatización de CRM",
          challenge:
            "La captación era 100% manual, sin cualificación ni seguimiento sistemático: los leads se enfriaban en hojas de cálculo y se perdía trazabilidad.",
          solution:
            "Implementamos un funnel de captación con scoring automático y seguimiento en Go High Level, con todo el proceso comercial medido de punta a punta.",
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

    finalCta: {
      titlePre: "¿Quieres saber qué ",
      titleHighlight: "sistema necesitas?",
      subtitle:
        "Diagnóstico gratuito de 30 minutos. Te decimos si tiene sentido trabajar juntos, sin compromiso.",
      button: "Solicitar diagnóstico",
    },

    pageCta: {
      title: "¿Quieres saber qué sistema necesitas?",
      subtitle: "Diagnóstico gratuito de 30 minutos en Go High Level.",
      button: "Solicitar diagnóstico",
    },

    footer: {
      tagline: "Sistemas de IA para negocios: automatización, embudos de venta e integraciones.",
      cta: "Diagnóstico gratuito",
      links: [
        { href: "/servicios", label: "Servicios" },
        { href: "/casos-de-exito", label: "Casos" },
        { href: "/soluciones", label: "Soluciones" },
        { href: "/sobre-mi", label: "Nosotros" },
        { href: "/blog", label: "Blog" },
        { href: "/diagnostico", label: "Diagnóstico" },
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
      cta: "Solicitar diagnóstico",
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
      tag: "Casos reales",
      title: "Sistemas que funcionan hoy",
      description:
        "Negocios reales con Go High Level como base de cada implementación.",
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
    },

    diagnostico: {
      tag: "Diagnóstico gratuito",
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
        { href: "/casos-de-exito", label: "Cases" },
        { href: "/blog", label: "Blog" },
        { href: "/sobre-mi", label: "About" },
      ],
      cta: "Diagnosis",
      switchTo: "ES",
      switchLabel: "View in Spanish",
    },

    hero: {
      eyebrow: "AI for business",
      titlePre: "Automate your business and ",
      titleHighlight: "sell more with AI.",
      titlePost: "",
      subtitle:
        "We design and build AI systems for your business: process automation, sales funnels, CRM/ERP/MES integrations and custom agents. From go-to-market to product.",
      ctaPrimary: "Request a free diagnosis",
      ctaSecondary: "See the systems",
      note: "30 min · No commitment · Reply within 24 h",
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

    metrics: [
      { value: "1 min", label: "to send a proposal (was 4 days)" },
      { value: "< 5 min", label: "to respond to every new lead" },
      { value: "24/7", label: "automated capture and follow-up" },
      { value: "100%", label: "of the funnel measured: conversion, bookings, sales" },
    ],

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
            "They captured plenty of leads but with no upfront filtering or funnel metrics: they didn't know which contacts were worth it or where opportunities were lost.",
          solution:
            "We built a Go High Level system that captures and qualifies leads with a scoring quiz, automates WhatsApp follow-up and, with a Booking SDR, books appointments straight into Koibox. The whole funnel is measured: conversion, drop-off, appointments and sales.",
          metric: "−32%",
          metricLabel: "cost per patient (CPP)",
        },
        {
          client: "Eventos Barcelona",
          logo: LOGOS.eventosBarcelona,
          sector: "Events · Barcelona",
          tag: "Proposal automation",
          challenge:
            "Each proposal took 1 to 3 days to go out, and by then the client had cooled off or already asked a competitor for a quote.",
          solution:
            "We created a post-call intake form that generates the proposal automatically on Go High Level, ready to review and send in minutes, with follow-up reminders.",
          metric: "−85%",
          metricLabel: "client response time",
        },
        {
          client: "Growth4U",
          logo: LOGOS.growth4u,
          sector: "Marketing · Lead gen",
          tag: "CRM automation",
          challenge:
            "Capture was 100% manual, with no qualification or systematic follow-up: leads went cold in spreadsheets and traceability was lost.",
          solution:
            "We implemented a capture funnel with automatic scoring and follow-up on Go High Level, with the entire sales process measured end to end.",
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

    finalCta: {
      titlePre: "Want to know which ",
      titleHighlight: "system you need?",
      subtitle:
        "A free 30-minute diagnosis. I tell you whether it makes sense to work together — no commitment.",
      button: "Request a diagnosis",
    },

    pageCta: {
      title: "Want to know which system you need?",
      subtitle: "A free 30-minute diagnosis on Go High Level.",
      button: "Request a diagnosis",
    },

    footer: {
      tagline: "AI systems for business: automation, sales funnels and integrations.",
      cta: "Free diagnosis",
      links: [
        { href: "/servicios", label: "Services" },
        { href: "/casos-de-exito", label: "Cases" },
        { href: "/soluciones", label: "Solutions" },
        { href: "/sobre-mi", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/diagnostico", label: "Diagnosis" },
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
      cta: "Request a diagnosis",
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
      tag: "Real cases",
      title: "Systems that work today",
      description: "Real businesses, with Go High Level behind every build.",
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
    },

    diagnostico: {
      tag: "Free diagnosis",
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
