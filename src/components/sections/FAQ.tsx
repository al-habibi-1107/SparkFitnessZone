"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Is Spark Fitness Zone suitable for beginners?",
    a: "Absolutely. Our coaches work with members at every level — from first-timers to competitive athletes. We offer a free introductory session where your trainer will assess your current fitness and build a programme tailored to you, not a generic template.",
  },
  {
    q: "What are the gym timings?",
    a: "We're open every single day — including Sundays and public holidays — from 5:00 AM to 11:00 PM. Both early morning and late evening slots are fully staffed with certified trainers.",
  },
  {
    q: "Can I cancel or pause my membership?",
    a: "Monthly plans can be cancelled before the next billing cycle with no penalty. Quarterly and Annual plans can be paused once per term for up to 30 days (medical or travel). No lock-in contracts, no hidden fees.",
  },
  {
    q: "Do I get access to a personal trainer?",
    a: "All plans include at least one dedicated trainer consultation per month. The Quarterly plan includes 2 PT sessions/month, and the Annual plan includes unlimited PT sessions with a dedicated trainer assigned exclusively to you.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major Indian payment methods are accepted: UPI (GPay, PhonePe, Paytm), debit and credit cards, and net banking — all secured via Razorpay. Subscriptions auto-renew and can be managed or cancelled from your Razorpay account.",
  },
  {
    q: "What equipment and zones are available?",
    a: "The gym spans two floors. Zones include: strength machines, free weights (full dumbbell and barbell setup), cardio (treadmills, bikes, ellipticals), and a dedicated functional training area with battle ropes, sleds, and plyometric equipment.",
  },
  {
    q: "Is there parking, and are there changing rooms?",
    a: "Parking is available at Shalimar Plaza. The gym has separate changing rooms for men and women, with lockers and shower facilities included in every membership plan.",
  },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-black">
      <div className="max-w-[1320px] mx-auto px-[5vw] py-[7rem]">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
          <div className="max-w-[520px]">
            <div className="flex items-center gap-[0.6rem] mb-3">
              <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
              <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                Got Questions
              </span>
            </div>
            <h2
              className="font-display leading-none tracking-[0.03em] text-white mb-4"
              style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
            >
              FREQUENTLY<br />
              <span className="text-dark-gray">ASKED</span>
            </h2>
            <p className="font-body text-[1rem] font-light leading-[1.75] text-offwhite">
              Everything you need to know before you walk through the door.
              Still have questions? Call us or come in for a free tour.
            </p>
          </div>

          {/* CTA nudge */}
          <a
            href="/book"
            className={[
              "inline-flex items-center gap-3 shrink-0 self-start lg:self-auto",
              "font-condensed text-[0.82rem] tracking-[0.15em] uppercase",
              "px-8 py-4 border border-red text-red",
              "hover:bg-red hover:text-white",
              "transition-all duration-200",
            ].join(" ")}
          >
            Book a Free Tour
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* ── Accordion ──────────────────────────────────────────── */}
        <div className="border-t border-dark-gray">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-dark-gray">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group cursor-pointer"
              >
                <span className="font-condensed text-[1rem] tracking-[0.04em] uppercase text-white group-hover:text-red transition-colors duration-200">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.22 }}
                  className="shrink-0 text-red"
                  aria-hidden="true"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-10 font-body text-[0.95rem] font-light leading-[1.8] text-offwhite max-w-[720px]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
