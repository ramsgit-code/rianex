import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { upsertContact } from "@/lib/ghl";

// Captura parcial de contacto (paso 1 del formulario) para arrancar el
// nurturing en GHL aunque el lead no termine el diagnóstico.
const partialSchema = z.object({
  nombre: z.string().optional(),
  email: z.string().email().transform((v) => v.trim().toLowerCase()),
  telefono: z.string().min(7),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = partialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed" }, { status: 400 });
  }

  const { nombre, email, telefono } = parsed.data;
  const [firstName, ...rest] = (nombre ?? "").trim().split(" ");
  const lastName = rest.join(" ");

  try {
    await upsertContact({
      firstName: firstName || "Lead",
      lastName,
      email,
      phone: telefono,
      source: "web-form-parcial",
      tags: ["lead-incompleto", "web-diagnostico"],
    });
  } catch (err) {
    // no bloqueante: el formulario sigue su curso; si GHL falla, se captura al final
    console.error("[leads/partial] GHL sync failed", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true });
}
