/**
 * Blog Auto-Publisher Agent
 *
 * Genera articulos de blog con Claude. Puede usar noticias recientes del sector
 * como contexto para generar contenido relevante y actual.
 *
 * Uso:
 *   npx tsx scripts/blog-agent.ts                        # tema aleatorio de la cola
 *   npx tsx scripts/blog-agent.ts --topic="mi tema"      # tema especifico
 *   npx tsx scripts/blog-agent.ts --mode=news            # basado en noticias actuales
 *   npx tsx scripts/blog-agent.ts --mode=news --topic="angulo concreto"
 */

import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

// Carga .env.local automaticamente
config({ path: path.join(process.cwd(), ".env.local") });

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Cola de temas planificados ───────────────────────────────────────────────
const TOPIC_QUEUE = [
  "como elegir que proceso automatizar primero en una empresa",
  "errores comunes al automatizar procesos con ia",
  "agentes de ia para atencion al cliente: que resuelven y que no",
  "automatizar la generacion de informes internos con ia",
  "cuando una automatizacion necesita intervencion humana",
  "integrar un crm con facturacion sin duplicar datos",
  "automatizacion para empresas de eventos: del intake a la propuesta",
  "automatizacion para academias: matriculas y seguimiento de alumnos",
  "medir el retorno de una automatizacion: que numeros mirar",
  "de la hoja de calculo al sistema: cuando dar el salto",
];

// ─── Fuentes RSS del sector ───────────────────────────────────────────────────
const RSS_FEEDS = [
  // CRM y ventas
  "https://blog.close.com/feed/",
  "https://www.saleshacker.com/feed/",
  // Automatizacion y marketing
  "https://blog.hubspot.com/sales/rss.xml",
  "https://feeds.feedburner.com/HubSpotMarketing",
  // IA para negocios
  "https://hnrss.org/newest?q=CRM+automation+sales&count=10",
  "https://hnrss.org/newest?q=AI+sales+automation&count=10",
];

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cluster: string;
  content: string;
}

// ─── Fetch de noticias desde RSS ─────────────────────────────────────────────
async function fetchNewsContext(): Promise<string> {
  const headlines: string[] = [];

  for (const feedUrl of RSS_FEEDS) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(feedUrl, {
        signal: controller.signal,
        headers: { "User-Agent": "BlogAgent/1.0" },
      });
      clearTimeout(timeout);

      if (!res.ok) continue;
      const xml = await res.text();

      // Extrae titulos de items RSS (soporta CDATA y texto plano)
      const pattern = /<item[\s\S]*?<title[^>]*>(?:<!\[CDATA\[)?\s*([\s\S]*?)\s*(?:\]\]>)?<\/title>/g;
      let match;
      let count = 0;
      while ((match = pattern.exec(xml)) !== null && count < 3) {
        const title = match[1]
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .trim();
        if (title && title.length > 10 && !title.toLowerCase().includes("sponsored")) {
          headlines.push(title);
          count++;
        }
      }
    } catch {
      // Feed no disponible — continua con el siguiente
    }
  }

  if (headlines.length === 0) return "";

  const unique = Array.from(new Set(headlines)).slice(0, 12);
  return `NOTICIAS Y TENDENCIAS ACTUALES DEL SECTOR (usar como contexto e inspiracion):\n${unique.map((h) => `- ${h}`).join("\n")}`;
}

// ─── Generacion del articulo ──────────────────────────────────────────────────
async function generateBlogPost(topic: string, newsContext: string = ""): Promise<BlogPost> {
  console.log(`\n📝 Generando articulo sobre: "${topic}"`);
  if (newsContext) console.log(`📰 Con contexto de ${newsContext.split("\n").length - 1} noticias recientes`);

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    system: `Eres el ghostwriter de Ramiro Pérez Rodero, especialista en automatizacion comercial, CRM e integraciones de IA.

CONTEXTO DE MARCA:
- Servicios: Lead Qualification Systems, Proposal Automation, WhatsApp + CRM Automation, webs profesionales, integraciones IA
- Stack principal: GoHighLevel, WhatsApp Business API, integraciones API a medida
- Clientes reales: Hospital Capilar (clinica, Madrid), Eventos Barcelona (eventos)
- Tono: profesional, directo, sin humo — como habla alguien que ha implementado sistemas reales
- Publico: directores comerciales, gerentes de pymes, freelances con proceso comercial estructurado`,
    messages: [
      {
        role: "user",
        content: `${newsContext ? newsContext + "\n\n---\n\n" : ""}Escribe un articulo de blog en ESPANOL sobre: "${topic}"

FORMATO DE RESPUESTA — JSON estricto, sin texto adicional fuera del JSON:
{
  "slug": "url-kebab-case-max-60-chars",
  "title": "Titulo directo max 65 caracteres",
  "description": "Meta description SEO de 70 a 160 caracteres con keyword principal",
  "tags": ["tag1", "tag2", "tag3"],
  "cluster": "uno de: automatizacion-ia | agentes-ia | desarrollo-ia | crm | captacion",
  "content": "Contenido completo en Markdown..."
}

ESTRUCTURA DEL ARTICULO (800-1200 palabras):
- Intro: 2-3 frases directas que identifican el problema. Sin "En este articulo veremos".
- ## El problema real — con ejemplo concreto, no generico
- ## La solucion practica — como funciona, con detalle tecnico accesible
- ## Como implementarlo paso a paso — pasos concretos, no vagas recomendaciones
- ## Resultado que puedes esperar — con numeros reales si los hay (casos de clientes)
- Parrafo final CTA: invitar a [diagnostico gratuito](/diagnostico)

REGLAS:
- Si hay noticias de contexto, referencialas de forma natural sin citarlas literalmente
- Menciona GoHighLevel, WhatsApp Business o herramientas especificas cuando sea relevante
- Sin listas de 10 puntos genericas. Maximo 4-5 puntos por lista, con detalle en cada uno
- Usa **negrita** para conceptos clave, no para decorar
- Los ejemplos de Hospital Capilar o Eventos Barcelona solo si encajan naturalmente
- No inventes clientes, cifras ni casos: si no tienes el dato, no lo des`,
      },
    ],
  });

  const raw = (response.content[0] as { text: string }).text.trim();
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Claude no devolvio JSON valido");

  const parsed = JSON.parse(jsonMatch[0]);
  const CLUSTERS_VALIDOS = [
    "automatizacion-ia",
    "agentes-ia",
    "desarrollo-ia",
    "crm",
    "captacion",
  ];

  return {
    ...parsed,
    cluster: CLUSTERS_VALIDOS.includes(parsed.cluster)
      ? parsed.cluster
      : "automatizacion-ia",
    date: new Date().toISOString().split("T")[0],
  };
}

