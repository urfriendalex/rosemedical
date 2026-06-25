import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Site title", type: "localizedString" }),
    defineField({ name: "description", title: "SEO description", type: "localizedText" }),
    defineField({ name: "logoLight", title: "Logo for dark surfaces", type: "image" }),
    defineField({ name: "logoDark", title: "Logo for light surfaces", type: "image" }),
    defineField({
      name: "contact",
      title: "Contact details",
      type: "object",
      fields: [
        defineField({ name: "email", type: "string" }),
        defineField({ name: "phone", type: "string" }),
        defineField({ name: "address", type: "localizedString" }),
        defineField({
          name: "socials",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", type: "string" }),
                defineField({ name: "href", type: "url" }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "nav",
      title: "Navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "localizedString" }),
            defineField({ name: "href", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "footer", title: "Footer text", type: "localizedText" }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
