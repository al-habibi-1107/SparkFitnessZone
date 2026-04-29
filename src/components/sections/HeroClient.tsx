"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ── Marquee ───────────────────────────────────────────────────────────────────

const MARQUEE_ITEMS = [
  "Strength", "Endurance", "Power", "Excellence",
  "Certified Trainers", "Science-Backed", "Real Results", "Jamshedpur",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function fadeUp(delay: number) {
  return {
    initial:    { opacity: 0, y: 30 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.85, delay, ease: "easeOut" as const },
  };
}

const STATS = [
  { num: "800+", label: "Active Members"      },
  { num: "12",   label: "Certified Trainers"  },
  { num: "6",    label: "Years of Excellence" },
  { num: "98%",  label: "Member Retention"    },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function HeroClient({ heroImageUrl }: { heroImageUrl: string }) {
  return (
    <section
      id="hero"
      className="-mt-[72px] relative min-h-screen flex items-center overflow-hidden"
    >
      {/*
       * ── Background: single crisp PNG with ambient Ken Burns ──────────
       * Breathes between scale 1.0 and 1.06 — subtle enough to avoid
       * pixelation but enough to feel alive. reverse loop = no jump cut.
       */}
      <motion.div
        initial={{ scale: 1.0, x: "0%", y: "0%" }}
        animate={{ scale: 1.06, x: "-1.5%", y: "-1%" }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0"
      >
        <Image
          src={heroImageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* ── Film grain — analog depth ─────────────────────────────────── */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none select-none"
        style={{ opacity: 0.045, mixBlendMode: "overlay" }}
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/*
       * ── Ghost architectural watermark ─────────────────────────────────
       * "SF" in Bebas Neue at ~3% opacity on the right — fills the visible
       * image zone with depth and editorial structure. Common on Porsche,
       * Bugatti, luxury fashion. Invisible to casual eye, felt as richness.
       */}
      <div
        aria-hidden="true"
        className="absolute right-[-5%] top-1/2 -translate-y-[48%] z-[1] font-display leading-none pointer-events-none select-none"
        style={{
          fontSize: "clamp(16rem, 42vw, 56rem)",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(255,255,255,0.07)",
          letterSpacing: "-0.03em",
          opacity: 0.9,
        }}
      >
        SF
      </div>

      {/*
       * ── Gradient system — STRATEGIC, not a blackout ──────────────────
       *
       * Three focused layers replace the old "rgba(8,8,8,0.97)" blanket:
       *   1. Radial pocket  — dark only around the text zone (left)
       *   2. Top bar        — nav contrast
       *   3. Bottom vignette — stats bar foundation
       *
       * The right ~40% of the viewport gets near-zero overlay.
       * The photography actually shows.
       */}

      {/* 1. Left radial dark pocket */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 75% 130% at -10% 52%, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.65) 30%, rgba(8,8,8,0.18) 55%, transparent 72%)",
        }}
      />

      {/* 2. Top bar — nav readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2]"
        style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.72) 0%, transparent 20%)" }}
      />

      {/* 3. Bottom vignette — grounds stats bar */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 38%, rgba(8,8,8,0.75) 68%, #080808 100%)",
        }}
      />

      {/* Red brand warmth — subtle glow from left */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 48% 60% at -2% 52%, rgba(214,40,40,0.10) 0%, transparent 65%)",
        }}
      />

      {/* ── Left edge accent — architectural frame ────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 z-[4] w-[3px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 8%, #D62828 42%, #D62828 58%, transparent 92%)",
          opacity: 0.65,
        }}
      />

      {/* ── Red cinematic light beam ──────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.12, 0.38, 0.12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-[2] top-[-15%] right-[24%] w-[1.5px] h-[140%] -rotate-[9deg]"
        style={{
          background: "linear-gradient(to bottom, transparent 5%, #D62828 50%, transparent 95%)",
          filter: "blur(2.5px)",
          boxShadow: "0 0 18px 6px rgba(214,40,40,0.18)",
        }}
      />

      {/* ── Vertical location label — right zone ──────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 z-[3] pointer-events-none select-none"
        style={{ right: "4.5vw", transform: "translateY(-50%) rotate(90deg)" }}
      >
        <span
          className="font-condensed whitespace-nowrap"
          style={{
            fontSize: "0.54rem",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.18)",
          }}
        >
          Jamshedpur · Jharkhand · Est. 2018
        </span>
      </div>

      {/* ── Hero content ──────────────────────────────────────────────── */}
      <div className="relative z-[3] w-full max-w-[840px] pt-[72px] pb-44"
        style={{ paddingLeft: "calc(5vw + 3px)", paddingRight: "5vw" }}
      >

        {/* Eyebrow */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-7">
          <span
            aria-hidden="true"
            className="block w-8 h-px shrink-0"
            style={{ backgroundColor: "#D62828" }}
          />
          <span
            className="font-condensed text-[0.77rem] tracking-[0.32em] uppercase"
            style={{ color: "#D62828" }}
          >
            Jamshedpur&apos;s Premier Fitness Centre
          </span>
        </motion.div>

        {/*
         * H1 — each word line enters independently with stagger.
         * textShadow gives self-sufficient legibility so the gradient
         * behind doesn't need to be heavy.
         */}
        <h1
          className="font-display leading-[0.88] tracking-[0.02em] text-white mb-6"
          style={{
            fontSize: "clamp(4.5rem, 11vw, 9.5rem)",
            textShadow: "0 2px 50px rgba(0,0,0,0.60), 0 1px 2px rgba(0,0,0,1)",
          }}
        >
          <motion.span {...fadeUp(0.06)} className="block">FORGE</motion.span>
          <motion.span {...fadeUp(0.15)} className="block">YOUR</motion.span>
          <motion.span {...fadeUp(0.24)} className="block" style={{ color: "#D62828" }}>
            BEST
          </motion.span>
          <motion.span {...fadeUp(0.33)} className="block">
            <span
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.72)",
                color: "transparent",
              }}
            >
              SELF
            </span>
          </motion.span>
        </h1>

        {/* Divider accent — red diamond separator */}
        <motion.div {...fadeUp(0.40)} className="flex items-center gap-3 mb-6">
          <span className="block w-10 h-px" style={{ backgroundColor: "rgba(255,255,255,0.10)" }} />
          <span
            className="block rotate-45"
            style={{ width: 5, height: 5, backgroundColor: "#D62828", flexShrink: 0 }}
          />
          <span
            className="block h-px"
            style={{ width: 200, backgroundColor: "rgba(255,255,255,0.05)" }}
          />
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.45)}
          className="font-light leading-[1.82] max-w-[430px] mb-4"
          style={{ fontSize: "0.98rem", color: "rgba(255,255,255,0.62)" }}
        >
          Elite training, certified specialists, and science-backed programmes —
          built for people who are serious about results.
        </motion.p>

        {/* Social nudge */}
        <motion.p
          {...fadeUp(0.51)}
          className="font-condensed tracking-[0.18em] uppercase mb-10"
          style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.32)" }}
        >
          <span style={{ color: "#D62828" }}>800+</span> members already training ·{" "}
          <span style={{ color: "#D62828" }}>First session free</span>, no commitment
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.57)} className="flex gap-4 flex-wrap">
          <motion.a
            href="/book"
            whileHover={{ y: -3, boxShadow: "0 10px 40px rgba(214,40,40,0.55)" }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.16 }}
            className="inline-flex items-center gap-[0.6rem] font-condensed tracking-[0.16em] uppercase text-white border-2"
            style={{
              fontSize: "0.84rem",
              padding: "1.05rem 2.25rem",
              backgroundColor: "#D62828",
              borderColor: "#D62828",
            }}
          >
            Book Free Trial
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>

          <motion.a
            href="#membership"
            whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.50)" }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.16 }}
            className="font-condensed tracking-[0.16em] uppercase text-white bg-transparent border"
            style={{
              fontSize: "0.84rem",
              padding: "1.05rem 2.25rem",
              borderColor: "rgba(255,255,255,0.18)",
            }}
          >
            View Plans
          </motion.a>
        </motion.div>
      </div>

      {/* ── Scrolling marquee ─────────────────────────────────────────── */}
      <div
        className="absolute bottom-[96px] left-0 right-0 z-[3] overflow-hidden"
        style={{
          paddingTop: "9px",
          paddingBottom: "9px",
          borderTop: "1px solid rgba(255,255,255,0.038)",
          borderBottom: "1px solid rgba(255,255,255,0.038)",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          className="flex w-max"
          style={{ gap: "2rem" }}
        >
          {[0, 1].map((gi) => (
            <span key={gi} className="flex items-center" style={{ gap: "2rem" }}>
              {MARQUEE_ITEMS.map((item) => (
                <span key={item} className="inline-flex items-center" style={{ gap: "2rem" }}>
                  <span
                    className="font-condensed whitespace-nowrap"
                    style={{
                      fontSize: "0.54rem",
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.16)",
                    }}
                  >
                    {item}
                  </span>
                  <span
                    className="leading-none select-none"
                    style={{ color: "rgba(214,40,40,0.30)", fontSize: "0.30rem" }}
                  >
                    ◆
                  </span>
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Stats bar ─────────────────────────────────────────────────── */}
      <motion.div
        {...fadeUp(0.68)}
        className="absolute bottom-0 left-0 right-0 z-[3] flex"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.048)",
          backgroundColor: "rgba(8,8,8,0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="flex-1 text-center"
            style={{
              padding: "1.4rem 2rem",
              borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.048)" : "none",
            }}
          >
            <div
              className="font-display leading-none tracking-[0.03em]"
              style={{ fontSize: "2.3rem", color: "#D62828" }}
            >
              {stat.num}
            </div>
            <div
              className="font-condensed tracking-[0.18em] uppercase"
              style={{ fontSize: "0.67rem", color: "rgba(255,255,255,0.30)", marginTop: "0.3rem" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
