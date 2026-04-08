import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createMember } from "@/lib/firebase/admin";

// ── Validation helpers ────────────────────────────────────────────────────────

/** Indian mobile numbers: start with 6-9, exactly 10 digits */
const PHONE_RE   = /^[6-9]\d{9}$/;
/** Razorpay plan IDs always start with "plan_" — includes our placeholder */
const PLAN_ID_RE = /^plan_[A-Za-z0-9]+$/;
/** Name: 2–100 chars, letters / spaces / hyphens / apostrophes */
const NAME_RE    = /^[\p{L}\s'\-]{2,100}$/u;
/** Basic email format */
const EMAIL_RE   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Route ─────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: { planId?: unknown; name?: unknown; email?: unknown; phone?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { planId, name, email, phone } = body;

  // ── Server-side validation ──────────────────────────────────────────────────
  if (typeof planId !== "string" || !PLAN_ID_RE.test(planId)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }
  if (typeof name !== "string" || !NAME_RE.test(name.trim())) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }
  if (typeof phone !== "string" || !PHONE_RE.test(phone.trim())) {
    return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
  }

  const safeName  = name.trim();
  const safeEmail = email.trim().toLowerCase();
  const safePhone = phone.trim();

  try {
    // ── 1. Create member in Firestore ───────────────────────────────────────
    const member = await createMember({
      name:  safeName,
      email: safeEmail,
      phone: safePhone,
    });

    // ── 2. Razorpay — skip when not configured or using placeholder ─────────
    const razorpayReady =
      process.env.RAZORPAY_KEY_ID &&
      process.env.RAZORPAY_KEY_SECRET &&
      planId !== "plan_placeholder";

    if (!razorpayReady) {
      // Lead saved to Firebase; payment will be collected when Razorpay is live.
      return NextResponse.json({ subscriptionId: null, keyId: null });
    }

    const razorpay = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const subscription = await razorpay.subscriptions.create({
      plan_id:     planId,
      total_count: 120,
      quantity:    1,
      notes: {
        member_id:    member.id,
        member_name:  safeName,
        member_phone: safePhone,
      },
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      keyId:          process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("[razorpay/subscribe] Failed:", err);
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 });
  }
}
