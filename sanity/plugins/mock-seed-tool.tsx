import { definePlugin } from "sanity";
import { StudioSeedTool } from "@/components/studio-seed-tool";

export const mockSeedTool = definePlugin({
  name: "mock-seed-tool",
  tools: [
    {
      name: "mock-seed",
      title: "Mock Data",
      component: StudioSeedTool
    }
  ]
});
