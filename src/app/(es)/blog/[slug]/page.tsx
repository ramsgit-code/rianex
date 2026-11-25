import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { BlogPostContent } from "./BlogPostContent";
import { getAllPosts, getPost, getPostFaqs, getRelatedPosts } from "@/lib/blog";
import { CLUSTERS } from "@/lib/blog-schema";
import { PERSON_ID, ORGANIZATION_ID, RAMIRO } from "@/lib/seo";

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
      modifiedTime: post.updatedAt.toISOString(),
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
    dateModified: post.updatedAt.toISOString(),
    // Mismos @id que la home y /sobre-mi: asi buscadores y asistentes unen el
    // articulo con la persona que lo firma y con la empresa, en vez de ver un
    // nombre suelto en cada pagina.
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: post.author,
      url: `${SITE_URL}/sobre-mi`,
      image: `${SITE_URL}${RAMIRO.photo}`,
      jobTitle: "Ingeniero industrial",
      sameAs: [RAMIRO.linkedin],
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Rianex",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logos/rianex-mark.png` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    inLanguage: "es-ES",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  const revisado = post.updatedAt.getTime() > post.publishedAt.getTime();
  const related = getRelatedPosts(post).map((r) => ({
    slug: r.slug,
    title: r.title,
    description: r.description,
  }));

  const videoJsonLd = post.video
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: post.title,
        description: post.description,
        thumbnailUrl: `${SITE_URL}${post.video.poster}`,
        contentUrl: `${SITE_URL}${post.video.src}`,
        uploadDate: post.publishedAt.toISOString(),
        duration: post.video.duration,
        inLanguage: "es-ES",
      }
    : null;

  const faqs = getPostFaqs(post);
  const faqJsonLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      {videoJsonLd && <JsonLd data={videoJsonLd} />}
      <BlogPostContent
        post={{
          title: post.title,
          titleEn: null,
          content: post.content,
          contentEn: null,
          publishedAt: post.publishedAt.toISOString(),
          updatedAt: revisado ? post.updatedAt.toISOString() : null,
          author: { name: post.author, photo: RAMIRO.photo, href: "/sobre-mi" },
          clusterLabel: CLUSTERS[post.cluster],
          related,
          linkPolicy: post.linkPolicy,
          video: post.video,
        }}
      />
    </>
  );
}
