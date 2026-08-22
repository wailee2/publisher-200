import type { Metadata } from "next";
import { getAllPortfolioItems } from "@/lib/queries";
import PortfolioCard from "@/components/PortfolioCard";
import type { PortfolioItem } from "@/lib/types";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description: "Work published and designed by The Odoh Publishers.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const items = await getAllPortfolioItems().catch(() => []);

  return (
    <div className="container-press section-space-y page-space-y page-pt">
      <div className="container-layout  ">
        <div className="col-span-2">
          <p className="eyebrow">Our portfolio</p>
        </div>

        <div className="col-start-4 col-span-7 ">
          <h1 className="">
            Work that speaks
            <br />
            louder than pitches.
          </h1>
        </div>
      </div>

      <div className='h-[0.05em] bg-border'/>

      {items.length > 0 ? (
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-[1.5em]">
          {items.map((item: PortfolioItem, i: number) => (
            <PortfolioCard key={item._id} item={item} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-16 border border-border rounded-xl p-10 max-w-lg">
          <p className="font-body text-text-secondary">
            No portfolio items yet. Add your first one in the studio at{" "}
            <code className="text-primary">/studio</code> - under{" "}
            <strong>Portfolio → Create</strong>.
          </p>
        </div>
      )}
    </div>
  );
}
