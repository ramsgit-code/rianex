import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingView } from "./LandingView";
import { LANDINGS, LANDING_SLUGS } from "@/lib/landings";
import { getServicio } from "@/lib/servicios";
import { SITE_URL } from "@/lib/seo";

// Landing de campaña de un servicio. Con noindex: la que posiciona es la ficha
// de /servicios/<slug>, que es también su canonical.

export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_SLUGS.filter((slug) => getServicio(slug, "es")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = LANDINGS[slug];
  if (!l) return {};
  const title = `${l.title} | Rianex`;
  return {
    title: { absolute: title },
    description: l.lead,
    robots: { index: false, follow: true },
    alternates: { canonical: `/servicios/${slug}` },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: `${SITE_URL}/l/${slug}`,
      siteName: "Rianex",
      title,
      description: l.lead,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Rianex" }],
    },
  };
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!LANDINGS[slug] || !getServicio(slug, "es")) notFound();
  return <LandingView slug={slug} />;
}
