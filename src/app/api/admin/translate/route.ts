import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { translate } from "@/lib/translate";

export async function POST(req: NextRequest) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { title, description, content } = await req.json();
  const [titleEn, descriptionEn, contentEn] = await Promise.all([
    translate(title),
    translate(description),
    translate(content),
  ]);
  return NextResponse.json({ titleEn, descriptionEn, contentEn });
}
