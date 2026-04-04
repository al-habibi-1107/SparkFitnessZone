import { createClient } from "next-sanity";

export function isSanityConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
}

export function getSanityClient() {
  if (!isSanityConfigured()) {
    throw new Error("Sanity is not configured: NEXT_PUBLIC_SANITY_PROJECT_ID is missing.");
  }
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2024-01-01",
    useCdn:    process.env.NODE_ENV === "production",
  });
}
