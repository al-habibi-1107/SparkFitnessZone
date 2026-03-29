import { defineField, defineType } from "sanity";

const CATEGORIES = [
  { title: "Strength", value: "strength" },
  { title: "Cardio", value: "cardio" },
  { title: "Free Weights", value: "free-weights" },
  { title: "Functional", value: "functional" },
];

export const equipment = defineType({
  name: "equipment",
  title: "Equipment",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Machine / Equipment Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      description: "Used for /equipment/[slug] detail pages",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: CATEGORIES,
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Shown on the card and the detail page",
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: "muscleGroups",
      title: "Muscle Groups",
      type: "array",
      of: [{ type: "string" }],
      description: "Tags shown on the card, e.g. Chest, Quads",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "specs",
      title: "Technical Specs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
      description: "Optional key/value specs for the detail page (e.g. Capacity: 400 kg)",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Controls card order within each category",
      validation: (Rule) => Rule.integer().positive(),
    }),
  ],
  orderings: [
    {
      title: "Category, then Order",
      name: "categoryOrder",
      by: [
        { field: "category", direction: "asc" },
        { field: "displayOrder", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
    },
  },
});
