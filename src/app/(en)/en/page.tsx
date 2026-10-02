import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export { default } from "@/app/(es)/page";

export const metadata: Metadata = pageMetadata("/", "en");

export const revalidate = 60;
