import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Testimonios } from "@/app/(es)/testimonios/testimonios-pagina";

export const metadata: Metadata = pageMetadata("/testimonios", "en");

export const revalidate = 60;

export default function TestimoniosPageEn() {
  return <Testimonios lang="en" />;
}
