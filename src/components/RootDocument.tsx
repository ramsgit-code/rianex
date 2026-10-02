import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { PublicLayout } from "@/components/PublicLayout";
import type { Lang } from "@/lib/i18n";

// El <html> de la web. Hay dos layouts raiz, (es) y (en), para que cada idioma
// se sirva con su lang ya en el HTML: con un layout comun salia siempre "es" y
// se corregia al hidratar, que es tarde para los rastreadores que no ejecutan
// JavaScript. Los dos montan este mismo documento.

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

export function RootDocument({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      {/* Es el <head> del layout raiz, solo que montado desde aqui. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
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
