import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FBFBF8",
        surface: "#F2F2ED",
        "surface-2": "#EAEAE2",
        ink: "#12130F",
        border: "#E2E2D8",
        accent: "#C7D400", // lima industrial — antes #e8ff00, bajado de saturacion para leer solido sobre claro
        "accent-hover": "#AFBB00",
        "accent-soft": "#9BA600",
        // version oscura del acento, solo para TEXTO/iconos sobre claro: el lima puro
        // no llega a 4.5:1 de contraste sobre el fondo (~1.6:1) y queda ilegible
        "accent-text": "#6B7300",
        // tonos solo para el fondo aurora/mesh (no UI)
        aurora1: "#C7D400",
        aurora2: "#7c5cff",
        aurora3: "#19e3b1",
        muted: "#8A8D80",
        foreground: "#12130F",
        "foreground-muted": "#54564C",
        // seccion de contraste oscura (usar con poca frecuencia)
        contrast: "#12130F",
        "contrast-foreground": "#FBFBF8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: [
          "var(--font-space-grotesk)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 12px 32px -8px rgba(18,19,15,0.18)",
        "glow-sm": "0 6px 18px -6px rgba(18,19,15,0.16)",
        "glow-violet": "0 0 60px -16px rgba(124,92,255,0.35)",
        glass:
          "inset 0 1px 0 0 rgba(255,255,255,0.6), 0 8px 40px -14px rgba(18,19,15,0.12)",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(18,19,15,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,19,15,0.06) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(199,212,0,0.14), transparent 70%)",
        shimmer:
          "linear-gradient(110deg, transparent 30%, rgba(18,19,15,0.06) 50%, transparent 70%)",
      },
      backgroundSize: {
        grid: "56px 56px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "aurora-1": "aurora1 18s ease-in-out infinite",
        "aurora-2": "aurora2 22s ease-in-out infinite",
        "aurora-3": "aurora3 26s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        "ping-slow": "pingSlow 3.2s cubic-bezier(0, 0, 0.2, 1) infinite",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        pingSlow: {
          "0%": { transform: "translate(-50%, -50%) scale(0.85)", opacity: "0.5" },
          "80%, 100%": { transform: "translate(-50%, -50%) scale(1.7)", opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        aurora1: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(8%,12%) scale(1.25)" },
        },
        aurora2: {
          "0%, 100%": { transform: "translate(0,0) scale(1.1)" },
          "50%": { transform: "translate(-12%,8%) scale(1)" },
        },
        aurora3: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(10%,-10%) scale(1.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
