"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "@/lib/consent";
import { aiSource, visitReferrer } from "@/lib/ai-sources";

// La visita que llega desde un asistente de IA se avisa a GA4 una sola vez
// por carga de la pagina. Va en memoria y no en sessionStorage para no
// escribir nada en el navegador antes del consentimiento.
let aiReferralSent = false;

function getSessionId() {
  const key = "rp_session";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const consent = useConsent();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const referrer = visitReferrer(document.referrer, window.location.search);

    // GA4 respeta el Consent Mode por su cuenta: sin permiso manda un ping
    // sin cookies, asi que el evento no espera al consentimiento.
    const ai = aiSource(referrer);
    if (ai && !aiReferralSent) {
      aiReferralSent = true;
      const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", "ai_referral", { ai_source: ai });
    }

    // La analitica escribe un identificador de sesion en el terminal del
    // visitante, asi que entra en el art. 22.2 LSSI: no es estrictamente
    // necesaria para servir la web y necesita permiso antes de disparar.
    if (consent !== "accepted") return;

    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          referrer,
          sessionId: getSessionId(),
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* sessionStorage no disponible */
    }
  }, [pathname, consent]);

  return null;
}
