import type { StructureResolver } from "sanity/structure";

// Customizes the Studio sidebar: pins "Site Settings" as a single
// document instead of a list, and groups content sensibly.
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
      S.documentTypeListItem("book").title("Book Catalog"),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("teamMember").title("Team Members"),
    ]);
