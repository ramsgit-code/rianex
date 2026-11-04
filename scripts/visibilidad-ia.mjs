// Visibilidad de Rianex en los asistentes de IA.
//
// Hace las preguntas de docs/visibilidad-ia/preguntas.txt a cada asistente
// con busqueda web y apunta si nombra a Rianex, si cita rianex.es y que
// dominios cita. El informe va a docs/visibilidad-ia/AAAA-MM-DD.md.
//
// Cada asistente se activa solo si tiene con que preguntarle:
//   Claude      la CLI `claude` (la misma que usa el radar), sin clave aparte
//   Perplexity  PERPLEXITY_API_KEY
//   Gemini      GEMINI_API_KEY
//   ChatGPT     OPENAI_API_KEY
// Los modelos se pueden cambiar con PERPLEXITY_MODEL, GEMINI_MODEL y
// OPENAI_MODEL.
//
// Uso: npm run visibilidad-ia            todas las preguntas
//      npm run visibilidad-ia -- --max 2 solo las dos primeras (prueba)
//
// Las respuestas cambian de un dia a otro: lo que cuenta es la tendencia entre
// meses, no una pasada suelta.

import { execFile } from "node:child_process";
import { readFile, writeFile, mkdir, mkdtemp } from "node:fs/promises";
import { promisify } from "node:util";
import os from "node:os";
import path from "node:path";

const run = promisify(execFile);
const DIR = path.join(process.cwd(), "docs", "visibilidad-ia");
const MARCA = /rianex/i;
const DOMINIO = /rianex\.es/i;

const maxArg = process.argv.indexOf("--max");
const MAX = maxArg > -1 ? Number(process.argv[maxArg + 1]) : Infinity;

function urls(text) {
  return [...new Set((text.match(/https?:\/\/[^\s)\]>"'`]+/g) ?? []).map((u) => u.replace(/[.,;:]+$/, "")))];
}

function dominio(u) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

async function json(url, options) {
  const res = await fetch(url, options);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(body).slice(0, 200)}`);
  return body;
}

const ASISTENTES = [
  {
    nombre: "Claude",
    activo: async () => {
      try {
        await run("claude", ["--version"]);
        return true;
      } catch {
        return false;
      }
    },
    preguntar: async (q) => {
      // Desde una carpeta vacia: dentro del repo la CLI carga las memorias del
      // proyecto, que hablan de Rianex, y lo nombraria sin haberlo encontrado.
      const cwd = await mkdtemp(path.join(os.tmpdir(), "visibilidad-ia-"));
      const { stdout } = await run(
        "claude",
        [
          "-p",
          `${q}\n\nBusca en la web antes de responder y pon al final la lista de URLs que has usado.`,
          "--allowedTools",
          "WebSearch,WebFetch",
          "--output-format",
          "text",
        ],
        { cwd, timeout: 300_000, maxBuffer: 10 * 1024 * 1024 }
      );
      return { texto: stdout, fuentes: urls(stdout) };
    },
  },
  {
    nombre: "Perplexity",
    activo: async () => Boolean(process.env.PERPLEXITY_API_KEY),
    preguntar: async (q) => {
      const r = await json("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.PERPLEXITY_MODEL ?? "sonar",
          messages: [{ role: "user", content: q }],
        }),
      });
      const texto = r.choices?.[0]?.message?.content ?? "";
      const fuentes = [
        ...(r.citations ?? []),
        ...(r.search_results ?? []).map((s) => s.url),
      ].filter(Boolean);
      return { texto, fuentes: [...new Set([...fuentes, ...urls(texto)])] };
    },
  },
  {
    nombre: "Gemini",
    activo: async () => Boolean(process.env.GEMINI_API_KEY),
    preguntar: async (q) => {
      const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
      const r = await json(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "x-goog-api-key": process.env.GEMINI_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: q }] }],
            tools: [{ google_search: {} }],
          }),
        }
      );
      const cand = r.candidates?.[0];
      const texto = (cand?.content?.parts ?? []).map((p) => p.text ?? "").join("");
      // Gemini devuelve sus fuentes como enlaces de redireccion; el titulo
      // lleva el dominio real.
      const fuentes = (cand?.groundingMetadata?.groundingChunks ?? [])
        .map((c) => c.web?.title && `https://${c.web.title}`)
        .filter(Boolean);
      return { texto, fuentes: [...new Set([...fuentes, ...urls(texto)])] };
    },
  },
  {
    nombre: "ChatGPT",
    activo: async () => Boolean(process.env.OPENAI_API_KEY),
    preguntar: async (q) => {
      const r = await json("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL ?? "gpt-5-mini",
          tools: [{ type: "web_search" }],
          input: q,
        }),
      });
      const mensajes = (r.output ?? []).filter((o) => o.type === "message");
      const partes = mensajes.flatMap((m) => m.content ?? []);
      const texto = partes.map((p) => p.text ?? "").join("");
      const fuentes = partes
        .flatMap((p) => p.annotations ?? [])
        .map((a) => a.url)
        .filter(Boolean);
      return { texto, fuentes: [...new Set([...fuentes, ...urls(texto)])] };
    },
  },
];

