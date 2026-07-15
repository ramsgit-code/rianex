"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { AuroraBackground } from "@/components/AuroraBackground";
import { ScrollProgress } from "@/components/ScrollProgress";
import { LanguageProvider } from "@/components/LanguageProvider";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <LanguageProvider>
      <ScrollProgress />
      <AuroraBackground />
      <AnalyticsTracker />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
