"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const SPARK_WORDS = [
  { word: "SPARK",      lang: "English"  },
  { word: "स्पार्क",   lang: "Hindi"    },
  { word: "سپارک",     lang: "Urdu"     },
  { word: "स्पार्क",   lang: "Sanskrit" },
  { word: "سبارك",     lang: "Arabic"   },
  { word: "スパーク",   lang: "Japanese" },
  { word: "스파크",     lang: "Korean"   },
 
] as const;

const INTERVAL_MS = 2200;

export default function HeroClient({ heroImageUrl }: { heroImageUrl: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SPARK_WORDS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="-mt-[72px] relative min-h-[70vh] md:min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Background */}
      <Image
        src={heroImageUrl}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_20%] md:object-center"
      />

      {/* Mobile overlay — uniform dark for centred text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] md:hidden"
        style={{ background: "rgba(8,8,8,0.55)" }}
      />

      {/* Desktop overlay — directional, keeps right side visible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(8,8,8,0.62) 0%, rgba(8,8,8,0.28) 50%, rgba(8,8,8,0.10) 100%)",
        }}
      />

      {/* Top + bottom vignette — all breakpoints */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, transparent 28%, transparent 62%, rgba(8,8,8,0.45) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-[2] w-full flex flex-col items-center text-center px-6 md:px-[5vw]"
        style={{ paddingTop: "72px" }}
      >
        <h1
          className="font-display leading-[0.88] tracking-[0.02em] text-white md:flex md:items-baseline md:justify-center md:gap-[0.22em]"
          style={{
            fontSize: "clamp(3rem, 14vw, 8rem)",
            textShadow: "0 2px 40px rgba(0,0,0,0.55)",
          }}
        >
          <span className="block md:inline whitespace-nowrap">GET YOUR</span>

          {/* Container sized by invisible "SPARK" — never changes, so GET YOUR never moves */}
          <span
            className="block md:inline-block relative mx-auto md:mx-0"
            style={{ color: "#D62828" }}
          >
            {/* Size anchor — invisible, always "SPARK", sets stable width & height */}
            <span aria-hidden className="invisible select-none">SPARK</span>

            {/* Animated word — absolutely centered, zero layout impact */}
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                dir="auto"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                exit={{    opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {SPARK_WORDS[index].word}
              </motion.span>
            </AnimatePresence>

            {/* Language label */}
            <AnimatePresence mode="wait">
              <motion.span
                key={"lang-" + index}
                className="absolute left-0 right-0 font-condensed tracking-[0.3em] uppercase pointer-events-none text-center"
                style={{
                  fontSize: "clamp(0.55rem, 1.8vw, 0.72rem)",
                  color: "rgba(255,255,255,0.3)",
                  bottom: "-1.4rem",
                  whiteSpace: "nowrap",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{    opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {SPARK_WORDS[index].lang}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        {/* Join Now CTA */}
        <motion.a
          href="#membership"
          whileHover={{ y: -3, boxShadow: "0 10px 40px rgba(214,40,40,0.55)" }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-[0.6rem] font-condensed tracking-[0.16em] uppercase text-white w-full max-w-[280px] md:w-auto"
          style={{
            fontSize: "0.88rem",
            padding: "1.05rem 2.4rem",
            backgroundColor: "#D62828",
            marginTop: "2.8rem",
            minHeight: "52px",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Join Now
          <svg
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>

        {/* Tagline */}
        <motion.p
          className="font-condensed uppercase"
          style={{
            fontSize: "clamp(0.7rem, 2.5vw, 1.05rem)",
            letterSpacing: "clamp(0.08em, 1.5vw, 0.18em)",
            color: "rgba(255,255,255,0.72)",
            marginTop: "1.2rem",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Jamshedpur&apos;s Go-To{" "}
          <span style={{ color: "#D62828" }}>Elite Fitness</span>{" "}
          Destination
        </motion.p>
      </div>
    </section>
  );
}
