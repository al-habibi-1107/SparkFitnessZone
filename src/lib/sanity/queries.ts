import { getSanityClient } from "./client";
import type { Equipment } from "./types";

export type { Equipment } from "./types";

export async function getEquipmentBySlug(slug: string): Promise<Equipment | null> {
  return getSanityClient().fetch(
    `*[_type == "equipment" && slug.current == $slug][0]{
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
    }`,
    { slug }
  );
}

export async function getAllEquipmentSlugs(): Promise<{ slug: string }[]> {
  return getSanityClient().fetch(
    `*[_type == "equipment"]{ "slug": slug.current }`
  );
}
