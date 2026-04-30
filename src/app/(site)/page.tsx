// Membership section fetches plan prices from Razorpay at request time
export const dynamic = "force-dynamic";

import Hero         from "@/components/sections/Hero";
import WhyUsSlider  from "@/components/sections/WhyUsSlider";
import Services     from "@/components/sections/Services";
import Equipment    from "@/components/sections/Equipment";
import BookTrainer  from "@/components/sections/BookTrainer";
import Reviews      from "@/components/sections/Reviews";
import BookingStrip from "@/components/sections/BookingStrip";
import Membership   from "@/components/sections/Membership";
import FAQ          from "@/components/sections/FAQ";
import About        from "@/components/sections/About";

// ── Conversion funnel (AIDA) ──────────────────────────────────────────────────
//
//  ATTENTION
//  1. Hero          — Stop the scroll. Big visual, bold claim, first CTA.
//
//  INTEREST — answer "why should I care?" before they bounce
//  2. WhyUsSlider   — "We cost more because…" — premium proof up front.
//
//  DESIRE — build want before showing price
//  3. Services      — What transformation they'll actually achieve.
//  4. Equipment     — Visual proof: see the facility, feel the quality.
//  5. BookTrainer   — Human element: who will coach them.
//  6. Reviews       — Social proof: people like me got results here.
//
//  ACTION — lowest-friction offer first, then commitment tiers
//  7. BookingStrip  — Free trial CTA. No money, no risk. Easy yes.
//  8. Membership    — Pricing lands after desire is fully built.
//
//  OBJECTION KILLERS — hold the fence-sitters
//  9. FAQ           — Kills price/commitment questions right after pricing.
// 10. About         — Brand story for the slow-burn convert.

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyUsSlider />
      <Services />
      <Equipment />
      <BookTrainer />
      <Reviews />
      <BookingStrip />
      <Membership />
      <FAQ />
      <About />
    </>
  );
}
