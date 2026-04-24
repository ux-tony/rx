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
    const data = await sanityClient.fetch<{
      hero?: Partial<SiteSettings> | null;
      projects?: Partial<SiteSettings> | null;
      services?: Partial<SiteSettings> | null;
      faq?: Partial<SiteSettings> | null;
      contacts?: Partial<SiteSettings> | null;
    } | null>(siteSettingsQuery);

    if (!data) {
      return null;
    }

    return {
      ...(data.hero || {}),
      ...(data.projects || {}),
      ...(data.services || {}),
      ...(data.faq || {}),
      ...(data.contacts || {})
    };
  } catch {
    return null;
  }
}
