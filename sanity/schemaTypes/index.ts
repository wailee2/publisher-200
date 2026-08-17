import { type SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { portfolioItem } from "./portfolioItem";
import { service } from "./service";
import { teamMember } from "./teamMember";
import { testimonial } from "./testimonial";
import { faqItem } from "./faqItem";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, portfolioItem, service, teamMember, testimonial, faqItem],
};
