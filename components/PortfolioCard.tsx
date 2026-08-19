import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/image";

type PortfolioItem = {
  _id: string;
  title: string;
  category?: string;
  slug: { current: string };
  cover?: { asset?: { _ref: string } };
};

export default function PortfolioCard({
  item,
  index,
}: {
  item: PortfolioItem;
  index: number;
}) {
  const coverUrl = item.cover
    ? urlForImage(item.cover).width(500).height(600).url()
    : null;

  return (
    <Link href={`/portfolio/${item.slug.current}`} className="group block">
      <div className="aspect-square bg-bg-secondary overflow-hidden mb-4 relative rounded-2xl">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 45vw, 30vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-muted text-small px-4 text-center">
            Add a cover image in the studio
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="section-heading-text ">
            {String(index + 1).padStart(2, "0")}
          </span>{" "}
          <span className="capitalize text-large font-semibold ">
            {item.title}
          </span>
        </div>
        <span className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-text-primary group-hover:border-primary group-hover:text-primary transition-colors">
          ↗
        </span>
      </div>
    </Link>
  );
}
