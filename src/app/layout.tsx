import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const BASE_URL = "https://ramiroperez.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ramiro Perez — Automatización Comercial & CRM",
    template: "%s | Ramiro Perez",
  },
  description:
    "Diseño sistemas de captación, cualificación y cierre de leads para negocios que quieren vender más sin procesos manuales. Especialista en Go High Level, WhatsApp automation y propuestas automáticas.",
  keywords: [
    "automatización comercial",
    "crm gohighlevel",
    "lead qualification system",
    "propuestas automáticas",
    "whatsapp automatización",
    "funnel captación leads",
    "especialista go high level",
    "automatización ventas España",
  ],
  authors: [{ name: "Ramiro Perez", url: BASE_URL }],
  creator: "Ramiro Perez",
  publisher: "Ramiro Perez",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: BASE_URL,
    siteName: "Ramiro Perez — Automatización Comercial",
    title: "Ramiro Perez — Automatización Comercial & CRM",
    description:
      "Diseño sistemas de captación, cualificación y cierre de leads. Go High Level, WhatsApp automation y propuestas automáticas.",
    images: [
      {
        url: "/og?title=Ramiro+Perez+%E2%80%94+Automatizaci%C3%B3n+Comercial&tag=Automatizaci%C3%B3n+Comercial",
        width: 1200,
        height: 630,
        alt: "Ramiro Perez — Automatización Comercial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramiro Perez — Automatización Comercial & CRM",
    description:
      "Sistemas de captación, cualificación y cierre de leads. Go High Level, WhatsApp y propuestas automáticas.",
    images: ["/og?title=Ramiro+Perez+%E2%80%94+Automatizaci%C3%B3n+Comercial&tag=Automatizaci%C3%B3n+Comercial"],
    creator: "@ramiroperez",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Ramiro Perez",
      jobTitle: "Especialista en Automatización Comercial",
      description:
        "Diseño sistemas de captación, cualificación y cierre de leads para negocios que quieren vender más sin depender de procesos manuales.",
      url: BASE_URL,
      sameAs: [`${BASE_URL}/sobre-mi`],
      knowsAbout: [
        "Go High Level",
        "CRM automation",
        "Lead qualification",
        "WhatsApp Business automation",
        "Automatización comercial",
        "Propuestas automáticas",
        "Funnel de captación",
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "ES",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "Consultor de Automatización Comercial",
        description:
          "Implementación de sistemas CRM, automatización de WhatsApp y propuestas comerciales automáticas.",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Ramiro Perez — Automatización Comercial",
      description:
        "Especialista en sistemas de captación y automatización comercial con Go High Level.",
      publisher: { "@id": `${BASE_URL}/#person` },
      inLanguage: "es-ES",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <MotionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
