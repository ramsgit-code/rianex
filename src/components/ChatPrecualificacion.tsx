"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp, Loader2 } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { chatGreeting } from "@/lib/chat-prompt";

type Turn = { role: "user" | "assistant"; content: string };

const T = {
  es: {
    title: "Asistente de IA de Rianex",
    badge: "IA",
    placeholder: "Escribe tu respuesta…",
    send: "Enviar",
    finish: "Terminar y enviar al equipo",
    done: "Listo: el equipo tiene tu caso antes de la consultoría. Ya puedes reservar tu hueco.",
    error: "No he podido responder. Inténtalo otra vez o reserva directamente tu hueco.",
  },
  en: {
    title: "Rianex AI assistant",
    badge: "AI",
    placeholder: "Type your answer…",
    send: "Send",
    finish: "Finish and send to the team",
    done: "Done: the team has your case before the consultation. You can book your slot now.",
    error: "I couldn't reply. Try again or book your slot directly.",
  },
};

/**
 * Chat de precualificación tras enviar el formulario: el agente hace 3-4
 * preguntas para preparar la consultoría y el resumen llega a GHL.
 */
export function ChatPrecualificacion({ token, lang, name }: { token: string; lang: Lang; name: string }) {
  const t = T[lang];
  const greeting = chatGreeting(lang, name);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, loading]);

  const call = async (messages: Turn[], end = false) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, messages, lang, end }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error();
      if (data.reply) setTurns([...messages, { role: "assistant", content: data.reply }]);
      if (data.done) {
        setDone(true);
        window.gtag?.("event", "chat_precualificacion_fin", { idioma: lang, turnos: messages.length });
      }
    } catch {
      setError(t.error);
      // Si falla una respuesta, el mensaje del lead vuelve a la caja para
      // reenviarlo: dejarlo en la conversación dejaría dos mensajes seguidos
      // del lead, y el servidor rechaza esa conversación.
      if (!end) {
        setTurns(messages.slice(0, -1));
        setInput(messages[messages.length - 1].content);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading || done) return;
    const next = [...turns, { role: "user" as const, content: text.slice(0, 1200) }];
    setTurns(next);
    setInput("");
    if (next.length === 1) window.gtag?.("event", "chat_precualificacion_inicio", { idioma: lang });
    void call(next);
  };

  const finish = () => {
    if (loading || done || turns.length === 0) return;
    void call(turns, true);
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-xl border-2 border-ink bg-white text-left">
      <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-2.5 text-background">
        <span className="text-sm font-bold">{t.title}</span>
        <span className="bg-accent px-1.5 py-0.5 font-display text-[11px] font-bold uppercase tracking-[0.08em] text-ink">
          {t.badge}
        </span>
      </div>

      <div ref={listRef} className="max-h-[22rem] space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        <Bubble role="assistant" text={greeting} />
        {turns.map((m, i) => (
          <Bubble key={i} role={m.role} text={m.content} />
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Loader2 size={14} className="animate-spin" aria-hidden />
            <span className="sr-only">…</span>
          </div>
        )}
        {done && <p className="border-l-4 border-go bg-surface px-3 py-2 text-sm text-foreground">{t.done}</p>}
        {error && <p className="text-sm text-stop">{error}</p>}
      </div>

      {!done && (
        <>
          <form onSubmit={onSubmit} className="flex border-t-2 border-ink">
            <label htmlFor="chat-input" className="sr-only">
              {t.placeholder}
            </label>
            <textarea
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) onSubmit(e);
              }}
              rows={2}
              maxLength={1200}
              placeholder={t.placeholder}
              className="min-h-[3.25rem] flex-1 resize-none px-4 py-3 text-base text-foreground outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={t.send}
              className="flex w-14 shrink-0 items-center justify-center bg-ink text-background transition-colors hover:bg-accent hover:text-ink disabled:opacity-40"
            >
              <ArrowUp size={18} aria-hidden />
            </button>
          </form>
          {turns.length > 0 && (
            <button
              type="button"
              onClick={finish}
              disabled={loading}
              className="w-full border-t border-border px-4 py-2.5 text-sm font-semibold text-foreground-muted underline-offset-4 hover:underline disabled:opacity-50"
            >
              {t.finish}
            </button>
          )}
        </>
      )}
    </div>
  );
}

function Bubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  return (
    <div className={role === "user" ? "flex justify-end" : "flex justify-start"}>
      <p
        className={`max-w-[85%] whitespace-pre-line px-3.5 py-2.5 text-[15px] leading-relaxed ${
          role === "user" ? "bg-ink text-background" : "bg-surface text-foreground"
        }`}
      >
        {text}
      </p>
    </div>
  );
}
