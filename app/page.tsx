import Link from "next/link";
import Image from "next/image";
import {
  getSiteSettings,
  getFeaturedPortfolioItems,
  getAllServices,
  getTestimonials,
  getFaqItems,
} from "@/lib/queries";
import { urlForImage } from "@/sanity/image";
import PortfolioCard from "@/components/PortfolioCard";
import FaqAccordion from "@/components/FaqAccordion";
import type { Service, PortfolioItem, Pillar, ProcessStep } from "@/lib/types";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

export default async function HomePage() {
  const [settings, portfolioItems, services, testimonials, faqs] =
    await Promise.all([
      getSiteSettings().catch(() => null),
      getFeaturedPortfolioItems(6).catch(() => []),
      getAllServices().catch(() => []),
      getTestimonials().catch(() => []),
      getFaqItems().catch(() => []),
    ]);

  const heroUrl = settings?.heroImage
    ? urlForImage(settings.heroImage).width(1800).height(1000).url()
    : null;

  const pillars = settings?.pillars?.length
    ? settings.pillars
    : [
        {
          title: "Editorial",
          description:
            "Every manuscript goes through developmental and line editing with someone who reads the genre, not just the grammar.",
        },
        {
          title: "Design",
          description:
            "Cover and interior design built for Nigerian bookshelves and the online shop window alike.",
        },
        {
          title: "Distribution",
          description:
            "Print and digital distribution across Nigeria, with direct sales through our own catalog.",
        },
      ];

  const processSteps = settings?.processSteps?.length
    ? settings.processSteps
    : [
        {
          title: "Consultation",
          description:
            "We begin with a detailed consultation to understand your vision, goals, and requirements for your book.",
        },
        {
          title: "Content Creation",
          description:
            "Our expert team works on creating high-quality content that aligns with your vision and target audience.",
        },
        {
          title: "Publication",
          description:
            "We handle the technical aspects of publishing your book in both digital and print formats.",
        },
      ];

  const processStyles = [
    "bg-card-bg text-text-primary",
    "bg-primary text-text-on-primary",
    "bg-secondary text-text-on-primary",
  ];

  return (
    <div className=" page-py">
      {/* HERO */}
      <section className="relative min-h-[110vh] flex justify-betweens items- overflow-hidden">
        {heroUrl ? (
          <Image
            src={heroUrl}
            alt="A shelf of published books"
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-secondary" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/50 to-black/70" />

        <div className="container-press relative z-10 mb-[4em] pt-[8em] w-full">
          <div className="grid grid-cols-12 gap-[1.25em] items-start  ">
            <div className="col-span-2">
              <div className="section-heading  ">
                <div className="section-heading-dot"/>
                <span className=" section-heading-text text-white! ">
                  {settings?.heroEyebrow || "Meet Odoh"}
                </span>
              </div>
            </div>

            <div className="col-start-4 col-span-6 space-y-8 ">
              <h1 className="text-white!">
                {settings?.heroHeadline ||
                  "We publish the books Nigerian readers actually pick up."}
              </h1>

              <div className="space-y-6">
                <p className="font-body text-white/80  max-w-[60%] ">
                  {settings?.heroSubtext ||
                    "We publish fiction, poetry, and non-fiction from writers who have something to say — and edit it like it matters."}
                </p>

                <Link href="/services" className="btn-pill-white">
                  Explore our services
                  <span className="btn-pill-icon">↗</span>
                </Link>
              </div>

              <div className="absolute bottom-0 font-medium flex items-center gap-2 mt-16b text-white/90 text-small text-small ">
                <span>{settings?.heroBadgeText || "Trusted by 500+ Authors Worldwide"}</span>
                <span className="text-accent text-[22px] absolute -right-6 -top-4">★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container-press section-py">
        <div className="grid grid-cols-12 gap-[1.25em] items-start  ">
          <div className="col-span-2">
            <div className="section-heading  ">
              <div className="section-heading-dot"/>
              <span className=" section-heading-text">
                Why choose us?
              </span>
            </div>
          </div>

          <div className="col-start-4 col-span-7 ">
            <h2 className="">
              {settings?.whyChooseUsHeadline ||
                "We combine bold creativity with strategy to drive results."}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {pillars.map((pillar: Pillar, i: number) => (
            <div key={i} className="flex gap-6">
              <div className="w-fit h-16 rounded-xl bg-primary " >dddddbb</div>
              <div className="flex flex-col gap-6 ">
                <h4 className="  ">
                  {pillar.title}
                </h4>
                <p className="font-body  text-text-secondary max-w-[80%]">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className=" section-py">
        <div className="container-press grid grid-cols-12 gap-[1.25em] items-start  ">
          <div className="col-span-2">
            <div className="section-heading  ">
              <div className="section-heading-dot"/>
              <span className=" section-heading-text">
                Services
              </span>
            </div>
          </div>

          <div className="col-start-4 col-span-7 space-y-6 ">
            <h2 className="">
              What we do best,
              <br />
              and then some.
            </h2>

            <Link href="/services" className="btn-pill-primary">
              Explore our services
              <span className="btn-pill-icon">↗</span>
            </Link>
          </div>
        </div>

        <div className="">
          {(services.length > 0
            ? services.slice(0, 4)
            : [
                { _id: "1", title: "Full-service publishing", summary: "Editing, cover and interior design, ISBN registration, print production, and distribution — for writers we bring onto the Odoh Publishers list." },
                { _id: "2", title: "Developmental & line editing", summary: "Structural feedback on plot, pacing, and argument, followed by sentence-level line editing." },
                { _id: "3", title: "Cover & interior design", summary: "Standalone design services for self-publishing authors who already have an editor." },
                { _id: "4", title: "Manuscript consultation", summary: "A single paid session to assess a manuscript's readiness and map out next steps." },
              ]
          ).map((service: Service, i: number) => {
            const imgUrl = service.imageOne
              ? urlForImage(service.imageOne).width(300).height(220).url()
              : null;
            return (
              <div
                key={service._id}
                className=" container-press cursor-pointer border-border border-t py-[2.5em] group flex gap-[1.25em] items-start transition-colors duration-500 ease-out hover:bg-[#f1f5ff]/50 "
              >
                <div className="w-[50%] flex gap-[3em]">
                  <span className="section-heading-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="transition-colors duration-500 ease-out group-hover:text-primary">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <div className="w-[60%] flex gap-[3em]">
                  {/* height animator: 0fr -> 1fr smoothly expands the row */}
                  <div
                    className="hidden md:grid w-65 shrink-0
                              grid-rows-[0fr] group-hover:grid-rows-[1fr]
                              transition-[grid-template-rows] duration-700 ease-out"
                  >
                    <div className="overflow-hidden min-h-0">
                      {/* scale/fade animator: image grows into view */}
                      <div
                        className="aspect-6/4 rounded-2xl overflow-hidden bg-bg-secondary relative
                                  scale-0 opacity-0 origin-bottom-right
                                  transition-all duration-700 ease-out
                                  group-hover:scale-100 group-hover:opacity-100"
                      >
                        {imgUrl && (
                          <Image
                            src={imgUrl}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="">
                    {service.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="container-press  ">
        <div className="grid grid-cols-12 gap-[1.25em] items-start  ">
          <div className="col-span-2">
            <div className="section-heading  ">
              <div className="section-heading-dot"/>
              <span className=" section-heading-text">
                About us
              </span>
            </div>
          </div>

          <div className="col-start-4 col-span-full space-y-6  ">
            <h2 className="text-pretty">
              {settings?.aboutHeadline ||
                "The Odoh Publisher was founded in Nigeria by a group of editors and designers who were tired of watching strong manuscripts stall."}
            </h2>

            <Link href="/about" className="btn-pill-primary">
              Learn more about our team
              <span className="btn-pill-icon">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="container-press section-py ">
        <div className="grid grid-cols-12 gap-[1.25em] items-start  ">
          <div className="col-span-2">
            <div className="section-heading  ">
              <div className="section-heading-dot"/>
              <span className=" section-heading-text">
                Our portfolio
              </span>
            </div>
          </div>

          <div className="col-start-4 col-span-full space-y-6  ">
            <h2 className="">
              Work that speaks
              <br />
              louder than pitches.
            </h2>

            <Link href="/portfolio" className="btn-pill-primary">
              Explore more
              <span className="btn-pill-icon">↗</span>
            </Link>
          </div>
        </div>

        {portfolioItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1.5em]">
            {portfolioItems.map((item: PortfolioItem, i: number) => (
              <PortfolioCard key={item._id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-text-secondary">
            No portfolio items marked as featured yet — add some in the
            studio at <code className="text-primary">/studio</code> and
            toggle &ldquo;Feature on homepage&rdquo;.
          </p>
        )}
      </section>

      {/* PROCESS */}
      <section className="container-press section-py ">
        <div className="grid grid-cols-12 gap-[1.25em] items-start  ">
          <div className="col-span-2">
            <div className="section-heading  ">
              <div className="section-heading-dot"/>
              <span className=" section-heading-text">
                Our process
              </span>
            </div>
          </div>

          <div className="col-start-4 col-span-full space-y-6  ">
            <h2 className="">
              {settings?.processHeadline || "A simple yet powerful and efficient process."}
            </h2>

            <Link href="/contact" className="btn-pill-primary">
              Get started
              <span className="btn-pill-icon">↗</span>
            </Link>
          </div>
        </div>

        <div className="grid items-center justify-center sm:grid-cols-2 lg:grid-cols-3 gap-[1.25em]">
          {processSteps.map((step: ProcessStep, i: number) => (
            <div
              key={i}
              className={`${processStyles[i % 3]} rounded-2xl px-8 pt-4 pb-8 lg:px-10  lg:pt-10 lg:pb-17  min-h-70  flex flex-col items-center justify-between`}
            >
              <span className="font-display  text-[50px] lg:text-[80px] font-semibold">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <div>
                <h3 className="text-center text-[30px] lg:text-[40px] font-medium mb-4 lg:mb-5">{step.title}</h3>
                <p className=" text-current">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="container-press section-py">
          <div className="grid grid-cols-12 gap-[1.25em] items-start  ">
            <div className="col-span-2">
              <div className="section-heading  ">
                <div className="section-heading-dot"/>
                <span className=" section-heading-text">
                  Testimonial
                </span>
              </div>
            </div>

            <div className="col-start-4 col-span-full space-y-6  ">
              <h2 className="">
                Don&apos;t take our word for it.
                <br />
                Hear from our authors.
              </h2>

              <Link href="/contact" className="btn-pill-primary">
                Get in touch
                <span className="btn-pill-icon">↗</span>
              </Link>
            </div>
          </div>

          <TestimonialsCarousel testimonials={testimonials} />
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="container-press ">
          <div className="grid grid-cols-12 gap-[1.25em] items-start  ">
            <div className="col-span-2">
              <div className="section-heading  ">
                <div className="section-heading-dot"/>
                <span className=" section-heading-text">
                  FAQs
                </span>
              </div>
            </div>

            <div className="col-start-4 col-span-full space-y-[1.7em]  ">
              <h2 className="">
                Got questions?
                <br />
                We&apos;ve got answers.
              </h2>
              
              <FaqAccordion items={faqs} />
            </div>
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section className="container-press pb-20 md:pb-28">
        <div className="rounded-3xl bg-[linear-gradient(to_bottom_right,#00278B_0%,#0036BE_35%,#00278B_73%,#0044F1_100%)] px-8 py-20 md:py-28 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white max-w-xl mx-auto mb-8">
            {settings?.ctaHeadline || "Join us in creating and publishing art"}
          </h2>
          <Link href="/contact" className="btn-pill-white inline-flex">
            {settings?.ctaButtonText || "Let us collaborate"}
            <span className="btn-pill-icon">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