function celda(res) {
  if (res.error) return "error";
  if (res.fuentes.some((u) => DOMINIO.test(u))) return "✅ cita rianex.es";
  if (MARCA.test(res.texto)) return "✅ nombra";
  return "—";
}

async function main() {
  const preguntas = (await readFile(path.join(DIR, "preguntas.txt"), "utf8"))
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .slice(0, MAX);

  const activos = [];
  for (const a of ASISTENTES) if (await a.activo()) activos.push(a);
  if (!activos.length) {
    console.error("Ningún asistente disponible: falta la CLI claude y las claves de API.");
    process.exit(1);
  }
  console.log(`Asistentes: ${activos.map((a) => a.nombre).join(", ")}. Preguntas: ${preguntas.length}.`);

  // resultados[i].fila[asistente] = { texto, fuentes } | { error }
  // Tres preguntas a la vez: la CLI de Claude tarda minutos por pregunta.
  const resultados = preguntas.map((q) => ({ q, fila: {} }));
  let siguiente = 0;
  async function trabajador() {
    while (siguiente < resultados.length) {
      const { q, fila } = resultados[siguiente++];
      await Promise.all(
        activos.map(async (a) => {
          try {
            fila[a.nombre] = await a.preguntar(q);
          } catch (e) {
            fila[a.nombre] = { error: String(e.message ?? e), texto: "", fuentes: [] };
          }
          console.log(`  ${a.nombre} · ${celda(fila[a.nombre])} · ${q}`);
        })
      );
    }
  }
  await Promise.all([trabajador(), trabajador(), trabajador()]);

  const hoy = new Date().toISOString().slice(0, 10);
  const nombres = activos.map((a) => a.nombre);
  const lineas = [
    `# Visibilidad en asistentes de IA · ${hoy}`,
    "",
    "Generado por `npm run visibilidad-ia`. \"Cita rianex.es\" significa que la web aparece entre las fuentes; \"nombra\", que la respuesta menciona a Rianex sin enlazarla.",
    "",
    "## Resumen",
    "",
    `| Asistente | Nombra a Rianex | Cita rianex.es | Errores |`,
    `|---|---|---|---|`,
  ];
  for (const n of nombres) {
    const rs = resultados.map((r) => r.fila[n]);
    const cita = rs.filter((r) => !r.error && r.fuentes.some((u) => DOMINIO.test(u))).length;
    const nombra = rs.filter((r) => !r.error && (MARCA.test(r.texto) || r.fuentes.some((u) => DOMINIO.test(u)))).length;
    const err = rs.filter((r) => r.error).length;
    lineas.push(`| ${n} | ${nombra} de ${rs.length} | ${cita} de ${rs.length} | ${err} |`);
  }

  lineas.push("", "## Por pregunta", "", `| Pregunta | ${nombres.join(" | ")} |`, `|---|${nombres.map(() => "---").join("|")}|`);
  for (const { q, fila } of resultados) {
    lineas.push(`| ${q} | ${nombres.map((n) => celda(fila[n])).join(" | ")} |`);
  }

  // Los dominios que mas citan son los sitios donde conviene aparecer.
  const cuenta = new Map();
  for (const { fila } of resultados)
    for (const n of nombres)
      for (const d of new Set((fila[n].fuentes ?? []).map(dominio).filter(Boolean)))
        cuenta.set(d, (cuenta.get(d) ?? 0) + 1);
  const top = [...cuenta.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25);
  lineas.push(
    "",
    "## Dominios más citados",
    "",
    "Dónde buscan los asistentes cuando responden a estas preguntas: aparecer en estos sitios es lo que más acerca a que te recomienden.",
    "",
    "| Dominio | Respuestas que lo citan |",
    "|---|---|",
    ...top.map(([d, c]) => `| ${d} | ${c} |`)
  );

  const errores = resultados.flatMap(({ q, fila }) =>
    nombres.filter((n) => fila[n].error).map((n) => `- ${n} · ${q}: ${fila[n].error}`)
  );
  if (errores.length) lineas.push("", "## Errores", "", ...errores);

  await mkdir(DIR, { recursive: true });
  const salida = path.join(DIR, `${hoy}.md`);
  await writeFile(salida, lineas.join("\n") + "\n");
  console.log(`Informe: ${path.relative(process.cwd(), salida)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
