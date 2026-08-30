import type { Metric } from "@/data/site-data";
import { sanityClient } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

export type SiteSettings = {
  studioName?: string;
  heroEyebrow?: string;
  logoUrl?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroImageUrl?: string;
  heroBackgroundColor?: string;
  seoTitle?: string;
  seoDescription?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  metrics?: Metric[];
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
  telegramUrl?: string;
};

function cleanCopy(value?: string | null) {
  const normalized = value?.trim();
  return normalized || undefined;
}

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

    const merged = {
      ...(data.hero || {}),
      ...(data.projects || {}),
      ...(data.services || {}),
      ...(data.faq || {}),
      ...(data.contacts || {})
    };

    return {
      ...merged,
      studioName: cleanCopy(merged.studioName),
      heroEyebrow: cleanCopy(merged.heroEyebrow),
      heroTitle: cleanCopy(merged.heroTitle),
      heroDescription: cleanCopy(merged.heroDescription),
      heroImageUrl: cleanCopy(merged.heroImageUrl),
      heroBackgroundColor: cleanCopy(merged.heroBackgroundColor),
      seoTitle: cleanCopy(merged.seoTitle),
      seoDescription: cleanCopy(merged.seoDescription),
      primaryCtaLabel: cleanCopy(merged.primaryCtaLabel),
      primaryCtaHref: cleanCopy(merged.primaryCtaHref),
      secondaryCtaLabel: cleanCopy(merged.secondaryCtaLabel),
      metrics: merged.metrics
        ?.map((metric) => ({ value: cleanCopy(metric.value), label: cleanCopy(metric.label) }))
        .filter((metric): metric is Metric => Boolean(metric.value && metric.label)),
      projectsEyebrow: cleanCopy(merged.projectsEyebrow),
      projectsTitle: cleanCopy(merged.projectsTitle),
      projectsDescription: cleanCopy(merged.projectsDescription),
      servicesEyebrow: cleanCopy(merged.servicesEyebrow),
      servicesTitle: cleanCopy(merged.servicesTitle),
      servicesDescription: cleanCopy(merged.servicesDescription),
      faqEyebrow: cleanCopy(merged.faqEyebrow),
      faqTitle: cleanCopy(merged.faqTitle),
      faqDescription: cleanCopy(merged.faqDescription),
      contactsEyebrow: cleanCopy(merged.contactsEyebrow),
      contactsTitle: cleanCopy(merged.contactsTitle),
      contactsDescription: cleanCopy(merged.contactsDescription),
      contactEmail: cleanCopy(merged.contactEmail),
      contactPhone: cleanCopy(merged.contactPhone),
      telegramUrl: cleanCopy(merged.telegramUrl)
    };
  } catch {
    return null;
  }
}
