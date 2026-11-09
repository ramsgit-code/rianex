import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingView } from "./LandingView";
import { NichoView } from "./NichoView";
import { LANDINGS, LANDING_SLUGS } from "@/lib/landings";
import { NICHOS, NICHO_SLUGS } from "@/lib/nichos";
import { getServicio } from "@/lib/servicios";
import { SITE_URL } from "@/lib/seo";

// Landings de campaña: por nicho (/l/clinicas, /l/empresas-de-eventos…) y por
// servicio (/l/agente-ia-whatsapp…). Todas con noindex: las que posicionan
// son /soluciones y /servicios, que son también su canonical cuando existen.

export const dynamicParams = false;

export function generateStaticParams() {
  const servicios = LANDING_SLUGS.filter((slug) => getServicio(slug, "es"));
  return [...NICHO_SLUGS, ...servicios].map((slug) => ({ slug }));
}

function datos(slug: string) {
  const n = NICHOS[slug];
  if (n) return { title: n.title, description: n.lead, canonical: n.sector ? `/soluciones/${n.sector}` : `/l/${slug}` };
  const l = LANDINGS[slug];
  if (l && getServicio(slug, "es")) return { title: l.title, description: l.lead, canonical: `/servicios/${slug}` };
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = datos(slug);
  if (!m) return {};
  const title = `${m.title} | Rianex`;
  return {
    title: { absolute: title },
    description: m.description,
    robots: { index: false, follow: true },
    alternates: { canonical: m.canonical },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: `${SITE_URL}/l/${slug}`,
      siteName: "Rianex",
      title,
      description: m.description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Rianex" }],
    },
  };
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (NICHOS[slug]) return <NichoView slug={slug} />;
  if (LANDINGS[slug] && getServicio(slug, "es")) return <LandingView slug={slug} />;
  notFound();
}
