import { defineField, defineType } from "sanity";

const ctaFields = [
  defineField({ name: "title", type: "localizedString" }),
  defineField({ name: "body", type: "localizedText" }),
  defineField({ name: "button", type: "localizedString" }),
];

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localizedString" }),
        defineField({ name: "title", type: "localizedString" }),
        defineField({ name: "body", type: "localizedText" }),
        defineField({ name: "primaryCta", type: "localizedString" }),
        defineField({ name: "secondaryCta", type: "localizedString" }),
      ],
    }),
    defineField({
      name: "stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", type: "string" }),
            defineField({ name: "label", type: "localizedString" }),
          ],
        },
      ],
    }),
    defineField({
      name: "about",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localizedString" }),
        defineField({ name: "title", type: "localizedString" }),
        defineField({ name: "body", type: "localizedText" }),
      ],
    }),
    defineField({
      name: "features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "localizedString" }),
            defineField({ name: "body", type: "localizedText" }),
          ],
        },
      ],
    }),
    defineField({
      name: "productIntro",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localizedString" }),
        defineField({ name: "title", type: "localizedString" }),
        defineField({ name: "body", type: "localizedText" }),
      ],
    }),
    defineField({ name: "catalogCta", type: "object", fields: ctaFields }),
    defineField({
      name: "contact",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "localizedString" }),
        defineField({ name: "title", type: "localizedString" }),
        defineField({ name: "body", type: "localizedText" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home page" }),
  },
});
