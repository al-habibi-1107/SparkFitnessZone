import EnrolButton from "@/components/ui/EnrolButton";
import { isSanityConfigured } from "@/lib/sanity/client";
import { getAllMembershipPlans } from "@/lib/sanity/queries";

// ── Razorpay live-price fetch ─────────────────────────────────────────────────

interface RazorpayPlan {
  id: string;
  item: { amount: number; currency: string };
}

async function fetchRazorpayPlan(planId: string): Promise<RazorpayPlan | null> {
  if (!planId) return null;
  try {
    const credentials = Buffer.from(
      `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`,
    ).toString("base64");

    const res = await fetch(`https://api.razorpay.com/v1/plans/${planId}`, {
      headers: { Authorization: `Basic ${credentials}` },
      next:    { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as RazorpayPlan;
  } catch {
    return null;
  }
}

function formatAmount(plan: RazorpayPlan | null, fallback: string): string {
  if (!plan) return fallback;
  return `₹${(plan.item.amount / 100).toLocaleString("en-IN")}`;
}

// ── Static fallback plan configs ──────────────────────────────────────────────

const STATIC_PLANS = [
  {
    _id:           "monthly-static",
    name:          "Monthly Plan",
    priceSuffix:   "/mo",
    billingNote:   "Billed Monthly",
    priceDisplay:  "₹1,700",
    isFeatured:    false,
    badge:         undefined as string | undefined,
    razorpayPlanId: process.env.RAZORPAY_PLAN_MONTHLY_ID ?? "",
    features: [
      "Full gym access — all zones",
      "Locker & shower access",
      "1 trainer consultation/month",
      "Basic diet guidelines",
      "Group fitness classes",
    ],
  },
  {
    _id:           "quarterly-static",
    name:          "Quarterly Plan",
    priceSuffix:   "/qtr",
    billingNote:   "Billed Every 3 Months — Save 31%",
    priceDisplay:  "₹3,500",
    isFeatured:    true,
    badge:         "Most Popular" as string | undefined,
    razorpayPlanId: process.env.RAZORPAY_PLAN_QUARTERLY_ID ?? "",
    features: [
      "Everything in Monthly",
      "Custom diet plan included",
      "2 PT sessions per month",
      "Progress tracking & check-ins",
      "Priority machine booking",
      "Body composition analysis",
    ],
  },
  {
    _id:           "annual-static",
    name:          "Annual Plan",
    priceSuffix:   "/yr",
    billingNote:   "Billed Annually — Save 61%",
    priceDisplay:  "₹8,000",
    isFeatured:    false,
    badge:         undefined as string | undefined,
    razorpayPlanId: process.env.RAZORPAY_PLAN_ANNUAL_ID ?? "",
    features: [
      "Everything in Quarterly",
      "Unlimited PT sessions",
      "Hormone panel consultation",
      "Monthly nutrition review",
      "Dedicated trainer assignment",
      "Guest passes (4/year)",
      "Free merchandise kit",
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default async function Membership() {
  // Load plan configs — from Sanity if available, else static fallback
  let planConfigs = STATIC_PLANS as typeof STATIC_PLANS;

  if (isSanityConfigured()) {
    try {
      const docs = await getAllMembershipPlans();
      if (docs.length > 0) {
        planConfigs = docs.map((doc) => ({
          _id:            doc._id,
          name:           doc.name,
          priceSuffix:    doc.priceSuffix,
          billingNote:    doc.billingNote,
          priceDisplay:   doc.priceDisplay,
          isFeatured:     doc.isFeatured,
          badge:          doc.badge,
          razorpayPlanId: doc.razorpayPlanId,
          features:       doc.features,
        }));
      }
    } catch {
      // fall through to static
    }
  }

  // Fetch live prices from Razorpay in parallel
  const razorpayPlans = await Promise.all(
    planConfigs.map((cfg) => fetchRazorpayPlan(cfg.razorpayPlanId)),
  );

  return (
    <section id="membership" className="bg-charcoal">
      <div className="max-w-[1320px] mx-auto px-[5vw] py-[7rem]">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-[0.6rem] mb-3">
            <span aria-hidden="true" className="block w-6 h-px bg-red shrink-0" />
            <span className="font-condensed text-[0.72rem] tracking-[0.28em] uppercase text-red">
              Join Today
            </span>
          </div>
          <h2
            className="font-display leading-none tracking-[0.03em] text-white mb-3"
            style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
          >
            MEMBERSHIP<br />
            <span className="text-dark-gray">PLANS</span>
          </h2>
          <p className="font-body text-[1rem] font-light leading-[1.75] text-offwhite max-w-[520px]">
            Enrol directly from this page. Secure payment via UPI, card, or net banking — powered by Razorpay.
          </p>
        </div>

        {/* ── Plans grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {planConfigs.map((cfg, i) => {
            const price = formatAmount(razorpayPlans[i], cfg.priceDisplay);

            return (
              <div
                key={cfg._id}
                className={[
                  "relative p-10 border transition-all duration-300",
                  "hover:-translate-y-[6px]",
                  cfg.isFeatured
                    ? "bg-[#161616] border-red"
                    : "bg-carbon border-dark-gray hover:border-red/40",
                ].join(" ")}
              >
                {/* Popular badge */}
                {cfg.badge && (
                  <span className="absolute -top-px right-8 bg-red font-condensed text-[0.65rem] tracking-[0.15em] uppercase text-white px-[14px] py-[5px]">
                    {cfg.badge}
                  </span>
                )}

                {/* Plan name */}
                <p className="font-condensed text-[0.75rem] tracking-[0.2em] uppercase text-gray mb-4">
                  {cfg.name}
                </p>

                {/* Price */}
                <div className="font-display text-[3.5rem] leading-none tracking-[0.02em] text-white mb-[0.3rem]">
                  {price}{" "}
                  <span className="font-condensed text-[1rem] text-gray">{cfg.priceSuffix}</span>
                </div>

                {/* Period */}
                <p className="font-condensed text-[0.78rem] tracking-[0.1em] uppercase text-red mb-6">
                  {cfg.billingNote}
                </p>

                {/* Divider */}
                <hr className="border-dark-gray mb-6" />

                {/* Features */}
                <ul className="mb-8 space-y-0">
                  {cfg.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-[0.7rem] font-body text-[0.88rem] font-light text-offwhite py-[0.45rem] border-b border-white/[0.04]"
                    >
                      <span aria-hidden="true" className="text-red text-[0.8rem] mt-[1px] shrink-0">→</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <EnrolButton
                  planId={cfg.razorpayPlanId}
                  planName={cfg.name}
                  price={price}
                  period={cfg.billingNote}
                  features={cfg.features}
                  featured={cfg.isFeatured}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
