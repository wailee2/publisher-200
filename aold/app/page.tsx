import Link from "next/link";
import Image from "next/image";
import { getFeaturedBooks, getSiteSettings } from "@/lib/queries";
import { urlForImage } from "@/sanity/image";
import BookCard from "@/components/BookCard";

export default async function HomePage() {
  const [settings, featuredBooks] = await Promise.all([
    getSiteSettings().catch(() => null),
    getFeaturedBooks().catch(() => []),
  ]);

  const heroUrl = settings?.heroImage
    ? urlForImage(settings.heroImage).width(1600).height(900).url()
    : null;

  return (
    <>
      {/* HERO — the thesis: a manuscript becoming a bound book */}
      <section className="container-press pt-16 md:pt-24 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="marginalia">Est. Lagos</p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] text-ink">
            Nigerian voices,
            <br />
            bound to last.
          </h1>
          <p className="font-body text-lg text-ink/75 mt-6 max-w-md">
            {settings?.tagline ||
              "We publish fiction, poetry, and non-fiction from writers who have something to say — and edit it like it matters."}
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/book-catalog" className="btn-primary">
              Browse the catalog
            </Link>
            <Link href="/contact" className="btn-secondary">
              Submit a manuscript
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] bg-paper-dim">
          {heroUrl ? (
            <Image
              src={heroUrl}
              alt="A stack of Adire Press published books"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate text-sm font-body px-8 text-center">
              Add a hero image in Site Settings → the studio at /studio
            </div>
          )}
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section className="container-press py-20 border-t border-ink/10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="marginalia">On the shelf</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink">
              Recent releases
            </h2>
          </div>
          <Link
            href="/book-catalog"
            className="hidden md:inline font-body text-sm text-rust hover:underline"
          >
            View full catalog →
          </Link>
        </div>

        {featuredBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            {featuredBooks.map((book: any) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="font-body text-slate">
            No books marked as &ldquo;featured&rdquo; yet — mark a book with
            the Feature toggle in the studio to have it appear here.
          </p>
        )}
      </section>

      {/* WHY US */}
      <section className="bg-ink text-paper py-20 mt-8">
        <div className="container-press grid md:grid-cols-3 gap-10">
          <div>
            <p className="marginalia !text-gold">Editorial</p>
            <h3 className="font-display text-xl mb-2">Real editing, not a rubber stamp</h3>
            <p className="font-body text-sm text-paper/70">
              Every manuscript goes through developmental and line editing
              with someone who reads the genre, not just the grammar.
            </p>
          </div>
          <div>
            <p className="marginalia !text-gold">Design</p>
            <h3 className="font-display text-xl mb-2">Covers people actually pick up</h3>
            <p className="font-body text-sm text-paper/70">
              Cover and interior design built for Nigerian bookshelves and
              the online shop window alike.
            </p>
          </div>
          <div>
            <p className="marginalia !text-gold">Distribution</p>
            <h3 className="font-display text-xl mb-2">From Lagos to wherever your reader is</h3>
            <p className="font-body text-sm text-paper/70">
              Print and digital distribution across Nigeria, with direct
              sales through our own catalog.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
