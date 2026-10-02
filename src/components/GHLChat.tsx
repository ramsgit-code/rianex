"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { COOKIE_CONSENT_EVENT, getConsent } from "@/lib/consent";

// Embed del chat widget de GoHighLevel.
// Es un servicio de terceros (LeadConnector): solo se inyecta si el visitante
// aceptó cookies, y no en /diagnostico para no competir con el formulario.
const WIDGET_ID =
  process.env.NEXT_PUBLIC_GHL_WIDGET_ID || "6a61153502d958a92e448ae7";
const RESOURCES_URL =
  process.env.NEXT_PUBLIC_GHL_WIDGET_RESOURCES_URL ||
  "https://widgets.leadconnectorhq.com/chat-widget/loader.js";

function loadWidget() {
  if (document.querySelector("script[data-rianex-ghl-chat]")) return;

  const script = document.createElement("script");
  script.src = "https://widgets.leadconnectorhq.com/loader.js";
  script.setAttribute("data-resources-url", RESOURCES_URL);
  script.setAttribute("data-widget-id", WIDGET_ID);
  script.setAttribute("data-rianex-ghl-chat", "true");
  script.async = true;
  document.body.appendChild(script);
}

export function GHLChat() {
  const pathname = usePathname();
  // en /diagnostico el chat solo estorba: es la única página que existe para
  // que el visitante rellene el formulario, no para que hable con el bot.
  const blockedRoute = pathname === "/diagnostico";

  useEffect(() => {
    if (!WIDGET_ID || blockedRoute) return;

    try {
      if (getConsent() === "accepted") loadWidget();
    } catch {
      /* almacenamiento no disponible */
    }

    const onConsent = (e: Event) => {
      const value = (e as CustomEvent<"accepted" | "rejected">).detail;
      if (value === "accepted") loadWidget();
    };
    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent);
  }, [blockedRoute]);

  return null;
}
