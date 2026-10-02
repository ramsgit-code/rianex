import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicioView } from "./ServicioView";
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
  const s = getServicio(slug, "es");
  if (!s) return {};
  return translatedMetadata(`/servicios/${slug}`, "es", s.seoTitle, s.metaDescription);
}

export default async function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getServicio(slug, "es")) notFound();
  return <ServicioView slug={slug} lang="es" />;
}
