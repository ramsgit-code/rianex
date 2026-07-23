import { NextRequest, NextResponse } from "next/server";
import { calculateScore, getTier, getTags } from "@/lib/lead-scoring";
import { upsertContact, removeContactTags, createOpportunity, buildCustomFields } from "@/lib/ghl";
import { leadFormSchema } from "@/lib/lead-schema";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const score = calculateScore({
    presupuesto: data.presupuesto,
    urgencia: data.urgencia,
    volumen_leads: data.volumen_leads,
    tamano_equipo: data.tamano_equipo,
    crm_actual: data.crm_actual,
    sector: data.sector,
  });

  const tier = getTier(score);
  const tags = getTags({ ...data, tier });
  const enriched = { ...data, lead_score: score, lead_tier: tier };

  let submissionId: string | null = null;

  try {
    const submission = await prisma.leadSubmission.create({
      data: {
        payload: enriched,
        score,
        tier,
        ghlSynced: false,
      },
    });
    submissionId = submission.id;
  } catch (err) {
    console.error("[leads API] DB save failed", err);
    return NextResponse.json(
      { ok: false, error: "Database unavailable" },
      { status: 503 }
    );
  }

  let ghlSynced = false;
  let ghlContactId: string | null = null;

  try {
    const [firstName, ...rest] = data.nombre.split(" ");
    const lastName = rest.join(" ");

    // Upsert: actualiza el MISMO contacto creado en la captura parcial
    // (match por email/teléfono), sin crear duplicados, y fija "lead-completo".
    const contact = await upsertContact({
      firstName,
      lastName,
      email: data.email,
      phone: data.telefono,
      website: data.web,
      source: data.como_conociste,
      tags: [...tags, "lead-completo"],
    });

    if (contact?.contact?.id) {
      const contactId: string = contact.contact.id;
      ghlContactId = contactId;

      // Quitamos el tag "lead-incompleto" ahora que el formulario está completo.
      await removeContactTags(contactId, ["lead-incompleto"]).catch(() => {});

      await createOpportunity({
        name: `${data.nombre} — ${data.empresa}`,
        pipelineId: process.env.GHL_PIPELINE_ID!,
        pipelineStageId: process.env.GHL_STAGE_NUEVO_LEAD!,
        contactId,
        status: "open",
        customFields: buildCustomFields(enriched),
      });
      ghlSynced = true;
    }
  } catch (err) {
    console.error("[leads API] GHL sync failed", err);
  }

  if (submissionId) {
    try {
      await prisma.leadSubmission.update({
        where: { id: submissionId },
        data: { ghlSynced, ghlContactId },
      });
    } catch {
      // non-blocking
    }
  }

  return NextResponse.json({
    ok: true,
    id: submissionId,
    score,
    tier,
    ghlSynced,
  });
}
