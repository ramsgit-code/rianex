"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

type Post = {
  slug: string;
  title: string;
  description: string;
  titleEn: string | null;
  descriptionEn: string | null;
  publishedAt: string | null;
  tags: string[];
};

export function BlogView({ posts }: { posts: Post[] }) {
  const { c, lang } = useLang();
  const b = c.blog;

  return (
    <>
      <PageShell tag={b.tag} title={b.title} description={b.description} wide>
        {posts.length === 0 ? (
          <p className="text-sm text-muted">{b.empty}</p>
        ) : (
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={i * 0.05} className="h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="card group flex h-full flex-col"
                  >
                    <h2 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                      {lang === "en" ? post.titleEn ?? post.title : post.title}
                    </h2>
                    <p className="mb-4 mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
                      {lang === "en"
                        ? post.descriptionEn ?? post.description
                        : post.description}
                    </p>
                    <p className="text-xs text-muted">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString(
                            lang === "en" ? "en-GB" : "es-ES"
                          )
                        : ""}
                      {post.tags.length > 0 &&
                        ` · ${post.tags.slice(0, 2).join(", ")}`}
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </PageShell>
    </>
  );
}
