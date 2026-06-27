import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-8">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-6 text-sm">
        <div>
          <p className="font-medium text-foreground mb-1">
            RIA Consulting<span className="text-accent">.</span>
          </p>
          <p className="text-foreground-muted text-xs max-w-xs">
            Sistemas comerciales en Go High Level.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-foreground-muted">
          <Link href="/servicios" className="hover:text-foreground">Servicios</Link>
          <Link href="/casos-de-exito" className="hover:text-foreground">Casos</Link>
          <Link href="/sobre-mi" className="hover:text-foreground">Sobre mi</Link>
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          <Link href="/diagnostico" className="text-accent hover:underline">Diagnostico</Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-6">
        <p className="text-xs text-muted">© {new Date().getFullYear()} RIA Consulting</p>
      </div>
    </footer>
  );
}
