"use client";

import React from "react";
import { motion } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Testimonial {
  quote:  string;
  name:   string;
  detail: string;
  rating: number;
}

interface Props {
  testimonials: Testimonial[];
  duration?:    number;
  className?:   string;
}

// ── Column ────────────────────────────────────────────────────────────────────

export function TestimonialsColumn({ testimonials, duration = 10, className }: Props) {
  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat:     Infinity,
          ease:       "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 pb-4"
      >
        {/* Duplicate the list so the loop is seamless */}
        {[0, 1].map((pass) => (
          <React.Fragment key={pass}>
            {testimonials.map((t) => (
              <TestimonialCard key={`${pass}-${t.name}`} testimonial={t} />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { quote, name, detail, rating } = testimonial;

  return (
    <article className="bg-charcoal border border-dark-gray p-6 max-w-xs w-full flex flex-col gap-4">

      {/* Stars */}
      <div className="flex gap-[3px]" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }).map((_, i) => (
          <svg
            key={i}
            width="13" height="13" viewBox="0 0 24 24"
            fill="currentColor" className="text-gold"
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="font-body text-[0.85rem] font-light leading-[1.7] text-offwhite flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Divider */}
      <hr className="border-dark-gray" aria-hidden="true" />

      {/* Attribution */}
      <footer className="flex items-center gap-3">
        {/* Initials avatar */}
        <div
          aria-hidden="true"
          className="w-9 h-9 bg-[#1e1e1e] border border-dark-gray flex items-center justify-center shrink-0"
        >
          <span className="font-display text-[1rem] leading-none text-red">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-condensed text-[0.82rem] font-semibold tracking-[0.06em] uppercase text-white leading-none mb-[3px]">
            {name}
          </p>
          <p className="font-condensed text-[0.62rem] tracking-[0.1em] uppercase text-gray">
            {detail}
          </p>
        </div>
      </footer>
    </article>
  );
}
