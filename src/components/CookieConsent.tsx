"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/components/LanguageProvider";
import { setConsent, getConsent } from "@/lib/consent";

// Se reexportan porque los importaba media web antes de que el estado del
// aviso viviera en @/lib/consent.
export { COOKIE_CONSENT_KEY, COOKIE_CONSENT_EVENT } from "@/lib/consent";

const copy = {
  es: {
    title: "Antes de seguir: cookies",
    text: "Usamos cookies técnicas propias. Si aceptas, también activamos Google Analytics para medir las visitas y el chat de atención (GoHighLevel), que instalan sus propias cookies de terceros.",
    link: "Más info",
    accept: "Aceptar",
    reject: "Rechazar",
  },
  en: {
    title: "Before you continue: cookies",
    text: "We use first-party technical cookies. If you accept, we also enable Google Analytics to measure visits and our support chat (GoHighLevel), which set their own third-party cookies.",
    link: "Learn more",
    accept: "Accept",
    reject: "Reject",
  },
} as const;

// En las páginas legales el aviso no bloquea: quien pulsa "Más info" tiene que
// poder leer la política antes de decidir.
const NON_BLOCKING_ROUTES = ["/cookies", "/privacidad"];

export function CookieConsent() {
  const { lang } = useLang();
  const t = copy[lang];
  const pathname = usePathname();
  const blocking = !NON_BLOCKING_ROUTES.includes(pathname);
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  // Modal: hasta que el visitante elige, la página no se mueve por detrás.
  // En las páginas legales el aviso va abajo sin bloquear, y globals.css le
  // reserva su altura al final para que no tape el texto.
  useEffect(() => {
    const root = document.documentElement;
    if (visible) root.setAttribute("data-cookie-banner", blocking ? "blocking" : "visible");
    else root.removeAttribute("data-cookie-banner");
    return () => root.removeAttribute("data-cookie-banner");
  }, [visible, blocking]);

  // Foco dentro del aviso mientras bloquea: Tab no se escapa a la página de
  // detrás y Escape no lo cierra (hay que elegir una de las dos opciones).
  useEffect(() => {
    if (!visible || !blocking) return;
    acceptRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, blocking]);

  const decide = (value: "accepted" | "rejected") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-consent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={
            blocking
              ? "fixed inset-0 z-[70] flex items-end justify-center bg-ink/70 p-3 sm:items-center sm:p-6"
              : "pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-center p-3 sm:p-4"
          }
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal={blocking}
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-text"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="pointer-events-auto w-full max-w-xl border-2 border-ink border-t-[6px] border-t-accent bg-white p-6 sm:p-8"
          >
            <h2
              id="cookie-consent-title"
              className="font-display text-2xl font-extrabold uppercase leading-none tracking-[-0.01em] text-foreground sm:text-3xl"
            >
              {t.title}
            </h2>
            <p id="cookie-consent-text" className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-[17px]">
              {t.text}{" "}
              <Link href="/cookies" className="text-accent-text underline underline-offset-2">
                {t.link}
              </Link>
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => decide("rejected")} className="btn-secondary w-full">
                {t.reject}
              </button>
              <button
                ref={acceptRef}
                type="button"
                onClick={() => decide("accepted")}
                className="btn-primary w-full"
              >
                {t.accept}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
