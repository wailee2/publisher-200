import { type SchemaTypeDefinition } from "sanity";

import { book } from "./book";
import { service } from "./service";
import { teamMember } from "./teamMember";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, book, service, teamMember],
};
