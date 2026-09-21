// Fondo global: grid tecnico muy sutil + un unico lavado de luz arriba.
// Antes tenia 3 blobs de color animados (mesh "aurora") — ese lenguaje visual
// es el que hace que cualquier web de IA se parezca a otra; en la version
// clara lo quitamos y dejamos que el espacio en blanco haga el trabajo.
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* grid tecnico, casi imperceptible */}
      <div className="grid-bg absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_75%)]" />

      {/* un solo lavado de luz arriba, muy tenue */}
      <div className="absolute -top-40 left-1/2 h-[34rem] w-[44rem] -translate-x-1/2 rounded-full bg-aurora1/[0.08] blur-[130px]" />
    </div>
  );
}
