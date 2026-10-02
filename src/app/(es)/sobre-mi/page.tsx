import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SobreMiView } from "./SobreMiView";

export const metadata: Metadata = pageMetadata("/sobre-mi", "es");

export default function SobreMiPage() {
  return <SobreMiView />;
}
