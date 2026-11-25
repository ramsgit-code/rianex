import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Blog } from "@/app/(es)/blog/blog-listado";

export const metadata: Metadata = pageMetadata("/blog", "en");

export default function BlogPageEn() {
  return <Blog lang="en" />;
}
