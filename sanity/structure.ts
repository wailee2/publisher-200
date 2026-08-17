import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("portfolioItem").title("Portfolio"),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("teamMember").title("Team Members"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("faqItem").title("FAQs"),
    ]);
