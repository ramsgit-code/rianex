import type { Metadata, Viewport } from "next";
import "../globals.css";
import { RootDocument } from "@/components/RootDocument";
import { rootMetadata } from "@/lib/seo";

export const viewport: Viewport = {
  themeColor: "#FBFBF8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = rootMetadata("en");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
