import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasoView } from "@/app/(es)/casos-de-exito/[slug]/CasoView";
import { CASO_SLUGS, getCaso } from "@/lib/casos";
import { translatedMetadata } from "@/lib/seo";

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
  const c = getCaso(slug, "en");
  if (!c) return {};
  return translatedMetadata(`/casos-de-exito/${slug}`, "en", c.seoTitle, c.metaDescription);
}

export default async function CasoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getCaso(slug, "en")) notFound();
  return <CasoView slug={slug} lang="en" />;
}
