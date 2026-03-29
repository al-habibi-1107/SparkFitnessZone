"use client";

import { motion } from "framer-motion";

// Embed URL: set NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL in .env.local to override.
// Default uses a query-based embed that works without an API key.
const MAP_URL =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
  "https://maps.google.com/maps?q=IOCL+Petrol+Pump+Shalimar+Plaza+Chepapul+Mango+Jamshedpur+Jharkhand+832110&output=embed&z=17";

const INFO = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Address",
    value: "2nd & 3rd Floor, IOCL Petrol Pump, Shalimar Plaza, above Apna Mart, N.H. Colony, Chepapul, Mango, Jamshedpur — 832110",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8"  y1="2" x2="8"  y2="6"/>
        <line x1="3"  y1="10" x2="21" y2="10"/>
      </svg>
    ),
    label: "Hours",
    value: "Open Every Day — 5:00 AM to 11:00 PM",
  },
] as const;

export default function LocationSection() {
  return (
    <section className="bg-carbon border-t border-dark-gray">
      {/* ── Header ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[1320px] mx-auto px-[5vw] pt-16 pb-8"
      >
        <div className="flex items-center gap-[0.6rem] mb-3">
          <span className="w-6 h-px bg-red" />
          <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
            Find Us
          </span>
        </div>
        <h2 className="font-display text-[clamp(2.8rem,5vw,5rem)] leading-none tracking-wide text-white">
          COME <span className="text-dark-gray">VISIT</span> US
        </h2>
      </motion.div>

      {/* ── Map + info ─────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row">

        {/* Map — full-width on mobile, 2/3 on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:flex-[2] h-[340px] lg:h-[480px]"
        >
          <iframe
            src={MAP_URL}
            title="Spark Fitness Zone location"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Info panel */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className={[
            "w-full lg:flex-[1]",
            "flex flex-col justify-center gap-8",
            "px-[5vw] lg:px-12 py-12",
            "bg-charcoal border-t lg:border-t-0 lg:border-l border-dark-gray",
          ].join(" ")}
        >
          {INFO.map((item) => (
            <div key={item.label} className="flex gap-4 items-start">
              <div className="mt-[2px] shrink-0 text-red">{item.icon}</div>
              <div>
                <p className="font-condensed text-[0.7rem] tracking-[0.2em] uppercase text-gray mb-1">
                  {item.label}
                </p>
                <p className="font-body text-[0.92rem] font-light leading-[1.75] text-offwhite">
                  {item.value}
                </p>
              </div>
            </div>
          ))}

          {/* Directions CTA */}
          <a
            href="https://share.google/rvpHgGX6CVHHtQ3AE"
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "inline-flex items-center gap-3 w-fit mt-2",
              "font-condensed text-[0.8rem] tracking-[0.15em] uppercase",
              "px-6 py-[11px] bg-red text-white",
              "hover:bg-red-hot hover:-translate-y-px",
              "transition-[background,transform] duration-200",
            ].join(" ")}
          >
            Get Directions
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
