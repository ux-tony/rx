import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { mockSeedTool } from "@/sanity/plugins/mock-seed-tool";
import { sanityBasePath, sanityDataset, sanityProjectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Roman Kharchenko Studio",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  basePath: sanityBasePath,
  plugins: [structureTool(), visionTool(), mockSeedTool()],
  schema: {
    types: schemaTypes
  }
});
