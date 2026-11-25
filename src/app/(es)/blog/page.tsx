import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Blog } from "./blog-listado";

export const metadata: Metadata = pageMetadata("/blog", "es");

export default function BlogPage() {
  return <Blog lang="es" />;
}
