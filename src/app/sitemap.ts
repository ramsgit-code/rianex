import { MetadataRoute } from "next";
import { promises as fs } from "fs";
import path from "path";

const BASE_URL = "https://ria-consulting.com";

async function getBlogSlugs(): Promise<{ slug: string; date: string }[]> {
  const blogDir = path.join(process.cwd(), "src", "content", "blog");
  try {
    const files = await fs.readdir(blogDir);
    const posts = await Promise.all(
      files
        .filter((f) => f.endsWith(".mdx"))
        .map(async (f) => {
          const content = await fs.readFile(path.join(blogDir, f), "utf-8");
          const fm = content.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
          const date = fm.match(/date: "?([^"\n]+)"?/)?.[1] ?? new Date().toISOString().split("T")[0];
          return { slug: f.replace(".mdx", ""), date };
        })
    );
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getBlogSlugs();

  return [
    { url: BASE_URL,                     lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/servicios`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/diagnostico`,    lastModified: now, changeFrequency: "yearly",  priority: 0.9 },
    { url: `${BASE_URL}/casos-de-exito`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/soluciones`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`,           lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/sobre-mi`,       lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    ...posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
