import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { BlogPostContent } from "./BlogPostContent";
import { getAllPosts, getPost } from "@/lib/blog";

const SITE_URL = "https://www.rianex.es";

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
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Artículo no encontrado" };
  const url = `/blog/${post.slug}`;
  const image = { url: `/og/blog/${post.slug}`, width: 1200, height: 630, alt: post.title };
  return {
    title: post.title,
    description: post.description,
    // Sin hreflang: los articulos no tienen version en ingles, y declarar una
    // que no existe es peor que no declarar nada.
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}${url}`,
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author],
      tags: post.tags,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image.url],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}/og/blog/${post.slug}`,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.publishedAt.toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Rianex", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    inLanguage: "es-ES",
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <BlogPostContent
        post={{
          title: post.title,
          titleEn: null,
          content: post.content,
          contentEn: null,
          publishedAt: post.publishedAt.toISOString(),
          linkPolicy: post.linkPolicy,
        }}
      />
    </>
  );
}
