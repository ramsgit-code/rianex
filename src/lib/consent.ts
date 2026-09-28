"use client";

import { useEffect, useState } from "react";

// Estado del aviso de cookies, compartido por todo lo que solo puede arrancar
// con permiso: la analitica propia, GA4 y el chat de GoHighLevel.

export const COOKIE_CONSENT_KEY = "rianex-cookie-consent";
export const COOKIE_CONSENT_EVENT = "rianex:cookie-consent";

export type ConsentValue = "accepted" | "rejected" | null;

export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return raw === "accepted" || raw === "rejected" ? raw : null;
  } catch {
    // modo privado o almacenamiento bloqueado: sin permiso explicito
    return null;
  }
}

export function setConsent(value: Exclude<ConsentValue, null>) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* noop */
  }

  // La etiqueta de Google (layout.tsx) arranca con analytics_storage denegado;
  // aqui se levanta o se confirma la denegacion. Va en este modulo, y no en el
  // componente del aviso, para que quede un unico punto desde el que se propaga
  // la decision a todo lo que depende de ella.
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", {
    analytics_storage: value === "accepted" ? "granted" : "denied",
  });

  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
}

/**
 * Consentimiento actual, reactivo. Arranca en null tanto en el servidor como en
 * el primer render del cliente para que la hidratacion cuadre, y se rellena en
 * el efecto.
 */
export function useConsent(): ConsentValue {
  const [consent, setConsentState] = useState<ConsentValue>(null);

  useEffect(() => {
    setConsentState(getConsent());

    const onChange = (e: Event) => {
      setConsentState((e as CustomEvent<Exclude<ConsentValue, null>>).detail);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, onChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onChange);
  }, []);

  return consent;
}
