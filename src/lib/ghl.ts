// Go High Level API v2
// https://highlevel.stoplight.io/docs/integrations

const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;
const GHL_BASE_URL = "https://services.leadconnectorhq.com";

// ─── Opportunity custom field IDs (created once, stable forever) ──────────────
const OPP_FIELDS = {
  sector:             "ILDbsVEh6od6MJVII6oW",
  tipo_negocio:       "A2UjVb5Kt7HhGcwhCIHW",
  tamano_equipo:      "MVzlQ8W1TZQ2ksXMvVtp",
  volumen_leads:      "zoxT5vU9qQmpKOVXEfV7",
  crm_actual:         "spOahcIeVsvlqtG96tfC",
  usa_whatsapp:       "8KG5VT0jhrY6JYUHpGys",
  tiempo_propuesta:   "w6ejaMdnWvV7Yz03HAFO",
  problema_principal: "79KsdRBBvQjVBSjr6lj2",
  objetivos:          "Rnfk0yksNzmWdAEVDLfx",
  urgencia:           "BkqOkyDhjvKFs7NQ0FL7",
  presupuesto:        "cUKhFWVjHjLzFkGDq8l5",
  pais:               "72EfbndFsWh6EIUB5VGe",
  como_conociste:     "fbPfyHZH4dmRmSvana5P",
  notas:              "Po2l4Wy3YHbiIGJXgill",
  lead_score:         "fNL28BSYx01ywetdxnNu",
  lead_tier:          "j94ZI6j12pGLi2EGwKJY",
};

export interface GHLContactPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  website?: string;
  source?: string;
  tags?: string[];
  customField?: { id: string; field_value: string }[];
}

export interface GHLOpportunityPayload {
  name: string;
  pipelineId: string;
  pipelineStageId: string;
  contactId: string;
  status: "open" | "won" | "lost" | "abandoned";
  customFields?: { id: string; field_value: string }[];
}

async function ghlFetch(path: string, options: RequestInit) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    throw new Error("GHL env vars missing: GHL_API_KEY or GHL_LOCATION_ID not set");
  }

  const res = await fetch(`${GHL_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
      ...options.headers,
    },
  });

  const body = await res.text();

  if (!res.ok) {
    throw new Error(`GHL ${res.status} ${path}: ${body}`);
  }

  return JSON.parse(body);
}

// Contact: creates or returns existing if email already in GHL
export async function createOrUpdateContact(payload: GHLContactPayload) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    throw new Error("GHL env vars missing: GHL_API_KEY or GHL_LOCATION_ID not set");
  }

  const res = await fetch(`${GHL_BASE_URL}/contacts/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    body: JSON.stringify({ locationId: GHL_LOCATION_ID, ...payload }),
  });

  const body = await res.text();
  const json = JSON.parse(body);

  // GHL returns 400 when the contact already exists — extract the existing ID
  if (!res.ok) {
    if (res.status === 400 && json?.meta?.contactId) {
      return { contact: { id: json.meta.contactId } };
    }
    throw new Error(`GHL ${res.status} /contacts/: ${body}`);
  }

  return json;
}

// Update contact general info (name, phone, website, tags).
// Se usa al completar el formulario para refrescar los datos del contacto
// creado en la captura parcial y sustituir el tag "lead-incompleto".
export async function updateContact(
  contactId: string,
  payload: Partial<GHLContactPayload>
) {
  return ghlFetch(`/contacts/${contactId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// Opportunity: includes all form fields as custom fields
export async function createOpportunity(payload: GHLOpportunityPayload) {
  return ghlFetch("/opportunities/", {
    method: "POST",
    body: JSON.stringify({
      locationId: GHL_LOCATION_ID,
      ...payload,
    }),
  });
}

// Builds the customFields array for the opportunity from form data
export function buildOpportunityFields(
  data: Record<string, unknown>,
  score: number,
  tier: string
): { id: string; field_value: string }[] {
  const str = (v: unknown) => String(v ?? "").trim();

  return [
    { id: OPP_FIELDS.sector,             field_value: str(data.sector) },
    { id: OPP_FIELDS.tipo_negocio,       field_value: str(data.tipo_negocio) },
    { id: OPP_FIELDS.tamano_equipo,      field_value: str(data.tamano_equipo) },
    { id: OPP_FIELDS.volumen_leads,      field_value: str(data.volumen_leads) },
    { id: OPP_FIELDS.crm_actual,         field_value: str(data.crm_actual) },
    { id: OPP_FIELDS.usa_whatsapp,       field_value: str(data.usa_whatsapp) },
    { id: OPP_FIELDS.tiempo_propuesta,   field_value: str(data.tiempo_propuesta) },
    { id: OPP_FIELDS.problema_principal, field_value: str(data.problema_principal) },
    { id: OPP_FIELDS.objetivos,          field_value: Array.isArray(data.objetivo) ? (data.objetivo as string[]).join(", ") : str(data.objetivo) },
    { id: OPP_FIELDS.urgencia,           field_value: str(data.urgencia) },
    { id: OPP_FIELDS.presupuesto,        field_value: str(data.presupuesto) },
    { id: OPP_FIELDS.pais,               field_value: str(data.pais) },
    { id: OPP_FIELDS.como_conociste,     field_value: str(data.como_conociste) },
    { id: OPP_FIELDS.notas,              field_value: str(data.notas) },
    { id: OPP_FIELDS.lead_score,         field_value: String(score) },
    { id: OPP_FIELDS.lead_tier,          field_value: tier.toUpperCase() },
  ].filter((f) => f.field_value !== "");
}

export function buildCustomFields(data: Record<string, unknown>) {
  return buildOpportunityFields(data, data.lead_score as number, data.lead_tier as string);
}
