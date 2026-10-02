import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorView } from "@/app/(es)/soluciones/[slug]/SectorView";
import { SECTOR_SLUGS, getSector } from "@/lib/sectores";
import { translatedMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTOR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSector(slug, "en");
  if (!s) return {};
  return translatedMetadata(`/soluciones/${slug}`, "en", s.seoTitle, s.metaDescription);
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getSector(slug, "en")) notFound();
  return <SectorView slug={slug} lang="en" />;
}
