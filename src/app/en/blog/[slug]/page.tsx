import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { JsonLd } from "@/components/JsonLd";
import { BlogPostContent } from "@/app/blog/[slug]/BlogPostContent";
import type { LinkPolicy } from "@/lib/blog-schema";
import { alternates } from "@/lib/i18n";

const SITE_URL = "https://www.rianex.es";

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
  // Ojo con el try/catch aqui: si se traga un fallo de base y devuelve null, la
  // pagina responde 404, que le dice a Google que el articulo no existe y puede
  // acabar desindexandolo. Un fallo de infraestructura tiene que salir como
  // error (500) para que el rastreador reintente en vez de darlo por muerto.
  return prisma.blogPost.findFirst({
    where: { slug, published: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found" };

  // Los posts se traducen al guardarlos en el panel. Si algun campo se quedo
  // sin traducir se cae al castellano antes que dejarlo vacio.
  const title = post.titleEn || post.title;
  const description = post.descriptionEn || post.description;
  const ogImg = "/og.png";

  return {
    title,
    description,
    alternates: alternates(`/blog/${post.slug}`, "en"),
    openGraph: {
      type: "article",
      locale: "en_US",
      title,
      description,
      url: `${SITE_URL}/en/blog/${post.slug}`,
      images: [{ url: ogImg, width: 1200, height: 630 }],
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImg],
    },
  };
}

export default async function BlogPostPageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titleEn || post.title,
    description: post.descriptionEn || post.description,
    image: `${SITE_URL}/og.png`,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: "Ramiro Pérez" },
    publisher: { "@type": "Organization", name: "Rianex" },
    mainEntityOfPage: `${SITE_URL}/en/blog/${post.slug}`,
    inLanguage: "en",
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
          linkPolicy: post.linkPolicy as LinkPolicy,
        }}
      />
    </>
  );
}
