import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getEquipmentBySlug,
  getAllEquipmentSlugs,
  getRelatedEquipment,
} from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { isSanityConfigured } from "@/lib/sanity/client";
import type { Equipment } from "@/lib/sanity/types";

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const slugs = await getAllEquipmentSlugs();
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    // Sanity not yet configured — no static pages at build time
    return [];
  }
}

// ── SEO Metadata ──────────────────────────────────────────────────────────────

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isSanityConfigured()) return {};
  const { slug } = await params;
  const eq = await getEquipmentBySlug(slug);
  if (!eq) return {};

  const title       = `${eq.name} | Spark Fitness Zone, Jamshedpur`;
  const description = `Train on the ${eq.name} at Spark Fitness Zone — Jamshedpur's premier gym. ${eq.description.slice(0, 120)}… Book a free trial today.`;
  const keywords    = [
    eq.name,
    ...eq.muscleGroups,
    eq.category.replace("-", " "),
    "gym Jamshedpur",
    "fitness centre Jamshedpur",
    "Spark Fitness Zone",
    "weight training Jamshedpur",
  ].join(", ");

  const ogImage = eq.image
    ? urlForImage(eq.image).width(1200).height(630).fit("crop").auto("format").url()
    : undefined;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type:   "website",
      locale: "en_IN",
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: eq.name }] }),
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    alternates: {
      canonical: `/equipment/${slug}`,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function EquipmentPage({ params }: Props) {
  const { slug } = await params;

  if (!isSanityConfigured()) notFound();

  const [eq, related] = await Promise.all([
    getEquipmentBySlug(slug),
    getRelatedEquipment(slug, 3),
  ]);

  if (!eq) notFound();

  const heroImageUrl = eq.image
    ? urlForImage(eq.image).width(1400).height(700).fit("crop").auto("format").url()
    : null;

  // Escape < > & so the JSON string cannot break out of a <script> tag
  function safeJsonLd(data: object): string {
    return JSON.stringify(data)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026");
  }

  // JSON-LD structured data
  const jsonLd = {
    "@context":   "https://schema.org",
    "@type":      "Product",
    name:         eq.name,
    description:  eq.description,
    category:     eq.category,
    brand: {
      "@type": "Organization",
      name:    "Spark Fitness Zone",
    },
    offers: {
      "@type":        "Offer",
      availability:   "https://schema.org/InStock",
      seller: {
        "@type": "LocalBusiness",
        name:    "Spark Fitness Zone",
        address: {
          "@type":           "PostalAddress",
          streetAddress:     "2nd & 3rd Floor, IOCL Petrol Pump, Shalimar Plaza, above Apna Mart, N.H. Colony, Chepapul, Mango",
          addressLocality:   "Jamshedpur",
          addressRegion:     "Jharkhand",
          postalCode:        "832110",
          addressCountry:    "IN",
        },
      },
    },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <main>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative bg-black overflow-hidden min-h-[60vh] flex items-end">

          {/* Background image */}
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={eq.name}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 bg-charcoal" />
          )}

          {/* Gradients */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.6) 50%, rgba(8,8,8,0.2) 100%)" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(105deg, rgba(8,8,8,0.8) 0%, transparent 60%)" }}
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

            {/* Category + muscles */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="font-condensed text-[0.65rem] tracking-[0.2em] uppercase text-red px-[10px] py-[4px] border border-red/40 bg-red/10">
                {eq.category.replace("-", " ")}
              </span>
              {eq.muscleGroups.map((m) => (
                <span key={m} className="font-condensed text-[0.62rem] tracking-[0.12em] uppercase text-gray px-[8px] py-[4px] border border-dark-gray">
                  {m}
                </span>
              ))}
            </div>

            {/* Name */}
            <h1
              className="font-display text-white leading-none tracking-[0.02em]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
            >
              {eq.name.toUpperCase()}
            </h1>
          </div>
        </section>

        {/* ── DETAILS ────────────────────────────────────────────────── */}
        <section className="bg-charcoal">
          <div className="max-w-[1320px] mx-auto px-[5vw] py-[5rem]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">

              {/* Left — description */}
              <div>
                <div className="flex items-center gap-[0.6rem] mb-4">
                  <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
                  <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                    About This Machine
                  </span>
                </div>
                <p className="font-body text-[1rem] font-light leading-[1.85] text-offwhite mb-6">
                  {eq.description}
                </p>
                <p className="font-body text-[0.9rem] font-light leading-[1.8] text-gray">
                  Available at Spark Fitness Zone, {eq.name} is maintained to the highest standard and serviced weekly.
                  All machines are available to members across all plans — no additional booking required.
                </p>

                {/* Target muscles */}
                <div className="mt-8">
                  <h2 className="font-condensed text-[0.72rem] tracking-[0.22em] uppercase text-white mb-4">
                    Target Muscle Groups
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {eq.muscleGroups.map((m) => (
                      <span
                        key={m}
                        className="font-condensed text-[0.75rem] tracking-[0.1em] uppercase text-white px-4 py-2 border border-dark-gray bg-carbon"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — specs */}
              <div>
                <div className="flex items-center gap-[0.6rem] mb-4">
                  <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
                  <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                    Specifications
                  </span>
                </div>

                {eq.specs && eq.specs.length > 0 ? (
                  <div className="border border-dark-gray divide-y divide-dark-gray">
                    {eq.specs.map((spec) => (
                      <div key={spec._key} className="flex items-start justify-between gap-4 px-4 py-3">
                        <span className="font-condensed text-[0.72rem] tracking-[0.1em] uppercase text-gray shrink-0">
                          {spec.label}
                        </span>
                        <span className="font-condensed text-[0.8rem] tracking-[0.06em] text-white text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Generic specs when none in Sanity */
                  <div className="border border-dark-gray divide-y divide-dark-gray">
                    {[
                      { label: "Category",   value: eq.category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()) },
                      { label: "Condition",  value: "Commercial Grade" },
                      { label: "Servicing",  value: "Weekly" },
                      { label: "Zones",      value: "5 Dedicated Training Zones" },
                      { label: "Access",     value: "All Membership Plans" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-start justify-between gap-4 px-4 py-3">
                        <span className="font-condensed text-[0.72rem] tracking-[0.1em] uppercase text-gray shrink-0">
                          {label}
                        </span>
                        <span className="font-condensed text-[0.8rem] tracking-[0.06em] text-white text-right">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA box */}
                <div className="mt-6 border border-dark-gray p-6 bg-carbon">
                  <p className="font-condensed text-[0.7rem] tracking-[0.18em] uppercase text-red mb-2">
                    Ready to Train?
                  </p>
                  <p className="font-body text-[0.85rem] font-light text-offwhite leading-[1.7] mb-5">
                    Get access to the {eq.name} and every other machine in our facility. Book a free trial session — no commitment required.
                  </p>
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-3 font-condensed text-[0.78rem] tracking-[0.15em] uppercase px-6 py-3 bg-red text-white hover:bg-red-hot transition-colors duration-200"
                  >
                    Book Free Trial
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOOK A TRIAL STRIP ─────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-red py-16 px-[5vw]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center font-display select-none"
            style={{ fontSize: "22vw", color: "rgba(255,255,255,0.05)", whiteSpace: "nowrap", lineHeight: 1 }}
          >
            TRAIN
          </span>
          <div className="relative z-10 max-w-[1320px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <p className="font-condensed text-[0.72rem] tracking-[0.25em] uppercase text-white/70 mb-2">
                Spark Fitness Zone · Jamshedpur
              </p>
              <h2
                className="font-display text-white leading-[0.95] tracking-[0.03em]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
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

        {/* ── LOCATION ───────────────────────────────────────────────── */}
        <section className="bg-carbon">
          <div className="max-w-[1320px] mx-auto px-[5vw] pt-16 pb-0">
            <div className="flex items-center gap-[0.6rem] mb-3">
              <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
              <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                Find Us
              </span>
            </div>
            <h2
              className="font-display text-white leading-none tracking-[0.03em] mb-10"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
            >
              VISIT THE GYM
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row">
            {/* Map */}
            <div className="w-full lg:flex-[2] h-[300px] lg:h-[400px]">
              <iframe
                src="https://maps.google.com/maps?q=IOCL+Petrol+Pump+Shalimar+Plaza+Chepapul+Mango+Jamshedpur+Jharkhand+832110&output=embed&z=17"
                title="Spark Fitness Zone location"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {/* Info */}
            <div className="w-full lg:flex-[1] flex flex-col justify-center gap-6 px-[5vw] lg:px-12 py-10 bg-charcoal border-t lg:border-t-0 lg:border-l border-dark-gray">
              <div>
                <p className="font-condensed text-[0.65rem] tracking-[0.2em] uppercase text-gray mb-1">Address</p>
                <p className="font-body text-[0.88rem] font-light text-offwhite leading-[1.75]">
                  2nd & 3rd Floor, IOCL Petrol Pump, Shalimar Plaza, above Apna Mart,
                  N.H. Colony, Chepapul, Mango, Jamshedpur — 832110
                </p>
              </div>
              <div>
                <p className="font-condensed text-[0.65rem] tracking-[0.2em] uppercase text-gray mb-1">Hours</p>
                <p className="font-body text-[0.88rem] font-light text-offwhite">
                  Open Every Day — 5:00 AM to 11:00 PM
                </p>
              </div>
              <a
                href="https://share.google/rvpHgGX6CVHHtQ3AE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 w-fit font-condensed text-[0.78rem] tracking-[0.15em] uppercase px-6 py-[11px] bg-red text-white hover:bg-red-hot hover:-translate-y-px transition-[background,transform] duration-200"
              >
                Get Directions
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── MORE EQUIPMENT ─────────────────────────────────────────── */}
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
                {related.map((rel) => (
                  <RelatedCard key={rel.slug} equipment={rel} />
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
    </>
  );
}

// ── Related card ──────────────────────────────────────────────────────────────

function RelatedCard({ equipment: eq }: { equipment: Equipment }) {
  const imgUrl = eq.image
    ? urlForImage(eq.image).width(600).height(340).fit("crop").auto("format").url()
    : null;

  return (
    <Link
      href={`/equipment/${eq.slug}`}
      className="group block bg-charcoal hover:bg-[#1c1c1c] transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-[#181818]" style={{ aspectRatio: "16/9" }}>
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={eq.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[4rem] text-white/[0.04]">{eq.name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
        <span className="absolute top-3 left-3 font-condensed text-[0.6rem] tracking-[0.18em] uppercase text-red bg-black/70 px-[10px] py-[4px]">
          {eq.category.replace("-", " ")}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-condensed text-[1rem] font-bold tracking-[0.06em] uppercase text-white mb-1 group-hover:text-red transition-colors duration-200">
          {eq.name}
        </h3>
        <p className="font-body text-[0.8rem] font-light text-gray line-clamp-2 leading-[1.6]">
          {eq.description}
        </p>
        <div className="flex items-center gap-2 mt-3 font-condensed text-[0.68rem] tracking-[0.15em] uppercase text-red opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View Details
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
