// Rótulo de dato del sistema "Planta Lean": condensada, mayúsculas, pequeña.
export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-display text-[12px] font-bold uppercase tracking-[0.08em] text-foreground ${className}`}>
      {children}
    </p>
  );
}
