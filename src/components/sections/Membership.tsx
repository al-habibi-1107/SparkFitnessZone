import EnrolButton from "@/components/ui/EnrolButton";

// ── Razorpay plan fetch ───────────────────────────────────────────────────────

interface RazorpayPlan {
  id: string;
  item: { amount: number; currency: string };
}

async function fetchPlan(planId: string | undefined): Promise<RazorpayPlan | null> {
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

// ── Plan config ───────────────────────────────────────────────────────────────

const PLAN_CONFIGS = [
  {
    envKey:        "RAZORPAY_PLAN_MONTHLY_ID",
    name:          "Monthly Plan",
    period:        "Billed Monthly",
    suffix:        "/mo",
    fallbackPrice: "₹1,499",
    featured:      false,
    badge:         null,
    features: [
      "Full gym access — all zones",
      "Locker & shower access",
      "1 trainer consultation/month",
      "Basic diet guidelines",
      "Group fitness classes",
    ],
  },
  {
    envKey:        "RAZORPAY_PLAN_QUARTERLY_ID",
    name:          "Quarterly Plan",
    period:        "Billed Every 3 Months — Save 20%",
    suffix:        "/qtr",
    fallbackPrice: "₹3,499",
    featured:      true,
    badge:         "Most Popular",
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
    envKey:        "RAZORPAY_PLAN_ANNUAL_ID",
    name:          "Annual Plan",
    period:        "Billed Annually — Save 37%",
    suffix:        "/yr",
    fallbackPrice: "₹11,299",
    featured:      false,
    badge:         null,
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
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default async function Membership() {
  const plans = await Promise.all(
    PLAN_CONFIGS.map((cfg) =>
      fetchPlan(process.env[cfg.envKey as keyof NodeJS.ProcessEnv] as string | undefined),
    ),
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
          {PLAN_CONFIGS.map((cfg, i) => {
            const plan   = plans[i];
            const planId = (process.env[cfg.envKey as keyof NodeJS.ProcessEnv] as string | undefined) ?? "plan_placeholder";
            const price  = formatAmount(plan, cfg.fallbackPrice);

            return (
              <div
                key={cfg.name}
                className={[
                  "relative p-10 border transition-all duration-300",
                  "hover:-translate-y-[6px]",
                  cfg.featured
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
                  <span className="font-condensed text-[1rem] text-gray">{cfg.suffix}</span>
                </div>

                {/* Period */}
                <p className="font-condensed text-[0.78rem] tracking-[0.1em] uppercase text-red mb-6">
                  {cfg.period}
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
                  planId={planId}
                  planName={cfg.name}
                  price={price}
                  period={cfg.period}
                  features={cfg.features}
                  featured={cfg.featured}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
