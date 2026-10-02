import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicioView } from "@/app/(es)/servicios/[slug]/ServicioView";
import { SERVICIO_SLUGS, getServicio } from "@/lib/servicios";
import { translatedMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICIO_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getServicio(slug, "en");
  if (!s) return {};
  return translatedMetadata(`/servicios/${slug}`, "en", s.seoTitle, s.metaDescription);
}

export default async function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getServicio(slug, "en")) notFound();
  return <ServicioView slug={slug} lang="en" />;
}
