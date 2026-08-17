/**
 * Seeds Sanity with starter text content so the site isn't empty on
 * first run. Run with: node scripts/seed.mjs
 * Requires a write token — create one at sanity.io/manage → API → Tokens
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
    companyName: "The Odoh Publishers",
    heroEyebrow: "Meet Odoh",
    heroHeadline: "We publish the books Nigerian readers actually pick up.",
    heroSubtext:
      "We publish fiction, poetry, and non-fiction from writers who have something to say — and edit it like it matters.",
    heroBadgeText: "Trusted by 500+ Authors Worldwide",
    whyChooseUsHeadline: "We combine bold creativity with strategy to drive results.",
    pillars: [
      { title: "Editorial", description: "Every manuscript goes through developmental and line editing with someone who reads the genre, not just the grammar." },
      { title: "Design", description: "Cover and interior design built for Nigerian bookshelves and the online shop window alike." },
      { title: "Distribution", description: "Print and digital distribution across Nigeria, with direct sales through our own catalog." },
    ],
    aboutHeadline: "The team behind the work that works.",
    aboutStory:
      "The Odoh Publishers was founded in Nigeria by a group of editors and designers who were tired of watching strong manuscripts stall. We take on a small list of titles each year because we'd rather do a few books well than a lot of books quickly.",
    processHeadline: "A simple yet powerful and efficient process.",
    processSteps: [
      { title: "Consultation", description: "We begin with a detailed consultation to understand your vision, goals, and requirements for your book." },
      { title: "Content Creation", description: "Our expert team works on creating high-quality content that aligns with your vision and target audience." },
      { title: "Publication", description: "We handle the technical aspects of publishing your book in both digital and print formats." },
    ],
    ctaHeadline: "Join us in creating and publishing art",
    ctaButtonText: "Let us collaborate",
    footerHeadline: "Let's build something great",
    footerSubtext: "Odoh helps authors turn ideas into results through design, strategy, and innovation.",
    footerButtonText: "Get started",
    email: "contact@odoh.com",
    phone: "+23481234567",
    address: "134 Blues Avenue, Brick City, Abuja Nigeria",
  });

  console.log("Seeding Services...");
  const services = [
    { title: "Full-service publishing", summary: "Editing, cover and interior design, ISBN registration, print production, and distribution — for writers we bring onto the Odoh Publishers list.", order: 1 },
    { title: "Developmental & line editing", summary: "Structural feedback on plot, pacing, and argument, followed by sentence-level line editing. For manuscripts that are close but not yet ready to submit anywhere.", order: 2 },
    { title: "Cover & interior design", summary: "Standalone design services for self-publishing authors who already have an editor and just need a cover and interior layout that hold up on a shelf.", order: 3 },
    { title: "Manuscript consultation", summary: "A single paid session to assess a manuscript's readiness and map out what it needs before submission — to us or anyone else.", order: 4 },
  ];
  for (const s of services) {
    await client.create({ _type: "service", ...s });
  }

  console.log("Seeding FAQs...");
  const faqs = [
    { question: "What type of services does Odoh Publishers provide?", answer: "We provide a comprehensive range of publishing services including ghost writing, editing and proofreading, printing and consultation, marketing and distribution, and transcription services.", order: 1 },
    { question: "How Long does the Publishing Process take?", answer: "Timelines vary by project, but most books move from consultation to publication in a few months once the manuscript is ready.", order: 2 },
    { question: "Do I retain the Rights to my Book?", answer: "Yes — authors retain the rights to their work under our standard publishing agreement.", order: 3 },
    { question: "What Format will my Book be Available in?", answer: "We publish in both print and digital formats, depending on the title and distribution plan.", order: 4 },
  ];
  for (const f of faqs) {
    await client.create({ _type: "faqItem", ...f });
  }

  console.log("Done. Add images (hero, portfolio covers, team photos, testimonial");
  console.log("photos) directly in the Studio — scripts can't upload image files.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
