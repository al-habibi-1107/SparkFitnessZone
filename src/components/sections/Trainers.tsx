"use client";

import { motion } from "framer-motion";

// ── Data ─────────────────────────────────────────────────────────────────────

const TRAINERS = [
  {
    slug: "arjun-sharma",
    name: "ARJUN SHARMA",
    role: "Head Coach",
    experience: "9 Yrs Experience",
    image: "/assets/trainers/arjun-sharma.jpg",
    specs: ["Bodybuilding", "Strength", "Competition Prep"],
  },
  {
    slug: "priya-nair",
    name: "PRIYA NAIR",
    role: "Fat Loss Specialist",
    experience: "6 Yrs Experience",
    image: "/assets/trainers/priya-nair.jpg",
    specs: ["Fat Loss", "Nutrition", "Functional Fitness"],
  },
  {
    slug: "vikram-tiwari",
    name: "VIKRAM TIWARI",
    role: "Sports Nutritionist",
    experience: "7 Yrs Experience",
    image: "/assets/trainers/vikram-tiwari.jpg",
    specs: ["Diet Plans", "Hormone Health", "Recovery"],
  },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function Trainers() {
  return (
    <section id="trainers" className="bg-carbon">
      <div className="max-w-[1320px] mx-auto px-[5vw] py-[7rem]">

        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="flex items-center gap-[0.6rem] mb-3">
            <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
            <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
              The Team
            </span>
          </div>
          <h2
            className="font-display leading-none tracking-[0.03em] text-white"
            style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
          >
            MEET YOUR<br />
            <span className="text-dark-gray">COACHES</span>
          </h2>
        </motion.div>

        {/* ── Grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRAINERS.map((trainer, i) => (
            <TrainerCard key={trainer.slug} trainer={trainer} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Trainer card ──────────────────────────────────────────────────────────────

type Trainer = typeof TRAINERS[number];

function TrainerCard({ trainer, delay }: { trainer: Trainer; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="group relative overflow-hidden cursor-pointer"
    >
      {/* ── Image ───────────────────────────────────────────────── */}
      {/*
       * Background colour acts as placeholder until real trainer photos are added.
       * Replace the bg-charcoal div with next/image once assets are available.
       */}
      <div
        className="w-full bg-charcoal transition-transform duration-[0.6s] ease-out group-hover:scale-[1.04]"
        style={{ aspectRatio: "3/4" }}
        aria-label={`Trainer ${trainer.name}`}
      />

      {/* ── Gradient overlay ────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-all duration-[0.4s]"
        style={{
          background:
            "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.3) 55%, transparent 100%)",
        }}
      />
      {/* Red tint on hover at top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[0.4s]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(214,40,40,0.08) 0%, transparent 50%)",
        }}
      />

      {/* ── Info ────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 p-[1.8rem_1.8rem_2rem]">
        <p className="font-condensed text-[0.7rem] tracking-[0.2em] uppercase text-red mb-[0.4rem]">
          {trainer.role} · {trainer.experience}
        </p>
        <h3 className="font-display text-[1.9rem] leading-[1.05] tracking-[0.04em] text-white mb-[0.6rem]">
          {trainer.name}
        </h3>

        {/* Spec tags — slide up on hover */}
        <div className="flex flex-wrap gap-[0.4rem] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[0.35s]">
          {trainer.specs.map((spec) => (
            <span
              key={spec}
              className="font-condensed text-[0.68rem] tracking-[0.1em] uppercase text-red px-[10px] py-[3px] bg-red/20 border border-red/40"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Book button — slides up 0.05s after specs */}
        <a
          href="/book"
          className="inline-block mt-4 font-condensed text-[0.72rem] tracking-[0.15em] uppercase px-5 py-[10px] bg-red text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[0.35s] delay-[0.05s]"
        >
          Book a Session
        </a>
      </div>
    </motion.div>
  );
}
