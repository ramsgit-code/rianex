import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";

export { default } from "@/app/page";

export const metadata: Metadata = {
  // absolute: si no, el template del layout raiz le pega otro " | Rianex".
  title: { absolute: "Rianex — AI automation and development" },
  description:
    "AI automation and development. We integrate GoHighLevel and HubSpot with your tools and migrate your CRM to GoHighLevel with its full history.",
  alternates: alternates("/", "en"),
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
    url: "https://www.rianex.es/en",
    siteName: "Rianex",
    title: "Rianex — AI automation and development",
    description:
      "AI automation and development, GoHighLevel and HubSpot integrations, and migrations to GoHighLevel.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Rianex" }],
  },
};

export const revalidate = 60;
