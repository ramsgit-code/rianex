import { content } from "@/lib/content";
import { CLUSTERS, type Cluster } from "@/lib/blog-schema";
import { getAllPosts } from "@/lib/blog";
import { SECTORES } from "@/lib/sectores";
import { CASOS } from "@/lib/casos";
import { LINEAS, ofertasDeLinea, precioTexto } from "@/lib/ofertas";

// llms.txt generado en cada build, no escrito a mano.
//
// Un indice estatico se queda viejo con el siguiente articulo y acaba
// describiendo un sitio que ya no existe. Esto se reconstruye desde las mismas
// fuentes que generan la web (los .mdx del blog y el contenido de los
// servicios), asi que no puede divergir de lo que hay publicado.
//
// Expectativas realistas: Anthropic y Perplexity han confirmado que lo respetan
// al recuperar; Google dice que no le hace falta para AI Overviews y OpenAI no
// se ha comprometido. Cuesta poco y no sustituye a nada: lo que decide la
// visibilidad sigue siendo que el contenido este en el HTML y que robots.txt
// deje pasar a los rastreadores.

const BASE_URL = "https://www.rianex.es";

export const dynamic = "force-static";

const CABECERA = `# Rianex

> Agencia de automatización con IA para empresas B2B (AI Workflow & Business
> Automation). Automatizamos los procesos y el proceso comercial, construimos
> el software que haga falta y auditamos los sistemas de IA antes de que
> escalen. Cuatro líneas: automatización de procesos con IA; captación y
> go-to-market (outbound en LinkedIn, listas enriquecidas, cold calling,
> email marketing, webs y señales de compra); software e IA a medida
> (aplicaciones internas, portales, agentes, integraciones con ERP y MES);
> auditoría y consultoría de IA (auditoría técnica de agentes, gasto en IA,
> revisión independiente, formación).

Estudio de ingeniería con base en Ávila, España. Trabaja en español para el
mercado español y latinoamericano, y en inglés cuando el proyecto lo pide.

## Para quién
Empresas B2B que quieren automatizar con IA procesos que hoy se hacen a mano,
captar clientes de forma sistemática o comprobar que sus sistemas de IA
aguantan antes de crecer. Sectores: agencias de marketing, empresas de
eventos, clínicas, inmobiliarias, negocios con cita previa, e industria y
logística.

## Qué hacemos
- **Automatización de procesos con IA**: Claude, n8n, Make, Zapier y tareas programadas conectados al CRM (GoHighLevel o HubSpot) y al ERP; clasificación de correo y documentos con IA, también en servidor propio; agentes de WhatsApp, Telegram y voz.
- **Captación y go-to-market**: outbound en LinkedIn, listas B2B enriquecidas con coste por acierto, cold calling, email marketing, webs que captan y señales de compra de empresas.
- **Software e IA a medida**: aplicaciones internas que sustituyen hojas de cálculo, portales y bibliotecas privadas de documentos, agentes construidos a medida e integraciones con ERP y MES.
- **Auditoría y consultoría de IA**: auditoría técnica de sistemas de agentes, auditoría del gasto en IA, revisión independiente del trabajo de otro proveedor, asesoramiento, formación y Kit IA.

## Cómo trabajamos
Cuatro pasos: consultoría gratuita de 30 minutos, diseño del sistema, implementación y
entrega con formación y 30 días de soporte.

Precio a medida según el alcance: el discovery arranca en 1.500 €, la
implementación completa va de 5.000 € a 25.000 €, y hay un retainer mensual
opcional de mantenimiento.

## Quién está detrás
Ramiro Pérez Rodero, ingeniero industrial. Coordina la migración del ERP en la
cadena de suministro de Nissan, es profesor de Industria 4.0 en el máster de la
UCAV y trabajó en simulación de procesos en Michelin.`;

