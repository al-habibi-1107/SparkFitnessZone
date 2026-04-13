import { getAllTrainers }    from "@/lib/sanity/queries";
import { urlForImage }       from "@/lib/sanity/image";
import { isSanityConfigured } from "@/lib/sanity/client";
import type { Trainer }       from "@/lib/sanity/types";
import BookTrainerClient, { type TrainerOption } from "./BookTrainerClient";

// ── Static fallback ───────────────────────────────────────────────────────────

const STATIC: TrainerOption[] = [
  {
    slug:        "arjun-sharma",
    name:        "Arjun Sharma",
    role:        "Head Coach",
    experience:  9,
    specialisms: ["Bodybuilding", "Strength", "Competition Prep"],
    imageUrl:    null,
  },
  {
    slug:        "priya-nair",
    name:        "Priya Nair",
    role:        "Fat Loss Specialist",
    experience:  6,
    specialisms: ["Fat Loss", "Nutrition", "Functional Fitness"],
    imageUrl:    null,
  },
  {
    slug:        "vikram-tiwari",
    name:        "Vikram Tiwari",
    role:        "Sports Nutritionist",
    experience:  7,
    specialisms: ["Diet Plans", "Hormone Health", "Recovery"],
    imageUrl:    null,
  },
];

function toOption(t: Trainer): TrainerOption {
  return {
    slug:        t.slug,
    name:        t.name,
    role:        t.role,
    experience:  t.yearsExperience,
    specialisms: t.specialisms,
    imageUrl:    t.photo
      ? urlForImage(t.photo).width(800).height(600).fit("crop").auto("format").url()
      : null,
  };
}

// ── Server component ──────────────────────────────────────────────────────────

export default async function BookTrainer() {
  let trainers: TrainerOption[] = STATIC;

  if (isSanityConfigured()) {
    try {
      const docs = await getAllTrainers();
      if (docs.length > 0) trainers = docs.map(toOption);
    } catch {
      // Sanity failed — static fallback already set
    }
  }

  return <BookTrainerClient trainers={trainers} />;
}
