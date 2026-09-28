import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";
import { CLUSTERS, type Cluster } from "@/lib/blog-schema";

// Imagen social por articulo, generada en el borde.
//
// Antes todos los articulos compartian el mismo /og.png: al compartir dos
// enlaces distintos en LinkedIn o WhatsApp se veian identicos, que es tanto
// como no tener imagen. Esta lleva el titular real de cada uno.

export const runtime = "edge";
export const alt = "Artículo del blog de Rianex";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BACKGROUND = "#FBFBF8";
const INK = "#12130F";
const ACCENT = "#C7D400";
const MUTED = "#54564C";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: { title: string; cluster: string | null } | null = null;
  try {
    post = await prisma.blogPost.findFirst({
      where: { slug, published: true },
      select: { title: true, cluster: true },
    });
  } catch {
    // sin base de datos se cae a la tarjeta generica de abajo
  }

  const titulo = post?.title ?? "Blog";
  const etiqueta =
    post?.cluster && post.cluster in CLUSTERS
      ? CLUSTERS[post.cluster as Cluster]
      : "Automatización con IA";

  // Los titulares largos necesitan bajar de cuerpo o se salen del lienzo.
  const tamano = titulo.length > 78 ? 52 : titulo.length > 52 ? 62 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BACKGROUND,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: ACCENT,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: INK,
              fontWeight: 700,
            }}
          >
            RIANEX
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: tamano,
              lineHeight: 1.08,
              color: INK,
              fontWeight: 700,
              letterSpacing: -1.5,
              display: "flex",
            }}
          >
            {titulo}
          </div>
          <div
            style={{
              marginTop: 28,
              height: 10,
              width: 150,
              background: ACCENT,
              display: "flex",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 25,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>{etiqueta}</div>
          <div style={{ display: "flex" }}>www.rianex.es</div>
        </div>
      </div>
    ),
    size
  );
}
