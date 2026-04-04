import { getAllEquipment } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { isSanityConfigured } from "@/lib/sanity/client";
import EquipmentGrid, { type EquipmentCardData } from "@/components/ui/EquipmentGrid";

// ── Static fallback (shown when Sanity has no equipment docs yet) ──────────────

const STATIC_EQUIPMENT: EquipmentCardData[] = [
  {
    slug:     "smith-machine",
    name:     "Smith Machine",
    category: "strength",
    desc:     "A guided barbell system with counterbalanced movement, ideal for squats, bench press, and shoulder press with added stability and safety.",
    muscles:  ["Chest", "Quads", "Shoulders"],
    imageUrl: null,
  },
  {
    slug:     "cable-crossover",
    name:     "Cable Crossover",
    category: "strength",
    desc:     "A dual pulley system with adjustable height — highly versatile for chest flyes, rows, curls, and tricep pushdowns across 180-degree angles.",
    muscles:  ["Chest", "Back", "Arms"],
    imageUrl: null,
  },
  {
    slug:     "technogym-treadmill",
    name:     "Technogym Treadmill",
    category: "cardio",
    desc:     "Commercial-grade treadmills with incline up to 15%, speed up to 22km/h, and integrated heart rate monitoring for precise cardio training.",
    muscles:  ["Full Body", "Cardiovascular"],
    imageUrl: null,
  },
  {
    slug:     "leg-press-machine",
    name:     "Leg Press Machine",
    category: "strength",
    desc:     "45-degree sled leg press with a 400kg capacity. Ideal for quad-dominant lower body development with reduced spinal compression versus squats.",
    muscles:  ["Quads", "Hamstrings", "Glutes"],
    imageUrl: null,
  },
  {
    slug:     "assault-bike",
    name:     "Assault Bike",
    category: "functional",
    desc:     "Full-body air resistance bike. The harder you push, the more resistance is generated — delivering one of the most intense conditioning sessions possible.",
    muscles:  ["Full Body", "Conditioning"],
    imageUrl: null,
  },
  {
    slug:     "dumbbells-2-50kg",
    name:     "Dumbbells 2–50kg",
    category: "free-weights",
    desc:     "A complete rubber hex dumbbell rack from 2kg to 50kg with a rubberised floor zone, mirrors, and benches for every angle of free weight training.",
    muscles:  ["All Muscle Groups"],
    imageUrl: null,
  },
  {
    slug:     "rowing-machine",
    name:     "Rowing Machine",
    category: "cardio",
    desc:     "Concept2 RowErg air rower — the global standard for rowing performance. Tracks split time, watts, and stroke rate for data-driven cardio.",
    muscles:  ["Back", "Arms", "Legs"],
    imageUrl: null,
  },
  {
    slug:     "t-bar-row",
    name:     "T-Bar Row",
    category: "strength",
    desc:     "A landmine-mounted T-bar row station for building back thickness. Supports heavy bilateral and unilateral loading for advanced back development.",
    muscles:  ["Lats", "Rhomboids", "Biceps"],
    imageUrl: null,
  },
  {
    slug:     "battle-ropes-sled",
    name:     "Battle Ropes & Sled",
    category: "functional",
    desc:     "A dedicated functional training turf with heavy battle ropes, a push/pull sled, resistance bands, and plyometric boxes for HIIT and athletic training.",
    muscles:  ["Full Body", "Power", "Endurance"],
    imageUrl: null,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default async function Equipment() {
  // Use Sanity when configured, otherwise show static fallback
  let items: EquipmentCardData[] = STATIC_EQUIPMENT;
  if (isSanityConfigured()) {
    try {
      const sanityDocs = await getAllEquipment();
      if (sanityDocs.length > 0) {
        items = sanityDocs.map((doc) => ({
          slug:     doc.slug,
          name:     doc.name,
          category: doc.category,
          desc:     doc.description,
          muscles:  doc.muscleGroups,
          imageUrl: doc.image
            ? urlForImage(doc.image).width(800).height(450).fit("crop").auto("format").url()
            : null,
        }));
      }
    } catch {
      // Sanity fetch failed — static fallback already set above
    }
  }

  return (
    <section id="equipment" className="bg-black">
      <div className="max-w-[1320px] mx-auto px-[5vw] py-[7rem]">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-[0.6rem] mb-3">
            <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
            <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
              The Facility
            </span>
          </div>
          <h2
            className="font-display leading-none tracking-[0.03em] text-white mb-3"
            style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
          >
            WORLD-CLASS<br />
            <span className="text-dark-gray">EQUIPMENT</span>
          </h2>
          <p className="font-body text-[1rem] font-light leading-[1.75] text-offwhite max-w-[520px]">
            50+ premium machines across 5 dedicated training zones — serviced weekly and updated regularly.
          </p>
        </div>

        <EquipmentGrid items={items} />

      </div>
    </section>
  );
}
