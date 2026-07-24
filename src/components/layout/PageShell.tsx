import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

type PageShellProps = {
  tag: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  wide?: boolean;
  showCta?: boolean;
};

export function PageShell({
  tag,
  title,
  description,
  children,
  wide = false,
  showCta = false,
}: PageShellProps) {
  const widthClass = wide ? "section-wide" : "section";

  return (
    <div className="relative pt-20 sm:pt-32 md:pt-40">
      {/* glow superior del header */}
      <div className="pointer-events-none absolute left-1/2 top-16 h-60 w-[34rem] max-w-full -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <header className={`${widthClass} relative !pb-0`}>
        <Reveal>
          <p className="tag">{tag}</p>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground-muted">
              {description}
            </p>
          )}
          {showCta && (
            <Link href="/diagnostico" className="btn-primary mt-8">
              Solicitar diagnostico
              <ArrowRight size={16} />
            </Link>
          )}
        </Reveal>
      </header>

      <div className={`${widthClass} relative !pt-10`}>{children}</div>
    </div>
  );
}
