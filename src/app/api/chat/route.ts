import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { verifyChatToken } from "@/lib/chat-token";
import { addContactNote, addContactTags } from "@/lib/ghl";
import { chatGreeting, chatSystemPrompt, chatSummaryPrompt, firstName, leadContext } from "@/lib/chat-prompt";

// Chat de precualificación de la pantalla de gracias de /diagnostico.
// El lead acaba de enviar el formulario; un agente de IA le hace unas pocas
// preguntas para preparar la consultoría. Cada turno se guarda en la
// solicitud y, al terminar, el resumen va como nota a su contacto de GHL.

const MODEL = "claude-opus-5-5";
const MAX_USER_TURNS = 8;
const MAX_CHARS = 1200;
const END_MARK = "[FIN]";

// El SDK instalado (0.30) no tipa output_config ni fallbacks: se envían tal
// cual en el cuerpo. Esfuerzo bajo: es conversación, no razonamiento largo.
// fallbacks "default": si el modelo rechaza, la API reintenta en otro.
const EXTRA = {
  output_config: { effort: "low" },
  fallbacks: "default",
} as Record<string, unknown>;
const EXTRA_HEADERS = { "anthropic-beta": "server-side-fallback-2026-07-01" };

type Turn = { role: "user" | "assistant"; content: string };

function cleanTurns(raw: unknown, ending: boolean): Turn[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_USER_TURNS * 2) return null;
  const turns: Turn[] = [];
  for (const t of raw) {
    if (!t || (t.role !== "user" && t.role !== "assistant") || typeof t.content !== "string") return null;
    const content = t.content.trim().slice(0, MAX_CHARS);
    if (!content) return null;
    turns.push({ role: t.role, content });
  }
  // La conversación que ve el modelo empieza y acaba con el visitante (al
  // cerrar desde el botón, puede acabar con la última respuesta del agente).
  if (turns[0].role !== "user") return null;
  if (!ending && turns[turns.length - 1].role !== "user") return null;
  for (let i = 1; i < turns.length; i++) if (turns[i].role === turns[i - 1].role) return null;
  return turns;
}

function textOf(msg: Anthropic.Message): string {
  return msg.content
    .map((b) => (b.type === "text" ? b.text : ""))
    .join("")
    .trim();
}

export async function POST(req: NextRequest) {
  const limited = await rateLimit(req, 20, "chat");
  if (limited) return limited;

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ ok: false, error: "Chat no disponible" }, { status: 503 });
  }

  let body: { token?: unknown; messages?: unknown; lang?: unknown; end?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const sid = verifyChatToken(body.token);
  if (!sid) return NextResponse.json({ ok: false, error: "Token no válido" }, { status: 401 });

  const lang = body.lang === "en" ? "en" : "es";
  const turns = cleanTurns(body.messages, body.end === true);
  if (!turns) return NextResponse.json({ ok: false, error: "Conversación no válida" }, { status: 400 });

  const submission = await prisma.leadSubmission
    .findUnique({ where: { id: sid } })
    .catch(() => null);
  if (!submission) return NextResponse.json({ ok: false, error: "Solicitud no encontrada" }, { status: 404 });

  const payload = (submission.payload ?? {}) as Record<string, unknown>;
  const userTurns = turns.filter((t) => t.role === "user").length;
  const client = new Anthropic();

  let reply = "";
  let done = body.end === true || userTurns >= MAX_USER_TURNS;

  if (body.end !== true) {
    try {
      const msg = await client.messages.create(
        {
          model: MODEL,
          max_tokens: 2000,
          system: chatSystemPrompt(lang, leadContext(payload), userTurns >= MAX_USER_TURNS),
          messages: turns,
          ...EXTRA,
        } as Anthropic.MessageCreateParamsNonStreaming,
        { headers: EXTRA_HEADERS }
      );
      if ((msg.stop_reason as string) === "refusal") {
        reply =
          lang === "en"
            ? "I'd rather leave that for the consultation with the team. Is there anything else about your process you'd like us to know?"
            : "Eso prefiero dejarlo para la consultoría con el equipo. ¿Hay algo más de tu proceso que quieras que sepamos?";
      } else {
        reply = textOf(msg);
      }
    } catch (err) {
      console.error("[chat API] Claude failed", err);
      return NextResponse.json({ ok: false, error: "No se pudo responder" }, { status: 502 });
    }
    if (reply.includes(END_MARK)) {
      done = true;
      reply = reply.replace(END_MARK, "").trim();
    }
  }

  const transcript = reply ? [...turns, { role: "assistant" as const, content: reply }] : turns;

  // Guardar la conversación en la solicitud en cada turno: si el visitante
  // cierra la pestaña, el equipo la tiene igual en el panel.
  await prisma.leadSubmission
    .update({
      where: { id: sid },
      data: {
        payload: {
          ...payload,
          chat: { greeting: chatGreeting(lang, firstName(payload)), turns: transcript, updatedAt: new Date().toISOString(), done },
        },
      },
    })
    .catch((err) => console.error("[chat API] DB save failed", err));

  if (done && submission.ghlContactId && !payload.chatNoteSent) {
    try {
      const summaryMsg = await client.messages.create(
        {
          model: MODEL,
          max_tokens: 2000,
          system: chatSummaryPrompt,
          messages: [
            {
              role: "user",
              content: `<datos_formulario>\n${leadContext(payload)}\n</datos_formulario>\n\n<conversacion>\n${transcript
                .map((t) => `${t.role === "user" ? "Lead" : "Agente"}: ${t.content}`)
                .join("\n")}\n</conversacion>`,
            },
          ],
          ...EXTRA,
        } as Anthropic.MessageCreateParamsNonStreaming,
        { headers: EXTRA_HEADERS }
      );
      const summary = (summaryMsg.stop_reason as string) === "refusal" ? "" : textOf(summaryMsg);
      const note = `Chat de precualificación (IA, web)\n\n${summary || "(sin resumen)"}\n\n— Conversación —\n${transcript
        .map((t) => `${t.role === "user" ? "Lead" : "Agente"}: ${t.content}`)
        .join("\n")}`;
      await addContactNote(submission.ghlContactId, note);
      await addContactTags(submission.ghlContactId, ["chat-ia"]).catch(() => {});
      await prisma.leadSubmission
        .update({ where: { id: sid }, data: { payload: { ...payload, chatNoteSent: true, chat: { greeting: chatGreeting(lang, firstName(payload)), turns: transcript, updatedAt: new Date().toISOString(), done } } } })
        .catch(() => {});
    } catch (err) {
      console.error("[chat API] GHL note failed", err);
    }
  }

  return NextResponse.json({ ok: true, reply, done });
}
