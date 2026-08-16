import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // `false` in dev so you always see fresh content; Next.js still caches
  // per-request during a single build/request via its own fetch cache.
  useCdn: process.env.NODE_ENV === "production",
});
