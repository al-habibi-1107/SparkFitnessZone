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
              style={{ aspectRatio: "9/16" }}
              className="relative overflow-hidden bg-[#0e0e0e]"
            >
              <Link
                href={`/equipment/${item.slug}`}
                className="group absolute inset-0"
              >
                {/* Full-bleed portrait image */}
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display leading-none text-white/[0.04]" style={{ fontSize: "30vw" }}>
                      {item.name.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Gradient scrim — heavy at bottom so text is always legible */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.7) 32%, rgba(8,8,8,0.15) 60%, transparent 100%)",
                  }}
                />

                {/* Top-left category pill */}
                <span className="absolute top-4 left-4 font-condensed text-[0.6rem] tracking-[0.18em] uppercase text-red bg-black/70 px-[10px] py-[5px] backdrop-blur-sm">
                  {item.category.replace("-", " ")}
                </span>

                {/* Bottom overlay: name + desc + muscles + arrow */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-condensed text-[1.15rem] font-bold tracking-[0.06em] uppercase text-white mb-1 group-hover:text-red transition-colors duration-200">
                    {item.name}
                  </h3>
                  <p className="font-body text-[0.78rem] font-light text-gray/90 leading-[1.55] mb-3 line-clamp-2">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-[0.35rem] mb-4">
                    {item.muscles.slice(0, 3).map((m) => (
                      <span
                        key={m}
                        className="font-condensed text-[0.58rem] tracking-[0.1em] uppercase text-gray/80 px-[7px] py-[3px] border border-white/15"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 font-condensed text-[0.68rem] tracking-[0.15em] uppercase text-red opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View Details
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
