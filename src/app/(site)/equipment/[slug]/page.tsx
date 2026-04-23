import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getEquipmentBySlug   as getSanityEquipment,
  getRelatedEquipment  as getSanityRelated,
  getAllEquipmentSlugs,
} from "@/lib/sanity/queries";
import { urlForImage }    from "@/lib/sanity/image";
import { isSanityConfigured } from "@/lib/sanity/client";
import {
  getEquipmentBySlug   as getStaticEquipment,
  getRelatedEquipment  as getStaticRelated,
  getAllSlugs           as getAllStaticSlugs,
  EQUIPMENT_LOCAL_IMAGES,
  type StaticEquipment,
} from "@/lib/equipment-data";
import type { Equipment as SanityEquipment } from "@/lib/sanity/types";

// ── Types ─────────────────────────────────────────────────────────────────────

type PageEquipment = {
  name:         string;
  category:     string;
  description:  string;
  muscleGroups: string[];
  specs:        { label: string; value: string }[];
  benefits:     string[];
  trainingTips: string[];
  seoTitle:     string;
  seoDescription: string;
  keywords:     string[];
  imageUrl:     string | null;
  isSanity:     boolean;
};

type RelatedItem = {
  slug:     string;
  name:     string;
  category: string;
  desc:     string;
  imageUrl: string | null;
};

// ── Data resolution ───────────────────────────────────────────────────────────

async function resolveEquipment(slug: string): Promise<{ eq: PageEquipment; related: RelatedItem[] } | null> {
  // Try Sanity first
  if (isSanityConfigured()) {
    try {
      const [sanityEq, sanityRelated] = await Promise.all([
        getSanityEquipment(slug),
        getSanityRelated(slug, 3),
      ]);

      if (sanityEq) {
        // Merge Sanity data with static enrichment where Sanity fields are thin
        const staticEnrich = getStaticEquipment(slug);
        const imageUrl = sanityEq.image
          ? urlForImage(sanityEq.image).width(1400).height(700).fit("crop").auto("format").url()
          : null;

        return {
          eq: {
            name:           sanityEq.name,
            category:       sanityEq.category,
            description:    sanityEq.description,
            muscleGroups:   sanityEq.muscleGroups,
            specs:          sanityEq.specs ?? staticEnrich?.specs ?? [],
            benefits:       staticEnrich?.benefits ?? [],
            trainingTips:   staticEnrich?.trainingTips ?? [],
            seoTitle:       staticEnrich?.seoTitle ?? `${sanityEq.name} | Spark Fitness Zone, Jamshedpur`,
            seoDescription: staticEnrich?.seoDescription ?? `Train on the ${sanityEq.name} at Spark Fitness Zone, Jamshedpur's premier gym. Book a free trial today.`,
            keywords:       staticEnrich?.keywords ?? ["gym Jamshedpur", "Spark Fitness Zone", sanityEq.name],
            imageUrl,
            isSanity:       true,
          },
          related: sanityRelated.map((r: SanityEquipment) => ({
            slug:     r.slug,
            name:     r.name,
            category: r.category,
            desc:     r.description,
            imageUrl: r.image
              ? urlForImage(r.image).width(600).height(340).fit("crop").auto("format").url()
              : null,
          })),
        };
      }
    } catch {
      // Sanity failed — fall through to static
    }
  }

  // Static fallback
  const staticEq = getStaticEquipment(slug);
  if (!staticEq) return null;

  const staticRelated = getStaticRelated(slug, 3);

  return {
    eq: {
      name:           staticEq.name,
      category:       staticEq.category,
      description:    staticEq.description,
      muscleGroups:   staticEq.muscleGroups,
      specs:          staticEq.specs,
      benefits:       staticEq.benefits,
      trainingTips:   staticEq.trainingTips,
      seoTitle:       staticEq.seoTitle,
      seoDescription: staticEq.seoDescription,
      keywords:       staticEq.keywords,
      imageUrl:       EQUIPMENT_LOCAL_IMAGES[slug] ?? null,
      isSanity:       false,
    },
    related: staticRelated.map((r: StaticEquipment) => ({
      slug:     r.slug,
      name:     r.name,
      category: r.category,
      desc:     r.shortDesc,
      imageUrl: EQUIPMENT_LOCAL_IMAGES[r.slug] ?? null,
    })),
  };
}

