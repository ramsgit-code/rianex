import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Información sobre el uso de cookies y tecnologías similares en el sitio web de Rianex.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/cookies" },
};

const EMAIL = "hola@rianex.es";

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
        <p className="mb-6 text-sm text-muted">Última actualización: septiembre de 2026</p>

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
          las páginas visitadas y un identificador aleatorio de sesión, que se borra al
          cerrar la pestaña, para saber qué contenidos funcionan. No se cruzan con tus
          datos de contacto ni se comparten con terceros con fines publicitarios. Solo
          se activan si las aceptas.
        </P>
        <P>
          <strong className="text-foreground">Analíticas de terceros.</strong> Si
          aceptas, usamos Google Analytics (Google Ireland Ltd.) para saber cuántas
          personas visitan el sitio y qué páginas consultan. Instala las cookies
          _ga y _ga_&lt;ID&gt;, que duran hasta 2 años. Funciona en modo
          consentimiento (Consent Mode v2): hasta que aceptas no almacena ningún
          identificador en tu dispositivo, y las señales publicitarias quedan
          desactivadas siempre. Si lo rechazas, no instala ninguna cookie.
        </P>
        <P>
          <strong className="text-foreground">Chat de atención.</strong> Si aceptas, se
          carga el chat de GoHighLevel, que instala sus propias cookies de terceros
          para gestionar la conversación. Consulta la política de dicho proveedor para
          más detalle.
        </P>
        <P>
          Si rechazas, no se activa ninguna de las tres: la web sigue funcionando solo
          con las cookies técnicas.
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
          <a href={`mailto:${EMAIL}`} className="text-accent-text underline underline-offset-2">
            {EMAIL}
          </a>
          .
        </P>
      </div>
    </PageShell>
  );
}
