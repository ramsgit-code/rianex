import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { translate } from "@/lib/translate";

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await prisma.testimonial.findMany({
    orderBy: [{ approved: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.name || !body.quote) {
    return NextResponse.json({ error: "Nombre y testimonio obligatorios" }, { status: 400 });
  }

  const cleanRole = body.role ? String(body.role).trim().slice(0, 120) : null;
  const cleanQuote = String(body.quote).trim().slice(0, 1000);
  const [quoteEn, roleEn] = await Promise.all([
    translate(cleanQuote),
    translate(cleanRole),
  ]);

  const item = await prisma.testimonial.create({
    data: {
      name: String(body.name).trim().slice(0, 120),
      company: body.company ? String(body.company).trim().slice(0, 120) : null,
      role: cleanRole,
      quote: cleanQuote,
      roleEn,
      quoteEn,
      imageUrl: body.imageUrl ? String(body.imageUrl) : null,
      approved: body.approved !== false, // creado por admin -> publicado por defecto
    },
  });
  return NextResponse.json(item, { status: 201 });
}
