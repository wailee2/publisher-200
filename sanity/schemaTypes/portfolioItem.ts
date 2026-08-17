import { defineField, defineType } from "sanity";

// Renamed from "book" to "portfolioItem" — the Portfolio section shows
// published work as case studies (cover + title + category), not a
// sellable catalog. If Odoh Publishers later wants direct book sales,
// price/ISBN/purchaseLink fields can be added back without breaking
// this schema.
export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: "Shown in the portfolio grid. Recommended: square or 4:5 ratio.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. Poetry, Fiction, Cover Design, Editorial — shown as a small label.",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "Optional — leave blank for non-book design work.",
    }),
    defineField({
      name: "summary",
      title: "Short description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "externalLink",
      title: "External link",
      type: "url",
      description: "Optional — link to buy, read, or view the full case study elsewhere.",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "featured",
      title: "Feature on homepage",
      type: "boolean",
      initialValue: false,
      description: "Homepage shows a limited grid — toggle which items appear there.",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "cover" },
  },
});
