import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { PublicLayout } from "@/components/PublicLayout";

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

const SITE_URL = "https://ria-consulting.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RIA Consulting — Automatización Comercial con IA & CRM",
    template: "%s | RIA Consulting",
  },
  description:
    "Capta, cualifica y cierra clientes en automático con IA. Sistemas de captación, cualificación y propuestas en Go High Level: WhatsApp, Telegram, correo y CRM conectados.",
  keywords: [
    "automatización comercial",
    "automatización con IA",
    "agentes de IA ventas",
    "crm gohighlevel",
    "lead qualification system",
    "propuestas automáticas",
    "automatización whatsapp",
    "funnel captación leads",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "RIA Consulting",
    title: "RIA Consulting — Automatización Comercial con IA",
    description:
      "Capta, cualifica y cierra clientes en automático con IA. Especialista en Go High Level.",
    images: [{ url: "/og", width: 1200, height: 630, alt: "RIA Consulting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RIA Consulting — Automatización Comercial con IA",
    description:
      "Capta, cualifica y cierra clientes en automático con IA. Especialista en Go High Level.",
    images: ["/og"],
  },
  robots: { index: true, follow: true },
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
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
