import type { MetadataRoute } from "next";
import { getAllPortfolioItems } from "@/lib/queries";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const portfolioItems = await getAllPortfolioItems().catch(() => []);
  const portfolioRoutes: MetadataRoute.Sitemap = portfolioItems.map(
    (item: { slug: { current: string }; _updatedAt?: string }) => ({
      url: `${siteUrl}/portfolio/${item.slug.current}`,
      lastModified: item._updatedAt ? new Date(item._updatedAt) : undefined,
      changeFrequency: "monthly",
      priority: 0.6,
    })
  );

  return [...staticRoutes, ...portfolioRoutes];
}
