import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service / Programme",
  type: "document",
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order",
      type: "number",
      description: "Display order on the homepage (1, 2, 3…)",
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: "name",
      title: "Name",
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
      name: "icon",
      title: "Icon (emoji)",
      type: "string",
      description: "Single emoji shown on the card, e.g. 🔥",
      validation: (Rule) => Rule.required().max(4),
    }),
    defineField({
      name: "image",
      title: "Card Image",
      type: "image",
      options: { hotspot: true },
      description: "Photo shown at the top of the service card on the homepage",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(300),
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "orderNumber", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "orderNumber", media: "icon" },
    prepare({ title, subtitle }) {
      return { title, subtitle: `#${subtitle}` };
    },
  },
});
