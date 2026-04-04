"use client";

import { motion } from "framer-motion";
import {
  TestimonialsColumn,
  type Testimonial,
} from "@/components/ui/testimonials-columns-1";

// ── Data ─────────────────────────────────────────────────────────────────────

const REVIEWS: Testimonial[] = [
  {
    quote:
      "I'd tried three gyms in Jamshedpur before this. Nothing came close. The trainers actually care about your progress, not just showing up.",
    name:   "Rahul Mehta",
    detail: "Member since 2022 · Fat Loss Programme",
    rating: 5,
  },
  {
    quote:
      "Lost 14kg in 4 months on the fat loss programme. The diet plan was the real game-changer — practical, not some crash-diet nonsense.",
    name:   "Sneha Agarwal",
    detail: "Member since 2023 · Custom Diet Plan",
    rating: 5,
  },
  {
    quote:
      "Equipment is always clean and maintained. The functional zone especially — battle ropes, sled, everything you'd find in a tier-1 city gym.",
    name:   "Aryan Singh",
    detail: "Member since 2021 · Annual Plan",
    rating: 5,
  },
  {
    quote:
      "Coach Arjun built me a competition prep programme from scratch. Placed 2nd at my first regional show. Says everything.",
    name:   "Deepak Verma",
    detail: "Member since 2022 · Bodybuilding",
    rating: 5,
  },
  {
    quote:
      "The hormone therapy programme is handled professionally and with full medical oversight. Rare to find that standard outside Mumbai.",
    name:   "Kiran Reddy",
    detail: "Member since 2023 · Hormone Therapy",
    rating: 5,
  },
  {
    quote:
      "My whole family has memberships here now. Morning crowd is focused, staff keeps it disciplined. Best decision I've made this year.",
    name:   "Pooja Thakur",
    detail: "Member since 2024 · Monthly Plan",
    rating: 5,
  },
];

// Distribute evenly across three columns (2 each)
const col1 = REVIEWS.slice(0, 2);
const col2 = REVIEWS.slice(2, 4);
const col3 = REVIEWS.slice(4, 6);

// ── Component ─────────────────────────────────────────────────────────────────

export default function Reviews() {
  return (
    <section id="reviews" className="bg-carbon overflow-hidden">
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

        {/* ── Scrolling columns ──────────────────────────────────── */}
        {/*
         * mask-image fades cards in/out at the top and bottom edges,
         * creating the illusion of an infinite stream. max-h clips the
         * visible window to ~3 cards tall.
         */}
        <div
          className="flex justify-center gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[680px] overflow-hidden"
        >
          <TestimonialsColumn
            testimonials={col1}
            duration={15}
          />
          <TestimonialsColumn
            testimonials={col2}
            duration={19}
            className="hidden md:block"
          />
          <TestimonialsColumn
            testimonials={col3}
            duration={17}
            className="hidden lg:block"
          />
        </div>

      </div>
    </section>
  );
}
