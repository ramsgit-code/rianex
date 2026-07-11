import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { translate } from "@/lib/translate";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const tags: string[] | undefined = Array.isArray(body.tags) ? body.tags : undefined;

  try {
    const existing = await prisma.blogPost.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const published = Boolean(body.published);

    // si el admin escribió el inglés a mano, se respeta; si no, se traduce
    const titleEn = body.titleEn?.trim() ? body.titleEn : await translate(body.title);
    const descriptionEn = body.descriptionEn?.trim()
      ? body.descriptionEn
      : await translate(body.description);
    const contentEn = body.contentEn?.trim()
      ? body.contentEn
      : await translate(body.content);

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        content: body.content,
        titleEn,
        descriptionEn,
        contentEn,
        tags,
        published,
        publishedAt:
          published && !existing.publishedAt
            ? new Date()
            : published
              ? existing.publishedAt
              : null,
      },
    });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.blogPost.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
