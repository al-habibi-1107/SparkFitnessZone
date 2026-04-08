import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Welcome — You're In",
  description: "Your membership at Spark Fitness Zone is confirmed. Welcome to the team.",
};

export default function WelcomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-[5vw] bg-black">
      <div className="max-w-[540px] w-full text-center">

        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-8 border border-red/40 bg-red/10">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        {/* Label */}
        <div className="flex items-center justify-center gap-[0.6rem] mb-4">
          <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
          <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
            Payment Confirmed
          </span>
          <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
        </div>

        {/* Headline */}
        <h1
          className="font-display text-white leading-none tracking-[0.03em] mb-4"
          style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
        >
          YOU&apos;RE<br />
          <span className="text-red">IN.</span>
        </h1>

        <p className="font-body text-[1rem] font-light leading-[1.75] text-offwhite mb-2 max-w-[420px] mx-auto">
          Welcome to Spark Fitness Zone. Your membership is active — come in anytime between 5 AM and 11 PM.
        </p>
        <p className="font-body text-[0.88rem] font-light leading-[1.7] text-gray mb-10 max-w-[420px] mx-auto">
          A confirmation will be sent to your email. Show this to the front desk on your first visit.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-3 font-condensed text-[0.82rem] tracking-[0.15em] uppercase px-8 py-4 bg-red text-white hover:bg-red-hot transition-colors duration-200"
          >
            Book a Session
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center font-condensed text-[0.82rem] tracking-[0.15em] uppercase px-8 py-4 border border-dark-gray text-gray hover:text-white hover:border-white/30 transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}
