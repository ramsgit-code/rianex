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
        // Planta Lean: suelo de hormigón claro, grafito, cinta amarilla de
        // seguridad como estructura y luces andon (verde/rojo) solo para estado.
        background: "#ECEDEA",
        surface: "#E3E4E0",
        "surface-2": "#D8DAD4",
        ink: "#16181B",
        border: "#C9CBC4",
        accent: "#FFC20E", // cinta de suelo: fondos y bandas, nunca texto sobre claro
        "accent-hover": "#F2B400",
        "accent-soft": "#E0A800",
        // ámbar oscuro para TEXTO/iconos sobre claro (el amarillo no llega a 4.5:1)
        "accent-text": "#7A5600",
        go: "#1E9E5A", // andon verde: automatizado
        "go-text": "#16733F",
        stop: "#D7392B", // andon rojo: manual / parado
        muted: "#5F6267",
        foreground: "#16181B",
        "foreground-muted": "#3E4147",
        contrast: "#16181B",
        "contrast-foreground": "#ECEDEA",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        // sin sombras decorativas: el mundo es plano. Se conservan los nombres
        // porque el panel admin los usa.
        glow: "0 1px 0 0 rgba(22,24,27,0.08)",
        "glow-sm": "0 1px 0 0 rgba(22,24,27,0.08)",
        glass: "0 1px 0 0 rgba(22,24,27,0.08)",
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
        marquee: "marquee 36s linear infinite",
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
