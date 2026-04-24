const fallbackProjectId = "replace-with-sanity-project-id";
const fallbackDataset = "production";

export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || fallbackProjectId;

export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || fallbackDataset;

export const sanityBasePath = "/studio";

export const sanityEnvReady =
  sanityProjectId !== fallbackProjectId && Boolean(process.env.NEXT_PUBLIC_SANITY_DATASET?.trim());
