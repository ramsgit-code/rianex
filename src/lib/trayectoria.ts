import type { Lang } from "@/lib/i18n";

// Trayectoria de Ramiro para /sobre-mi y el JSON-LD de la persona. Sale de
// sus textos de LinkedIn (linkedin/linkedin-experience-pro-en.md y
// textos-linkedin-es.md); publicar Nissan y sus cifras lo autorizó él el
// 25-nov-2026. No añadir nada que no esté en esos textos.

export type Puesto = { org: string; role: string; desc: string };

export const TRAYECTORIA: Record<Lang, { title: string; lead: string; items: Puesto[]; education: { title: string; items: string[] } }> = {
  es: {
    title: "De dónde viene el método",
    lead: "Antes de automatizar procesos de otros, los he ordenado en plantas y en una cadena de suministro grande. Por eso empiezo siempre por medir el proceso y no por la herramienta.",
    items: [
      {
        org: "Nissan",
        role: "Business Analyst y jefe de proyecto · Transformación digital de la cadena de suministro",
        desc: "Coordino la migración del ERP entre logística, calidad, ingeniería y producción, y he definido los requisitos y especificaciones funcionales del ERP interno con un equipo técnico externo. He gestionado un presupuesto de logística de entrada de 3 M€ con más de 100 proveedores (−5 % de coste y entregas a tiempo por encima del 95 %) y cuadros de mando para más de 20 responsables en España, Reino Unido y Estados Unidos.",
      },
      {
        org: "Universidad Católica de Ávila (UCAV)",
        role: "Profesor de Industria 4.0 · Máster en Ingeniería Industrial",
        desc: "Digitalización industrial, IoT, análisis de datos, sistemas ciberfísicos y optimización de procesos.",
      },
      {
        org: "Michelin",
        role: "Ingeniero de simulación",
        desc: "Simulación de eventos discretos de la línea de vulcanizado de neumáticos agrícolas, validada con datos de planta: −6 % de tiempo de ciclo, unos 45.000 € al año.",
      },
      {
        org: "Busch Vacuum Pumps and Systems",
        role: "Analista de mercado",
        desc: "Estudio de mercado en biogás y envasado de alimentos: 25 clientes potenciales y huecos frente a la competencia para la hoja de ruta de producto.",
      },
    ],
    education: {
      title: "Formación",
      items: [
        "Máster en Ingeniería Industrial · Universidad de Valladolid",
        "Máster en Industria 4.0 · Universidad Europea",
        "Grado en Ingeniería en Organización Industrial · Universidad de Valladolid",
      ],
    },
  },
  en: {
    title: "Where the method comes from",
    lead: "Before automating other people's processes, I put them in order in plants and in a large supply chain. That is why I always start by measuring the process, not by choosing the tool.",
    items: [
      {
        org: "Nissan",
        role: "Business Analyst and Project Manager · Supply chain digital transformation",
        desc: "I coordinate the ERP migration across logistics, quality, engineering and production, and defined the requirements and functional specs for the internal ERP with an external tech team. I have managed a €3M inbound logistics budget with 100+ suppliers (−5% cost and on-time delivery above 95%) and KPI dashboards for 20+ stakeholders in Spain, the UK and the US.",
      },
      {
        org: "Universidad Católica de Ávila (UCAV)",
        role: "Lecturer, Industry 4.0 · Master's in Industrial Engineering",
        desc: "Industrial digitalisation, IoT, data analytics, cyber-physical systems and process optimisation.",
      },
      {
        org: "Michelin",
        role: "Simulation Engineer",
        desc: "Discrete-event simulation of the agricultural tyre curing line, validated with plant data: −6% cycle time, about €45K saved per year.",
      },
      {
        org: "Busch Vacuum Pumps and Systems",
        role: "Market Research Analyst",
        desc: "Market research in biogas and food packaging: 25 high-potential prospects and competitive gaps for the product roadmap.",
      },
    ],
    education: {
      title: "Education",
      items: [
        "Master's in Industrial Engineering · Universidad de Valladolid",
        "Master's in Industry 4.0 · Universidad Europea",
        "Bachelor's in Industrial Management Engineering · Universidad de Valladolid",
      ],
    },
  },
};
