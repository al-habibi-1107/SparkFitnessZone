import { getSanityClient } from "./client";
import type { Equipment, Trainer, Review } from "./types";

export type { Equipment, Trainer, Review } from "./types";

const EQUIPMENT_FIELDS = `
  _id,
  _type,
  name,
  "slug": slug.current,
  image,
  category,
  description,
  muscleGroups,
  specs,
  displayOrder
`;

export async function getEquipmentBySlug(slug: string): Promise<Equipment | null> {
  return getSanityClient().fetch(
    `*[_type == "equipment" && slug.current == $slug][0]{${EQUIPMENT_FIELDS}}`,
    { slug }
  );
}

export async function getAllEquipment(): Promise<Equipment[]> {
  return getSanityClient().fetch(
    `*[_type == "equipment"] | order(displayOrder asc){${EQUIPMENT_FIELDS}}`
  );
}

export async function getRelatedEquipment(
  currentSlug: string,
  limit = 3,
): Promise<Equipment[]> {
  return getSanityClient().fetch(
    `*[_type == "equipment" && slug.current != $currentSlug] | order(displayOrder asc)[0...$limit]{${EQUIPMENT_FIELDS}}`,
    { currentSlug, limit }
  );
}

export async function getAllEquipmentSlugs(): Promise<{ slug: string }[]> {
  return getSanityClient().fetch(
    `*[_type == "equipment"]{ "slug": slug.current }`
  );
}

// ── Trainers ──────────────────────────────────────────────────────────────────

const TRAINER_FIELDS = `
  _id,
  _type,
  name,
  "slug": slug.current,
  photo,
  role,
  yearsExperience,
  specialisms,
  bio,
  socials,
  displayOrder
`;

export async function getAllTrainers(): Promise<Trainer[]> {
  return getSanityClient().fetch(
    `*[_type == "trainer"] | order(displayOrder asc){${TRAINER_FIELDS}}`
  );
}

// ── Reviews ───────────────────────────────────────────────────────────────────

const REVIEW_FIELDS = `
  _id,
  _type,
  reviewerName,
  avatar,
  rating,
  quote,
  memberSince,
  date,
  isFeatured
`;

export async function getFeaturedReviews(): Promise<Review[]> {
  return getSanityClient().fetch(
    `*[_type == "review" && isFeatured == true] | order(date desc){${REVIEW_FIELDS}}`
  );
}

export async function getAllReviews(): Promise<Review[]> {
  return getSanityClient().fetch(
    `*[_type == "review"] | order(date desc){${REVIEW_FIELDS}}`
  );
}
