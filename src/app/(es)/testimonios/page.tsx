import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Testimonios } from "./testimonios-pagina";

export const metadata: Metadata = pageMetadata("/testimonios", "es");

export const revalidate = 60;

export default function TestimoniosPage() {
  return <Testimonios lang="es" />;
}
