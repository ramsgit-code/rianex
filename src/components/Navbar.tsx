"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Languages } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { c, toggle, localize } = useLang();
  const links = c.nav.links;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b-[6px] border-accent bg-background transition-colors duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8 lg:px-12">
        <Link href={localize("/")} className="flex items-center" aria-label="Rianex">
          <Image
            src="/logos/rianex-mark-dark.png"
            alt="Rianex"
            width={1145}
            height={253}
            sizes="130px"
            priority
            className="h-5 w-auto sm:h-[22px]"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === localize(l.href);
            return (
              <Link
                key={l.href}
                href={localize(l.href)}
                aria-current={active ? "page" : undefined}
                className={`px-3 py-2 text-[15px] font-medium transition-colors ${
                  active
                    ? "text-foreground underline decoration-accent decoration-[3px] underline-offset-[10px]"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <button
            onClick={toggle}
            aria-label={c.nav.switchLabel}
            className="ml-2 inline-flex h-9 items-center gap-1.5 border-2 border-ink px-2.5 text-xs font-bold text-foreground transition-colors hover:bg-ink hover:text-background"
          >
            <Languages size={14} aria-hidden />
            {c.nav.switchTo}
          </button>
          <Link href={localize("/diagnostico")} className="btn-tape ml-3 min-h-[2.5rem] px-4 py-2 text-sm">
            {c.nav.cta}
            <ArrowRight size={15} aria-hidden />
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            aria-label={c.nav.switchLabel}
            className="inline-flex h-9 items-center gap-1 border-2 border-ink px-2 text-xs font-bold text-foreground"
          >
            <Languages size={13} aria-hidden />
            {c.nav.switchTo}
          </button>
          <button
            className="inline-flex h-9 w-9 items-center justify-center bg-ink text-background"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t-2 border-ink bg-background px-5 pb-6 pt-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={localize(l.href)}
              className="block border-b border-border py-4 font-display text-2xl font-extrabold uppercase text-foreground"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={localize("/diagnostico")}
            className="btn-tape mt-6 w-full"
            onClick={() => setOpen(false)}
          >
            {c.nav.cta}
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      )}
    </header>
  );
}
