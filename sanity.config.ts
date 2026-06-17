import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId, studioBasePath } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "rosemedical",
  title: "Rose Medical",
  basePath: studioBasePath,
  projectId: projectId || "ppsg7ml5",
  dataset,
  apiVersion,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
