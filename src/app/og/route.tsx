import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Rianex — Automatización Comercial";
  const tag = searchParams.get("tag") || "Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "system-ui, sans-serif",
          border: "1px solid #1a1a1a",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(232,255,0,0.06) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Top — brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", zIndex: 1 }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "#e8ff00",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "8px", height: "8px", background: "#0a0a0a", borderRadius: "50%" }} />
          </div>
          <span style={{ color: "#f5f5f5", fontSize: "18px", fontWeight: 600 }}>Rianex</span>
          <span style={{ color: "#e8ff00", fontSize: "18px" }}>.</span>
        </div>

        {/* Middle — content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", zIndex: 1, maxWidth: "900px" }}>
          <span
            style={{
              color: "#e8ff00",
              fontSize: "13px",
              fontFamily: "monospace",
              border: "1px solid rgba(232,255,0,0.3)",
              borderRadius: "4px",
              padding: "4px 10px",
              width: "fit-content",
            }}
          >
            {tag}
          </span>
          <h1
            style={{
              color: "#f5f5f5",
              fontSize: title.length > 60 ? "38px" : "48px",
              fontWeight: 700,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <span style={{ color: "#666", fontSize: "14px" }}>rianex.vercel.app</span>
          <span
            style={{
              color: "#e8ff00",
              fontSize: "13px",
              fontFamily: "monospace",
              background: "rgba(232,255,0,0.08)",
              padding: "6px 14px",
              borderRadius: "20px",
              border: "1px solid rgba(232,255,0,0.2)",
            }}
          >
            Automatización Comercial · Go High Level
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
