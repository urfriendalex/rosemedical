import { defineField, defineType } from "sanity";

export const assetFile = defineType({
  name: "assetFile",
  title: "Asset file",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localizedString" }),
    defineField({ name: "description", type: "localizedText" }),
    defineField({ name: "file", type: "file" }),
    defineField({ name: "externalUrl", type: "url" }),
    defineField({
      name: "kind",
      type: "string",
      options: {
        list: [
          { title: "Catalog", value: "catalog" },
          { title: "Certificate", value: "certificate" },
          { title: "Marketing material", value: "marketing" },
        ],
      },
    }),
  ],
});
