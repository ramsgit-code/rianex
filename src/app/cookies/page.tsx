import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Información sobre el uso de cookies y tecnologías similares en el sitio web de Rianex.",
  robots: { index: true, follow: true },
};

const EMAIL = "ramiroperez12@hotmail.com";

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 mt-10 font-display text-xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 leading-relaxed text-foreground-muted">{children}</p>;
}

export default function CookiesPage() {
  return (
    <PageShell tag="Legal" title="Política de cookies">
      <div className="max-w-2xl">
        <p className="mb-6 text-sm text-muted">Última actualización: julio de 2026</p>

        <H>1. Qué son las cookies</H>
        <P>
          Una cookie es un pequeño archivo de texto que un sitio web almacena en tu
          navegador. También usamos tecnologías similares como el almacenamiento local
          (localStorage). Sirven para recordar tus preferencias y medir el uso del
          sitio.
        </P>

        <H>2. Cookies que utilizamos</H>
        <P>
          <strong className="text-foreground">Técnicas (necesarias).</strong> Guardan tu
          preferencia de idioma y el estado del aviso de cookies mediante
          almacenamiento local. Son imprescindibles para el funcionamiento del sitio y
          no requieren consentimiento.
        </P>
        <P>
          <strong className="text-foreground">Analíticas propias.</strong> Registramos
          de forma anónima el uso de las páginas para mejorar el sitio. No compartimos
          esta información con terceros con fines publicitarios.
        </P>
        <P>
          <strong className="text-foreground">De terceros.</strong> Si activamos el chat
          de atención (Go High Level), este servicio puede instalar cookies propias para
          gestionar la conversación. Consulta la política de dicho proveedor para más
          detalle.
        </P>

        <H>3. Cómo gestionar las cookies</H>
        <P>
          Puedes aceptar o rechazar las cookies no esenciales desde el aviso que aparece
          al entrar en el sitio. Además, puedes configurar tu navegador para bloquear o
          eliminar cookies en cualquier momento. Ten en cuenta que desactivar algunas
          cookies puede afectar al funcionamiento del sitio.
        </P>

        <H>4. Cambios</H>
        <P>
          Podemos actualizar esta política de cookies. Publicaremos siempre la versión
          vigente en esta página. Para cualquier duda, escríbenos a{" "}
          <a href={`mailto:${EMAIL}`} className="text-accent underline underline-offset-2">
            {EMAIL}
          </a>
          .
        </P>
      </div>
    </PageShell>
  );
}
