import type { Metadata } from "next";
import "./globals.css";
import { PublicLayout } from "@/components/PublicLayout";

export const metadata: Metadata = {
  title: {
    default: "RIA Consulting — Automatizacion Comercial & CRM",
    template: "%s | RIA Consulting",
  },
  description:
    "Diseno sistemas de captacion, cualificacion y cierre de leads para negocios que quieren vender mas sin trabajar mas. Especialista en Go High Level, WhatsApp automation y propuestas automaticas.",
  keywords: [
    "automatizacion comercial",
    "crm gohighlevel",
    "lead qualification system",
    "propuestas automaticas",
    "whatsapp automatizacion",
    "funnel captacion leads",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    siteName: "RIA Consulting — Automatizacion Comercial",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
