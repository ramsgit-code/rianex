import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { BlogView } from "./BlogView";

export const metadata: Metadata = pageMetadata("/blog", "es");

export default function BlogPage() {
  // Los articulos solo existen en castellano: el listado en ingles enlaza a
  // la version castellana de cada uno.
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    titleEn: null,
    descriptionEn: null,
    publishedAt: p.publishedAt.toISOString(),
    tags: p.tags,
  }));

  return <BlogView posts={posts} />;
}
