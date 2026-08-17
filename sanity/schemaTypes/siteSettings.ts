import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General" },
    { name: "hero", title: "Hero" },
    { name: "whyChooseUs", title: "Why Choose Us" },
    { name: "about", title: "About Page" },
    { name: "process", title: "Our Process" },
    { name: "cta", title: "CTA Banner" },
    { name: "footer", title: "Footer" },
    { name: "contact", title: "Contact Info" },
  ],
  fields: [
    defineField({ name: "companyName", title: "Company name", type: "string", group: "general" }),
    defineField({ name: "logo", title: "Logo", type: "image", group: "general" }),

    defineField({ name: "heroEyebrow", title: "Eyebrow label", type: "string", group: "hero", initialValue: "Meet Odoh" }),
    defineField({ name: "heroHeadline", title: "Headline", type: "string", group: "hero" }),
    defineField({ name: "heroSubtext", title: "Subtext", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroImage", title: "Hero background image", type: "image", options: { hotspot: true }, group: "hero" }),
    defineField({ name: "heroBadgeText", title: "Trust badge text", type: "string", group: "hero", initialValue: "Trusted by 500+ Authors Worldwide" }),

    defineField({
      name: "whyChooseUsHeadline",
      title: "Section headline",
      type: "string",
      group: "whyChooseUs",
    }),
    defineField({
      name: "pillars",
      title: "Pillars",
      type: "array",
      group: "whyChooseUs",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", rows: 3, title: "Description" },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      validation: (Rule) => Rule.max(3),
      description: "Editorial / Design / Distribution — max 3, matches the fixed 3-card layout.",
    }),

    defineField({ name: "aboutHeadline", title: "Headline", type: "string", group: "about" }),
    defineField({ name: "aboutImage", title: "Story image", type: "image", options: { hotspot: true }, group: "about" }),
    defineField({ name: "aboutStory", title: "Our story", type: "text", rows: 8, group: "about" }),

    defineField({ name: "processHeadline", title: "Section headline", type: "string", group: "process" }),
    defineField({
      name: "processSteps",
      title: "Steps",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", rows: 3, title: "Description" },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      validation: (Rule) => Rule.max(3),
      description: "Consultation / Content Creation / Publication — max 3, matches the fixed layout (grey / blue / dark cards).",
    }),

    defineField({ name: "ctaHeadline", title: "Headline", type: "string", group: "cta" }),
    defineField({ name: "ctaButtonText", title: "Button text", type: "string", group: "cta", initialValue: "Let us collaborate" }),

    defineField({ name: "footerHeadline", title: "Headline", type: "string", group: "footer", initialValue: "Let's build something great" }),
    defineField({ name: "footerSubtext", title: "Subtext", type: "text", rows: 2, group: "footer" }),
    defineField({ name: "footerButtonText", title: "Button text", type: "string", group: "footer", initialValue: "Get started" }),

    defineField({ name: "email", title: "Contact email", type: "string", group: "contact" }),
    defineField({ name: "phone", title: "Contact phone", type: "string", group: "contact" }),
    defineField({ name: "address", title: "Office address", type: "text", rows: 2, group: "contact" }),
    defineField({ name: "facebook", title: "Facebook URL", type: "url", group: "contact" }),
    defineField({ name: "whatsapp", title: "WhatsApp URL", type: "url", group: "contact" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url", group: "contact" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url", group: "contact" }),
    defineField({ name: "twitter", title: "X / Twitter URL", type: "url", group: "contact" }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
