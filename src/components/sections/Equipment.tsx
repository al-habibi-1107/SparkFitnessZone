"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

type Category = "all" | "strength" | "cardio" | "free-weights" | "functional";

interface EquipmentItem {
  name: string;
  category: Exclude<Category, "all">;
  desc: string;
  muscles: string[];
}

// ── Data ─────────────────────────────────────────────────────────────────────

const EQUIPMENT: EquipmentItem[] = [
  {
    name: "Smith Machine",
    category: "strength",
    desc: "A guided barbell system with counterbalanced movement, ideal for squats, bench press, and shoulder press with added stability and safety.",
    muscles: ["Chest", "Quads", "Shoulders"],
  },
  {
    name: "Cable Crossover",
    category: "strength",
    desc: "A dual pulley system with adjustable height — highly versatile for chest flyes, rows, curls, and tricep pushdowns across 180-degree angles.",
    muscles: ["Chest", "Back", "Arms"],
  },
  {
    name: "Technogym Treadmill",
    category: "cardio",
    desc: "Commercial-grade treadmills with incline up to 15%, speed up to 22km/h, and integrated heart rate monitoring for precise cardio training.",
    muscles: ["Full Body", "Cardiovascular"],
  },
  {
    name: "Leg Press Machine",
    category: "strength",
    desc: "45-degree sled leg press with a 400kg capacity. Ideal for quad-dominant lower body development with reduced spinal compression versus squats.",
    muscles: ["Quads", "Hamstrings", "Glutes"],
  },
  {
    name: "Assault Bike",
    category: "functional",
    desc: "Full-body air resistance bike. The harder you push, the more resistance is generated — delivering one of the most intense conditioning sessions possible.",
    muscles: ["Full Body", "Conditioning"],
  },
  {
    name: "Dumbbells 2–50kg",
    category: "free-weights",
    desc: "A complete rubber hex dumbbell rack from 2kg to 50kg with a rubberised floor zone, mirrors, and benches for every angle of free weight training.",
    muscles: ["All Muscle Groups"],
  },
  {
    name: "Rowing Machine",
    category: "cardio",
    desc: "Concept2 RowErg air rower — the global standard for rowing performance. Tracks split time, watts, and stroke rate for data-driven cardio.",
    muscles: ["Back", "Arms", "Legs"],
  },
  {
    name: "T-Bar Row",
    category: "strength",
    desc: "A landmine-mounted T-bar row station for building back thickness. Supports heavy bilateral and unilateral loading for advanced back development.",
    muscles: ["Lats", "Rhomboids", "Biceps"],
  },
  {
    name: "Battle Ropes & Sled",
    category: "functional",
    desc: "A dedicated functional training turf with heavy battle ropes, a push/pull sled, resistance bands, and plyometric boxes for HIIT and athletic training.",
    muscles: ["Full Body", "Power", "Endurance"],
  },
];

const FILTERS: { label: string; value: Category }[] = [
  { label: "All Equipment",  value: "all" },
  { label: "Strength",       value: "strength" },
  { label: "Cardio",         value: "cardio" },
  { label: "Free Weights",   value: "free-weights" },
  { label: "Functional",     value: "functional" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Equipment() {
  const [active, setActive] = useState<Category>("all");

  const visible = active === "all"
    ? EQUIPMENT
    : EQUIPMENT.filter((e) => e.category === active);

  return (
    <section id="equipment" className="bg-black">
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
              The Facility
            </span>
          </div>
          <h2
            className="font-display leading-none tracking-[0.03em] text-white mb-3"
            style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
          >
            WORLD-CLASS<br />
            <span className="text-dark-gray">EQUIPMENT</span>
          </h2>
          <p className="font-body text-[1rem] font-light leading-[1.75] text-offwhite max-w-[520px]">
            50+ premium machines across 5 dedicated training zones — serviced weekly and updated regularly.
          </p>
        </motion.div>

        {/* ── Filter tabs ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={[
                "font-condensed text-[0.72rem] tracking-[0.12em] uppercase",
                "px-5 py-2 border transition-all duration-200",
                active === value
                  ? "bg-red text-white border-red"
                  : "bg-transparent text-gray border-dark-gray hover:bg-red hover:text-white hover:border-red",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* ── Grid ───────────────────────────────────────────────── */}
        {/*
         * gap-[1px] + bg-dark-gray creates the 1px separator lines,
         * matching the demo's technique.
         */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-dark-gray">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
                className="bg-charcoal hover:bg-[#1c1c1c] transition-colors duration-300 cursor-pointer p-8"
              >
                <p className="font-condensed text-[0.65rem] tracking-[0.2em] uppercase text-red mb-[0.6rem]">
                  {item.category.replace("-", " ")}
                </p>
                <h3 className="font-condensed text-[1.15rem] font-bold tracking-[0.06em] uppercase text-white mb-2">
                  {item.name}
                </h3>
                <p className="font-body text-[0.82rem] font-light text-gray leading-[1.6] mb-4">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-[0.4rem]">
                  {item.muscles.map((m) => (
                    <span
                      key={m}
                      className="font-condensed text-[0.62rem] tracking-[0.1em] uppercase text-gray px-[9px] py-[3px] border border-dark-gray"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
