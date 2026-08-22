# The Odoh Publishers - Website

Next.js 16 + Sanity CMS site for The Odoh Publishers. Pages: Home, About,
Services, Portfolio (renamed from Book Catalog), Contact.

## Stack

- **Next.js 16** (App Router, Turbopack by default) - see `AGENTS.md` if
  you're using an AI coding assistant on this repo; Next 16 has breaking
  changes vs older training data, and the bundled docs at
  `node_modules/next/dist/docs/` are the source of truth.
- **Sanity** - CMS/database + image hosting (`/studio` route)
- **Tailwind CSS v4** - CSS-first config, all design tokens live in
  `app/globals.css` under `:root` and `@theme` (no `tailwind.config.ts`)
- **Inter** - single-family type system (weight carries hierarchy)
- **Resend** - contact form + newsletter email delivery (free tier)

## Getting started

```bash
npm install
```

1. Create a Sanity project (or reuse the existing one) at
   [sanity.io/manage](https://www.sanity.io/manage).
2. Copy `.env.example` to `.env.local` and fill in your Sanity project ID
   and Resend API key.
3. Run the dev server:
   ```bash
   npm run dev
   ```
   Site: [http://localhost:3000](http://localhost:3000)
   Studio: [http://localhost:3000/studio](http://localhost:3000/studio)
4. (Optional) Seed starter text content:
   ```bash
   npm run seed
   ```

## Design tokens

All colors, defined once in `app/globals.css`:

Used directly as Tailwind utilities: `bg-primary`, `text-text-secondary`,
`border-border-hover`, etc.

## Content editing (Sanity Studio)

Go to `/studio`. Content types:

- **Site Settings** - one document, grouped by section (Hero, Why Choose
  Us, About Page, Our Process, CTA Banner, Footer, Contact Info). Covers
  every editable heading/subtext plus the hero image and about-page image.
- **Portfolio** - the work grid (renamed from "Book"). Cover image,
  title, category, optional author/summary/link, `featured` toggle for
  the homepage grid.
- **Services** - 4 services, each with two images (image 1 shows on both
  the homepage teaser and the Services page; image 2 only on Services).
- **Team Members** - About page team grid.
- **Testimonials** - homepage testimonial cards.
- **FAQs** - homepage FAQ accordion.

Fixed-count sections (Why Choose Us pillars, Process steps) are capped at
3 items in the schema since the layout is a fixed 3-card grid - text and
images are editable, structure isn't.

## Known gaps / next steps

- No CAPTCHA/rate-limiting on the contact form yet - add
  [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) if
  spam becomes an issue.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Lint the codebase |
| `npm run seed` | Push starter text content into Sanity |
