import { defineField, defineType } from "sanity";

export const membershipPlan = defineType({
  name: "membershipPlan",
  title: "Membership Plan",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Plan Name",
      type: "string",
      description: "e.g. Monthly Plan, Quarterly Plan, Annual Plan",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Left-to-right order of pricing cards (1 = leftmost)",
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: "priceDisplay",
      title: "Price (display only)",
      type: "string",
      description:
        "Shown as visual label only — e.g. ₹2,499. Actual charge comes from Razorpay plan.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priceSuffix",
      title: "Price Suffix",
      type: "string",
      description: "e.g. /mo, /qtr, /yr",
      validation: (Rule) => Rule.required().max(8),
    }),
    defineField({
      name: "billingNote",
      title: "Billing Note",
      type: "string",
      description: "e.g. Billed Every 3 Months — Save 20%",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points shown on the plan card",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "isFeatured",
      title: "Featured / Highlighted",
      type: "boolean",
      description: "Renders the plan with a red border and 'Most Popular' badge",
      initialValue: false,
    }),
    defineField({
      name: "badge",
      title: "Badge Text",
      type: "string",
      description: "Label on the featured badge — e.g. Most Popular (only shown when Featured is on)",
    }),
    defineField({
      name: "razorpayPlanId",
      title: "Razorpay Plan ID",
      type: "string",
      description:
        "The plan_XXXXXXXX ID from Razorpay dashboard. Drives actual subscription checkout — never leave blank in production.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "priceDisplay",
      isFeatured: "isFeatured",
    },
    prepare({ title, subtitle, isFeatured }) {
      return {
        title: `${isFeatured ? "⭐ " : ""}${title}`,
        subtitle,
      };
    },
  },
});
