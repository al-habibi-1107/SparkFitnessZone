import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";
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

// ── Email alert ───────────────────────────────────────────────────────────────

async function sendMembershipAlert(name: string, email: string, phone: string, planId: string): Promise<void> {
  const alertEmail = process.env.ALERT_EMAIL;
  const smtpUser   = process.env.SMTP_USER;
  const smtpPass   = process.env.SMTP_PASS;

  if (!alertEmail || !smtpUser || !smtpPass) return;

  const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST ?? "smtp.gmail.com",
    port:   Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth:   { user: smtpUser, pass: smtpPass },
  });

  const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const bccEmail = process.env.BCC_EMAIL;

  await transporter.sendMail({
    from:    `"Spark Fitness Zone" <${smtpUser}>`,
    to:      alertEmail,
    ...(bccEmail ? { bcc: bccEmail } : {}),
    subject: `New Membership Sign-Up — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#111;color:#D8D0C4;padding:32px;border-top:3px solid #D62828">
        <h1 style="font-size:1.6rem;margin:0 0 4px 0;color:#fff">New Membership Sign-Up</h1>
        <p style="margin:0 0 24px 0;color:#888;font-size:0.85rem">${submittedAt}</p>
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;width:36%">Name</td>
            <td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-size:0.9rem">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-size:0.9rem"><a href="mailto:${email}" style="color:#D62828">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em">Phone</td>
            <td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-size:0.9rem"><a href="tel:${phone}" style="color:#D62828">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em">Plan ID</td>
            <td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-size:0.9rem">${planId}</td>
          </tr>
        </table>
        <div style="margin-top:28px;padding:16px;background:#1a1a1a;border-left:3px solid #D62828">
          <p style="margin:0;font-size:0.8rem;color:#888">Payment pending — follow up if checkout was not completed.</p>
        </div>
      </div>
    `,
    replyTo: email,
  });
}

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

    // ── 2. Alert email (fire-and-forget) ────────────────────────────────────
    sendMembershipAlert(safeName, safeEmail, safePhone, planId).catch((err) =>
      console.error("[razorpay/subscribe] Email alert failed:", err)
    );

    // ── 4. Razorpay — skip when not configured or using placeholder ─────────
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
