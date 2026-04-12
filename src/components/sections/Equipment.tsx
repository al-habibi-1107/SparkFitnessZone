import { getAllEquipment } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { isSanityConfigured } from "@/lib/sanity/client";
import { STATIC_EQUIPMENT } from "@/lib/equipment-data";
import EquipmentGrid, { type EquipmentCardData } from "@/components/ui/EquipmentGrid";

// ── Component ─────────────────────────────────────────────────────────────────

export default async function Equipment() {
  // Use Sanity when configured, otherwise map from the shared static data file
  let items: EquipmentCardData[] = STATIC_EQUIPMENT.map((e) => ({
    slug:     e.slug,
    name:     e.name,
    category: e.category,
    desc:     e.shortDesc,
    muscles:  e.muscleGroups,
    imageUrl: null,
  }));
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