export async function GET() {
  const posts = getAllPosts();

  const secciones: string[] = [CABECERA];

  const servicios = content.es.servicios.items;
  if (servicios?.length) {
    secciones.push(
      "## Servicios\n" +
        servicios
          .map(
            (s: { title: string; slug: string; problem: string }) =>
              `- [${s.title}](${BASE_URL}/servicios/${s.slug}): ${s.problem}`
          )
          .join("\n")
    );
  }

  // Ofertas cerradas: alcance, plazo y precio de partida, por linea de trabajo.
  secciones.push(
    "## Ofertas cerradas\n" +
      "Precios sin IVA; el precio exacto se cierra por escrito tras la consultoría gratuita.\n" +
      LINEAS.flatMap((linea) =>
        ofertasDeLinea(linea.id).map(
          (o) =>
            `- [${o.es.name}](${BASE_URL}/ofertas#${o.slug}) (${linea.es.name}): ${precioTexto(o, "es")}. Plazo: ${o.es.timeline.toLowerCase()}. ${o.es.problem}`
        )
      ).join("\n")
  );

  secciones.push(`## Herramientas
- [Calculadora de fuga de leads](${BASE_URL}/herramientas/calculadora-fuga-de-leads): calcula cuánto dinero se pierde al año por los leads que no llegan a una conversación y por el trabajo comercial manual. Gratis, sin registro.`);

  secciones.push(
    "## Casos de éxito\n" +
      // Los casos propios primero; Hospital Capilar es un proyecto con Growth4U.
      Object.entries(CASOS)
        .sort(([a], [b]) => Number(a === "hospital-capilar") - Number(b === "hospital-capilar"))
        .map(([slug, caso]) => `- [${caso.es.h1}](${BASE_URL}/casos-de-exito/${slug}): ${caso.es.answer}`)
        .join("\n")
  );

  secciones.push(
    "## Soluciones por sector\n" +
      Object.entries(SECTORES)
        .map(([slug, sector]) => `- [${sector.es.h1}](${BASE_URL}/soluciones/${slug}): ${sector.es.metaDescription}`)
        .join("\n")
  );

  secciones.push(`## Páginas principales
- [Inicio](${BASE_URL}/): qué automatizamos y cómo
- [Servicios](${BASE_URL}/servicios): todos los servicios en detalle
- [Ofertas cerradas](${BASE_URL}/ofertas): ocho trabajos con alcance, plazo y precio publicados
- [Soluciones por sector](${BASE_URL}/soluciones): agencias de marketing, eventos, clínicas, inmobiliarias, negocios con cita previa y formación
- [Casos de éxito](${BASE_URL}/casos-de-exito): implantaciones reales con su resultado
- [Testimonios](${BASE_URL}/testimonios): opiniones de clientes
- [Sobre mí](${BASE_URL}/sobre-mi): Ramiro Pérez Rodero, quién está detrás
- [Consultoría gratuita](${BASE_URL}/diagnostico): formulario de 30 minutos
- [Blog](${BASE_URL}/blog): ${posts.length} artículos sobre automatización con IA

La web está también en inglés bajo ${BASE_URL}/en, con los artículos del blog traducidos en ${BASE_URL}/en/blog.

Cada artículo tiene una versión en Markdown: basta con añadir \`.md\` a su URL (por ejemplo ${BASE_URL}/blog/${posts[0]?.slug ?? ""}.md).`);

  // El blog agrupado por cluster: le da al modelo la estructura tematica, que
  // es justo lo que un indice plano de titulos no transmite.
  for (const [slug, etiqueta] of Object.entries(CLUSTERS)) {
    const delCluster = posts.filter((p) => p.cluster === (slug as Cluster));
    if (!delCluster.length) continue;
    secciones.push(
      `## Blog · ${etiqueta}\n` +
        delCluster
          .map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.description}`)
          .join("\n")
    );
  }

  const sinCluster = posts.filter(
    (p) => !p.cluster || !(p.cluster in CLUSTERS)
  );
  if (sinCluster.length) {
    secciones.push(
      "## Blog · Otros\n" +
        sinCluster
          .map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.description}`)
          .join("\n")
    );
  }

  secciones.push(`## Contacto
- [Consultoría gratuita](${BASE_URL}/diagnostico)
- Correo: hola@rianex.es`);

  return new Response(secciones.join("\n\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
