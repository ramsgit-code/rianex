"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/components/LanguageProvider";
import { renderMarkdown } from "@/lib/markdown";
import type { LinkPolicy } from "@/lib/blog-schema";

type Post = {
  title: string;
  content: string;
  publishedAt: string | null;
  /** Solo si el articulo se ha revisado despues de publicarse. */
  updatedAt?: string | null;
  author?: { name: string; photo: string; href: string };
  /** Nombre del cluster, para el bloque de articulos relacionados. */
  clusterLabel?: string;
  related?: { slug: string; title: string; description: string }[];
  /** Politica de los enlaces externos que no traen marca propia. */
  linkPolicy?: LinkPolicy;
  video?: { src: string; poster: string } | null;
};

// Las fechas del blog son dias sin hora (medianoche UTC). Sin fijar la zona,
// un visitante al oeste de Greenwich veia el dia anterior y el HTML del
// servidor no coincidia con el del navegador.
function fecha(iso: string, en: boolean) {
  return new Date(iso).toLocaleDateString(en ? "en-GB" : "es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function BlogPostContent({ post }: { post: Post }) {
  // El idioma sale de la URL: /en/blog/<slug> recibe ya la traduccion.
  const { lang, localize } = useLang();
  const en = lang === "en";
  const { title, content } = post;

  return (
    <article className="pt-36 pb-16 md:pt-40">
      <div className="section">
        <nav aria-label={en ? "Breadcrumb" : "Migas de pan"} className="text-sm text-muted">
          <Link href={localize("/")} className="hover:text-foreground">
            {en ? "Home" : "Inicio"}
          </Link>
          <span aria-hidden className="mx-2">/</span>
          <Link href={localize("/blog")} className="hover:text-foreground">
            Blog
          </Link>
        </nav>
        <div className="mt-6 mb-8">
          <h1 className="section-title">{title}</h1>
          {/* Firma y fechas a la vista: quién lo escribe y cuándo se revisó. */}
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground-muted">
            {post.author && (
              <Link href={localize(post.author.href)} rel="author" className="inline-flex items-center gap-2 font-medium text-foreground hover:underline">
                <Image
                  src={post.author.photo}
                  alt=""
                  width={28}
                  height={28}
                  // Primera imagen del articulo y encima del pliegue: sin lazy.
                  loading="eager"
                  className="h-7 w-7 rounded-full border border-border object-cover"
                />
                {post.author.name}
              </Link>
            )}
            {post.publishedAt && (
              <span>
                {post.author && <span aria-hidden className="mr-3 hidden sm:inline">·</span>}
                <time dateTime={post.publishedAt.slice(0, 10)}>{fecha(post.publishedAt, en)}</time>
              </span>
            )}
            {post.updatedAt && (
              <span>
                <span aria-hidden className="mr-3 hidden sm:inline">·</span>
                {en ? "Updated " : "Actualizado el "}
                <time dateTime={post.updatedAt.slice(0, 10)}>{fecha(post.updatedAt, en)}</time>
              </span>
            )}
          </div>
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

        {post.related && post.related.length > 0 && (
          <aside className="mt-16 border-t-2 border-ink pt-8">
            <h2 className="font-display text-2xl font-extrabold uppercase text-foreground">
              {en ? "Keep reading" : "Sigue leyendo"}
              {post.clusterLabel && (
                <span className="mt-1 block font-sans text-sm font-medium normal-case text-muted">
                  {post.clusterLabel}
                </span>
              )}
            </h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
              {post.related.map((r) => (
                <li key={r.slug}>
                  <Link href={localize(`/blog/${r.slug}`)} className="group block">
                    <span className="font-semibold text-foreground group-hover:underline">{r.title}</span>
                    <span className="mt-2 block text-sm text-foreground-muted">{r.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </article>
  );
}
