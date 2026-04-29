import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Full-screen background image on the homepage hero section",
    }),
    defineField({
      name: "aboutImage",
      title: "About Section Image",
      type: "image",
      options: { hotspot: true },
      description: "Image shown in the 'Not Just a Gym' about section",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
