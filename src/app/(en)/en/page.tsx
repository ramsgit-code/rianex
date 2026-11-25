import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { HomeView } from "@/app/(es)/home-view";

export const metadata: Metadata = pageMetadata("/", "en");

export const revalidate = 60;

// La misma home, con el JSON-LD en ingles.
export default function HomeEn() {
  return <HomeView lang="en" />;
}
