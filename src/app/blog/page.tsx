import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BlogView } from "./BlogView";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guías sobre automatización comercial y Go High Level.",
};

export const revalidate = 60;

export default async function BlogPage() {
  let posts: {
    slug: string;
    title: string;
    description: string;
    titleEn: string | null;
    descriptionEn: string | null;
    publishedAt: Date | null;
    tags: string[];
  }[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        title: true,
        description: true,
        titleEn: true,
        descriptionEn: true,
        publishedAt: true,
        tags: true,
      },
    });
  } catch {
    // DB not configured
  }

  const serialized = posts.map((p) => ({
    ...p,
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
  }));

  return <BlogView posts={serialized} />;
}
