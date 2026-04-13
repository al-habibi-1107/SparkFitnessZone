"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// ── Razorpay types ────────────────────────────────────────────────────────────

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface RazorpayOptions {
  key:             string;
  subscription_id: string;
  name:            string;
  description:     string;
  prefill:         { name: string; email: string; contact: string };
  theme:           { color: string };
  modal:           { ondismiss: () => void };
  handler:         (response: { razorpay_payment_id: string }) => void;
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  planId:   string;
  planName: string;
  price:    string;
  period:   string;
  features: readonly string[];
  featured: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function EnrolButton({
  planId, planName, price, period, features, featured,
}: Props) {
  const [open, setOpen]   = useState(false);
  const [step, setStep]   = useState<1 | 2>(1);
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy]   = useState(false);
  const [error, setError] = useState("");
  const nameRef           = useRef<HTMLInputElement>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Focus name field when step 2 mounts
  useEffect(() => {
    if (open && step === 2) {
      const t = setTimeout(() => nameRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open, step]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && !busy) setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, busy]);

  function handleOpen() {
    setStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setError("");
    setOpen(true);
  }

  function handleClose() {
    if (busy) return;
    setOpen(false);
  }

  async function handlePay() {
    setError("");
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError("Enter a valid email address."); return; }
    if (phone.trim().length < 10) { setError("Enter a valid 10-digit phone number."); return; }

    setBusy(true);
    try {
      const res = await fetch("/api/razorpay/subscribe", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ planId, name: name.trim(), email: email.trim(), phone: phone.trim() }),
      });

      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        return;
      }

      const data = (await res.json()) as { subscriptionId: string | null; keyId: string | null };

      setOpen(false);

      // Razorpay not yet live — lead saved, go straight to welcome
      if (!data.keyId || !data.subscriptionId) {
        window.location.href = "/welcome";
        return;
      }

      const rzp = new window.Razorpay({
        key:             data.keyId,
        subscription_id: data.subscriptionId,
        name:            "Spark Fitness Zone",
        description:     planName,
        prefill:         { name: name.trim(), email: email.trim(), contact: phone.trim() },
        theme:           { color: "#D62828" },
        modal:           { ondismiss: () => {} },
        handler:         () => { window.location.href = "/welcome"; },
      });
      rzp.open();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const topFeatures = features.slice(0, 3);

  return (
    <>
      {/* ── Trigger button ────────────────────────────────────── */}
      <button
        type="button"
        onClick={handleOpen}
        className={[
          "w-full py-[14px]",
          "font-condensed text-[0.8rem] tracking-[0.15em] uppercase",
          "border transition-all duration-200 cursor-pointer",
          featured
            ? "bg-red text-white border-red hover:bg-red-hot"
            : "bg-transparent text-gray border-dark-gray hover:bg-red hover:text-white hover:border-red",
        ].join(" ")}
      >
        Be a Member
      </button>

      {/* ── Modal (portal — escapes card's CSS transform stacking context) ── */}
      {open && createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            style={{ zIndex: 10000 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Enrol in ${planName}`}
            className="fixed inset-0 flex items-center justify-center px-4 pointer-events-none"
            style={{ zIndex: 10001 }}
          >
            <div
              className="relative w-full max-w-[480px] bg-carbon border border-dark-gray pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Red top bar */}
              <div className="h-[3px] bg-red w-full" aria-hidden="true" />

              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                disabled={busy}
                aria-label="Close"
                className="absolute top-4 right-4 text-gray hover:text-white transition-colors duration-150 cursor-pointer disabled:opacity-40"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">

                {/* ── Step indicator ──────────────────────── */}
                <div className="flex items-center gap-2 mb-6">
                  {([1, 2] as const).map((s) => (
                    <div
                      key={s}
                      className={[
                        "h-[2px] flex-1 transition-colors duration-300",
                        step >= s ? "bg-red" : "bg-dark-gray",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* ══ STEP 1 — Plan confirmation ═══════════════════ */}
                {step === 1 && (
                  <div>
                    <p className="font-condensed text-[0.68rem] tracking-[0.22em] uppercase text-red mb-1">
                      You selected
                    </p>
                    <h3 className="font-display text-[2.6rem] leading-none tracking-[0.03em] text-white mb-1">
                      {planName.toUpperCase()}
                    </h3>
                    <p className="font-condensed text-[0.75rem] tracking-[0.1em] uppercase text-gray mb-6">
                      {period}
                    </p>

                    {/* Price callout */}
                    <div className="bg-black/40 border border-dark-gray px-6 py-4 mb-6 flex items-baseline gap-2">
                      <span className="font-display text-[2.8rem] leading-none text-white tracking-[0.02em]">
                        {price}
                      </span>
                      <span className="font-condensed text-[0.8rem] text-gray uppercase tracking-[0.1em]">
                        {period.split("—")[0].trim().toLowerCase()}
                      </span>
                    </div>

                    {/* Top features */}
                    <ul className="mb-7 space-y-[6px]">
                      {topFeatures.map((f) => (
                        <li key={f} className="flex items-start gap-3 font-body text-[0.85rem] font-light text-offwhite">
                          <span className="text-red mt-[2px] shrink-0 text-[0.75rem]">✓</span>
                          {f}
                        </li>
                      ))}
                      {features.length > 3 && (
                        <li className="font-condensed text-[0.68rem] tracking-[0.1em] uppercase text-gray pl-[21px]">
                          + {features.length - 3} more benefits
                        </li>
                      )}
                    </ul>

                    {/* Social proof */}
                    <div className="flex items-center gap-2 mb-7">
                      <div className="flex -space-x-2" aria-hidden="true">
                        {["R","S","A","D"].map((initial) => (
                          <div key={initial} className="w-7 h-7 rounded-full bg-dark-gray border border-carbon flex items-center justify-center">
                            <span className="font-display text-[0.7rem] leading-none text-red">{initial}</span>
                          </div>
                        ))}
                      </div>
                      <p className="font-condensed text-[0.7rem] tracking-[0.08em] text-gray">
                        <span className="text-white">800+ members</span> already training here
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-4 bg-red text-white font-condensed text-[0.85rem] tracking-[0.18em] uppercase hover:bg-red-hot transition-colors duration-200 cursor-pointer flex items-center justify-center gap-3"
                    >
                      Start My Journey
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* ══ STEP 2 — Contact details ══════════════════════ */}
                {step === 2 && (
                  <div>
                    <p className="font-condensed text-[0.68rem] tracking-[0.22em] uppercase text-red mb-1">
                      Almost there
                    </p>
                    <h3 className="font-display text-[2.2rem] leading-none tracking-[0.03em] text-white mb-1">
                      YOUR DETAILS
                    </h3>
                    <p className="font-body text-[0.85rem] font-light text-gray mb-7 leading-[1.6]">
                      We&apos;ll use this to set up your membership account.
                    </p>

                    {/* Inputs */}
                    <div className="space-y-3 mb-2">
                      <div>
                        <label htmlFor="enrol-name" className="block font-condensed text-[0.65rem] tracking-[0.18em] uppercase text-gray mb-[6px]">
                          Full Name
                        </label>
                        <input
                          ref={nameRef}
                          id="enrol-name"
                          type="text"
                          autoComplete="name"
                          placeholder="Rahul Mehta"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handlePay()}
                          className={[
                            "w-full px-4 py-[13px]",
                            "bg-black/40 border text-white font-body text-[0.9rem]",
                            "placeholder:text-gray/40 outline-none",
                            "transition-colors duration-150",
                            error && !name.trim()
                              ? "border-red/70 focus:border-red"
                              : "border-dark-gray focus:border-white/40",
                          ].join(" ")}
                        />
                      </div>
                      <div>
                        <label htmlFor="enrol-email" className="block font-condensed text-[0.65rem] tracking-[0.18em] uppercase text-gray mb-[6px]">
                          Email Address
                        </label>
                        <input
                          id="enrol-email"
                          type="email"
                          autoComplete="email"
                          placeholder="rahul@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handlePay()}
                          className={[
                            "w-full px-4 py-[13px]",
                            "bg-black/40 border text-white font-body text-[0.9rem]",
                            "placeholder:text-gray/40 outline-none",
                            "transition-colors duration-150",
                            error && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
                              ? "border-red/70 focus:border-red"
                              : "border-dark-gray focus:border-white/40",
                          ].join(" ")}
                        />
                      </div>
                      <div>
                        <label htmlFor="enrol-phone" className="block font-condensed text-[0.65rem] tracking-[0.18em] uppercase text-gray mb-[6px]">
                          Phone Number
                        </label>
                        <input
                          id="enrol-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          onKeyDown={(e) => e.key === "Enter" && handlePay()}
                          className={[
                            "w-full px-4 py-[13px]",
                            "bg-black/40 border text-white font-body text-[0.9rem]",
                            "placeholder:text-gray/40 outline-none",
                            "transition-colors duration-150",
                            error && phone.trim().length < 10
                              ? "border-red/70 focus:border-red"
                              : "border-dark-gray focus:border-white/40",
                          ].join(" ")}
                        />
                      </div>
                    </div>

                    {/* Inline error */}
                    {error && (
                      <p className="font-condensed text-[0.72rem] tracking-[0.08em] text-red mb-4 mt-2">
                        {error}
                      </p>
                    )}

                    {/* Pay CTA */}
                    <button
                      type="button"
                      onClick={handlePay}
                      disabled={busy}
                      className="w-full mt-5 py-4 bg-red text-white font-condensed text-[0.85rem] tracking-[0.18em] uppercase hover:bg-red-hot transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {busy ? (
                        <>
                          <Spinner />
                          Processing…
                        </>
                      ) : (
                        <>
                          Proceed to Secure Payment
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>

                    {/* Trust row */}
                    <div className="flex items-center justify-center gap-5 mt-5">
                      <TrustBadge icon="🔒" label="Secure payment" />
                      <span aria-hidden="true" className="w-px h-4 bg-dark-gray" />
                      <TrustBadge icon="↩" label="Cancel anytime" />
                      <span aria-hidden="true" className="w-px h-4 bg-dark-gray" />
                      <TrustBadge icon="⚡" label="Instant access" />
                    </div>

                    {/* Back */}
                    <button
                      type="button"
                      onClick={() => { setStep(1); setError(""); }}
                      disabled={busy}
                      className="flex items-center gap-1 mx-auto mt-5 font-condensed text-[0.68rem] tracking-[0.12em] uppercase text-gray hover:text-white transition-colors duration-150 cursor-pointer disabled:opacity-40"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        </>,
        document.body,
      )}
    </>
  );
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function TrustBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-[5px]">
      <span className="text-[0.75rem]" aria-hidden="true">{icon}</span>
      <span className="font-condensed text-[0.62rem] tracking-[0.1em] uppercase text-gray">{label}</span>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
