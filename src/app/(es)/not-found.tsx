import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-7xl font-bold text-border mb-6 font-mono">404</p>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Esta página no existe
        </h1>
        <p className="text-foreground-muted mb-8">
          Puede que el enlace esté roto o que la página haya sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Volver al inicio
          </Link>
          <Link href="/diagnostico" className="btn-secondary">
            Solicitar diagnóstico
          </Link>
        </div>
      </div>
    </div>
  );
}
