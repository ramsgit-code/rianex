"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/components/LanguageProvider";

export const COOKIE_CONSENT_KEY = "rianex-cookie-consent";
export const COOKIE_CONSENT_EVENT = "rianex:cookie-consent";
const STORAGE_KEY = COOKIE_CONSENT_KEY;

const copy = {
  es: {
    text: "Usamos cookies técnicas propias. Si aceptas, también activamos el chat de atención (GoHighLevel), que instala sus propias cookies de terceros.",
    link: "Más info",
    accept: "Aceptar",
    reject: "Rechazar",
  },
  en: {
    text: "We use first-party technical cookies. If you accept, we also enable our support chat (GoHighLevel), which sets its own third-party cookies.",
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
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* almacenamiento no disponible */
    }
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* noop */
    }
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
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
          <div className="glass flex flex-col gap-3 rounded-2xl border border-ink/[0.08] px-5 py-4 shadow-2xl sm:flex-row sm:items-center sm:gap-4">
            <p className="text-sm leading-snug text-foreground-muted">
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
