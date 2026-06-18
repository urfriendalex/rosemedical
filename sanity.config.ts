import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId, studioBasePath } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { SINGLETONS, structure } from "@/sanity/structure";

const singletonTypes = new Set<string>(SINGLETONS.map((s) => s.type));

export default defineConfig({
  name: "rosemedical",
  title: "Rose Medical",
  basePath: studioBasePath,
  // projectId comes from NEXT_PUBLIC_SANITY_PROJECT_ID. The placeholder only
  // keeps the Studio from crashing before the client wires their project in —
  // see docs/SANITY_SETUP.md.
  projectId: projectId || "ppsg7ml5",
  dataset,
  apiVersion,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
  document: {
    // Singletons can't be created, duplicated or deleted — only edited.
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action ?? ""),
          )
        : prev,
    // Hide singletons from global "create new" menus.
    newDocumentOptions: (prev) =>
      prev.filter((option) => !singletonTypes.has(option.templateId)),
  },
});
