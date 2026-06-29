import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { renderMarkdown } from "@/lib/markdown";

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
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <div className="pt-36 pb-16 md:pt-40">
      <div className="section">
        <Link href="/blog" className="text-sm text-muted hover:text-foreground">
          ← Blog
        </Link>
          <div className="mt-6 mb-8">
            <p className="text-xs text-muted mb-2">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </p>
            <h1 className="section-title">{post.title}</h1>
          </div>
        <div>{renderMarkdown(post.content)}</div>
      </div>
    </div>
  );
}
