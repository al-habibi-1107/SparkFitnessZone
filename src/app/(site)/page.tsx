// Membership section fetches plan prices from Razorpay at request time
export const dynamic = "force-dynamic";

import Hero        from "@/components/sections/Hero";
import Services    from "@/components/sections/Services";
// import Trainers    from "@/components/sections/Trainers";
import BookTrainer from "@/components/sections/BookTrainer";
import Reviews     from "@/components/sections/Reviews";
import BookingStrip from "@/components/sections/BookingStrip";
import Membership  from "@/components/sections/Membership";
import Equipment   from "@/components/sections/Equipment";
import About       from "@/components/sections/About";
import FAQ         from "@/components/sections/FAQ";

// ── Funnel order (AIDA) ───────────────────────────────────────────────────────
//  1. Hero        — Hook & attention
//  2. Services    — Desire: what transformation we deliver
//  3. Trainers    — Trust: who delivers it
//  4. Reviews     — Social proof before the ask
//  5. BookingStrip— First CTA: low-friction free trial
//  6. Membership  — Pricing with full value already established
//  7. Equipment   — Premium proof / justify the price
//  8. About       — Brand story for fence-sitters
//  9. FAQ         — Kill remaining objections

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      {/* <Trainers /> */}
      <BookTrainer />
      <Reviews />
      <BookingStrip />
      <Membership />
      <Equipment />
      <About />
      <FAQ />
    </>
  );
}
