"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/casos-de-exito", label: "Casos" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre-mi", label: "Sobre mi" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-foreground text-sm">
          RIA Consulting<span className="text-accent">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm ${
                pathname === l.href ? "text-foreground" : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/diagnostico" className="btn-primary">
            Diagnostico
          </Link>
        </nav>

        <button
          className="md:hidden text-foreground-muted"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-foreground-muted"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/diagnostico" className="btn-primary w-fit" onClick={() => setOpen(false)}>
            Diagnostico
          </Link>
        </div>
      )}
    </header>
  );
}
