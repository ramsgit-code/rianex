import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasoView } from "./CasoView";
import { CASO_SLUGS, getCaso } from "@/lib/casos";
import { fichaImage, translatedMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASO_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaso(slug, "es");
  if (!c) return {};
  return translatedMetadata(`/casos-de-exito/${slug}`, "es", c.seoTitle, c.metaDescription, fichaImage("es", "casos-de-exito", slug));
}

export default async function CasoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getCaso(slug, "es")) notFound();
  return <CasoView slug={slug} lang="es" />;
}
