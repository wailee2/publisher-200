import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/image";
import { ArrowUpRight } from "lucide-react";

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
        <Image
          src={coverUrl || "/images/portfolio-placeholder.jpg"}
          alt={coverUrl ? item.title : ""}
          fill
          sizes="(max-width: 768px) 45vw, 30vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bookmark-number ">
            {String(index + 1).padStart(2, "0")}
          </span>{" "}
          <span className="capitalize text-small lg:text-medium font-medium ">
            {item.title}
          </span>
        </div>
        <div className="border-border border rounded-full p-1.5 group-hover:border-primary group-hover:text-primary transition-colors">
          <ArrowUpRight className="size-4 text-text-muted group-hover:border-primary group-hover:text-primary transition-colors" /> 
        </div>
      </div>
    </Link>
  );
}
