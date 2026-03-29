import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/client";

const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const isValid = Razorpay.validateWebhookSignature(body, signature, webhookSecret);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body) as {
    event: string;
    payload: {
      subscription: {
        entity: {
          id: string;
          status: string;
          notes: { member_id?: string };
        };
      };
    };
  };

  const supabase = createClient();
  const subscription = event.payload.subscription.entity;

  if (
    event.event === "subscription.activated" ||
    event.event === "subscription.charged"
  ) {
    await supabase
      .from("members")
      .update({
        subscription_id: subscription.id,
        subscription_status: subscription.status,
      })
      .eq("id", subscription.notes.member_id ?? "");
  }

  if (event.event === "subscription.cancelled" || event.event === "subscription.expired") {
    await supabase
      .from("members")
      .update({ subscription_status: subscription.status })
      .eq("subscription_id", subscription.id);
  }

  return NextResponse.json({ received: true });
}
