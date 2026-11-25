import { CLUSTERS } from "@/lib/blog-schema";
import { getAllPosts, getPost } from "@/lib/blog";
import { tarjetaSocial } from "@/lib/og-card";

// Imagen social por articulo, generada en el build: /og/blog/<slug>.
//
// Es una ruta propia y no un opengraph-image.tsx porque el blog vive dentro
// del grupo (es), y ahi Next le pone un sufijo aleatorio a la URL de la
// imagen. El JSON-LD necesita una URL estable a la que apuntar.
//
// Antes todos los articulos compartian el mismo /og.png: al compartir dos
// enlaces distintos en LinkedIn o WhatsApp se veian identicos, que es tanto
// como no tener imagen. Esta lleva el titular real de cada uno.

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPost(slug);
  return tarjetaSocial(
    post?.title ?? "Blog",
    post ? CLUSTERS[post.cluster] : "Automatización con IA"
  );
}
