import Link from "next/link";
import type { ReactNode } from "react";

// Procesa negritas **texto** y enlaces [texto](url) dentro de una línea.
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
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
      nodes.push(
        url.startsWith("/") ? (
          <Link key={key++} href={url} className="text-accent hover:underline">
            {label}
          </Link>
        ) : (
          <a
            key={key++}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {label}
          </a>
        )
      );
    }
    last = regex.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function renderMarkdown(body: string) {
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
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flush();
      out.push(
        <h3 key={key++} className="mb-2 mt-6 text-lg font-medium text-foreground">
          {renderInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      list.push(
        <li
          key={key++}
          className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground-muted"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{renderInline(line.slice(2))}</span>
        </li>
      );
    } else if (line.trim() === "") {
      flush();
    } else {
      flush();
      out.push(
        <p key={key++} className="mb-3 text-sm leading-relaxed text-foreground-muted">
          {renderInline(line)}
        </p>
      );
    }
  }
  flush();
  return out;
}
