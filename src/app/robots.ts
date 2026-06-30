import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://ria-consulting.vercel.app/sitemap.xml",
    host: "https://ria-consulting.vercel.app",
  };
}
