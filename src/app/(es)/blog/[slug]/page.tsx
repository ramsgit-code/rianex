import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { Articulo, articleMetadata } from "./articulo";

// Solo existen los articulos del build: cualquier otro slug es un 404 servido
// sin tocar nada en tiempo de ejecucion.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return articleMetadata((await params).slug, "es");
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return <Articulo slug={(await params).slug} lang="es" />;
}
