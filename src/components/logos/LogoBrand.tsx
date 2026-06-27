// Logomark de RIA Consulting — red de tres nodos (web · CRM · AI)
// Tres círculos conectados en triángulo sobre fondo oscuro con acento amarillo
export function LogoBrand({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Líneas de conexión entre nodos */}
      <line x1="16" y1="5"  x2="27" y2="24" stroke="#e8ff00" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="16" y1="5"  x2="5"  y2="24" stroke="#e8ff00" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="5"  y1="24" x2="27" y2="24" stroke="#e8ff00" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* Nodo superior — AI */}
      <circle cx="16" cy="5"  r="3.5" fill="#e8ff00" />
      {/* Nodo inferior izquierda — Web */}
      <circle cx="5"  cy="24" r="3.5" fill="currentColor" opacity="0.6" />
      {/* Nodo inferior derecha — CRM */}
      <circle cx="27" cy="24" r="3.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
