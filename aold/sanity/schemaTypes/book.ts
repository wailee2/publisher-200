import { defineField, defineType } from "sanity";

export const book = defineType({
  name: "book",
  title: "Book",
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
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: "Book cover — recommended 800x1200px (2:3 ratio).",
    }),
    defineField({
      name: "genre",
      title: "Genre",
      type: "string",
      options: {
        list: [
          "Fiction",
          "Non-fiction",
          "Poetry",
          "Children's",
          "Academic",
          "Biography",
        ],
      },
    }),
    defineField({
      name: "excerpt",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "Shown on the catalog grid. Keep it to 1-2 sentences.",
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "text",
      rows: 6,
      description: "Shown on the individual book page.",
    }),
    defineField({
      name: "publishedDate",
      title: "Publication date",
      type: "date",
    }),
    defineField({
      name: "isbn",
      title: "ISBN",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price (₦)",
      type: "number",
    }),
    defineField({
      name: "featured",
      title: "Feature on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "purchaseLink",
      title: "Purchase link",
      type: "url",
      description: "Where to buy — optional.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "author", media: "cover" },
  },
});
