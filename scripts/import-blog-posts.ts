/**
 * Importa los articulos .mdx de src/content/blog/ a la tabla BlogPost.
 *
 * Valida cada fichero contra el contrato de src/lib/blog-schema.ts ANTES de
 * tocar la base: si alguno no cumple, no se importa ninguno. Es preferible
 * quedarse sin publicar a publicar la mitad del lote y dejar la otra mitad en
 * un estado que nadie recuerda.
 *
 * Uso:
 *   npx tsx scripts/import-blog-posts.ts            # importa y publica
 *   npx tsx scripts/import-blog-posts.ts --check    # solo valida, no escribe
 */

import * as fs from "fs";
import * as path from "path";
import { PrismaClient } from "@prisma/client";
import { parseBlogFile } from "../src/lib/blog-schema";

const prisma = new PrismaClient();
const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const soloValidar = process.argv.includes("--check");

async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  if (files.length === 0) {
    console.log("No hay articulos en src/content/blog/");
    return;
  }

  // ─── Fase 1: validar todo el lote ──────────────────────────────────────────
  const articulos: {
    slug: string;
    frontmatter: ReturnType<typeof parseBlogFile>["frontmatter"];
    content: string;
  }[] = [];
  const errores: string[] = [];

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { frontmatter, content } = parseBlogFile(raw, file);
      articulos.push({ slug: file.replace(/\.mdx$/, ""), frontmatter, content });
    } catch (err) {
      errores.push(err instanceof Error ? err.message : String(err));
    }
  }

  if (errores.length) {
    console.error(`\n${errores.length} articulo(s) no pasan el contrato:\n`);
    errores.forEach((e) => console.error(e + "\n"));
    process.exit(1);
  }

  const publicables = articulos.filter((a) => !a.frontmatter.draft);
  console.log(
    `${articulos.length} articulo(s) validados. ` +
      `${publicables.length} publicables, ${articulos.length - publicables.length} en borrador.`
  );

  if (soloValidar) {
    console.log("Modo --check: no se ha escrito nada.");
    return;
  }

  // ─── Fase 2: escribir ──────────────────────────────────────────────────────
  for (const { slug, frontmatter, content } of articulos) {
    const datos = {
      title: frontmatter.title,
      description: frontmatter.description,
      content,
      tags: frontmatter.tags,
      cluster: frontmatter.cluster,
      author: frontmatter.author,
      linkPolicy: frontmatter.linkPolicy,
      published: !frontmatter.draft,
      publishedAt: frontmatter.draft ? null : new Date(frontmatter.date),
    };

    await prisma.blogPost.upsert({
      where: { slug },
      update: datos,
      create: { slug, ...datos },
    });

    console.log(`  ${frontmatter.draft ? "borrador" : "publicado"}  ${slug}`);
  }

  console.log(`\nListo: ${articulos.length} articulo(s) sincronizados.`);
}

main()
  .catch((err) => {
    console.error("Error:", err instanceof Error ? err.message : err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
