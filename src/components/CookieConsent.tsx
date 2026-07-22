"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/components/LanguageProvider";

const STORAGE_KEY = "rianex-cookie-consent";

const copy = {
  es: {
    text: "Usamos cookies técnicas y analíticas propias para mejorar tu experiencia.",
    link: "Más info",
    accept: "Aceptar",
    reject: "Rechazar",
  },
  en: {
    text: "We use technical and first-party analytics cookies to improve your experience.",
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
          className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-2xl sm:inset-x-auto sm:right-4 sm:bottom-4"
        >
          <div className="glass flex flex-col gap-3 rounded-2xl border border-white/[0.08] px-5 py-4 shadow-2xl sm:flex-row sm:items-center sm:gap-4">
            <p className="text-sm leading-snug text-foreground-muted">
              {t.text}{" "}
              <Link href="/cookies" className="text-accent underline underline-offset-2">
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
