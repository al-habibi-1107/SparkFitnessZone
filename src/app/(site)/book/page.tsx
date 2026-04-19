import type { Metadata } from "next";
import TrialForm          from "./TrialForm";

export const metadata: Metadata = {
  title: "Book a Free Trial",
  description:
    "Schedule a free introductory session at Spark Fitness Zone. Meet a coach, see the facility, and experience Jamshedpur's premier gym — no commitment required.",
};

const WHAT_TO_EXPECT = [
  "45-min guided session with a certified trainer",
  "Full facility tour across both floors",
  "Personalised fitness assessment",
  "Zero obligation — no pressure to join",
] as const;

export default function BookPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Intro header ───────────────────────────────────────────── */}
      <section className="bg-charcoal border-b border-dark-gray px-[5vw] py-16">
        <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

          {/* Left: headline */}
          <div className="max-w-[560px]">
            <div className="flex items-center gap-[0.6rem] mb-3">
              <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
              <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
                It&apos;s Free
              </span>
            </div>
            <h1
              className="font-display leading-none tracking-[0.03em] text-white mb-4"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}
            >
              BOOK YOUR<br />
              <span className="text-red">FREE TRIAL</span>
            </h1>
            <p className="font-body text-[1rem] font-light leading-[1.75] text-offwhite max-w-[440px]">
              Come see the facility, meet the team, and experience the difference — before
              spending a single rupee. Fill in your details and we&apos;ll call you to confirm
              your slot.
            </p>
          </div>

          {/* Right: what to expect */}
          <div className="flex flex-col gap-4">
            <p className="font-condensed text-[0.72rem] tracking-[0.2em] uppercase text-gray">
              What to expect
            </p>
            <ul className="flex flex-col gap-3">
              {WHAT_TO_EXPECT.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" className="text-red text-[0.8rem] mt-[3px] shrink-0">→</span>
                  <span className="font-condensed text-[0.9rem] tracking-[0.06em] uppercase text-offwhite">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Form ───────────────────────────────────────────────────── */}
      <div className="flex-1 bg-black px-[5vw] py-16">
        <TrialForm />
      </div>

    </div>
  );
}
