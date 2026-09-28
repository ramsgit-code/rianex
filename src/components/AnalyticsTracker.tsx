"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "@/lib/consent";

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
          referrer: document.referrer || null,
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
