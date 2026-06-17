import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const hasSanityConfig = Boolean(projectId && dataset);

export const client = createClient({
  projectId: projectId || "ppsg7ml5",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: false,
});
