import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { HomeView } from "./home-view";

export const metadata: Metadata = pageMetadata("/", "es");

export const revalidate = 60;

export default function Home() {
  return <HomeView lang="es" />;
}
