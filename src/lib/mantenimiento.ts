import type { Lang } from "@/lib/i18n";

// Bloque fijo "Mantenimiento mensual" de las fichas de servicio con agentes o
// automatizaciones (agente-ia-whatsapp, automatizacion-procesos-ia e
// implementacion-crm-gohighlevel; se activa con `maintenance: true` en
// servicios.ts). Es el retainer mensual de la tabla de precios (content.ts),
// contado por lo que incluye.
//
// Nov-2026: pendiente de que Ramiro valide lo que incluye
// (docs/PENDIENTES-SEO.md). Sin nombres de proveedores ni noticias: el bloque
// tiene que seguir siendo cierto dentro de un año.

type Item = { title: string; desc: string };

export type Mantenimiento = {
  tag: string;
  title: string;
  lead: string;
  items: Item[];
  price: string;
  link: { href: string; label: string };
};

export const MANTENIMIENTO: Record<Lang, Mantenimiento> = {
  es: {
    tag: "Después de la puesta en marcha",
    title: "Mantenimiento mensual",
    lead:
      "Un agente o una automatización no se queda quieto. Tu herramienta cambia el modelo de IA por defecto, sale una versión que rompe una integración o un proveedor sufre una brecha de seguridad. Con el plan mensual, cada cambio se prueba antes de llegar a tus clientes y sabes en todo momento qué ha cambiado.",
    items: [
      {
        title: "Pruebas antes de cada cambio de modelo",
        desc: "Antes de cambiar de modelo, de versión o de instrucciones, pasamos una batería de conversaciones y casos reales de tu negocio. Si el resultado empeora, el cambio no se publica.",
      },
      {
        title: "Coste por respuesta correcta",
        desc: "Cada mes ves cuánto ha gastado el sistema en IA y cuántas respuestas ha acertado. Lo que cuenta es el coste de cada respuesta correcta, no el precio por token.",
      },
      {
        title: "Registro de lo que cambia en el CRM",
        desc: "Cada cambio en flujos, campos, instrucciones del agente o modelo queda anotado con fecha y motivo. Sabes qué cambió y se puede deshacer.",
      },
      {
        title: "Claves y proveedores",
        desc: "Revisamos quién tiene acceso, cambiamos las claves cuando toca y seguimos los avisos de seguridad de cada proveedor: el modelo de IA, WhatsApp, el CRM y la plataforma de automatización.",
      },
    ],
    price:
      "Es el retainer mensual de la tabla de inversión: de 1.000 € a 5.000 € al mes, según cuántos flujos y agentes tengas en producción. El precio exacto se confirma en la consultoría gratuita.",
    link: { href: "/blog/coste-agente-de-ia-en-produccion", label: "Cómo se mide y se limita el coste de un agente" },
  },
  en: {
    tag: "After go-live",
    title: "Monthly maintenance",
    lead:
      "An agent or an automation does not stand still. Your tool changes its default AI model, a new version breaks an integration or a provider suffers a security breach. With the monthly plan, every change is tested before it reaches your customers, and you always know what changed.",
    items: [
      {
        title: "Tests before every model change",
        desc: "Before switching model, version or instructions, we run a set of real conversations and cases from your business. If the result gets worse, the change does not ship.",
      },
      {
        title: "Cost per correct answer",
        desc: "Every month you see what the system spent on AI and how many answers it got right. What counts is the cost of each correct answer, not the price per token.",
      },
      {
        title: "A log of what changes in the CRM",
        desc: "Every change to workflows, fields, agent instructions or model is logged with date and reason. You know what changed, and it can be undone.",
      },
      {
        title: "Keys and providers",
        desc: "We review who has access, rotate keys when due and follow each provider's security notices: the AI model, WhatsApp, the CRM and the automation platform.",
      },
    ],
    price:
      "This is the monthly retainer in the investment table: €1,000 to €5,000 a month, depending on how many workflows and agents you have in production. The exact price is confirmed in the free consultation.",
    link: { href: "/blog/coste-agente-de-ia-en-produccion", label: "How to measure and cap an agent's cost (in Spanish)" },
  },
};
