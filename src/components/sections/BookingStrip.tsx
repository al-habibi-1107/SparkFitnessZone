import Link from "next/link";

// ── Component ─────────────────────────────────────────────────────────────────
//
// Full-bleed red CTA strip that directs users to the /book page.
// Booking is handled by the Cal.com iframe on that page — no form here.

export default function BookingStrip() {
  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-red py-20 px-[5vw]"
    >
      {/* ── Large ghost text ────────────────────────────────────── */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-display select-none"
        style={{
          fontSize: "22vw",
          color: "rgba(255,255,255,0.05)",
          whiteSpace: "nowrap",
          lineHeight: 1,
        }}
      >
        BOOK
      </span>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1320px] mx-auto flex items-center justify-between gap-12 flex-wrap">

        <div>
          <h2
            className="font-display leading-[0.95] tracking-[0.03em] text-white mb-3"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            BOOK YOUR<br />FREE TRIAL
          </h2>
          <p className="font-body text-[1rem] font-light text-white/80 max-w-[400px] leading-[1.65]">
            Experience Spark Fitness Zone before you commit. One session with one of
            our coaches — completely free, no obligation.
          </p>
        </div>

        <Link
          href="/book"
          className={[
            "inline-flex items-center gap-3",
            "font-condensed text-[0.9rem] tracking-[0.18em] uppercase font-bold",
            "px-10 py-5 bg-white text-red",
            "hover:bg-black hover:text-white",
            "transition-all duration-200",
          ].join(" ")}
        >
          Schedule Now
          <svg
            width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>

      </div>
    </section>
  );
}
