import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/client";

const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

// ── Webhook event shape ───────────────────────────────────────────────────────

interface WebhookEvent {
  event: string;
  payload: {
    subscription: {
      entity: {
        id:     string;
        status: string;
        notes:  { member_id?: string };
      };
    };
  };
}

// ── Route ─────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body      = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Verify signature ────────────────────────────────────────────────────────
  let isValid: boolean;
  try {
    isValid = Razorpay.validateWebhookSignature(body, signature, webhookSecret);
  } catch (err) {
    console.error("[webhook] Signature validation threw:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse payload ───────────────────────────────────────────────────────────
  let event: WebhookEvent;
  try {
    event = JSON.parse(body) as WebhookEvent;
  } catch (err) {
    console.error("[webhook] Invalid JSON payload:", err);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const subscription = event.payload.subscription.entity;
  const memberId     = subscription.notes.member_id;

  // ── Process event ───────────────────────────────────────────────────────────
  try {
    const supabase = createClient();

    if (
      event.event === "subscription.activated" ||
      event.event === "subscription.charged"
    ) {
      if (!memberId) {
        // Subscription was created before a member record existed — log and skip.
        console.warn("[webhook] subscription.activated: no member_id in notes, skipping DB update.", subscription.id);
        return NextResponse.json({ received: true });
      }

      const { error } = await supabase
        .from("members")
        .update({
          subscription_id:     subscription.id,
          subscription_status: subscription.status,
        })
        .eq("id", memberId);

      if (error) {
        console.error("[webhook] DB update failed for activated/charged:", error);
        return NextResponse.json({ error: "DB update failed" }, { status: 500 });
      }
    }

    if (
      event.event === "subscription.cancelled" ||
      event.event === "subscription.expired"
    ) {
      const { error } = await supabase
        .from("members")
        .update({ subscription_status: subscription.status })
        .eq("subscription_id", subscription.id);

      if (error) {
        console.error("[webhook] DB update failed for cancelled/expired:", error);
        return NextResponse.json({ error: "DB update failed" }, { status: 500 });
      }
    }
  } catch (err) {
    console.error("[webhook] Unexpected error during processing:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
