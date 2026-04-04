import { getSanityClient } from "./client";
import type { Equipment } from "./types";

export type { Equipment } from "./types";

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
