import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Información sobre el tratamiento de datos personales en Rianex conforme al RGPD y la LOPDGDD.",
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

export default function PrivacidadPage() {
  return (
    <PageShell tag="Legal" title="Política de privacidad">
      <div className="max-w-2xl">
        <p className="mb-6 text-sm text-muted">Última actualización: julio de 2026</p>

        <H>1. Responsable del tratamiento</H>
        <P>
          El responsable del tratamiento de tus datos es Ramiro Pérez (en adelante,
          &laquo;Rianex&raquo;), con NIF [NIF] y domicilio en [domicilio fiscal].
          Puedes contactar en cualquier momento en{" "}
          <a href={`mailto:${EMAIL}`} className="text-accent underline underline-offset-2">
            {EMAIL}
          </a>
          .
        </P>

        <H>2. Datos que tratamos</H>
        <P>
          Tratamos los datos que nos facilitas voluntariamente a través del formulario
          de diagnóstico y otros canales de contacto: nombre, correo electrónico,
          teléfono, empresa, sitio web, país y la información sobre tu negocio y
          objetivos que decidas compartir. También podemos tratar datos técnicos de
          navegación (ver la{" "}
          <a href="/cookies" className="text-accent underline underline-offset-2">
            política de cookies
          </a>
          ).
        </P>

        <H>3. Finalidad</H>
        <P>
          Utilizamos tus datos para: (i) atender tu solicitud de diagnóstico o contacto
          y elaborar una propuesta; (ii) enviarte comunicaciones de seguimiento
          relacionadas con los servicios solicitados (nurturing); y (iii) gestionar la
          relación comercial si decidimos trabajar juntos.
        </P>

        <H>4. Legitimación</H>
        <P>
          La base jurídica es tu consentimiento (art. 6.1.a RGPD), que otorgas al marcar
          la casilla de aceptación del formulario, y la aplicación de medidas
          precontractuales a petición tuya (art. 6.1.b RGPD). Puedes retirar tu
          consentimiento en cualquier momento sin que ello afecte a la licitud del
          tratamiento previo.
        </P>

        <H>5. Conservación</H>
        <P>
          Conservaremos tus datos mientras exista interés mutuo o relación comercial y,
          tras su finalización, durante los plazos legalmente exigibles. Si no llegamos
          a colaborar, se eliminarán cuando dejen de ser necesarios para las finalidades
          descritas.
        </P>

        <H>6. Destinatarios</H>
        <P>
          Para prestar el servicio utilizamos proveedores tecnológicos que actúan como
          encargados del tratamiento: Go High Level (CRM), Vercel (alojamiento web),
          Supabase (base de datos) y Google (traducción y verificación). Estos
          proveedores pueden estar ubicados fuera del Espacio Económico Europeo, en cuyo
          caso las transferencias se amparan en las garantías previstas por el RGPD
          (cláusulas contractuales tipo). No cedemos tus datos a terceros con fines
          comerciales.
        </P>

        <H>7. Tus derechos</H>
        <P>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición,
          limitación del tratamiento y portabilidad escribiendo a{" "}
          <a href={`mailto:${EMAIL}`} className="text-accent underline underline-offset-2">
            {EMAIL}
          </a>
          . Si consideras que el tratamiento no se ajusta a la normativa, puedes
          reclamar ante la Agencia Española de Protección de Datos (
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2"
          >
            www.aepd.es
          </a>
          ).
        </P>

        <H>8. Seguridad</H>
        <P>
          Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos
          frente a accesos no autorizados, pérdida o alteración.
        </P>

        <H>9. Cambios</H>
        <P>
          Podemos actualizar esta política para adaptarla a cambios normativos o de
          servicio. Publicaremos siempre la versión vigente en esta página.
        </P>
      </div>
    </PageShell>
  );
}
