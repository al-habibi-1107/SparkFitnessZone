import { getAllTrainers }    from "@/lib/sanity/queries";
import { urlForImage }       from "@/lib/sanity/image";
import { isSanityConfigured } from "@/lib/sanity/client";
import type { Trainer }       from "@/lib/sanity/types";
import BookTrainerClient, { type TrainerOption } from "./BookTrainerClient";

// ── Static fallback ───────────────────────────────────────────────────────────

const STATIC: TrainerOption[] = [
  {
    slug:        "niraj-kumar",
    name:        "Niraj Kumar",
    role:        "Senior Trainer",
    experience:  8,
    specialisms: ["Fat Loss", "Fitness Training", "Metabolic Conditioning"],
    imageUrl:    null,
  },
  {
    slug:        "biswanath-kumar",
    name:        "Biswanath Kumar",
    role:        "Assistant Trainer",
    experience:  4,
    specialisms: ["Muscle Building", "Hypertrophy", "Certified Fitness"],
    imageUrl:    "/assets/trainers/trainer_2.png",
  },
  {
    slug:        "bikash-kumar",
    name:        "Bikash Kumar",
    role:        "Assistant Trainer",
    experience:  3,
    specialisms: ["Fat Loss", "Overall Health", "Wellness"],
    imageUrl:    "/assets/trainers/trainer_3.png",
  },
  {
    slug:        "faizan",
    name:        "Faizan",
    role:        "Assistant Trainer",
    experience:  3,
    specialisms: ["Muscle Building", "Strength Training", "Body Composition"],
    imageUrl:    null,
  },
  {
    slug:        "alik-patra",
    name:        "Alik Patra",
    role:        "Founder",
    experience:  10,
    specialisms: ["Training Strategy", "Member Development", "Gym Programming"],
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
