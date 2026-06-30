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
        background: "#070708",
        surface: "#101013",
        "surface-2": "#16161b",
        border: "#23232b",
        accent: "#e8ff00", // amarillo electrico — CTA principal
        "accent-hover": "#d4e800",
        "accent-soft": "#b8cc00",
        // tonos solo para el fondo aurora/mesh (no UI)
        aurora1: "#e8ff00",
        aurora2: "#7c5cff",
        aurora3: "#19e3b1",
        muted: "#8b909c",
        foreground: "#f5f5f5",
        "foreground-muted": "#b4b8c0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: [
          "var(--font-space-grotesk)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 50px -12px rgba(232,255,0,0.5)",
        "glow-sm": "0 0 24px -8px rgba(232,255,0,0.45)",
        "glow-violet": "0 0 60px -16px rgba(124,92,255,0.5)",
        glass:
          "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 8px 40px -12px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,255,0,0.10), transparent 70%)",
        shimmer:
          "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)",
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
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
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
