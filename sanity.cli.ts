import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: { appId: "yp2reu9o0wi4ddzya4vs482y" },
  typegen: {
    path: "./sanity/**/*.{ts,tsx}",
    schema: "./sanity/extract.json",
    generates: "./sanity/sanity.types.ts",
  },
});
