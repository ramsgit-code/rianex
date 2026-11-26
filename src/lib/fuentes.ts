import type { Lang } from "@/lib/i18n";

// Fuentes externas de las fichas de servicio y de sector: solo las normas y
// reglas de plataforma que la propia ficha cita en su texto o en sus FAQ, cada
// una con el ancla del articulo cuando la fuente la tiene. No se añaden fuentes
// de adorno: si la ficha no cita nada externo, no lleva bloque de fuentes.
//
// Sirven a los asistentes de IA (una afirmacion legal con su fuente se cita
// antes que una sin ella) y al lector que quiere comprobarla.
// URLs y anclas comprobadas el 26-nov-2026 (BOE: LSSI #a21, LGTel #a6-8 =
// art. 66, LOPDGDD #a1-11 = art. 19, #a2-5 = art. 23, #a8-11 = art. 89).

export type Fuente = { es: string; en: string; url: string };

const BOE = "https://www.boe.es/buscar/act.php?id=";
const EURLEX = (celex: string, lang: Lang) =>
  `https://eur-lex.europa.eu/legal-content/${lang === "es" ? "ES" : "EN"}/TXT/?uri=CELEX:${celex}`;

type FuenteDef = { es: string; en: string; url: string | ((lang: Lang) => string) };

const F = {
  lssi21: {
    es: "Ley 34/2002 (LSSI), artículo 21: comunicaciones comerciales por correo electrónico",
    en: "Spain's Law 34/2002 (LSSI), article 21: commercial communications by email",
    url: `${BOE}BOE-A-2002-13758#a21`,
  },
  rgpd: {
    es: "Reglamento (UE) 2016/679 (RGPD)",
    en: "Regulation (EU) 2016/679 (GDPR)",
    url: (l: Lang) => EURLEX("32016R0679", l),
  },
  rgpd9: {
    es: "Reglamento (UE) 2016/679 (RGPD), artículo 9: categorías especiales de datos",
    en: "Regulation (EU) 2016/679 (GDPR), article 9: special categories of data",
    url: (l: Lang) => EURLEX("32016R0679", l),
  },
  lgtel66: {
    es: "Ley 11/2022 General de Telecomunicaciones, artículo 66",
    en: "Spain's General Telecommunications Law 11/2022, article 66",
    url: `${BOE}BOE-A-2022-10757#a6-8`,
  },
  circular: {
    es: "Circular 1/2023 de la AEPD sobre el artículo 66.1.b de la Ley 11/2022",
    en: "AEPD Circular 1/2023 on article 66.1.b of Law 11/2022",
    url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2023-15071",
  },
  lopd19: {
    es: "Ley Orgánica 3/2018 (LOPDGDD), artículo 19: datos de contacto de profesionales",
    en: "Spain's Organic Law 3/2018 (LOPDGDD), article 19: contact data of professionals",
    url: `${BOE}BOE-A-2018-16673#a1-11`,
  },
  lopd23: {
    es: "Ley Orgánica 3/2018 (LOPDGDD), artículo 23: sistemas de exclusión publicitaria",
    en: "Spain's Organic Law 3/2018 (LOPDGDD), article 23: advertising opt-out systems",
    url: `${BOE}BOE-A-2018-16673#a2-5`,
  },
  lopd89: {
    es: "Ley Orgánica 3/2018 (LOPDGDD), artículo 89: videovigilancia en el trabajo",
    en: "Spain's Organic Law 3/2018 (LOPDGDD), article 89: video surveillance at work",
    url: `${BOE}BOE-A-2018-16673#a8-11`,
  },
  aepdVideo: {
    es: "AEPD: guía sobre el uso de videocámaras",
    en: "AEPD: guide on the use of video cameras (in Spanish)",
    url: "https://www.aepd.es/guias/guia-videovigilancia.pdf",
  },
  aiAct: {
    es: "Reglamento (UE) 2024/1689 de Inteligencia Artificial (artículos 5 y 50)",
    en: "Regulation (EU) 2024/1689, the AI Act (articles 5 and 50)",
    url: (l: Lang) => EURLEX("32024R1689", l),
  },
  aiAct50: {
    es: "Reglamento (UE) 2024/1689 de Inteligencia Artificial, artículo 50: transparencia",
    en: "Regulation (EU) 2024/1689, the AI Act, article 50: transparency",
    url: (l: Lang) => EURLEX("32024R1689", l),
  },
  linkedin: {
    es: "Acuerdo de usuario de LinkedIn (apartados 3.4 y 8.2)",
    en: "LinkedIn User Agreement (sections 3.4 and 8.2)",
    url: "https://www.linkedin.com/legal/user-agreement",
  },
  waPolicy: {
    es: "Política de mensajería de WhatsApp Business",
    en: "WhatsApp Business Messaging Policy",
    url: "https://business.whatsapp.com/policy",
  },
  waMigrar: {
    es: "Meta: migrar un número de WhatsApp existente a la API",
    en: "Meta: migrate an existing WhatsApp number to the API",
    url: "https://developers.facebook.com/docs/whatsapp/cloud-api/get-started/migrate-existing-whatsapp-number-to-a-business-account",
  },
  fundae: {
    es: "FUNDAE: cómo bonificar la formación",
    en: "FUNDAE: how training is funded (in Spanish)",
    url: "https://www.fundae.es/empresas/home/como-bonificarse",
  },
} satisfies Record<string, FuenteDef>;

const SERVICIOS: Record<string, FuenteDef[]> = {
  "outbound-b2b": [F.lssi21, F.rgpd],
  "email-marketing": [F.lssi21],
  "outbound-linkedin": [F.linkedin],
  "cold-calling": [F.lgtel66, F.circular, F.lopd19, F.lopd23, F.aiAct50],
  "agente-ia-whatsapp": [F.waMigrar, F.waPolicy],
  "control-con-camaras-ia": [F.lopd89, F.aepdVideo, F.aiAct],
  "formacion-ia-empresas": [F.fundae],
};

const SECTORES: Record<string, FuenteDef[]> = {
  clinicas: [F.rgpd9],
  "negocios-con-cita": [F.aiAct50, F.waMigrar],
};

function resolve(list: FuenteDef[] | undefined, lang: Lang): { label: string; url: string }[] {
  return (list ?? []).map((f) => ({
    label: f[lang],
    url: typeof f.url === "function" ? f.url(lang) : f.url,
  }));
}

export const fuentesServicio = (slug: string, lang: Lang) => resolve(SERVICIOS[slug], lang);
export const fuentesSector = (slug: string, lang: Lang) => resolve(SECTORES[slug], lang);
