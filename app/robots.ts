import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /studio is the Sanity CMS login — no reason for it to be
        // crawled or show up in search results.
        disallow: "/studio",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
