// Membership section fetches plan prices from Razorpay at request time
export const dynamic = "force-dynamic";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Trainers from "@/components/sections/Trainers";
import Equipment from "@/components/sections/Equipment";
import Reviews from "@/components/sections/Reviews";
import BookingStrip from "@/components/sections/BookingStrip";
import Membership from "@/components/sections/Membership";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Trainers />
      <Equipment />
      <Reviews />
      <BookingStrip />
      <Membership />
    </>
  );
}
