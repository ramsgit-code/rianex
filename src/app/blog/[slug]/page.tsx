import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { JsonLd } from "@/components/JsonLd";
import { BlogPostContent } from "./BlogPostContent";

const SITE_URL = "https://rianex.vercel.app";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

async function getPost(slug: string) {
  try {
    return await prisma.blogPost.findFirst({
      where: { slug, published: true },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Artículo no encontrado" };
  const ogImg = `/og?title=${encodeURIComponent(post.title)}&tag=Blog`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      images: [{ url: ogImg, width: 1200, height: 630 }],
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImg],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}/og?title=${encodeURIComponent(post.title)}&tag=Blog`,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: "Ramiro Pérez" },
    publisher: { "@type": "Organization", name: "Rianex" },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    inLanguage: "es-ES",
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <BlogPostContent
        post={{
          title: post.title,
          titleEn: post.titleEn,
          content: post.content,
          contentEn: post.contentEn,
          publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
        }}
      />
    </>
  );
}
