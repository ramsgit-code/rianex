import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { BlogPostContent } from "./BlogPostContent";
import { getPost, getPostFaqs, getRelatedPosts, hasTranslation } from "@/lib/blog";
import { CLUSTERS, CLUSTERS_EN } from "@/lib/blog-schema";
import { PERSON_ID, ORGANIZATION_ID, RAMIRO, SITE_URL, withBrand } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";

// Metadata y pagina de un articulo, para las dos rutas: /blog/<slug> (el
// original, en castellano) y /en/blog/<slug> (la traduccion, si existe).

const BRAND = "Rianex";

const ruta = (slug: string, lang: Lang) => (lang === "en" ? `/en/blog/${slug}` : `/blog/${slug}`);
const imagen = (slug: string, lang: Lang) => (lang === "en" ? `/og/blog-en/${slug}` : `/og/blog/${slug}`);

export function articleMetadata(slug: string, lang: Lang): Metadata {
  const post = getPost(slug, lang);
  if (!post) return { title: lang === "en" ? "Article not found" : "Artículo no encontrado" };
  const url = ruta(slug, lang);
  const image = { url: imagen(slug, lang), width: 1200, height: 630, alt: post.title };
  // Los titulares largos van sin " | Rianex" (ver withBrand).
  const title = withBrand(post.seoTitle ?? post.title);
  return {
    title: { absolute: title },
    description: post.description,
    // hreflang solo si existen las dos versiones: declarar una traduccion
    // que no existe es peor que no declarar nada.
    alternates: {
      canonical: url,
      // Version Markdown para asistentes de IA (src/app/md).
      types: { "text/markdown": `${url}.md` },
      ...(hasTranslation(slug)
        ? {
            languages: {
              "es-ES": ruta(slug, "es"),
              en: ruta(slug, "en"),
              "x-default": ruta(slug, "es"),
            },
          }
        : {}),
    },
    openGraph: {
      type: "article",
      locale: lang === "en" ? "en_US" : "es_ES",
      siteName: BRAND,
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

export function Articulo({ slug, lang }: { slug: string; lang: Lang }) {
  const post = getPost(slug, lang);
  if (!post) notFound();
  const en = lang === "en";
  const url = `${SITE_URL}${ruta(slug, lang)}`;
  const inLanguage = en ? "en" : "es-ES";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${imagen(slug, lang)}`,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    // Mismos @id que la home y /sobre-mi: asi buscadores y asistentes unen el
    // articulo con la persona que lo firma y con la empresa, en vez de ver un
    // nombre suelto en cada pagina.
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: post.author,
      url: `${SITE_URL}${en ? "/en" : ""}/sobre-mi`,
      image: `${SITE_URL}${RAMIRO.photo}`,
      jobTitle: en ? "Industrial engineer" : "Ingeniero industrial",
      sameAs: [RAMIRO.linkedin],
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: BRAND,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logos/rianex-mark.png` },
    },
    mainEntityOfPage: url,
    keywords: post.tags.join(", "),
    inLanguage,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: en ? "Home" : "Inicio", item: `${SITE_URL}${en ? "/en" : ""}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}${en ? "/en" : ""}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const revisado = post.updatedAt.getTime() > post.publishedAt.getTime();
  const related = getRelatedPosts(post, 3, lang).map((r) => ({
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
        // Los videos estan locutados en castellano tambien en la version inglesa.
        inLanguage: "es-ES",
      }
    : null;

  const faqs = getPostFaqs(post);
  const faqJsonLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage,
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
          content: post.content,
          publishedAt: post.publishedAt.toISOString(),
          updatedAt: revisado ? post.updatedAt.toISOString() : null,
          author: { name: post.author, photo: RAMIRO.photo, href: "/sobre-mi" },
          clusterLabel: (en ? CLUSTERS_EN : CLUSTERS)[post.cluster],
          related,
          linkPolicy: post.linkPolicy,
          video: post.video,
        }}
      />
    </>
  );
}
