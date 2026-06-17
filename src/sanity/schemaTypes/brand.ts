import { defineField, defineType } from "sanity";

export const brand = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "visible", type: "boolean", initialValue: true }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "comingSoon",
      title: "Coming soon",
      description: "Shows as an unnamed placeholder card with no detail page or catalog.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "orderRank", title: "Order", type: "number", initialValue: 100 }),
    defineField({ name: "logoText", title: "Logo text fallback", type: "string" }),
    defineField({ name: "tagline", type: "localizedString" }),
    defineField({ name: "description", type: "localizedText" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "catalog",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English catalog URL", type: "url" }),
        defineField({ name: "pl", title: "Polish catalog URL", type: "url" }),
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
    defineField({
      name: "notes",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
    defineField({ name: "website", type: "url" }),
  ],
});
