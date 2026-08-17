import type { Metadata } from "next";
import { getAllPortfolioItems } from "@/lib/queries";
import PortfolioCard from "@/components/PortfolioCard";
import type { PortfolioItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Portfolio — The Odoh Publishers",
  description: "Work published and designed by The Odoh Publishers.",
};

export default async function PortfolioPage() {
  const items = await getAllPortfolioItems().catch(() => []);

  return (
    <div className="container-press py-16 md:py-24">
      <p className="eyebrow">Our portfolio</p>
      <h1 className="font-display text-4xl md:text-6xl font-bold text-text-primary max-w-2xl">
        Work that speaks
        <br />
        louder than pitches.
      </h1>

      {items.length > 0 ? (
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {items.map((item: PortfolioItem, i: number) => (
            <PortfolioCard key={item._id} item={item} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-16 border border-border rounded-xl p-10 max-w-lg">
          <p className="font-body text-text-secondary">
            No portfolio items yet. Add your first one in the studio at{" "}
            <code className="text-primary">/studio</code> — under{" "}
            <strong>Portfolio → Create</strong>.
          </p>
        </div>
      )}
    </div>
  );
}
