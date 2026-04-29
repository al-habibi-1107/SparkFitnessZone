import { isSanityConfigured } from "@/lib/sanity/client";
import { getAllServices } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import ServicesClient, { type ServiceCardData } from "./ServicesClient";

// ── Static fallback ───────────────────────────────────────────────────────────

const STATIC_SERVICES: ServiceCardData[] = [
  {
    num:      "01",
    imageUrl: "/assets/fatloss_1.jpg",
    name:     "FAT LOSS\nPROGRAMME",
    desc:     "A results-first approach combining metabolic conditioning, personalised caloric targets, and weekly check-ins. Designed for sustainable, visible fat loss — not crash diets.",
  },
  {
    num:      "02",
    imageUrl: "/assets/bodybuilding_2.jpg",
    name:     "BODY-\nBUILDING",
    desc:     "Periodised strength and hypertrophy programming built around your schedule and recovery capacity. Compete, or just look the part — we train both.",
  },
  {
    num:      "03",
    imageUrl: "/assets/hormone_1.jpg",
    name:     "HORMONE\nTHERAPY",
    desc:     "Supervised hormone optimisation for performance and wellness. Conducted by certified practitioners with ongoing blood work and monitoring protocols.",
  },
  {
    num:      "04",
    imageUrl: "/assets/diet_1.jpg",
    name:     "CUSTOM\nDIET PLANS",
    desc:     "Macro-calibrated, lifestyle-compatible meal plans crafted by our in-house nutritionist. Updated fortnightly based on your progress and biofeedback.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default async function Services() {
  let services: ServiceCardData[] = STATIC_SERVICES;

  if (isSanityConfigured()) {
    try {
      const docs = await getAllServices();
      if (docs.length > 0) {
        services = docs.map((doc, i) => ({
          num:      String(i + 1).padStart(2, "0"),
          imageUrl: doc.image
            ? urlForImage(doc.image).width(800).height(450).fit("crop").auto("format").url()
            : (STATIC_SERVICES[i]?.imageUrl ?? "/assets/fatloss_1.jpg"),
          name:     doc.name.toUpperCase(),
          desc:     doc.description,
        }));
      }
    } catch {
      // fall through to static default
    }
  }

  return <ServicesClient services={services} />;
}
