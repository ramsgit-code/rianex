/**
 * Importa los articulos .mdx de src/content/blog/ a la tabla BlogPost
 * y los publica (published: true). Los que ya existen (mismo slug) se actualizan.
 *
 * Uso:
 *   npx tsx scripts/import-blog-posts.ts
 */

import * as fs from "fs";
import * as path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Frontmatter no encontrado");
  const [, fm, content] = match;

  const get = (key: string) => {
    const m = fm.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`, "m"));
    return m ? m[1] : "";
  };
  const tagsMatch = fm.match(/^tags:\s*(\[.*\])\s*$/m);
  const tags: string[] = tagsMatch ? JSON.parse(tagsMatch[1].replace(/'/g, '"')) : [];

  return {
    title: get("title"),
    description: get("description"),
    date: get("date"),
    tags,
    content: content.trim(),
  };
}

async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  if (files.length === 0) {
    console.log("No hay archivos .mdx en src/content/blog/");
    return;
  }

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { title, description, date, tags, content } = parseFrontmatter(raw);

    await prisma.blogPost.upsert({
      where: { slug },
      update: {
        title,
        description,
        content,
        tags,
        published: true,
        publishedAt: new Date(date),
      },
      create: {
        slug,
        title,
        description,
        content,
        tags,
        published: true,
        publishedAt: new Date(date),
      },
    });

    console.log(`✅ ${slug} — "${title}"`);
  }

  console.log(`\n${files.length} articulo(s) publicado(s).`);
}

main()
  .catch((err) => {
    console.error("❌", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
