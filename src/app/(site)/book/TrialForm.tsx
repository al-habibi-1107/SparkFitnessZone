"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ── Trainers for the dropdown (mirrors BookTrainer static list) ───────────────

const TRAINERS = [
  "Niraj Kumar — Senior Trainer",
  "Biswanath Kumar — Assistant Trainer",
  "Bikash Kumar — Assistant Trainer",
  "Faizan — Assistant Trainer",
  "Alik Patra — Founder",
] as const;

// ── Types ─────────────────────────────────────────────────────────────────────

type Field = "name" | "email" | "phone";

interface FormState {
  name:              string;
  email:             string;
  phone:             string;
  trainerPreference: string;
  goal:              string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function TrialForm() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", trainerPreference: "", goal: "",
  });
  const [errors,  setErrors]  = useState<Partial<Record<Field, string>>>({});
  const [busy,    setBusy]    = useState(false);
  const [apiError, setApiError] = useState("");

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field in errors) setErrors((prev) => { const next = { ...prev }; delete next[field as Field]; return next; });
  }

  function validate(): boolean {
    const next: Partial<Record<Field, string>> = {};
    if (!form.name.trim())                                          next.name  = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))    next.email = "Enter a valid email address.";
    if (form.phone.trim().length < 10)                             next.phone = "Enter a valid 10-digit phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setBusy(true);
    setApiError("");

    try {
      const res = await fetch("/api/book-trial", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        setApiError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      router.push("/welcome");
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-[640px] mx-auto"
    >
      {/* Red top accent */}
      <div className="h-[3px] bg-red w-full mb-10" aria-hidden="true" />

      <div className="space-y-6">

        {/* Name + Phone — side by side on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="trial-name"
            label="Full Name"
            required
            error={errors.name}
          >
            <input
              id="trial-name"
              type="text"
              autoComplete="name"
              placeholder="Rahul Mehta"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputCls(!!errors.name)}
            />
          </FormField>

          <FormField
            id="trial-phone"
            label="Phone Number"
            required
            error={errors.phone}
          >
            <input
              id="trial-phone"
              type="tel"
              autoComplete="tel"
              placeholder="98765 43210"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
              className={inputCls(!!errors.phone)}
            />
          </FormField>
        </div>

        {/* Email */}
        <FormField
          id="trial-email"
          label="Email Address"
          required
          error={errors.email}
        >
          <input
            id="trial-email"
            type="email"
            autoComplete="email"
            placeholder="rahul@example.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputCls(!!errors.email)}
          />
        </FormField>

        {/* Trainer preference */}
        <FormField id="trial-trainer" label="Preferred Trainer">
          <select
            id="trial-trainer"
            value={form.trainerPreference}
            onChange={(e) => set("trainerPreference", e.target.value)}
            className={inputCls(false) + " appearance-none"}
          >
            <option value="">No preference — assign me one</option>
            {TRAINERS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </FormField>

        {/* Goal */}
        <FormField id="trial-goal" label="Your Goal (optional)">
          <textarea
            id="trial-goal"
            rows={3}
            placeholder="e.g. Lose 10 kg, build muscle, improve overall fitness…"
            value={form.goal}
            onChange={(e) => set("goal", e.target.value)}
            className={inputCls(false) + " resize-none"}
          />
        </FormField>

      </div>

      {/* API error */}
      {apiError && (
        <p className="mt-4 font-condensed text-[0.75rem] tracking-[0.08em] text-red">
          {apiError}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={busy}
        className={[
          "mt-8 w-full py-5",
          "font-condensed text-[0.88rem] tracking-[0.2em] uppercase",
          "bg-red text-white border-2 border-red",
          "hover:bg-transparent hover:text-red",
          "transition-all duration-200",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "flex items-center justify-center gap-3",
        ].join(" ")}
      >
        {busy ? (
          <><Spinner /> Sending…</>
        ) : (
          <>
            Book My Free Trial
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>

      {/* Trust row */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-5">
        <TrustBadge icon="✓" label="100% Free — no credit card" />
        <TrustBadge icon="✓" label="We'll call you within 24 hrs" />
        <TrustBadge icon="✓" label="No commitment required" />
      </div>
    </form>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function inputCls(hasError: boolean) {
  return [
    "w-full px-4 py-[13px]",
    "bg-black/40 border text-white font-body text-[0.92rem]",
    "placeholder:text-gray/40 outline-none",
    "transition-colors duration-150",
    hasError ? "border-red/70 focus:border-red" : "border-dark-gray focus:border-white/40",
  ].join(" ");
}

function FormField({
  id, label, required = false, error, children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-condensed text-[0.68rem] tracking-[0.2em] uppercase text-gray mb-[7px]"
      >
        {label}
        {required && <span className="text-red ml-[3px]">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-[5px] font-condensed text-[0.68rem] tracking-[0.06em] text-red">
          {error}
        </p>
      )}
    </div>
  );
}

function TrustBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-[5px]">
      <span className="text-red text-[0.7rem]" aria-hidden="true">{icon}</span>
      <span className="font-condensed text-[0.65rem] tracking-[0.1em] uppercase text-gray">{label}</span>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
