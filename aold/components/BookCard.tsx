import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/image";

type Book = {
  _id: string;
  title: string;
  author: string;
  excerpt?: string;
  slug: { current: string };
  cover?: { asset?: { _ref: string } };
};

export default function BookCard({ book }: { book: Book }) {
  const coverUrl = book.cover
    ? urlForImage(book.cover).width(600).height(900).url()
    : null;

  return (
    <Link
      href={`/book-catalog/${book.slug.current}`}
      className="group block"
    >
      <div className="aspect-[2/3] bg-paper-dim overflow-hidden mb-4 relative">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            fill
            sizes="(max-width: 768px) 45vw, 22vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate text-xs font-body">
            Cover coming soon
          </div>
        )}
      </div>
      <h3 className="font-display text-lg leading-snug text-ink group-hover:text-rust transition-colors">
        {book.title}
      </h3>
      <p className="font-body text-sm text-slate mt-1">{book.author}</p>
      {book.excerpt && (
        <p className="font-body text-sm text-ink/70 mt-2 line-clamp-2">
          {book.excerpt}
        </p>
      )}
    </Link>
  );
}
