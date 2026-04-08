import Image                                    from "next/image";
import { getAllTrainers }                        from "@/lib/sanity/queries";
import { urlForImage }                           from "@/lib/sanity/image";
import { isSanityConfigured }                    from "@/lib/sanity/client";
import type { Trainer as SanityTrainer }         from "@/lib/sanity/types";

// ── Static fallback ───────────────────────────────────────────────────────────

const STATIC_TRAINERS = [
  {
    slug:       "arjun-sharma",
    name:       "Arjun Sharma",
    role:       "Head Coach",
    experience: 9,
    imageUrl:   null as string | null,
    specs:      ["Bodybuilding", "Strength", "Competition Prep"],
  },
  {
    slug:       "priya-nair",
    name:       "Priya Nair",
    role:       "Fat Loss Specialist",
    experience: 6,
    imageUrl:   null as string | null,
    specs:      ["Fat Loss", "Nutrition", "Functional Fitness"],
  },
  {
    slug:       "vikram-tiwari",
    name:       "Vikram Tiwari",
    role:       "Sports Nutritionist",
    experience: 7,
    imageUrl:   null as string | null,
    specs:      ["Diet Plans", "Hormone Health", "Recovery"],
  },
];

type TrainerCardData = {
  slug:       string;
  name:       string;
  role:       string;
  experience: number;
  imageUrl:   string | null;
  specs:      string[];
};

function toCardData(t: SanityTrainer): TrainerCardData {
  return {
    slug:       t.slug,
    name:       t.name,
    role:       t.role,
    experience: t.yearsExperience,
    imageUrl:   t.photo
      ? urlForImage(t.photo).width(600).height(800).fit("crop").auto("format").url()
      : null,
    specs:      t.specialisms,
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default async function Trainers() {
  let trainers: TrainerCardData[] = STATIC_TRAINERS;

  if (isSanityConfigured()) {
    try {
      const sanityDocs = await getAllTrainers();
      if (sanityDocs.length > 0) {
        trainers = sanityDocs.map(toCardData);
      }
    } catch {
      // Sanity fetch failed — static fallback already set above
    }
  }

  return (
    <section id="trainers" className="bg-carbon">
      <div className="max-w-[1320px] mx-auto px-[5vw] py-[7rem]">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-[0.6rem] mb-3">
            <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
            <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
              The Team
            </span>
          </div>
          <h2
            className="font-display leading-none tracking-[0.03em] text-white"
            style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
          >
            MEET YOUR<br />
            <span className="text-dark-gray">COACHES</span>
          </h2>
        </div>

        {/* ── Grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.slug} trainer={trainer} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Trainer card ──────────────────────────────────────────────────────────────

function TrainerCard({ trainer }: { trainer: TrainerCardData }) {
  return (
    <div className="group relative overflow-hidden cursor-pointer">

      {/* ── Image ───────────────────────────────────────────────── */}
      <div
        className="relative w-full bg-charcoal"
        style={{ aspectRatio: "3/4" }}
      >
        {trainer.imageUrl ? (
          <Image
            src={trainer.imageUrl}
            alt={trainer.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top"
          />
        ) : null}
      </div>

      {/* ── Gradient overlay ────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-all duration-[0.4s]"
        style={{
          background:
            "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.3) 55%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(214,40,40,0.08) 0%, transparent 50%)",
        }}
      />

      {/* ── Info ────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 p-[1.8rem_1.8rem_2rem]">
        <p className="font-condensed text-[0.7rem] tracking-[0.2em] uppercase text-red mb-[0.4rem]">
          {trainer.role} · {trainer.experience} Yrs Experience
        </p>
        <h3 className="font-display text-[1.9rem] leading-[1.05] tracking-[0.04em] text-white mb-[0.6rem]">
          {trainer.name.toUpperCase()}
        </h3>

        <div className="flex flex-wrap gap-[0.4rem] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[0.35s]">
          {trainer.specs.map((spec) => (
            <span
              key={spec}
              className="font-condensed text-[0.68rem] tracking-[0.1em] uppercase text-red px-[10px] py-[3px] bg-red/20 border border-red/40"
            >
              {spec}
            </span>
          ))}
        </div>

        <a
          href="/book"
          className="inline-block mt-4 font-condensed text-[0.72rem] tracking-[0.15em] uppercase px-5 py-[10px] bg-red text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[0.35s] delay-[0.05s]"
        >
          Book a Session
        </a>
      </div>
    </div>
  );
}
