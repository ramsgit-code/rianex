import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { translate } from "@/lib/translate";

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const slug = body.slug || slugify(body.title);
  const tags: string[] = Array.isArray(body.tags) ? body.tags : [];

  // si el admin escribió el inglés a mano, se respeta; si no, se traduce
  const titleEn = body.titleEn?.trim() ? body.titleEn : await translate(body.title);
  const descriptionEn = body.descriptionEn?.trim()
    ? body.descriptionEn
    : await translate(body.description);
  const contentEn = body.contentEn?.trim()
    ? body.contentEn
    : await translate(body.content);

  try {
    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug,
        description: body.description,
        content: body.content,
        titleEn,
        descriptionEn,
        contentEn,
        tags,
        published: Boolean(body.published),
        publishedAt: body.published ? new Date() : null,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Slug duplicado o datos invalidos" }, { status: 400 });
  }
}
