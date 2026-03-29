import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Customer Review",
  type: "document",
  fields: [
    defineField({
      name: "reviewerName",
      title: "Reviewer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Avatar / Photo",
      type: "image",
      options: { hotspot: true },
      description: "Optional — a silhouette placeholder is shown if absent",
    }),
    defineField({
      name: "rating",
      title: "Star Rating",
      type: "number",
      options: {
        list: [
          { title: "⭐⭐⭐⭐⭐  5 stars", value: 5 },
          { title: "⭐⭐⭐⭐  4 stars", value: 4 },
          { title: "⭐⭐⭐  3 stars", value: 3 },
        ],
        layout: "radio",
      },
      initialValue: 5,
      validation: (Rule) => Rule.required().min(3).max(5),
    }),
    defineField({
      name: "quote",
      title: "Review Quote",
      type: "text",
      rows: 4,
      description: "The testimonial text shown on the card",
      validation: (Rule) => Rule.required().min(20).max(400),
    }),
    defineField({
      name: "memberSince",
      title: "Member Since",
      type: "string",
      description: "Optional label shown below the name, e.g. Member since 2022",
    }),
    defineField({
      name: "date",
      title: "Review Date",
      type: "date",
      options: { dateFormat: "MMMM YYYY" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isFeatured",
      title: "Show on Homepage",
      type: "boolean",
      description: "Only featured reviews appear in the homepage carousel",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "reviewerName",
      subtitle: "quote",
      media: "avatar",
      rating: "rating",
    },
    prepare({ title, subtitle, rating }) {
      const stars = "⭐".repeat(rating ?? 5);
      return {
        title: `${title} ${stars}`,
        subtitle: subtitle?.slice(0, 60) + "…",
      };
    },
  },
});
