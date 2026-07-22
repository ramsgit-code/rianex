"use client";

import { useEffect } from "react";

// Embed del chat widget de Go High Level.
// Queda montado; solo se carga cuando defines NEXT_PUBLIC_GHL_WIDGET_ID en Vercel
// (el widget y su asistente de IA se configuran dentro de GHL).
const WIDGET_ID =
  process.env.NEXT_PUBLIC_GHL_WIDGET_ID || "6a61153502d958a92e448ae7";
const RESOURCES_URL =
  process.env.NEXT_PUBLIC_GHL_WIDGET_RESOURCES_URL ||
  "https://widgets.leadconnectorhq.com/chat-widget/loader.js";

export function GHLChat() {
  useEffect(() => {
    if (!WIDGET_ID) return;
    if (document.querySelector("script[data-rianex-ghl-chat]")) return;

    const script = document.createElement("script");
    script.src = "https://widgets.leadconnectorhq.com/loader.js";
    script.setAttribute("data-resources-url", RESOURCES_URL);
    script.setAttribute("data-widget-id", WIDGET_ID);
    script.setAttribute("data-rianex-ghl-chat", "true");
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
