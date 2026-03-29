"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: "01",
    image: "/assets/services/fat-loss.jpg",
    name: "FAT LOSS\nPROGRAMME",
    desc: "A results-first approach combining metabolic conditioning, personalised caloric targets, and weekly check-ins. Designed for sustainable, visible fat loss — not crash diets.",
  },
  {
    num: "02",
    image: "/assets/services/bodybuilding.jpg",
    name: "BODY-\nBUILDING",
    desc: "Periodised strength and hypertrophy programming built around your schedule and recovery capacity. Compete, or just look the part — we train both.",
  },
  {
    num: "03",
    image: "/assets/services/hormone-therapy.jpg",
    name: "HORMONE\nTHERAPY",
    desc: "Supervised hormone optimisation for performance and wellness. Conducted by certified practitioners with ongoing blood work and monitoring protocols.",
  },
  {
    num: "04",
    image: "/assets/services/diet-plans.jpg",
    name: "CUSTOM\nDIET PLANS",
    desc: "Macro-calibrated, lifestyle-compatible meal plans crafted by our in-house nutritionist. Updated fortnightly based on your progress and biofeedback.",
  },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function Services() {
  return (
    <section id="services" className="bg-black">
      <div className="max-w-[1320px] mx-auto px-[5vw] py-[7rem]">

        {/* ── Section header ──────────────────────────────────────── */}
        <div className="flex justify-between items-end gap-8 flex-wrap mb-16">

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-[0.6rem] mb-3">
              <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
              <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                What We Offer
              </span>
            </div>
            <h2
              className="font-display leading-none tracking-[0.03em] text-white"
              style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
            >
              OUR<br />
              <span className="text-dark-gray">PROGRAMMES</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-body text-[1rem] font-light leading-[1.75] text-offwhite max-w-[520px] mb-0"
          >
            Structured programmes designed for every goal — whether you want to
            lose fat, build muscle, balance your hormones, or simply eat better.
          </motion.p>
        </div>

        {/* ── 2×2 card grid ───────────────────────────────────────── */}
        {/*
         * gap-[2px] + bg-dark-gray creates the 2px border lines between cards,
         * matching the demo's gap: 2px / background: dark-gray technique.
         */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-dark-gray">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} service={s} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Service card ──────────────────────────────────────────────────────────────

type Service = typeof SERVICES[number];

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  const lines = service.name.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      // `group` enables child selectors for hover: ghost num, link gap, bottom border
      className="group relative bg-charcoal overflow-hidden cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-300"
    >
      {/* Ghost order number — fades from white → red tint on card hover */}
      <span
        aria-hidden="true"
        className="absolute top-6 right-6 font-display text-[5rem] leading-none tracking-[-0.02em] pointer-events-none select-none transition-colors duration-300 text-white/[0.04] group-hover:text-red/[0.08]"
      >
        {service.num}
      </span>

      {/* ── Card image ──────────────────────────────────────────── */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={service.image}
          alt={lines.join(" ")}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay so content below stays readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0.55) 100%)",
          }}
        />
      </div>

      {/* ── Card content ────────────────────────────────────────── */}
      <div className="px-10 pt-8 pb-12">
        <div
          className="font-display text-[2.2rem] leading-[1.05] tracking-[0.04em] text-white mb-3"
        >
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </div>

        <p className="font-body text-[0.9rem] font-light text-gray leading-[1.7] mb-6">
          {service.desc}
        </p>

        {/* "Enquire Now" link — gap widens on hover */}
        <a
          href="/book"
          className="inline-flex items-center gap-2 group-hover:gap-[0.9rem] font-condensed text-[0.75rem] tracking-[0.18em] uppercase text-red transition-[gap] duration-200"
        >
          Enquire Now
          <span aria-hidden="true">→</span>
        </a>
      </div>

      {/*
       * Bottom red border — replicates demo's ::before scaleX animation.
       * Sits at absolute bottom, scales from 0 → full width (origin-left) on hover.
       */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[0.4s] ease-out"
      />
    </motion.div>
  );
}
