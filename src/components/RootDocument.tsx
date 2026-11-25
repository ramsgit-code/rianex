import localFont from "next/font/local";
import { PublicLayout } from "@/components/PublicLayout";
import type { Lang } from "@/lib/i18n";

// El <html> de la web. Hay dos layouts raiz, (es) y (en), para que cada idioma
// se sirva con su lang ya en el HTML: con un layout comun salia siempre "es" y
// se corregia al hidratar, que es tarde para los rastreadores que no ejecutan
// JavaScript. Los dos montan este mismo documento.

// Las fuentes se sirven desde el repositorio (src/fonts, subconjunto latino
// de Google Fonts, licencia OFL). Antes se descargaban de Google en cada
// build con next/font/google, y cuando Google no respondia el despliegue
// fallaba entero ("An error occurred in next/font").

// Archivo con eje de anchura: condensada para los rótulos (titulares) y
// normal para el texto, una sola familia como la señalética de una planta.
const archivo = localFont({
  src: "../fonts/archivo-latin-variable.woff2",
  weight: "100 900",
  style: "normal",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono-latin-variable.woff2",
  weight: "500 600",
  style: "normal",
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
      className={`${archivo.variable} ${jetbrainsMono.variable}`}
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
