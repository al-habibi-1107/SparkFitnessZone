"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

export type EquipmentCategory = "strength" | "cardio" | "free-weights" | "functional";

export interface EquipmentCardData {
  slug:     string;
  name:     string;
  category: EquipmentCategory;
  desc:     string;
  muscles:  string[];
  imageUrl: string | null;
}

type Filter = "all" | EquipmentCategory;

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All Equipment",  value: "all"         },
  { label: "Strength",       value: "strength"    },
  { label: "Cardio",         value: "cardio"      },
  { label: "Free Weights",   value: "free-weights"},
  { label: "Functional",     value: "functional"  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function EquipmentGrid({ items }: { items: EquipmentCardData[] }) {
  const [active, setActive] = useState<Filter>("all");

  const visible = active === "all"
    ? items
    : items.filter((e) => e.category === active);

  return (
    <>
      {/* Filter tabs */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-dark-gray">
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => (
            <motion.div
              key={item.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: "easeOut" }}
            >
              <Link
                href={`/equipment/${item.slug}`}
                className="group block bg-charcoal hover:bg-[#1c1c1c] transition-colors duration-300 h-full"
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden bg-[#181818]" style={{ aspectRatio: "16/9" }}>
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* Placeholder when no Sanity image yet */
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-[4rem] leading-none text-white/[0.04]">
                        {item.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {/* Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" aria-hidden="true" />

                  {/* Category pill */}
                  <span className="absolute top-3 left-3 font-condensed text-[0.6rem] tracking-[0.18em] uppercase text-red bg-black/70 px-[10px] py-[4px] backdrop-blur-sm">
                    {item.category.replace("-", " ")}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-condensed text-[1.1rem] font-bold tracking-[0.06em] uppercase text-white mb-2 group-hover:text-red transition-colors duration-200">
                    {item.name}
                  </h3>
                  <p className="font-body text-[0.82rem] font-light text-gray leading-[1.6] mb-4 line-clamp-2">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-[0.4rem]">
                    {item.muscles.map((m) => (
                      <span
                        key={m}
                        className="font-condensed text-[0.6rem] tracking-[0.1em] uppercase text-gray px-[8px] py-[3px] border border-dark-gray"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 mt-4 font-condensed text-[0.7rem] tracking-[0.15em] uppercase text-red opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View Details
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
