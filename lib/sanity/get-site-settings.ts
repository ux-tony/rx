import { cache } from "react";
import { sanityClient } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

export type SiteSettings = {
  studioName?: string;
  heroTitle?: string;
  heroDescription?: string;
  contactEmail?: string;
  contactPhone?: string;
  architectPhotoUrl?: string;
};

export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  try {
    return await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery);
  } catch {
    return null;
  }
});
