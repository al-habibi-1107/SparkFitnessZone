"use client";

import { motion } from "framer-motion";

// ── Data ─────────────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    quote:
      "I'd tried three gyms in Jamshedpur before this. Nothing came close. The trainers actually care about your progress, not just showing up.",
    name: "Rahul Mehta",
    detail: "Member since 2022 · Fat Loss Programme",
    rating: 5,
  },
  {
    quote:
      "Lost 14kg in 4 months on the fat loss programme. The diet plan was the real game-changer — practical, not some crash-diet nonsense.",
    name: "Sneha Agarwal",
    detail: "Member since 2023 · Custom Diet Plan",
    rating: 5,
  },
  {
    quote:
      "Equipment is always clean and maintained. The functional zone especially — battle ropes, sled, everything you'd find in a tier-1 city gym.",
    name: "Aryan Singh",
    detail: "Member since 2021 · Annual Plan",
    rating: 5,
  },
  {
    quote:
      "Coach Arjun built me a competition prep programme from scratch. Placed 2nd at my first regional show. Says everything.",
    name: "Deepak Verma",
    detail: "Member since 2022 · Bodybuilding",
    rating: 5,
  },
  {
    quote:
      "The hormone therapy programme is handled professionally and with full medical oversight. Rare to find that standard outside Mumbai.",
    name: "Kiran Reddy",
    detail: "Member since 2023 · Hormone Therapy",
    rating: 5,
  },
  {
    quote:
      "My whole family has memberships here now. Morning crowd is focused, staff keeps it disciplined. Best decision I've made this year.",
    name: "Pooja Thakur",
    detail: "Member since 2024 · Monthly Plan",
    rating: 5,
  },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function Reviews() {
  return (
    <section id="reviews" className="bg-carbon">
      <div className="max-w-[1320px] mx-auto px-[5vw] py-[7rem]">

        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-[0.6rem] mb-3">
              <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
              <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                Real Results
              </span>
            </div>
            <h2
              className="font-display leading-none tracking-[0.03em] text-white"
              style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
            >
              WHAT OUR<br />
              <span className="text-dark-gray">MEMBERS SAY</span>
            </h2>
          </div>

          {/* Aggregate score */}
          <div className="flex items-center gap-5 shrink-0">
            <div className="text-right">
              <div className="font-display text-[3.5rem] leading-none text-white tracking-[0.02em]">
                4.9
              </div>
              <div className="font-condensed text-[0.68rem] tracking-[0.18em] uppercase text-gray mt-1">
                Average Rating
              </div>
            </div>
            <div className="w-px h-12 bg-dark-gray" aria-hidden="true" />
            <div className="text-right">
              <div className="font-display text-[3.5rem] leading-none text-white tracking-[0.02em]">
                600<span className="text-red">+</span>
              </div>
              <div className="font-condensed text-[0.68rem] tracking-[0.18em] uppercase text-gray mt-1">
                Verified Reviews
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-dark-gray">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.name} review={review} delay={i * 0.08} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Review card ───────────────────────────────────────────────────────────────

type Review = typeof REVIEWS[number];

function ReviewCard({ review, delay }: { review: Review; delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="group relative bg-charcoal hover:bg-[#181818] transition-colors duration-300 p-8 flex flex-col gap-6"
    >
      {/* Top red accent line — grows on hover */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] bg-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"
      />

      {/* Stars */}
      <div className="flex gap-[3px]" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <svg
            key={i}
            width="14" height="14" viewBox="0 0 24 24"
            fill="currentColor"
            className="text-gold"
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="font-body text-[0.92rem] font-light leading-[1.75] text-offwhite flex-1">
        &ldquo;{review.quote}&rdquo;
      </blockquote>

      {/* Divider */}
      <hr className="border-dark-gray" aria-hidden="true" />

      {/* Attribution */}
      <footer className="flex items-center gap-3">
        {/* Initials avatar */}
        <div
          aria-hidden="true"
          className="w-9 h-9 bg-dark-gray flex items-center justify-center shrink-0"
        >
          <span className="font-display text-[1rem] leading-none text-red">
            {review.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-condensed text-[0.85rem] font-semibold tracking-[0.06em] uppercase text-white leading-none mb-[3px]">
            {review.name}
          </p>
          <p className="font-condensed text-[0.65rem] tracking-[0.1em] uppercase text-gray">
            {review.detail}
          </p>
        </div>
      </footer>
    </motion.article>
  );
}
