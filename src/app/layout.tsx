import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PublicLayout } from "@/components/PublicLayout";
import { alternates } from "@/lib/i18n";

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

// Etiqueta de Google (GA4). Arranca con el consentimiento denegado (Consent Mode
// v2): no deja cookies hasta que el visitante acepta en el aviso de cookies.
// Si ya aceptó en una visita anterior, se concede antes del primer 'config'.
const GA_ID = "G-TN15MVTWRB";
const GA_INIT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var rianexConsent = null;
try { rianexConsent = localStorage.getItem("rianex-cookie-consent"); } catch (e) {}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: rianexConsent === 'accepted' ? 'granted' : 'denied',
  wait_for_update: 500
});
gtag('js', new Date());

gtag('config', '${GA_ID}');
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rianex — Automatización y desarrollo con IA",
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
    title: "Rianex — Automatización y desarrollo con IA",
    description:
      "Automatización y desarrollo con IA, integraciones de GoHighLevel y HubSpot, y migraciones a GoHighLevel.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Rianex" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rianex — Automatización y desarrollo con IA",
    description:
      "Automatización y desarrollo con IA, integraciones de GoHighLevel y HubSpot, y migraciones a GoHighLevel.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  alternates: alternates("/", "es"),
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
      <head>
        {/* Google tag (gtag.js) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: GA_INIT }} />
      </head>
      <body>
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
