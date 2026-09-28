import Link from "next/link";
import type { ReactNode } from "react";
import { LINK_POLICIES, type LinkPolicy } from "@/lib/blog-schema";

// ─── Politica de enlaces salientes ────────────────────────────────────────────
//
// Antes todo enlace externo salia dofollow: el rel era "noopener noreferrer",
// que no dice nada sobre seguimiento. En un blog propio eso da igual, pero en
// cuanto se publica contenido de terceros significa repartir autoridad sin
// control y sin querer.
//
// El defecto es ahora "nofollow", a proposito: si a alguien se le olvida marcar
// un enlace, el fallo cae del lado que no regala nada. Enlazar a una fuente en
// dofollow pasa a ser un acto deliberado, que es lo que deberia ser.
//
// Google pide marcar el motivo del enlace, no solo cortarlo:
//   sponsored -> hay dinero, intercambio o contraprestacion de por medio
//   ugc       -> lo escribio un tercero (invitado, comentario)
//   nofollow  -> no respondemos de ese destino
//   follow    -> lo citamos porque lo vale, y lo decimos

const BASE_REL = "noopener noreferrer";

export function relParaPolitica(politica: LinkPolicy): string {
  switch (politica) {
    case "follow":
      return BASE_REL;
    // sponsored y ugc llevan tambien nofollow: los atributos de Google son
    // pistas, y sin nofollow otros buscadores siguen el enlace igual.
    case "sponsored":
      return `sponsored nofollow ${BASE_REL}`;
    case "ugc":
      return `ugc nofollow ${BASE_REL}`;
    default:
      return `nofollow ${BASE_REL}`;
  }
}

function esPolitica(valor: string | undefined): valor is LinkPolicy {
  return !!valor && LINK_POLICIES.some((p) => p === valor);
}

// Negritas **texto** y enlaces [texto](url) o [texto](url "politica").
//
// El tercer parametro del enlace es el atributo title estandar de Markdown, que
// aqui se reutiliza para la politica del enlace. Asi la sintaxis sigue siendo
// Markdown valido y un articulo se puede leer en cualquier otro sitio sin
// romperse.
const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g;

function renderInline(text: string, porDefecto: LinkPolicy): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;

  INLINE.lastIndex = 0;
  while ((m = INLINE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));

    if (m[1] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-foreground">
          {m[1]}
        </strong>
      );
    } else if (m[2] !== undefined) {
      const label = m[2];
      const url = m[3];
      const marca = m[4];

      if (url.startsWith("/")) {
        // Enlace interno: no lleva rel y no le afecta la politica.
        nodes.push(
          <Link key={key++} href={url} className="text-accent hover:underline">
            {label}
          </Link>
        );
      } else {
        const politica = esPolitica(marca) ? marca : porDefecto;
        nodes.push(
          <a
            key={key++}
            href={url}
            target="_blank"
            rel={relParaPolitica(politica)}
            className="text-accent hover:underline"
          >
            {label}
          </a>
        );
      }
    }
    last = INLINE.lastIndex;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function renderMarkdown(
  body: string,
  /**
   * Politica que se aplica a los enlaces externos que no traen marca propia.
   * Un articulo recibido de un colaborador se marca entero aqui, en vez de ir
   * enlace por enlace y arriesgarse a olvidar uno.
   */
  porDefecto: LinkPolicy = "nofollow"
) {
  const lines = body.split("\n");
  const out: ReactNode[] = [];
  let list: ReactNode[] = [];
  let key = 0;

  const flush = () => {
    if (list.length) {
      out.push(
        <ul key={`ul-${key++}`} className="my-3 flex flex-col gap-2">
          {list}
        </ul>
      );
      list = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      out.push(
        <h2 key={key++} className="mb-3 mt-8 text-xl font-semibold text-foreground">
          {renderInline(line.slice(3), porDefecto)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flush();
      out.push(
        <h3 key={key++} className="mb-2 mt-6 text-lg font-medium text-foreground">
          {renderInline(line.slice(4), porDefecto)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      list.push(
        <li
          key={key++}
          className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground-muted"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{renderInline(line.slice(2), porDefecto)}</span>
        </li>
      );
    } else if (line.trim() === "") {
      flush();
    } else {
      flush();
      out.push(
        <p key={key++} className="mb-3 text-sm leading-relaxed text-foreground-muted">
          {renderInline(line, porDefecto)}
        </p>
      );
    }
  }

  flush();
  return out;
}
