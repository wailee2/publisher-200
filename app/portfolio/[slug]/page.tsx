import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPortfolioItemBySlug } from "@/lib/queries";
import { urlForImage } from "@/sanity/image";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug).catch(() => null);
  return {
    title: item ? `${item.title} — The Odoh Publishers` : "Portfolio — The Odoh Publishers",
  };
}

// Note: no Figma design exists yet for this detail page — built to match
// the rest of the design system (tokens, type scale, pill buttons) so it
// stays visually consistent until a real design is ready to swap in.
export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug).catch(() => null);

  if (!item) notFound();

  const coverUrl = item.cover
    ? urlForImage(item.cover).width(1000).height(1200).url()
    : null;

  return (
    <div className="container-press py-16 md:py-24">
      <Link href="/portfolio" className="font-body text-sm text-text-muted hover:text-primary">
        ← Back to portfolio
      </Link>

      <div className="mt-8 grid md:grid-cols-[420px_1fr] gap-12">
        <div className="aspect-[4/5] bg-bg-secondary rounded-2xl relative overflow-hidden">
          {coverUrl && (
            <Image src={coverUrl} alt={item.title} fill className="object-cover" priority />
          )}
        </div>

        <div>
          {item.category && <p className="eyebrow">{item.category}</p>}
          <h1 className="font-display text-3xl md:text-5xl font-bold text-text-primary">
            {item.title}
          </h1>
          {item.author && (
            <p className="font-body text-lg text-text-muted mt-2">by {item.author}</p>
          )}

          {item.summary && (
            <p className="font-body text-text-secondary leading-relaxed mt-8 max-w-prose">
              {item.summary}
            </p>
          )}

          <div className="mt-10 flex gap-4">
            {item.externalLink ? (
              <a href={item.externalLink} className="btn-pill-primary">
                View project
                <span className="btn-pill-icon">↗</span>
              </a>
            ) : (
              <Link href="/contact" className="btn-pill-primary">
                Enquire about this project
                <span className="btn-pill-icon">↗</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
