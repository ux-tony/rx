import { sanityClient } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

export type SiteSettings = {
  studioName?: string;
  logoUrl?: string;
  heroTitle?: string;
  heroDescription?: string;
  projectsEyebrow?: string;
  projectsTitle?: string;
  projectsDescription?: string;
  servicesEyebrow?: string;
  servicesTitle?: string;
  servicesDescription?: string;
  faqEyebrow?: string;
  faqTitle?: string;
  faqDescription?: string;
  contactsEyebrow?: string;
  contactsTitle?: string;
  contactsDescription?: string;
  contactEmail?: string;
  contactPhone?: string;
  architectPhotoUrl?: string;
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery);
  } catch {
    return null;
  }
}
