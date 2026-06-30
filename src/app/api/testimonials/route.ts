import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, company, role, quote } = await req.json();

    if (
      !name ||
      typeof name !== "string" ||
      name.trim().length < 2 ||
      !quote ||
      typeof quote !== "string" ||
      quote.trim().length < 10
    ) {
      return NextResponse.json({ error: "Datos no válidos" }, { status: 400 });
    }

    await prisma.testimonial.create({
      data: {
        name: name.trim().slice(0, 120),
        company: company ? String(company).trim().slice(0, 120) : null,
        role: role ? String(role).trim().slice(0, 120) : null,
        quote: quote.trim().slice(0, 1000),
        approved: false, // pendiente de revisión antes de publicarse
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
