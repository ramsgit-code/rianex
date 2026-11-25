import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { Articulo, articleMetadata } from "@/app/(es)/blog/[slug]/articulo";

// Traducciones al ingles (src/content/blog-en). Un articulo sin traducir no
// tiene pagina aqui: /en/blog/<slug> redirige al original (next.config.mjs).
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts("en").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return articleMetadata((await params).slug, "en");
}

export default async function BlogPostPageEn({ params }: { params: Promise<{ slug: string }> }) {
  return <Articulo slug={(await params).slug} lang="en" />;
}
