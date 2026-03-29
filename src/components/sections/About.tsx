"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ── Data ─────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    icon: "🏋️",
    title: "Expert Coaching",
    desc: "Certified trainers across all disciplines",
  },
  {
    icon: "🔬",
    title: "Science-Backed",
    desc: "Evidence-based programmes, not fads",
  },
  {
    icon: "⚡",
    title: "Premium Equipment",
    desc: "50+ machines, maintained daily",
  },
  {
    icon: "🥗",
    title: "Nutrition Support",
    desc: "Custom diet plans with every programme",
  },
] as const;

// ── Shared scroll-reveal transition ──────────────────────────────────────────

function reveal(delay = 0) {
  return {
    initial:    { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport:   { once: true, amount: 0.2 as const },
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section id="about" className="bg-charcoal">
      <div className="max-w-[1320px] mx-auto px-[5vw] py-[7rem]">

        {/* ── 2-col grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[5rem] items-center">

          {/* ── Left col — image ────────────────────────────────── */}
          <motion.div {...reveal(0)} className="relative lg:max-w-none max-w-[500px] mx-auto w-full">

            {/*
             * Offset red border frame — replicates demo's ::before pseudo-element:
             *   top: -12px; left: -12px; right: 12px; bottom: 12px
             * The negative top/left push the border outside the image;
             * the positive right/bottom pull it inside, creating the diagonal offset.
             */}
            <div
              aria-hidden="true"
              className="absolute top-[-12px] left-[-12px] right-[12px] bottom-[12px] border border-red z-0"
            />

            {/* Image */}
            <div className="relative z-[1] aspect-[4/5] overflow-hidden">
              <Image
                src="/assets/about.jpg"
                alt="Spark Fitness Zone gym interior"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover object-center"
                style={{ filter: "grayscale(20%) contrast(1.1)" }}
              />
            </div>

            {/* Red badge — years open */}
            <div
              className={[
                "absolute bottom-[-1.5rem] right-[-1.5rem] z-[2]",
                "w-[110px] h-[110px] bg-red",
                "flex flex-col items-center justify-center",
              ].join(" ")}
            >
              <span className="font-display text-[2.5rem] leading-none text-white">
                6+
              </span>
              <span className="font-condensed text-[0.65rem] tracking-[0.1em] uppercase text-white/75 text-center">
                Years Strong
              </span>
            </div>
          </motion.div>

          {/* ── Right col — text ────────────────────────────────── */}
          <motion.div {...reveal(0.15)} className="pl-0 lg:pl-4">

            {/* Section tag */}
            <div className="flex items-center gap-[0.6rem] mb-3">
              <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
              <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                Who We Are
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-display leading-none tracking-[0.03em] text-white mb-6"
              style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
            >
              NOT JUST<br />
              <span className="text-dark-gray">A</span> GYM
            </h2>

            {/* Body */}
            <p className="font-body text-offwhite font-light leading-[1.8] mb-5">
              Spark Fitness Zone was built on a single belief — that every person
              is capable of a physical transformation when given the right
              environment, the right guidance, and the right people around them.
            </p>
            <p className="font-body text-offwhite font-light leading-[1.8]">
              We house Jamshedpur&apos;s most comprehensive training facility, with
              dedicated zones for strength, cardio, functional fitness, and
              recovery — staffed by certified specialists who treat your goals as
              seriously as their own.
            </p>

            {/* ── 2×2 pillar grid ───────────────────────────────── */}
            {/*
             * gap-px + bg-dark-gray creates 1px grid-line borders between cells.
             * border border-dark-gray adds the outer frame.
             * Each cell uses bg-charcoal to sit on top of the dark-gray gaps.
             */}
            <div className="grid grid-cols-2 gap-px bg-dark-gray border border-dark-gray mt-8">
              {PILLARS.map((p) => (
                <div key={p.title} className="bg-charcoal px-[1.4rem] py-[1.2rem]">
                  <div className="text-[1.4rem] mb-2">{p.icon}</div>
                  <div className="font-condensed text-[0.9rem] font-semibold tracking-[0.08em] uppercase text-white mb-1">
                    {p.title}
                  </div>
                  <div className="font-body text-[0.8rem] text-gray leading-[1.5]">
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
