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
    text: "Usamos cookies técnicas propias. Si aceptas, también activamos Google Analytics para medir las visitas y el chat de atención (GoHighLevel), que instalan sus propias cookies de terceros.",
    link: "Más info",
    accept: "Aceptar",
    reject: "Rechazar",
  },
  en: {
    text: "We use first-party technical cookies. If you accept, we also enable Google Analytics to measure visits and our support chat (GoHighLevel), which set their own third-party cookies.",
    link: "Learn more",
    accept: "Accept",
    reject: "Reject",
  },
} as const;

export function CookieConsent() {
  const { lang } = useLang();
  const t = copy[lang];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  // El aviso es fixed, asi que sin reservarle sitio se come lo que tenga
  // debajo: en 1280x720 tapaba el final del titular y en movil el boton
  // principal del hero. Con esta marca en <html>, globals.css le anade al
  // final de la pagina el hueco que ocupa.
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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
          className="fixed bottom-3 left-3 right-20 z-[70] sm:right-auto sm:left-4 sm:bottom-4 sm:max-w-md"
        >
          <div className="glass flex flex-col gap-2.5 rounded-2xl border border-ink/[0.08] px-4 py-3 shadow-2xl sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-4">
            <p className="text-xs leading-snug text-foreground-muted sm:text-sm">
              {t.text}{" "}
              <Link href="/cookies" className="text-accent-text underline underline-offset-2">
                {t.link}
              </Link>
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => decide("rejected")}
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                {t.reject}
              </button>
              <button
                onClick={() => decide("accepted")}
                className="btn-primary px-4 py-1.5 text-sm"
              >
                {t.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
