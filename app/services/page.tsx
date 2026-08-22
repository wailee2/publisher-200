import type { Metadata } from "next";
import Image from "next/image";
import { getAllServices } from "@/lib/queries";
import { urlForImage } from "@/sanity/image";
import type { Service } from "@/lib/types";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description: "Full-service publishing, editing, design, and consultation from The Odoh Publishers.",
  path: "/services",
});

const FALLBACK_SERVICES = [
  { _id: "1", title: "Full-service publishing", summary: "Editing, cover and interior design, ISBN registration, print production, and distribution - for writers we bring onto the Odoh Publishers list." },
  { _id: "2", title: "Developmental & line editing", summary: "Structural feedback on plot, pacing, and argument, followed by sentence-level line editing. For manuscripts that are close but not yet ready to submit anywhere." },
  { _id: "3", title: "Cover & interior design", summary: "Standalone design services for self-publishing authors who already have an editor and just need a cover and interior layout that hold up on a shelf." },
  { _id: "4", title: "Manuscript consultation", summary: "A single paid session to assess a manuscript's readiness and map out what it needs before submission - to us or anyone else." },
];

export default async function ServicesPage() {
  const services = await getAllServices().catch(() => []);
  const list = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <section className="container-press section-space-y page-space-y page-pt ">
      <div className="container-layout  ">
        <div className="col-span-2">
          <p className="eyebrow">Services</p>
        </div>

        <div className="col-start-4 col-span-7 ">
          <h1 className="">
            What we do best,
            <br />
            and then some.
          </h1>
        </div>
      </div>
      
      <div className='h-[0.05em] bg-border'/>

      <div className="space-y-20">
        {list.map((service: Service, i: number) => {
          const img1 = service.imageOne
            ? urlForImage(service.imageOne).width(700).height(500).url()
            : null;
          const img2 = service.imageTwo
            ? urlForImage(service.imageTwo).width(700).height(500).url()
            : null;

          return (
            <div key={service._id} className="flex flex-col  gap-[1em] lg:gap-[1em]">
              <div className=" w-full  lg:w-[50%] flex flex-col lg:flex-row gap-[1em] lg:gap-[3em]">
                <span className="bookmark-number">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="">
                  {service.title}
                </h3>
              </div>

              <div className="w-full">
                <p className="max-w-xl mb-6">
                  {service.summary}
                </p>

                <div className="grid sm:grid-cols-2 gap-[1.5em]">
                  <div className="aspect-4/3 bg-bg-secondary rounded-2xl overflow-hidden relative">
                    {img1 && <Image src={img1} alt={`${service.title} - image 1`} fill className="object-cover" />}
                  </div>
                  <div className="aspect-4/3 bg-bg-secondary rounded-2xl overflow-hidden relative">
                    {img2 && <Image src={img2} alt={`${service.title} - image 2`} fill className="object-cover" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
