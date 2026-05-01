"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SlideData = {
  _id: string;
  eyebrow: string;
  head1: string;
  head2: string;
  body: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

// ── Fallback slide data (used when no CMS content exists yet) ─────────────────

const FALLBACK_SLIDES: SlideData[] = [
  {
    _id:      "equipment",
    eyebrow:  "Premium Equipment",
    head1:    "30+ Commercial-Grade",
    head2:    "Machines",
    body:     "Not the cheap stuff. Every machine is commercial-grade, maintained weekly — the same brands that equip professional sports facilities.",
    bullets:  [
      "Life Fitness, Impulse & Technogym machines",
      "Weekly maintenance — always in perfect condition",
      "Enough stations for peak hours — zero waiting",
    ],
    image:    "/assets/gym_interior_1.jpeg",
    imageAlt: "Premium gym equipment at Spark Fitness Zone",
  },
  {
    _id:      "coaching",
    eyebrow:  "Expert Coaching",
    head1:    "Trainers Who",
    head2:    "Deliver Results",
    body:     "Our coaches run diagnostics — body composition, custom programming, nutrition. Not just attendants watching you lift.",
    bullets:  [
      "Certified strength & conditioning coaches",
      "Monthly progress reviews & body composition checks",
      "Hormone panel consultations available",
    ],
    image:    "/assets/bodybuilding_2.jpg",
    imageAlt: "Expert coaching at Spark Fitness Zone",
  },
  {
    _id:      "results",
    eyebrow:  "Full-Spectrum Results",
    head1:    "Fat Loss. Strength.",
    head2:    "Hormone Health.",
    body:     "We treat your body as a system — diet planning, hormone consultations, and body composition analysis come with your membership.",
    bullets:  [
      "Custom diet plans with every membership",
      "Body composition analysis every month",
      "Dedicated trainer assignment on annual plan",
    ],
    image:    "/assets/fatloss_1.jpg",
    imageAlt: "Body transformation results at Spark Fitness Zone",
  },
  {
    _id:      "access",
    eyebrow:  "No Compromises",
    head1:    "Open Every Day,",
    head2:    "5 AM to 11 PM",
    body:     "Shift worker. Early riser. Night owl. We're open 365 days a year so your schedule is never the excuse.",
    bullets:  [
      "Every day of the year — zero holidays",
      "AC facility with locker & shower access",
      "Jamshedpur's most complete strength floor",
    ],
    image:    "/assets/gym_2.JPG",
    imageAlt: "Spark Fitness Zone — always open",
  },
];

const INTERVAL_MS = 5500;

// ── Text animation variants ───────────────────────────────────────────────────

const textVariants = {
  enter:  (d: number) => ({
    x: d > 0 ? 52 : -52,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: (d: number) => ({
    x: d > 0 ? -36 : 36,
    opacity: 0,
    transition: { duration: 0.28 },
  }),
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function WhyUsSliderClient({ slides }: { slides: SlideData[] }) {
  const data = slides.length > 0 ? slides : FALLBACK_SLIDES;

  const [active, setActive] = useState(0);
  const [dir,    setDir]    = useState(1);
  const [paused, setPaused] = useState(false);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDir(1);
      setActive((a) => (a + 1) % data.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, data.length]);

  function go(to: number) {
    setDir(to > active ? 1 : -1);
    setActive(to);
  }

  const slide = data[active]!;

  return (
    <section
      id="why-us"
      className="bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1320px] mx-auto px-[5vw] py-[7rem]">

        {/* ── Section eyebrow ──────────────────────────────────── */}
        <div className="flex items-center gap-[0.6rem] mb-10">
          <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
          <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
            Why Spark Costs More
          </span>
        </div>

        {/* ── Main slide area ──────────────────────────────────── */}
        <div className="flex flex-col lg:grid lg:grid-cols-2">

          {/* ── Image panel (top on mobile, right on desktop) ─── */}
          <div className="relative h-[280px] lg:h-auto lg:min-h-[580px] overflow-hidden order-1 lg:order-2">

            {/* Auto-play progress bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] bg-white/[0.06] z-10"
              aria-hidden="true"
            >
              <motion.div
                key={`bar-${active}`}
                className="h-full bg-red"
                style={{ originX: 0 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
              />
            </div>

            {/* Crossfading image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide._id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.48 }}
              >
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={active === 0}
                />

                {/* Desktop: left-edge gradient so image blends into text panel */}
                <div
                  className="absolute inset-0 hidden lg:block pointer-events-none"
                  style={{ background: "linear-gradient(to right, #080808 0%, transparent 26%)" }}
                  aria-hidden="true"
                />

                {/* Mobile: bottom gradient softens the cut between image and text */}
                <div
                  className="absolute inset-x-0 bottom-0 h-20 lg:hidden pointer-events-none"
                  style={{ background: "linear-gradient(to top, #080808, transparent)" }}
                  aria-hidden="true"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Text panel (bottom on mobile, left on desktop) ── */}
          <div className="flex flex-col justify-center pt-10 lg:pt-0 lg:pr-16 order-2 lg:order-1">

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={slide._id}
                custom={dir}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Slide number watermark + eyebrow */}
                <div className="flex items-center gap-5 mb-5">
                  <span
                    className="font-display leading-none select-none"
                    style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", color: "rgba(255,255,255,0.04)" }}
                    aria-hidden="true"
                  >
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="font-condensed text-[0.65rem] tracking-[0.24em] uppercase text-red">
                    {slide.eyebrow}
                  </span>
                </div>

                {/* Headline */}
                <h2
                  className="font-display leading-none tracking-[0.02em] text-white mb-5"
                  style={{ fontSize: "clamp(2.4rem, 4vw, 4rem)" }}
                >
                  {slide.head1.toUpperCase()}<br />
                  <span className="text-red">{slide.head2.toUpperCase()}</span>
                </h2>

                {/* Body copy */}
                <p className="font-body text-[0.95rem] font-light leading-[1.75] text-offwhite/75 mb-7 max-w-[440px]">
                  {slide.body}
                </p>

                {/* Bullet points */}
                <ul className="space-y-[10px]">
                  {slide.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 font-body text-[0.875rem] font-light text-offwhite">
                      <span className="text-red text-[0.72rem] mt-[4px] shrink-0" aria-hidden="true">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* ── Controls ─────────────────────────────────────── */}
            <div className="flex items-center gap-3 mt-10">

              {/* Prev */}
              <button
                onClick={() => go((active - 1 + data.length) % data.length)}
                aria-label="Previous slide"
                className="w-10 h-10 border border-dark-gray flex items-center justify-center text-gray hover:border-red hover:text-white transition-colors duration-200 cursor-pointer shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next */}
              <button
                onClick={() => go((active + 1) % data.length)}
                aria-label="Next slide"
                className="w-10 h-10 border border-dark-gray flex items-center justify-center text-gray hover:border-red hover:text-white transition-colors duration-200 cursor-pointer shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="flex items-center gap-[6px] ml-1" role="tablist" aria-label="Slides">
                {data.map((s, i) => (
                  <button
                    key={s._id}
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                    onClick={() => go(i)}
                    className={[
                      "transition-all duration-300 cursor-pointer",
                      i === active
                        ? "w-7 h-[2px] bg-red"
                        : "w-[6px] h-[6px] rounded-full bg-dark-gray hover:bg-gray",
                    ].join(" ")}
                  />
                ))}
              </div>

              {/* Counter */}
              <span className="font-condensed text-[0.62rem] tracking-[0.12em] text-gray ml-auto tabular-nums">
                {String(active + 1).padStart(2, "0")} / {String(data.length).padStart(2, "0")}
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
