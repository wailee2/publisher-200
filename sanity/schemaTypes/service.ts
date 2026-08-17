import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageOne",
      title: "Image 1",
      type: "image",
      options: { hotspot: true },
      description: "Shown on both the homepage teaser and the full Services page.",
    }),
    defineField({
      name: "imageTwo",
      title: "Image 2",
      type: "image",
      options: { hotspot: true },
      description: "Shown only on the full Services page (side-by-side with Image 1).",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
      description: "Controls both the numbering (01, 02...) and the order shown.",
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
    select: { title: "title", subtitle: "summary", media: "imageOne" },
  },
});
