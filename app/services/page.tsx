import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Services — Adire Press",
  description: "Editorial, design, and publishing services from Adire Press.",
};

const FALLBACK_SERVICES = [
  {
    _id: "1",
    icon: "Ed.",
    title: "Developmental & line editing",
    summary:
      "Structural feedback on plot, pacing, and argument, followed by sentence-level line editing. For manuscripts that are close but not yet ready to submit anywhere.",
  },
  {
    _id: "2",
    icon: "Pr.",
    title: "Full-service publishing",
    summary:
      "Editing, cover and interior design, ISBN registration, print production, and distribution — for writers we bring onto the Adire Press list.",
  },
  {
    _id: "3",
    icon: "Ds.",
    title: "Cover & interior design",
    summary:
      "Standalone design services for self-publishing authors who already have an editor and just need a cover and interior layout that hold up on a shelf.",
  },
  {
    _id: "4",
    icon: "Ct.",
    title: "Manuscript consultation",
    summary:
      "A single paid session to assess a manuscript's readiness and map out what it needs before submission — to us or anyone else.",
  },
];

export default async function ServicesPage() {
  const services = await getAllServices().catch(() => []);
  const list = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <div className="container-press py-16 md:py-24">
      <p className="marginalia">What we do</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink max-w-2xl">
        Editorial and publishing services
      </h1>
      <p className="font-body text-lg text-ink/70 mt-4 max-w-xl">
        Whether you want full publication under the Adire Press name or a
        standalone editing pass, here&apos;s how we can help.
      </p>

      <div className="mt-16 divide-y divide-ink/10 border-t border-b border-ink/10">
        {list.map((service: any, i: number) => (
          <div
            key={service._id}
            className="py-10 grid md:grid-cols-[80px_1fr] gap-4 md:gap-10 items-start"
          >
            <span className="font-display text-3xl text-gold">
              {service.icon || String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="font-display text-2xl text-ink mb-2">
                {service.title}
              </h2>
              <p className="font-body text-ink/70 max-w-2xl leading-relaxed">
                {service.summary}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="font-body text-ink/70">
          Not sure which of these fits your manuscript?
        </p>
        <Link href="/contact" className="btn-primary">
          Get in touch
        </Link>
      </div>
    </div>
  );
}
