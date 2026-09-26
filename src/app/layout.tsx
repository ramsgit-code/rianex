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
    default: "Rianex — Automatización con IA, GoHighLevel y HubSpot",
    template: "%s | Rianex",
  },
  description:
    "Automatización y desarrollo con IA. Integramos GoHighLevel y HubSpot con tus herramientas y migramos tu CRM a GoHighLevel con todo tu histórico.",
  keywords: [
    "automatización con IA",
    "desarrollo con IA",
    "integración gohighlevel",
    "integración hubspot",
    "migración a gohighlevel",
    "migrar de hubspot a gohighlevel",
    "consultor gohighlevel",
    "agentes de IA",
    "crm gohighlevel",
    "automatización hubspot",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Rianex",
    title: "Rianex — Automatización con IA, GoHighLevel y HubSpot",
    description:
      "Automatización y desarrollo con IA, integraciones de GoHighLevel y HubSpot, y migraciones a GoHighLevel.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Rianex" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rianex — Automatización con IA, GoHighLevel y HubSpot",
    description:
      "Automatización y desarrollo con IA, integraciones de GoHighLevel y HubSpot, y migraciones a GoHighLevel.",
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
