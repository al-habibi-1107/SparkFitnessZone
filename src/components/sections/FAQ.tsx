"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What is a PR in the gym?",
    a: "PR stands for Personal Record — your best-ever performance on a lift or cardio effort. Hitting a new PR on your squat, bench press, or deadlift is one of the most motivating milestones in training. At Spark Fitness Zone, our trainers track your PRs from day one and programme your training specifically to help you break them consistently.",
  },
  {
    q: "What should I eat before going to the gym?",
    a: "A balanced pre-workout meal eaten 60–90 minutes before training gives you the best energy. Aim for a combination of complex carbs and protein: rice and dal, oats with banana, or whole grain toast with eggs. If you train early in the morning (gym jane se pehle kya khaye is one of the most common questions we get), a banana with peanut butter or a light protein smoothie works well for a quick fuel-up without feeling heavy.",
  },
  {
    q: "What should I eat after the gym?",
    a: "Post-workout nutrition is critical for muscle recovery. Commonly asked as 'gym karne ke baad kya khaye' or 'gym se aane ke baad kya khaye,' the answer is: eat a high-protein meal within 30–60 minutes of finishing your session. Good options include paneer, eggs, chicken, or a whey protein shake alongside rice or roti to replenish glycogen. Skipping this meal slows recovery significantly.",
  },
  {
    q: "What is the best time to go to the gym?",
    a: "The best time is the time you will consistently show up. Morning sessions (5–9 AM) improve daily energy and metabolic rate. Evening sessions (5–9 PM) tend to produce peak physical performance since your body temperature and muscle activation are highest then. Spark Fitness Zone is open from 5:00 AM to 11:00 PM every day, so you can train whenever you perform best.",
  },
  {
    q: "What is cardio in the gym?",
    a: "Cardio (cardiovascular exercise) is any sustained activity that raises your heart rate and strengthens your heart and lungs — treadmill running, cycling, elliptical, rowing, or jump rope. At Spark Fitness Zone, our dedicated cardio zone includes treadmills, stationary bikes, and ellipticals. Our trainers also programme high-intensity interval training (HIIT) for members who want faster fat loss alongside strength work.",
  },
  {
    q: "Is the gym good for health?",
    a: "Yes — regular strength and cardio training is one of the most evidence-backed investments you can make in your long-term health. It improves bone density, muscle mass, metabolism, hormonal health, cardiovascular function, and mental wellbeing. Whether your goal is weight management, strength, endurance, or stress reduction, a structured gym programme delivers measurable results. Every Spark Fitness Zone member gets a personalised plan built around their specific health goals.",
  },
  {
    q: "Does gym training increase height?",
    a: "After your growth plates close (typically around age 18–20), no exercise can increase your height. However, strength training dramatically improves posture, spinal alignment, and core strength, which can make you stand noticeably taller and more upright. For teenagers whose growth plates are still open, resistance training with correct form is safe — the old idea that lifting stunts growth has been thoroughly disproven by research.",
  },
  {
    q: "Yoga or gym — which is better?",
    a: "Both serve different goals. Gym training is superior for building muscle, increasing strength, and improving body composition. Yoga excels at flexibility, mobility, stress reduction, and mental clarity. At Spark Fitness Zone, we incorporate mobility and recovery work into all training programmes so you benefit from both. Many of our members combine gym training with yoga sessions and see faster overall progress as a result.",
  },
  {
    q: "How do I increase strength in the gym?",
    a: "Progressive overload is the key principle: consistently increasing the weight, reps, or intensity of your lifts over time. Focus on compound movements — squat, deadlift, bench press, and overhead press — eat sufficient protein (1.6–2.2 g per kg of bodyweight), and prioritise sleep. Our trainers at Spark Fitness Zone design structured progressive overload programmes so your strength improves week to week, not just session to session.",
  },
  {
    q: "How do I choose the right gym wear?",
    a: "Prioritise function over fashion. For lifting: fitted compression shorts or track pants with a breathable dry-fit t-shirt. Avoid loose clothing near free weights — it is a safety hazard. For footwear, flat-soled shoes are better for squats and deadlifts than cushioned running shoes. Lightweight joggers work well for cardio days. Good gym wear that moves with you and wicks sweat will make every session noticeably more comfortable.",
  },
  {
    q: "What is 'natty' in gym culture?",
    a: "'Natty' is short for natural — it refers to athletes who build their physique entirely without performance-enhancing drugs or anabolic steroids. Being natty means your results come purely from consistent training, proper nutrition, and recovery. Our coaches at Spark Fitness Zone specialise in helping natural athletes make serious, drug-free progress — no shortcuts, no shortcuts needed.",
  },
  {
    q: "Is Spark Fitness Zone suitable for beginners?",
    a: "Absolutely. Our coaches work with members at every level — from first-timers to competitive athletes. We offer a free introductory session where your trainer assesses your current fitness and builds a programme tailored to you specifically, not a generic template.",
  },
  {
    q: "What are the gym timings?",
    a: "We are open every single day — including Sundays and public holidays — from 5:00 AM to 11:00 PM. Both early morning and late evening slots are fully staffed with certified trainers.",
  },
  {
    q: "What equipment and zones are available?",
    a: "The gym spans two floors. Zones include: strength machines, free weights (full dumbbell and barbell setup), cardio (treadmills, bikes, ellipticals), and a dedicated functional training area with battle ropes, sleds, and plyometric equipment.",
  },
  {
    q: "Can I cancel or pause my membership?",
    a: "Monthly plans can be cancelled before the next billing cycle with no penalty. Quarterly and Annual plans can be paused once per term for up to 30 days for medical or travel reasons. No lock-in contracts, no hidden fees.",
  },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-black">
      <div className="max-w-[1320px] mx-auto px-[5vw] py-16 md:py-[7rem]">

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
                    <p className="pb-6 pr-4 md:pr-10 font-body text-[0.95rem] font-light leading-[1.8] text-offwhite max-w-[720px]">
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
