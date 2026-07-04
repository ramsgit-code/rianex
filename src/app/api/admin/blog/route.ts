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

  // traducción automática al inglés (gratis, con fallback al original)
  const [titleEn, descriptionEn, contentEn] = await Promise.all([
    translate(body.title),
    translate(body.description),
    translate(body.content),
  ]);

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
