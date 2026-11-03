"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { renderMarkdown } from "@/lib/markdown";
import type { LinkPolicy } from "@/lib/blog-schema";

type Post = {
  title: string;
  titleEn: string | null;
  content: string;
  contentEn: string | null;
  publishedAt: string | null;
  /** Politica de los enlaces externos que no traen marca propia. */
  linkPolicy?: LinkPolicy;
  video?: { src: string; poster: string } | null;
};

export function BlogPostContent({ post }: { post: Post }) {
  const { lang } = useLang();
  const en = lang === "en";

  const title = en ? post.titleEn ?? post.title : post.title;
  const content = en ? post.contentEn ?? post.content : post.content;

  return (
    <div className="pt-36 pb-16 md:pt-40">
      <div className="section">
        <Link href="/blog" className="text-sm text-muted hover:text-foreground">
          ← Blog
        </Link>
        <div className="mt-6 mb-8">
          <p className="mb-2 text-xs text-muted">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString(
                  en ? "en-GB" : "es-ES",
                  { year: "numeric", month: "long", day: "numeric" }
                )
              : ""}
          </p>
          <h1 className="section-title">{title}</h1>
        </div>
        {post.video && (
          <video
            controls
            playsInline
            preload="none"
            poster={post.video.poster}
            className="mb-10 aspect-video w-full border border-border bg-white"
          >
            <source src={post.video.src} type="video/mp4" />
          </video>
        )}
        <div>{renderMarkdown(content, post.linkPolicy ?? "nofollow")}</div>
      </div>
    </div>
  );
}
