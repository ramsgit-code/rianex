import { ImageResponse } from "next/og";

// Tarjeta social (1200x630) con un titular y una etiqueta. La usan las rutas
// /og/blog/<slug> y /og/blog-en/<slug>; vive aqui porque un route.tsx solo
// puede exportar sus manejadores.

const size = { width: 1200, height: 630 };

const BACKGROUND = "#FBFBF8";
const INK = "#12130F";
const ACCENT = "#C7D400";
const MUTED = "#54564C";

export function tarjetaSocial(titulo: string, etiqueta: string) {
  // Los titulares largos necesitan bajar de cuerpo o se salen del lienzo.
  const tamano = titulo.length > 78 ? 52 : titulo.length > 52 ? 62 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BACKGROUND,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: ACCENT,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: INK,
              fontWeight: 700,
            }}
          >
            RIANEX
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: tamano,
              lineHeight: 1.08,
              color: INK,
              fontWeight: 700,
              letterSpacing: -1.5,
              display: "flex",
            }}
          >
            {titulo}
          </div>
          <div
            style={{
              marginTop: 28,
              height: 10,
              width: 150,
              background: ACCENT,
              display: "flex",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 25,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>{etiqueta}</div>
          <div style={{ display: "flex" }}>www.rianex.es</div>
        </div>
      </div>
    ),
    size
  );
}
