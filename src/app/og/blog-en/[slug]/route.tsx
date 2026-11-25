import { CLUSTERS, CLUSTERS_EN } from "@/lib/blog-schema";
import { getAllPosts, getPost } from "@/lib/blog";
import { tarjetaSocial } from "@/lib/og-card";

// Imagen social de la traduccion al ingles de cada articulo: /og/blog-en/<slug>.

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts("en").map((p) => ({ slug: p.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPost(slug, "en");
  return tarjetaSocial(
    post?.title ?? "Blog",
    post ? CLUSTERS_EN[post.cluster] : "AI automation"
  );
}
