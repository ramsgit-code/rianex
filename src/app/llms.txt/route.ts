import { content } from "@/lib/content";
import { CLUSTERS, type Cluster } from "@/lib/blog-schema";
import { getAllPosts } from "@/lib/blog";
import { SECTORES } from "@/lib/sectores";
import { CASOS } from "@/lib/casos";

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

> Automatización y desarrollo con IA para negocios. Integramos GoHighLevel y
> HubSpot con el resto de tus herramientas, migramos CRMs con su histórico
> completo y construimos agentes de IA a medida sobre servidor propio.

Estudio de ingeniería con base en Ávila, España. Trabaja en español para el
mercado español y latinoamericano, y en inglés cuando el proyecto lo pide.

## Qué hacemos
- **Automatizar**: procesos internos con IA, del primer contacto al cierre.
- **Integrar**: GoHighLevel y HubSpot conectados con web, agenda, facturación y WhatsApp.
- **Migrar**: cambio de CRM a GoHighLevel sin perder el histórico.
- **Construir**: desarrollo a medida y agentes de IA cuando no hay herramienta estándar que sirva.

## Cómo trabajamos
Cuatro pasos: diagnóstico de 30 minutos, diseño del sistema, implementación y
entrega con formación y 30 días de soporte.

Precio a medida según el alcance: el discovery arranca en 1.500 €, la
implementación completa va de 5.000 € a 25.000 €, y hay un retainer mensual
opcional de mantenimiento.

## Quién está detrás
Ramiro Pérez Rodero, ingeniero industrial con experiencia en plantas industriales
aplicada a la automatización de procesos de negocio.`;

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

  secciones.push(
    "## Casos de éxito\n" +
      Object.entries(CASOS)
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
- [Servicios](${BASE_URL}/servicios): los ocho servicios en detalle
- [Soluciones por sector](${BASE_URL}/soluciones): clínicas, eventos y formación
- [Casos de éxito](${BASE_URL}/casos-de-exito): implantaciones reales con su resultado
- [Testimonios](${BASE_URL}/testimonios): opiniones de clientes
- [Sobre mí](${BASE_URL}/sobre-mi): Ramiro Pérez Rodero, quién está detrás
- [Diagnóstico gratuito](${BASE_URL}/diagnostico): formulario de 30 minutos
- [Blog](${BASE_URL}/blog): ${posts.length} artículos sobre automatización con IA

La web está también en inglés bajo ${BASE_URL}/en.`);

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
- [Diagnóstico gratuito](${BASE_URL}/diagnostico)
- Correo: hola@rianex.es`);

  return new Response(secciones.join("\n\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
