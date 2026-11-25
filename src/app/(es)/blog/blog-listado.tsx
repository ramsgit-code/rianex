import { getAllPosts, getPost } from "@/lib/blog";
import { BlogView } from "./BlogView";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import type { Lang } from "@/lib/i18n";


export function Blog({ lang }: { lang: Lang }) {
  // El listado en ingles enseña el titulo traducido de cada articulo que
  // tiene traduccion; los que no, salen en castellano y su enlace /en/blog
  // redirige al original.
  const posts = getAllPosts().map((p) => {
    const en = getPost(p.slug, "en");
    return {
    slug: p.slug,
    title: p.title,
    description: p.description,
    titleEn: en?.title ?? null,
    descriptionEn: en?.description ?? null,
    publishedAt: p.publishedAt.toISOString(),
    tags: p.tags,
    tagsEn: en?.tags ?? null,
    };
  });

  return (
    <>
      <ListingJsonLd path="/blog" lang={lang} />
      <BlogView posts={posts} />
    </>
  );
}