// ── Static params — pre-render every slug at build time ───────────────────────

export async function generateStaticParams() {
  const staticSlugs = getAllStaticSlugs().map((s) => ({ slug: s }));

  if (!isSanityConfigured()) return staticSlugs;

  try {
    const sanitySlugs = await getAllEquipmentSlugs();
    const combined = [
      ...staticSlugs,
      ...sanitySlugs.map(({ slug }) => ({ slug })),
    ];
    // De-duplicate
    return [...new Map(combined.map((s) => [s.slug, s])).values()];
  } catch {
    return staticSlugs;
  }
}

// ── SEO Metadata ──────────────────────────────────────────────────────────────

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result   = await resolveEquipment(slug);
  if (!result) return {};

  const { eq } = result;

  return {
    title:       eq.seoTitle,
    description: eq.seoDescription,
    keywords:    eq.keywords.join(", "),
    openGraph: {
      title:       eq.seoTitle,
      description: eq.seoDescription,
      type:        "website",
      locale:      "en_IN",
      ...(eq.imageUrl && {
        images: [{ url: eq.imageUrl, width: 1200, height: 630, alt: eq.name }],
      }),
    },
    twitter: {
      card:        "summary_large_image",
      title:       eq.seoTitle,
      description: eq.seoDescription,
      ...(eq.imageUrl && { images: [eq.imageUrl] }),
    },
    alternates: { canonical: `/equipment/${slug}` },
  };
}

// ── JSON-LD helper ────────────────────────────────────────────────────────────

function safeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function EquipmentPage({ params }: Props) {
  const { slug } = await params;
  const result   = await resolveEquipment(slug);
  if (!result) notFound();

  const { eq, related } = result;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type":    "Product",
    name:        eq.name,
    description: eq.description,
    category:    eq.category,
    brand: { "@type": "Organization", name: "Spark Fitness Zone" },
    offers: {
      "@type":      "Offer",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "LocalBusiness",
        name:    "Spark Fitness Zone",
        url:     "https://sparkfitnesszone.in",
        address: {
          "@type":         "PostalAddress",
          streetAddress:   "2nd & 3rd Floor, IOCL Petrol Pump, Shalimar Plaza, above Apna Mart, N.H. Colony, Chepapul, Mango",
          addressLocality: "Jamshedpur",
          addressRegion:   "Jharkhand",
          postalCode:      "832110",
          addressCountry:  "IN",
        },
        openingHours: "Mo-Su 05:00-23:00",
        telephone:    "+91",
        geo: {
          "@type":    "GeoCoordinates",
          latitude:   22.814,
          longitude:  86.223,
        },
      },
    },
    keywords: eq.keywords.join(", "),
  };

  const categoryLabel = eq.category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative bg-black overflow-hidden min-h-[55vh] flex items-end">

        {/* Background: real image (Sanity) or rich dark placeholder */}
        {eq.imageUrl ? (
          <Image
            src={eq.imageUrl}
            alt={eq.name}
            fill priority
            sizes="100vw"
            className="object-contain object-center px-8"
          />
        ) : (
          <>
            {/* Ghost category text */}
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0 flex items-center justify-end pr-[5vw] font-display leading-none"
              style={{
                fontSize: "22vw",
                color: "rgba(255,255,255,0.025)",
                whiteSpace: "nowrap",
              }}
            >
              {categoryLabel}
            </span>
            {/* Subtle red beam accent */}
            <div
              aria-hidden="true"
              className="absolute right-[22%] top-0 w-[2px] h-full opacity-20"
              style={{ background: "linear-gradient(to bottom, transparent, var(--red), transparent)" }}
            />
          </>
        )}

        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.55) 55%, rgba(8,8,8,0.18) 100%)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(8,8,8,0.85) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-[5vw] pb-16 pt-24">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6">
            <Link href="/" className="font-condensed text-[0.7rem] tracking-[0.15em] uppercase text-gray hover:text-white transition-colors duration-150">
              Home
            </Link>
            <span className="text-dark-gray" aria-hidden="true">/</span>
            <Link href="/#equipment" className="font-condensed text-[0.7rem] tracking-[0.15em] uppercase text-gray hover:text-white transition-colors duration-150">
              Equipment
            </Link>
            <span className="text-dark-gray" aria-hidden="true">/</span>
            <span className="font-condensed text-[0.7rem] tracking-[0.15em] uppercase text-white">
              {eq.name}
            </span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-condensed text-[0.65rem] tracking-[0.2em] uppercase text-red px-[10px] py-[4px] border border-red/40 bg-red/10">
              {categoryLabel}
            </span>
            {eq.muscleGroups.map((m) => (
              <span key={m} className="font-condensed text-[0.62rem] tracking-[0.12em] uppercase text-gray px-[8px] py-[4px] border border-dark-gray">
                {m}
              </span>
            ))}
          </div>

          {/* Machine name */}
          <h1
            className="font-display text-white leading-none tracking-[0.02em]"
            style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
          >
            {eq.name.toUpperCase()}
          </h1>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
      <section className="bg-charcoal">
        <div className="max-w-[1320px] mx-auto px-[5vw] py-[5rem]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">

            {/* ── Left column ─────────────────────────────────────── */}
            <div>

              {/* About */}
              <div className="mb-12">
                <div className="flex items-center gap-[0.6rem] mb-4">
                  <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
                  <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                    About This Machine
                  </span>
                </div>
                {/* Split description into paragraphs on double space */}
                {eq.description.split(/\n|(?<=\. )(?=[A-Z])(?=[^a-z])/).reduce<string[]>((acc, sentence) => {
                  const last = acc[acc.length - 1];
                  if (!last || last.split(" ").length > 60) {
                    acc.push(sentence);
                  } else {
                    acc[acc.length - 1] = last + " " + sentence;
                  }
                  return acc;
                }, []).map((para, i) => (
                  <p key={i} className={`font-body text-[1rem] font-light leading-[1.85] text-offwhite ${i > 0 ? "mt-4" : ""}`}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Benefits */}
              {eq.benefits.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-[0.6rem] mb-5">
                    <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
                    <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                      Key Benefits
                    </span>
                  </div>
                  <ul className="space-y-0">
                    {eq.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 font-body text-[0.92rem] font-light text-offwhite py-[0.5rem] border-b border-white/[0.04]"
                      >
                        <span aria-hidden="true" className="text-red text-[0.8rem] mt-[2px] shrink-0">→</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Training tips */}
              {eq.trainingTips.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-[0.6rem] mb-5">
                    <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
                    <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                      Training Tips
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-dark-gray">
                    {eq.trainingTips.map((tip, i) => (
                      <div key={i} className="bg-carbon p-5">
                        <span className="font-display text-[2rem] text-red/20 leading-none block mb-2">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="font-body text-[0.85rem] font-light text-offwhite leading-[1.7]">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Target muscles */}
              <div>
                <div className="flex items-center gap-[0.6rem] mb-4">
                  <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
                  <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                    Target Muscle Groups
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {eq.muscleGroups.map((m) => (
                    <span
                      key={m}
                      className="font-condensed text-[0.78rem] tracking-[0.1em] uppercase text-white px-4 py-2 border border-dark-gray bg-carbon"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right column ────────────────────────────────────── */}
            <div className="lg:sticky lg:top-[100px] flex flex-col gap-6">

              {/* Specs */}
              <div>
                <div className="flex items-center gap-[0.6rem] mb-4">
                  <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
                  <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                    Specifications
                  </span>
                </div>
                <div className="border border-dark-gray divide-y divide-dark-gray">
                  {eq.specs.map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-4 px-4 py-3">
                      <span className="font-condensed text-[0.7rem] tracking-[0.1em] uppercase text-gray shrink-0">
                        {label}
                      </span>
                      <span className="font-condensed text-[0.78rem] tracking-[0.06em] text-white text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA box */}
              <div className="border border-dark-gray p-6 bg-carbon">
                <p className="font-condensed text-[0.68rem] tracking-[0.2em] uppercase text-red mb-2">
                  Ready to Train?
                </p>
                <h3 className="font-display text-white text-[1.8rem] leading-none tracking-[0.03em] mb-3">
                  TRY IT FREE
                </h3>
                <p className="font-body text-[0.85rem] font-light text-offwhite leading-[1.7] mb-5">
                  Get full access to the {eq.name} and every machine across all 5 training zones.
                  Book a free introductory session — no payment, no obligation.
                </p>
                <Link
                  href="/book"
                  className={[
                    "w-full flex items-center justify-center gap-3",
                    "font-condensed text-[0.82rem] tracking-[0.15em] uppercase",
                    "py-4 bg-red text-white hover:bg-red-hot transition-colors duration-200",
                  ].join(" ")}
                >
                  Book Free Trial
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <span className="font-condensed text-[0.6rem] tracking-[0.1em] uppercase text-gray">No credit card</span>
                  <span aria-hidden="true" className="w-px h-3 bg-dark-gray" />
                  <span className="font-condensed text-[0.6rem] tracking-[0.1em] uppercase text-gray">No commitment</span>
                  <span aria-hidden="true" className="w-px h-3 bg-dark-gray" />
                  <span className="font-condensed text-[0.6rem] tracking-[0.1em] uppercase text-gray">All zones included</span>
                </div>
              </div>

              {/* Gym info */}
              <div className="border border-dark-gray p-5 bg-black/40">
                <p className="font-condensed text-[0.68rem] tracking-[0.15em] uppercase text-gray mb-3">Location</p>
                <p className="font-body text-[0.82rem] font-light text-offwhite leading-[1.7] mb-3">
                  2nd &amp; 3rd Floor, Shalimar Plaza,<br />
                  Chepapul, Mango, Jamshedpur — 832110
                </p>
                <p className="font-condensed text-[0.75rem] tracking-[0.08em] text-red">
                  Open Every Day · 5:00 AM – 11:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-red py-16 px-[5vw]">
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-display"
          style={{ fontSize: "20vw", color: "rgba(255,255,255,0.05)", whiteSpace: "nowrap", lineHeight: 1 }}
        >
          TRAIN
        </span>
        <div className="relative z-10 max-w-[1320px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="font-condensed text-[0.7rem] tracking-[0.25em] uppercase text-white/60 mb-2">
              Spark Fitness Zone · Jamshedpur
            </p>
            <h2
              className="font-display text-white leading-[0.95] tracking-[0.03em]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              TRAIN ON THIS<br />MACHINE TODAY
            </h2>
          </div>
          <Link
            href="/book"
            className="shrink-0 inline-flex items-center gap-3 font-condensed text-[0.85rem] tracking-[0.18em] uppercase px-9 py-4 bg-white text-red hover:bg-black hover:text-white transition-all duration-200"
          >
            Book a Free Trial
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── RELATED EQUIPMENT ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-black">
          <div className="max-w-[1320px] mx-auto px-[5vw] py-[5rem]">
            <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
              <div>
                <div className="flex items-center gap-[0.6rem] mb-3">
                  <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
                  <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                    Explore More
                  </span>
                </div>
                <h2
                  className="font-display text-white leading-none tracking-[0.03em]"
                  style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
                >
                  MORE<br />
                  <span className="text-dark-gray">EQUIPMENT</span>
                </h2>
              </div>
              <Link
                href="/#equipment"
                className="font-condensed text-[0.75rem] tracking-[0.18em] uppercase text-red hover:text-white transition-colors duration-200 flex items-center gap-2 shrink-0"
              >
                View All
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-dark-gray">
              {related.map((item) => (
                <div
                  key={item.slug}
                  className="relative overflow-hidden bg-[#0e0e0e]"
                  style={{ aspectRatio: "9/16" }}
                >
                  <Link
                    href={`/equipment/${item.slug}`}
                    className="group absolute inset-0"
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-[4rem] leading-none text-white/[0.04]">
                          {item.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.7) 32%, rgba(8,8,8,0.15) 60%, transparent 100%)",
                      }}
                    />
                    <span className="absolute top-4 left-4 font-condensed text-[0.6rem] tracking-[0.18em] uppercase text-red bg-black/70 px-[10px] py-[5px] backdrop-blur-sm">
                      {item.category.replace("-", " ")}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-condensed text-[1.05rem] font-bold tracking-[0.06em] uppercase text-white mb-1 group-hover:text-red transition-colors duration-200">
                        {item.name}
                      </h3>
                      <p className="font-body text-[0.78rem] font-light text-gray/90 line-clamp-2 leading-[1.55] mb-3">
                        {item.desc}
                      </p>
                      <div className="flex items-center gap-2 font-condensed text-[0.68rem] tracking-[0.15em] uppercase text-red opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        View Details
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
