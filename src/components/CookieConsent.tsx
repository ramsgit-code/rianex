"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/components/LanguageProvider";
import { setConsent, getConsent } from "@/lib/consent";

// Se reexportan porque los importaba media web antes de que el estado del
// aviso viviera en @/lib/consent.
export { COOKIE_CONSENT_KEY, COOKIE_CONSENT_EVENT } from "@/lib/consent";

const copy = {
  es: {
    label: "Aviso de cookies",
    text: "Usamos cookies técnicas. Si aceptas, también Google Analytics y el chat de atención, que ponen cookies de terceros.",
    link: "Más info",
    accept: "Aceptar",
    reject: "Rechazar",
  },
  en: {
    label: "Cookie notice",
    text: "We use technical cookies. If you accept, we also load Google Analytics and the support chat, which set third-party cookies.",
    link: "Learn more",
    accept: "Accept",
    reject: "Reject",
  },
} as const;

// Aviso pequeño en una esquina: no tapa la web, no bloquea el scroll y no
// roba el foco. Mientras el visitante no elige, Analytics sigue denegado
// (Consent Mode en RootDocument) y el chat no se carga.
export function CookieConsent() {
  const { lang } = useLang();
  const t = copy[lang];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  // globals.css reserva al final de la página la altura del aviso para que no
  // tape el pie mientras está abierto.
  useEffect(() => {
    const root = document.documentElement;
    if (visible) root.setAttribute("data-cookie-banner", "visible");
    else root.removeAttribute("data-cookie-banner");
    return () => root.removeAttribute("data-cookie-banner");
  }, [visible]);

  const decide = (value: "accepted" | "rejected") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-consent"
          role="region"
          aria-label={t.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-2 bottom-2 z-[70] border-2 border-ink border-t-4 border-t-accent bg-white p-3 sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-[22rem] sm:p-4"
        >
          <p className="text-[13px] leading-snug text-foreground-muted sm:text-sm">
            {t.text}{" "}
            <Link href={lang === "en" ? "/en/cookies" : "/cookies"} className="text-accent-text underline underline-offset-2">
              {t.link}
            </Link>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => decide("rejected")}
              className="btn-secondary min-h-[2.5rem] w-full px-3 py-2 text-sm"
            >
              {t.reject}
            </button>
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="btn-primary min-h-[2.5rem] w-full px-3 py-2 text-sm"
            >
              {t.accept}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
