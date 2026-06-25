import { defineCliConfig } from "sanity/cli";

// Used by the `sanity` CLI (e.g. `npx sanity exec`, `npx sanity dataset ...`).
// Reads the same env vars as the app so there is a single source of truth.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
