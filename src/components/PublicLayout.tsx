"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { AuroraBackground } from "@/components/AuroraBackground";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CookieConsent } from "@/components/CookieConsent";
import { GHLChat } from "@/components/GHLChat";
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
      <CookieConsent />
      <GHLChat />
    </LanguageProvider>
  );
}
