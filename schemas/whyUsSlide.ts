import { defineField, defineType } from "sanity";

export const whyUsSlide = defineType({
  name: "whyUsSlide",
  title: "Why Us Slide",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Label",
      type: "string",
      description: "Small label above the headline (e.g. 'Premium Equipment')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "head1",
      title: "Headline Line 1",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "head2",
      title: "Headline Line 2 (shown in red)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body Copy",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "bullets",
      title: "Bullet Points",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
    defineField({
      name: "image",
      title: "Slide Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Controls the order slides appear (1 = first)",
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "eyebrow",
      subtitle: "head1",
      media: "image",
    },
  },
});
