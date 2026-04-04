import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

// ── Validation helpers ────────────────────────────────────────────────────────

/** Indian mobile numbers: start with 6-9, exactly 10 digits */
const PHONE_RE  = /^[6-9]\d{9}$/;
/** Razorpay plan IDs always start with "plan_" */
const PLAN_ID_RE = /^plan_[A-Za-z0-9]+$/;
/** Name: 2–100 chars, letters / spaces / hyphens / apostrophes */
const NAME_RE   = /^[\p{L}\s'\-]{2,100}$/u;

// ── Route ─────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: { planId?: unknown; name?: unknown; phone?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { planId, name, phone } = body;

  // ── Server-side validation ──────────────────────────────────────────────────
  if (typeof planId !== "string" || !PLAN_ID_RE.test(planId)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }
  if (typeof name !== "string" || !NAME_RE.test(name.trim())) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }
  if (typeof phone !== "string" || !PHONE_RE.test(phone.trim())) {
    return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
  }

  const safeName  = name.trim();
  const safePhone = phone.trim();

  // ── Create Razorpay subscription ────────────────────────────────────────────
  try {
    const razorpay = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const subscription = await razorpay.subscriptions.create({
      plan_id:     planId,
      total_count: 120,   // Razorpay requires a value; 120 months = 10 yr cap
      quantity:    1,
      notes: {
        member_name:  safeName,
        member_phone: safePhone,
        // member_id populated after the member record is created in the success flow
      },
    });

    // key_id (rzp_live_… / rzp_test_…) is the PUBLIC identifier Razorpay
    // Checkout requires on the client — it is not a secret.
    return NextResponse.json({
      subscriptionId: subscription.id,
      keyId:          process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("[razorpay/subscribe] Subscription creation failed:", err);
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 });
  }
}
