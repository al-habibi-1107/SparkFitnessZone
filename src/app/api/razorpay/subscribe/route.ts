import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  const razorpay = new Razorpay({
    key_id:     process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
  const { planId, name, phone } = (await req.json()) as {
    planId: string;
    name:   string;
    phone:  string;
  };

  if (!planId || !name || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const subscription = await razorpay.subscriptions.create({
    plan_id:        planId,
    total_count:    120,          // 10 years max — Razorpay requires a value
    quantity:       1,
    notes: {
      member_name:  name,
      member_phone: phone,
    },
  });

  return NextResponse.json({
    subscriptionId: subscription.id,
    keyId:          process.env.RAZORPAY_KEY_ID,
  });
}
