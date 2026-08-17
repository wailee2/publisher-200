/**
 * Seeds Sanity with starter content so the site isn't empty on first run.
 * This is optional — you can also just type this content into the Studio
 * by hand. Run with: node scripts/seed.mjs
 *
 * Requires a write token: create one at sanity.io/manage → API → Tokens
 * (Editor permission is enough), then set SANITY_API_WRITE_TOKEN in .env
 */
import { createClient } from "@sanity/client";
import "dotenv/config";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function seed() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error(
      "Missing SANITY_API_WRITE_TOKEN in .env — create one at sanity.io/manage first."
    );
    process.exit(1);
  }

  console.log("Seeding Site Settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: "Adire Press",
    tagline:
      "We publish fiction, poetry, and non-fiction from Nigerian writers who have something to say — and edit it like it matters.",
    aboutStory:
      "Adire Press was founded in Lagos by a small group of editors and designers who were tired of watching strong manuscripts stall.\nWe take on a small list of titles each year because we'd rather do a few books well than a lot of books quickly.\nWe're named for adire, the resist-dyed cloth of southwest Nigeria — made slowly, by hand, built to hold its pattern for decades.",
    email: "hello@adirepress.ng",
    phone: "+234 800 000 0000",
    address: "14 Freedom Way, Lekki Phase 1, Lagos",
  });

  console.log("Seeding Services...");
  const services = [
    {
      title: "Developmental & line editing",
      icon: "Ed.",
      summary:
        "Structural feedback on plot, pacing, and argument, followed by sentence-level line editing.",
      order: 1,
    },
    {
      title: "Full-service publishing",
      icon: "Pr.",
      summary:
        "Editing, cover and interior design, ISBN registration, print production, and distribution.",
      order: 2,
    },
    {
      title: "Cover & interior design",
      icon: "Ds.",
      summary:
        "Standalone design services for self-publishing authors who already have an editor.",
      order: 3,
    },
    {
      title: "Manuscript consultation",
      icon: "Ct.",
      summary:
        "A single paid session to assess a manuscript's readiness and map out next steps.",
      order: 4,
    },
  ];
  for (const s of services) {
    await client.create({ _type: "service", ...s });
  }

  console.log("Done. Add cover images and team photos directly in the Studio —");
  console.log("images can't be seeded from a script without uploading files.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
