import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PublicLayout } from "@/components/PublicLayout";

export const viewport: Viewport = {
  themeColor: "#FBFBF8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://www.rianex.es";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rianex — IA para agencias de marketing",
    template: "%s | Rianex",
  },
  description:
    "IA para agencias de marketing: automatiza reportes, onboarding de clientes, propuestas y cualificación de leads. Recupera 10 horas a la semana.",
  keywords: [
    "IA para agencias de marketing",
    "automatización para agencias",
    "IA para negocios",
    "automatización con IA",
    "agentes de IA",
    "embudos de venta",
    "go-to-market engineering",
    "founding engineering",
    "integraciones crm",
    "crm gohighlevel",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Rianex",
    title: "Rianex — IA para agencias de marketing",
    description:
      "Automatiza los procesos de tu agencia y recupera 10 horas/semana: reportes, onboarding, propuestas y cualificación de leads con IA.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Rianex" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rianex — IA para agencias de marketing",
    description:
      "Automatiza los procesos de tu agencia y recupera 10 horas/semana: reportes, onboarding, propuestas y cualificación de leads con IA.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
