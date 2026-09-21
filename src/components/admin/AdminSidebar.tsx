"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Quote,
  LogOut,
  ExternalLink,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/testimonios", label: "Testimonios", icon: Quote },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-border min-h-screen p-4 flex flex-col">
      <Link href="/admin" className="font-semibold text-sm text-foreground mb-8 block">
        Admin<span className="text-accent-text">.</span>
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md transition-colors ${
                active
                  ? "bg-surface text-foreground"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 pt-4 border-t border-border">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-sm text-foreground-muted px-3 py-2 hover:text-foreground"
        >
          <ExternalLink size={16} />
          Ver web
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2 text-sm text-foreground-muted px-3 py-2 hover:text-foreground w-full text-left"
        >
          <LogOut size={16} />
          Salir
        </button>
      </div>
    </aside>
  );
}
