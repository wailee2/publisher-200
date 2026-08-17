import type { Metadata } from "next";
import { getAllBooks } from "@/lib/queries";
import BookCard from "@/components/BookCard";

export const metadata: Metadata = {
  title: "Book Catalog — Adire Press",
  description: "Browse fiction, poetry, and non-fiction from Adire Press.",
};

export default async function BookCatalogPage() {
  const books = await getAllBooks().catch(() => []);

  return (
    <div className="container-press py-16 md:py-24">
      <p className="marginalia">The list</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink">
        Book catalog
      </h1>
      <p className="font-body text-lg text-ink/70 mt-4 max-w-xl">
        Every title currently in print or forthcoming from Adire Press.
      </p>

      {books.length > 0 ? (
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {books.map((book: any) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="mt-16 border border-ink/15 p-10 max-w-lg">
          <p className="font-body text-ink/70">
            No books published yet. Add your first title in the studio at{" "}
            <code className="text-rust">/studio</code> — under{" "}
            <strong>Book Catalog → Create</strong>.
          </p>
        </div>
      )}
    </div>
  );
}
