"use client";

import Link  from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

export type TrainerOption = {
  slug:        string;
  name:        string;
  role:        string;
  experience:  number;
  specialisms: string[];
  imageUrl:    string | null;
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function BookTrainerClient({ trainers }: { trainers: TrainerOption[] }) {
  const [selected, setSelected] = useState(0);
  const active = trainers[selected]!;

  return (
    <section className="relative overflow-hidden bg-black border-t border-dark-gray">

      {/* ── Ghost text ─────────────────────────────────────────────── */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-display"
        style={{
          fontSize:   "20vw",
          color:      "rgba(255,255,255,0.025)",
          whiteSpace: "nowrap",
          lineHeight: 1,
        }}
      >
        TRAIN 1-ON-1
      </span>

      <div className="relative z-10 max-w-[1320px] mx-auto px-[5vw] py-[7rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-start">

          {/* ── Left: trainer selector ────────────────────────────── */}
          <div>

            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-[0.6rem] mb-3">
                <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
                <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                  Personal Training
                </span>
              </div>
              <h2
                className="font-display leading-none tracking-[0.03em] text-white mb-4"
                style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
              >
                BOOK A SESSION<br />
                <span className="text-dark-gray">WITH YOUR TRAINER</span>
              </h2>
              <p className="font-body text-[1rem] font-light leading-[1.75] text-offwhite max-w-[480px]">
                Pick the specialist who matches your goal — then schedule a free
                introductory session. No commitment, no payment upfront.
              </p>
            </div>

            {/* Trainer tiles — scrollable so adding more trainers never breaks layout */}
            <div className="relative">
              <div className="flex flex-col gap-[1px] bg-dark-gray max-h-[420px] overflow-y-auto">
                {trainers.map((trainer, i) => {
                  const isActive = i === selected;
                  return (
                    <motion.button
                      key={trainer.slug}
                      type="button"
                      onClick={() => setSelected(i)}
                      whileTap={{ scale: 0.995 }}
                      className={[
                        "group relative w-full text-left px-7 py-[1.1rem] transition-colors duration-200 cursor-pointer",
                        "flex items-center gap-5",
                        isActive
                          ? "bg-[#1c1c1c] border-l-2 border-red"
                          : "bg-charcoal hover:bg-[#181818] border-l-2 border-transparent",
                      ].join(" ")}
                      aria-pressed={isActive}
                    >
                      {/* Initials avatar */}
                      <div
                        className={[
                          "shrink-0 w-11 h-11 flex items-center justify-center",
                          "font-display text-[1.3rem] leading-none",
                          "transition-colors duration-200",
                          isActive
                            ? "bg-red text-white"
                            : "bg-carbon text-dark-gray group-hover:bg-[#222] group-hover:text-gray",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        {trainer.name.split(" ").map((n) => n[0]).join("")}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className={[
                          "font-display text-[1.35rem] leading-none tracking-[0.04em] mb-[3px] transition-colors duration-200",
                          isActive ? "text-white" : "text-gray group-hover:text-white",
                        ].join(" ")}>
                          {trainer.name.toUpperCase()}
                        </p>
                        <p className="font-condensed text-[0.7rem] tracking-[0.15em] uppercase text-red">
                          {trainer.role} · {trainer.experience} Yrs
                        </p>
                      </div>

                      {/* Active arrow */}
                      <svg
                        width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2"
                        aria-hidden="true"
                        className={[
                          "shrink-0 transition-all duration-200",
                          isActive ? "text-red opacity-100" : "text-gray opacity-0 group-hover:opacity-40",
                        ].join(" ")}
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom fade — hints that more trainers are scrollable */}
              {trainers.length > 4 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-12"
                  style={{
                    background: "linear-gradient(to bottom, transparent, var(--black))",
                  }}
                />
              )}
            </div>

          </div>

          {/* ── Right: CTA panel ──────────────────────────────────── */}
          <div className="lg:sticky lg:top-[100px]">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="border border-dark-gray bg-carbon"
            >
              {/* Red top accent */}
              <div className="h-[3px] bg-red w-full" aria-hidden="true" />

              {/* Trainer image */}
              <div className="relative w-full overflow-hidden bg-[#111]" style={{ aspectRatio: "4/3" }}>
                {active.imageUrl ? (
                  <Image
                    src={active.imageUrl}
                    alt={active.name}
                    fill
                    sizes="400px"
                    className="object-cover object-top"
                  />
                ) : (
                  /* Placeholder when no Sanity image */
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-display leading-none text-white/[0.06] select-none"
                      style={{ fontSize: "8rem" }}
                      aria-hidden="true"
                    >
                      {active.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                )}
                {/* Gradient overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(24,24,24,1) 0%, rgba(24,24,24,0.2) 60%, transparent 100%)" }}
                />
                {/* Name overlay on image */}
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
                  <p className="font-condensed text-[0.65rem] tracking-[0.22em] uppercase text-red mb-[2px]">
                    You&apos;re booking with
                  </p>
                  <h3
                    className="font-display text-white leading-none tracking-[0.03em]"
                    style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)" }}
                  >
                    {active.name.toUpperCase()}
                  </h3>
                </div>
              </div>

              <div className="p-8">

                {/* Role */}
                <p className="font-condensed text-[0.78rem] tracking-[0.15em] uppercase text-gray mb-6">
                  {active.role} · {active.experience} Yrs Experience
                </p>

                {/* Divider */}
                <hr className="border-dark-gray mb-6" />

                {/* Specialisms */}
                <p className="font-condensed text-[0.65rem] tracking-[0.2em] uppercase text-gray mb-3">
                  Specialises in
                </p>
                <ul className="mb-8 space-y-0">
                  {active.specialisms.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-3 font-body text-[0.88rem] font-light text-offwhite py-[0.4rem] border-b border-white/[0.04]"
                    >
                      <span aria-hidden="true" className="text-red text-[0.8rem] mt-[2px] shrink-0">→</span>
                      {s}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/book"
                  className={[
                    "w-full flex items-center justify-center gap-3",
                    "font-condensed text-[0.85rem] tracking-[0.18em] uppercase",
                    "py-4 bg-red text-white hover:bg-red-hot",
                    "transition-colors duration-200",
                  ].join(" ")}
                >
                  Book a Free Session
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Trust micro-copy */}
                <p className="font-condensed text-[0.62rem] tracking-[0.1em] uppercase text-gray text-center mt-4">
                  Free · No commitment · All zones included
                </p>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
