import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { translate } from "@/lib/translate";

export async function POST(req: NextRequest) {
  try {
    const { name, company, role, quote, imageUrl } = await req.json();

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

    // foto opcional: solo data URL de imagen y con tamaño acotado (~350 KB)
    let img: string | null = null;
    if (
      typeof imageUrl === "string" &&
      imageUrl.startsWith("data:image/") &&
      imageUrl.length < 350_000
    ) {
      img = imageUrl;
    }

    const cleanRole = role ? String(role).trim().slice(0, 120) : null;
    const cleanQuote = quote.trim().slice(0, 1000);

    // traducción automática al inglés (gratis, con fallback al original)
    const [quoteEn, roleEn] = await Promise.all([
      translate(cleanQuote),
      translate(cleanRole),
    ]);

    await prisma.testimonial.create({
      data: {
        name: name.trim().slice(0, 120),
        company: company ? String(company).trim().slice(0, 120) : null,
        role: cleanRole,
        quote: cleanQuote,
        roleEn,
        quoteEn,
        imageUrl: img,
        approved: false, // pendiente de revisión antes de publicarse
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
