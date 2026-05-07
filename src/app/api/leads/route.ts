import { NextRequest, NextResponse } from "next/server";
import { calculateScore, getTier, getTags } from "@/lib/lead-scoring";
import { createOrUpdateContact, createOpportunity, buildOpportunityFields } from "@/lib/ghl";

export async function POST(req: NextRequest) {
  let data: Record<string, unknown> = {};

  try {
    data = await req.json();

    // 1. Lead scoring
    const score = calculateScore({
      presupuesto:    data.presupuesto    as string,
      urgencia:       data.urgencia       as string,
      volumen_leads:  data.volumen_leads  as string,
      tamano_equipo:  data.tamano_equipo  as string,
      crm_actual:     data.crm_actual     as string,
      sector:         data.sector         as string,
    });

    const tier = getTier(score);
    const tags = getTags({
      presupuesto:    data.presupuesto    as string,
      urgencia:       data.urgencia       as string,
      volumen_leads:  data.volumen_leads  as string,
      tamano_equipo:  data.tamano_equipo  as string,
      crm_actual:     data.crm_actual     as string,
      sector:         data.sector         as string,
      como_conociste: data.como_conociste as string,
      tier,
    });

    // 2. Parse name
    const [firstName, ...rest] = (data.nombre as string).trim().split(" ");
    const lastName = rest.join(" ");

    // 3. Create contact — solo campos básicos
    const contactRes = await createOrUpdateContact({
      firstName,
      lastName,
      email:   data.email    as string,
      phone:   data.telefono as string,
      website: data.web      as string | undefined,
      source:  data.como_conociste as string,
      tags,
    });

    const contactId: string | undefined = contactRes?.contact?.id;

    if (!contactId) {
      console.error("[leads API] No contact ID returned:", JSON.stringify(contactRes));
      return NextResponse.json({ ok: true, score, tier, warn: "no contact id" });
    }

    // 4. Create opportunity — con todos los campos del formulario como custom fields
    if (!process.env.GHL_PIPELINE_ID || !process.env.GHL_STAGE_NUEVO_LEAD) {
      console.warn("[leads API] GHL_PIPELINE_ID or GHL_STAGE_NUEVO_LEAD not set");
    } else {
      const opportunityName = `${data.nombre} — ${data.empresa} [${tier.toUpperCase()} · ${score}pts]`;

      await createOpportunity({
        name:            opportunityName,
        pipelineId:      process.env.GHL_PIPELINE_ID,
        pipelineStageId: process.env.GHL_STAGE_NUEVO_LEAD,
        contactId,
        status:          "open",
        customFields:    buildOpportunityFields(data, score, tier),
      });
    }

    return NextResponse.json({ ok: true, score, tier });

  } catch (err) {
    console.error("[leads API] ERROR:", err instanceof Error ? err.message : String(err));
    console.error("[leads API] Lead:", { nombre: data.nombre, empresa: data.empresa, email: data.email });
    return NextResponse.json({ ok: true, fallback: true, error: (err as Error).message });
  }
}
