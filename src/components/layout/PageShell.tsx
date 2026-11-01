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
  title,
  description,
  children,
  wide = false,
  showCta = false,
}: PageShellProps) {
  const widthClass = wide ? "section-wide" : "section";

  return (
    <div className="relative pt-16 sm:pt-24 md:pt-28">
      <header className={`${widthClass} relative !pb-0`}>
        <Reveal>
          {/* el rótulo de sección (tag) ya no se pinta encima del titular: lo
              dice el propio H1 y el menú. Se conserva la prop por compatibilidad. */}
          <h1 className="max-w-4xl text-balance font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.01em] text-foreground md:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="measure mt-6 text-pretty text-lg leading-relaxed text-foreground-muted sm:text-xl">
              {description}
            </p>
          )}
          {showCta && (
            <Link href="/diagnostico" className="btn-primary mt-8">
              Pide tu consultoría gratuita
              <ArrowRight size={16} />
            </Link>
          )}
        </Reveal>
      </header>

      <div className={`${widthClass} relative !pt-10`}>{children}</div>
    </div>
  );
}
