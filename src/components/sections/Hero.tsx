"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ── Shared transition factory ─────────────────────────────────────────────────

function fadeUp(delay: number) {
  return {
    initial:    { opacity: 0, y: 28 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  };
}

// ── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { num: "800+", label: "Active Members"     },
  { num: "12",   label: "Certified Trainers" },
  { num: "6",    label: "Years of Excellence" },
  { num: "98%",  label: "Member Retention"   },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    /*
     * -mt-[72px] pulls the section up so the background fills the full
     * viewport behind the fixed nav (mirrors demo's padding-top: 72px on
     * #hero). Content is pushed down by pt-[72px] inside.
     */
    <section
      id="hero"
      className="-mt-[72px] relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background image ──────────────────────────────────────── */}
      <div className="absolute inset-0">
        <Image
          src="/assets/home_2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-center"
        />
      </div>

      {/* ── Gradient: diagonal dark left → transparent right ──────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(105deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.80) 45%, rgba(8,8,8,0.40) 100%)",
        }}
      />

      {/* ── Gradient: bottom fade to black ────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 60%, var(--black) 100%)",
        }}
      />

      {/* ── Red light beam ────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-[1] top-[-10%] right-[18%] w-[3px] h-[130%] -rotate-[8deg]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--red), transparent)",
        }}
      />

      {/* ── Hero content ──────────────────────────────────────────── */}
      <div className="relative z-[2] w-full max-w-[820px] px-[5vw] pt-[72px] pb-32">

        {/* Eyebrow */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-5">
          <span aria-hidden="true" className="block w-8 h-px bg-red shrink-0" />
          <span className="font-condensed text-[0.8rem] tracking-[0.25em] uppercase text-red">
            Jamshedpur&apos;s Premier Fitness Centre
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-display leading-[0.92] tracking-[0.02em] text-white mb-3"
          style={{ fontSize: "clamp(4.5rem, 11vw, 9.5rem)" }}
        >
          FORGE<br />
          YOUR<br />
          <span className="text-red">BEST</span><br />
          <span
            style={{
              WebkitTextStroke: "1px var(--offwhite)",
              color: "transparent",
            }}
          >
            SELF
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-[1.05rem] font-light leading-[1.7] text-offwhite max-w-[480px] mb-4"
        >
          Elite training, certified specialists, and science-backed programmes —
          built for people who are serious about results.
        </motion.p>

        {/* Social nudge */}
        <motion.p
          {...fadeUp(0.25)}
          className="font-condensed text-[0.78rem] tracking-[0.12em] uppercase text-gray mb-8"
        >
          <span className="text-red">800+</span> members already training ·{" "}
          <span className="text-red">First session free</span>, no commitment
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.3)} className="flex gap-4 flex-wrap">

          {/* Primary — low friction first */}
          <a
            href="/book"
            className={[
              "inline-flex items-center gap-[0.6rem]",
              "font-condensed text-[0.85rem] tracking-[0.15em] uppercase",
              "px-9 py-4 bg-red text-white border-2 border-red",
              "hover:bg-transparent hover:text-red hover:-translate-y-[2px]",
              "transition-all duration-200",
            ].join(" ")}
          >
            Book Free Trial
            <svg
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Secondary — for the buyer ready to commit */}
          <a
            href="#membership"
            className={[
              "font-condensed text-[0.85rem] tracking-[0.15em] uppercase",
              "px-9 py-4 bg-transparent text-white border border-white/25",
              "hover:border-white hover:-translate-y-[2px]",
              "transition-all duration-200",
            ].join(" ")}
          >
            View Plans
          </a>
        </motion.div>
      </div>

      {/* ── Stats bar ─────────────────────────────────────────────── */}
      <motion.div
        {...fadeUp(0.5)}
        className={[
          "absolute bottom-0 left-0 right-0 z-[2]",
          "flex",
          "border-t border-white/[0.06]",
          "bg-black/60 backdrop-blur-[10px]",
        ].join(" ")}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={[
              "flex-1 text-center px-8 py-[1.4rem]",
              i < STATS.length - 1 ? "border-r border-white/[0.06]" : "",
            ].join(" ")}
          >
            <div className="font-display text-[2.4rem] leading-none tracking-[0.03em] text-red">
              {stat.num}
            </div>
            <div className="font-condensed text-[0.72rem] tracking-[0.15em] uppercase text-gray mt-[0.3rem]">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
