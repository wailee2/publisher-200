import type { Metadata } from "next";

// Every page builds its metadata through this helper so title, OG tags,
// Twitter cards, and canonical URLs stay consistent without repeating
// the same object shape on every page.

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://the-odoh-publishers.vercel.app";
export const siteName = "The Odoh Publishers";
export const defaultDescription =
  "The Odoh Publishers is a Nigerian publishing house offering full-service publishing, editing, design, and manuscript consultation for authors.";

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const ogImage = image || `${siteUrl}/opengraph-image`;
  const fullTitle = path === "/" ? title : `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

// Organization JSON-LD — injected once in the root layout so every page
// on the site carries it (Google reads it regardless of which page a
// crawler lands on first).
export function organizationJsonLd(settings?: {
  companyName?: string;
  email?: string;
  phone?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
}) {
  const sameAs = [
    settings?.facebook,
    settings?.instagram,
    settings?.linkedin,
    settings?.twitter,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings?.companyName || siteName,
    url: siteUrl,
    logo: `${siteUrl}/opengraph-image`,
    ...(settings?.email ? { email: settings.email } : {}),
    ...(settings?.phone ? { telephone: settings.phone } : {}),
    ...(settings?.address
      ? { address: { "@type": "PostalAddress", streetAddress: settings.address } }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
