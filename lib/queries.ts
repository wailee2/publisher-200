import { client } from "@/sanity/client";

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`);
}

export async function getAllBooks() {
  return client.fetch(
    `*[_type == "book"] | order(publishedDate desc){
      _id, title, slug, author, cover, genre, excerpt, price, featured
    }`
  );
}

export async function getFeaturedBooks() {
  return client.fetch(
    `*[_type == "book" && featured == true] | order(publishedDate desc)[0...3]{
      _id, title, slug, author, cover, excerpt
    }`
  );
}

export async function getBookBySlug(slug: string) {
  return client.fetch(
    `*[_type == "book" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getAllServices() {
  return client.fetch(
    `*[_type == "service"] | order(order asc){
      _id, title, icon, summary
    }`
  );
}

export async function getTeamMembers() {
  return client.fetch(
    `*[_type == "teamMember"] | order(order asc){
      _id, name, role, photo, bio
    }`
  );
}
