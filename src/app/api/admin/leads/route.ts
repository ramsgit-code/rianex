import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateScore, getTier } from "@/lib/lead-scoring";

export async function POST(req: NextRequest) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.nombre || String(body.nombre).trim().length < 2) {
    return NextResponse.json({ error: "Nombre obligatorio" }, { status: 400 });
  }

  const payload = {
    nombre: String(body.nombre).trim(),
    empresa: body.empresa ? String(body.empresa).trim() : "",
    email: body.email ? String(body.email).trim() : "",
    telefono: body.telefono ? String(body.telefono).trim() : "",
    sector: body.sector ?? "",
    presupuesto: body.presupuesto ?? "",
    urgencia: body.urgencia ?? "",
    volumen_leads: body.volumen_leads ?? "",
    tamano_equipo: body.tamano_equipo ?? "",
    crm_actual: body.crm_actual ?? "",
    notas: body.notas ? String(body.notas).trim() : "",
    origen: "manual",
  };

  const score = calculateScore({
    presupuesto: payload.presupuesto,
    urgencia: payload.urgencia,
    volumen_leads: payload.volumen_leads,
    tamano_equipo: payload.tamano_equipo,
    crm_actual: payload.crm_actual,
    sector: payload.sector,
  });
  const tier = getTier(score);

  const lead = await prisma.leadSubmission.create({
    data: { payload, score, tier, ghlSynced: false },
  });

  return NextResponse.json(lead, { status: 201 });
}

export async function GET(req: NextRequest) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tier = req.nextUrl.searchParams.get("tier");
  const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") ?? 50), 100);

  const leads = await prisma.leadSubmission.findMany({
    where: tier ? { tier } : undefined,
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return NextResponse.json(leads);
}
