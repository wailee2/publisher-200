import { client } from "@/sanity/client";

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`);
}

// Portfolio
export async function getAllPortfolioItems() {
  return client.fetch(
    `*[_type == "portfolioItem"] | order(order asc){
      _id, title, slug, cover, category, author, summary, externalLink
    }`
  );
}

export async function getFeaturedPortfolioItems(limit = 6) {
  return client.fetch(
    `*[_type == "portfolioItem" && featured == true] | order(order asc)[0...$limit]{
      _id, title, slug, cover, category
    }`,
    { limit }
  );
}

export async function getPortfolioItemBySlug(slug: string) {
  return client.fetch(`*[_type == "portfolioItem" && slug.current == $slug][0]`, { slug });
}

// Services
export async function getAllServices() {
  return client.fetch(
    `*[_type == "service"] | order(order asc){
      _id, title, summary, imageOne, imageTwo, order
    }`
  );
}

// Team
export async function getTeamMembers() {
  return client.fetch(
    `*[_type == "teamMember"] | order(order asc){
      _id, name, role, photo, bio
    }`
  );
}

// Testimonials
export async function getTestimonials() {
  return client.fetch(
    `*[_type == "testimonial"] | order(order asc){
      _id, quote, authorName, authorRole, authorPhoto
    }`
  );
}

// FAQs
export async function getFaqItems() {
  return client.fetch(
    `*[_type == "faqItem"] | order(order asc){
      _id, question, answer
    }`
  );
}
