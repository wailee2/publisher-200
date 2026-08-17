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
import type { Service, PortfolioItem, Testimonial, Pillar, ProcessStep } from "@/lib/types";

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
    "bg-bg-secondary text-text-primary",
    "bg-primary text-text-on-primary",
    "bg-secondary text-text-on-primary",
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50" />

        <div className="container-press relative z-10 pb-20 pt-32 w-full">
          <p className="eyebrow !text-white/90">
            {settings?.heroEyebrow || "Meet Odoh"}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.05] max-w-2xl">
            {settings?.heroHeadline ||
              "We publish the books Nigerian readers actually pick up."}
          </h1>
          <p className="font-body text-white/80 mt-6 max-w-md text-lg">
            {settings?.heroSubtext ||
              "We publish fiction, poetry, and non-fiction from writers who have something to say — and edit it like it matters."}
          </p>
          <Link href="/services" className="btn-pill-white mt-8">
            Explore our services
            <span className="btn-pill-icon">↗</span>
          </Link>

          <div className="flex items-center gap-2 mt-16 text-white/90 font-body text-sm">
            <span>{settings?.heroBadgeText || "Trusted by 500+ Authors Worldwide"}</span>
            <span className="text-accent">★</span>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container-press py-20 md:py-28">
        <p className="eyebrow">Why choose us?</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primary max-w-2xl mb-14">
          {settings?.whyChooseUsHeadline ||
            "We combine bold creativity with strategy to drive results."}
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {pillars.map((pillar: Pillar, i: number) => (
            <div key={i}>
              <div className="w-12 h-12 rounded-xl bg-primary mb-5" />
              <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                {pillar.title}
              </h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="container-press py-20 md:py-28 border-t border-border">
        <p className="eyebrow">Services</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-6">
          What we do best,
          <br />
          and then some.
        </h2>
        <Link href="/services" className="btn-pill-primary mb-16">
          View all services
          <span className="btn-pill-icon">↗</span>
        </Link>

        <div className="divide-y divide-border">
          {(services.length > 0
            ? services
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
                className="py-8 grid md:grid-cols-[60px_1fr_auto] gap-6 items-center"
              >
                <span className="font-body text-sm text-text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-text-secondary max-w-lg">
                    {service.summary}
                  </p>
                </div>
                <div className="hidden md:block w-32 h-24 rounded-lg overflow-hidden bg-bg-secondary relative flex-shrink-0">
                  {imgUrl && (
                    <Image src={imgUrl} alt={service.title} fill className="object-cover" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="container-press py-20 md:py-28 border-t border-border">
        <p className="eyebrow">About us</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primary max-w-2xl mb-8">
          {settings?.aboutHeadline ||
            "The Odoh Publisher was founded in Nigeria by a group of editors and designers who were tired of watching strong manuscripts stall."}
        </h2>
        <Link href="/about" className="btn-pill-primary">
          Learn more about our team
          <span className="btn-pill-icon">↗</span>
        </Link>
      </section>

      {/* PORTFOLIO */}
      <section className="container-press py-20 md:py-28 border-t border-border">
        <p className="eyebrow">Our portfolio</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-6">
          Work that speaks
          <br />
          louder than pitches.
        </h2>
        <Link href="/portfolio" className="btn-pill-primary mb-14">
          Explore more
          <span className="btn-pill-icon">↗</span>
        </Link>

        {portfolioItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            {portfolioItems.map((item: PortfolioItem, i: number) => (
              <PortfolioCard key={item._id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <p className="font-body text-text-secondary">
            No portfolio items marked as featured yet — add some in the
            studio at <code className="text-primary">/studio</code> and
            toggle &ldquo;Feature on homepage&rdquo;.
          </p>
        )}
      </section>

      {/* PROCESS */}
      <section className="container-press py-20 md:py-28 border-t border-border">
        <p className="eyebrow">Our process</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-6">
          {settings?.processHeadline || "A simple yet powerful and efficient process."}
        </h2>
        <Link href="/contact" className="btn-pill-primary mb-14">
          Get started
          <span className="btn-pill-icon">↗</span>
        </Link>

        <div className="grid md:grid-cols-3 gap-6">
          {processSteps.map((step: ProcessStep, i: number) => (
            <div
              key={i}
              className={`${processStyles[i % 3]} rounded-2xl p-10 min-h-[280px] flex flex-col justify-between`}
            >
              <span className="font-display text-5xl font-bold">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                <p className="font-body text-sm opacity-80">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="container-press py-20 md:py-28 border-t border-border">
          <p className="eyebrow">Testimonial</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-6">
            Don&apos;t take our word for it.
            <br />
            Hear from our authors.
          </h2>
          <Link href="/contact" className="btn-pill-primary mb-14">
            Get in touch
            <span className="btn-pill-icon">↗</span>
          </Link>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {testimonials.map((t: Testimonial) => {
              const photoUrl = t.authorPhoto
                ? urlForImage(t.authorPhoto).width(80).height(80).url()
                : null;
              return (
                <div key={t._id} className="bg-bg-secondary rounded-xl p-6 flex flex-col justify-between min-h-[260px]">
                  <p className="font-body text-sm text-text-primary leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-9 h-9 rounded-full bg-bg overflow-hidden relative flex-shrink-0">
                      {photoUrl && (
                        <Image src={photoUrl} alt={t.authorName} fill className="object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-text-primary">{t.authorName}</p>
                      {t.authorRole && (
                        <p className="font-body text-xs text-text-muted">{t.authorRole}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="container-press py-20 md:py-28 border-t border-border">
          <p className="eyebrow">FAQs</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-14">
            Got questions?
            <br />
            We&apos;ve got answers.
          </h2>
          <FaqAccordion items={faqs} />
        </section>
      )}

      {/* CTA BANNER */}
      <section className="container-press pb-20 md:pb-28">
        <div className="rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-active px-8 py-20 md:py-28 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white max-w-xl mx-auto mb-8">
            {settings?.ctaHeadline || "Join us in creating and publishing art"}
          </h2>
          <Link href="/contact" className="btn-pill-white !inline-flex">
            {settings?.ctaButtonText || "Let us collaborate"}
            <span className="btn-pill-icon">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