// ─── Escritura del archivo MDX ────────────────────────────────────────────────
function writeMDXFile(post: BlogPost): string {
  const blogDir = path.join(process.cwd(), "src", "content", "blog");
  fs.mkdirSync(blogDir, { recursive: true });

  // No sobreescribir si ya existe
  const filePath = path.join(blogDir, `${post.slug}.mdx`);
  if (fs.existsSync(filePath)) {
    const altPath = path.join(blogDir, `${post.slug}-${Date.now()}.mdx`);
    console.log(`⚠️  Slug ya existe, guardando como: ${path.basename(altPath)}`);
    fs.writeFileSync(altPath, buildMDX(post), "utf-8");
    return altPath;
  }

  fs.writeFileSync(filePath, buildMDX(post), "utf-8");
  return filePath;
}

function buildMDX(post: BlogPost): string {
  return `---
title: "${post.title.replace(/"/g, '\\"')}"
description: "${post.description.replace(/"/g, '\\"')}"
date: "${post.date}"
tags: [${post.tags.map((t) => `"${t}"`).join(", ")}]
cluster: "${post.cluster}"
author: "Ramiro Pérez Rodero"
draft: true
---

${post.content}
`;
}

// ─── Seleccion de tema basado en noticias ─────────────────────────────────────
async function selectTopicFromNews(headlines: string): Promise<string> {
  const res = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    messages: [
      {
        role: "user",
        content: `Dado el contexto del negocio de Ramiro Perez (automatizacion comercial, CRM, GoHighLevel, WhatsApp Business, IA para ventas) y estas noticias recientes:

${headlines}

Sugiere UN tema de articulo de blog que:
1. Sea relevante para el publico de Ramiro (directores comerciales, pymes)
2. Conecte con alguna de las noticias actuales
3. Sea accionable y practico

Responde SOLO con el tema, sin explicacion. Maximo 10 palabras.`,
      },
    ],
  });
  return (res.content[0] as { text: string }).text.trim();
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("❌ Error: ANTHROPIC_API_KEY no esta configurada");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const topicArg = args.find((a) => a.startsWith("--topic="))?.slice("--topic=".length);
  const mode = args.find((a) => a.startsWith("--mode="))?.slice("--mode=".length) ?? "queue";

  let topic: string;
  let newsContext = "";

  if (mode === "news") {
    console.log("🔍 Buscando noticias recientes del sector...");
    newsContext = await fetchNewsContext();

    if (newsContext) {
      console.log(`✅ ${newsContext.split("\n").length - 1} noticias encontradas`);
      topic = topicArg ?? (await selectTopicFromNews(newsContext));
      console.log(`💡 Tema seleccionado: "${topic}"`);
    } else {
      console.log("⚠️  Sin noticias disponibles, usando cola de temas");
      topic = topicArg ?? TOPIC_QUEUE[Math.floor(Math.random() * TOPIC_QUEUE.length)];
    }
  } else {
    topic = topicArg ?? TOPIC_QUEUE[Math.floor(Math.random() * TOPIC_QUEUE.length)];
  }

  const post = await generateBlogPost(topic, newsContext);
  const filePath = writeMDXFile(post);

  console.log(`\n✅ Articulo generado:`);
  console.log(`   Titulo:  ${post.title}`);
  console.log(`   Slug:    ${post.slug}`);
  console.log(`   Archivo: ${filePath}`);
  console.log(`   Tags:    ${post.tags.join(", ")}`);
  console.log(`\n🚀 Para publicar:`);
  console.log(`   git add src/content/blog/ && git commit -m "blog: ${post.title}" && git push`);
}

main().catch(console.error);
