import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBookBySlug } from "@/lib/queries";
import { urlForImage } from "@/sanity/image";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug).catch(() => null);
  return {
    title: book ? `${book.title} — Adire Press` : "Book — Adire Press",
  };
}

export default async function BookDetailPage({ params }: Props) {
  const { slug } = await params;
  const book = await getBookBySlug(slug).catch(() => null);

  if (!book) notFound();

  const coverUrl = book.cover
    ? urlForImage(book.cover).width(800).height(1200).url()
    : null;

  return (
    <div className="container-press py-16 md:py-24">
      <Link
        href="/book-catalog"
        className="font-body text-sm text-slate hover:text-rust"
      >
        ← Back to catalog
      </Link>

      <div className="mt-8 grid md:grid-cols-[380px_1fr] gap-12">
        <div className="aspect-[2/3] bg-paper-dim relative overflow-hidden">
          {coverUrl && (
            <Image
              src={coverUrl}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        <div>
          {book.genre && <p className="marginalia">{book.genre}</p>}
          <h1 className="font-display text-3xl md:text-5xl text-ink">
            {book.title}
          </h1>
          <p className="font-body text-lg text-slate mt-2">by {book.author}</p>

          {book.description && (
            <p className="font-body text-ink/80 leading-relaxed mt-8 max-w-prose">
              {book.description}
            </p>
          )}

          <dl className="mt-10 grid grid-cols-2 gap-6 max-w-md font-body text-sm">
            {book.publishedDate && (
              <div>
                <dt className="text-slate">Published</dt>
                <dd className="text-ink">
                  {new Date(book.publishedDate).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                  })}
                </dd>
              </div>
            )}
            {book.isbn && (
              <div>
                <dt className="text-slate">ISBN</dt>
                <dd className="text-ink">{book.isbn}</dd>
              </div>
            )}
            {book.price && (
              <div>
                <dt className="text-slate">Price</dt>
                <dd className="text-ink">₦{book.price.toLocaleString()}</dd>
              </div>
            )}
          </dl>

          <div className="mt-10 flex gap-4">
            {book.purchaseLink ? (
              <a href={book.purchaseLink} className="btn-primary">
                Buy this book
              </a>
            ) : (
              <Link href="/contact" className="btn-primary">
                Enquire about this book
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
