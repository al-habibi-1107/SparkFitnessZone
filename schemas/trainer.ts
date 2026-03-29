import { defineField, defineType } from "sanity";

export const trainer = defineType({
  name: "trainer",
  title: "Trainer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      description: "e.g. Head Coach, Fat Loss Specialist",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "yearsExperience",
      title: "Years of Experience",
      type: "number",
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: "specialisms",
      title: "Specialisms",
      type: "array",
      of: [{ type: "string" }],
      description: "Tags shown on the card, e.g. Bodybuilding, Strength",
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 5,
      description: "Shown on expanded trainer profile (optional)",
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        }),
        defineField({
          name: "youtube",
          title: "YouTube URL",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Controls the order trainers appear on the page",
      validation: (Rule) => Rule.integer().positive(),
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
      subtitle: "role",
      media: "photo",
    },
  },
});
