import { createClient } from "next-sanity";
import { sanityDataset, sanityProjectId } from "@/sanity/env";

const sanityToken = process.env.SANITY_READ_TOKEN?.trim() || process.env.SANITY_WRITE_TOKEN?.trim();

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: "2026-04-24",
  useCdn: false,
  perspective: sanityToken ? "drafts" : "published",
  token: sanityToken
});
