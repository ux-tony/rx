import { createClient } from "next-sanity";
import { sanityDataset, sanityProjectId } from "@/sanity/env";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: "2026-04-24",
  useCdn: false
});
