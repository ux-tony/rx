import type { Metric } from "@/data/site-data";
import { sanityClient } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

export type SiteSettings = {
  studioName?: string;
  heroEyebrow?: string;
  logoUrl?: string;
  heroTitle?: string;
  heroDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
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
  contactImageUrl?: string;
  architectPhotoUrl?: string;
};

const placeholderPattern = /\b(mock|mvp|cms|api|desktop|mobile|mantine)\b|тестов|заглуш|демонстрацион|шаблонн|визуальн\w* систем|каталог проектов|форм\w* заявок|редактор контента/i;

function cleanCopy(value?: string | null) {
  const normalized = value?.trim();
  return normalized && !placeholderPattern.test(normalized) ? normalized : undefined;
}

function cleanEmail(value?: string | null) {
  const normalized = value?.trim();
  return normalized && !normalized.endsWith(".test") && normalized.includes("@") ? normalized : undefined;
}

function cleanPhone(value?: string | null) {
  const normalized = value?.trim();
  return normalized && !/999\D*000\D*00\D*00/.test(normalized) ? normalized : undefined;
}

function cleanTelegram(value?: string | null) {
  const normalized = value?.trim().replace(/\/$/, "");
  return normalized && normalized !== "https://t.me" ? normalized : undefined;
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
      seoTitle: cleanCopy(merged.seoTitle),
      seoDescription: cleanCopy(merged.seoDescription),
      primaryCtaLabel: cleanCopy(merged.primaryCtaLabel),
      primaryCtaHref: merged.primaryCtaHref,
      secondaryCtaLabel: cleanCopy(merged.secondaryCtaLabel),
      secondaryCtaHref: merged.secondaryCtaHref,
      metrics: merged.metrics?.filter((metric) => cleanCopy(metric.value) && cleanCopy(metric.label)),
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
      contactEmail: cleanEmail(merged.contactEmail),
      contactPhone: cleanPhone(merged.contactPhone),
      telegramUrl: cleanTelegram(merged.telegramUrl)
    };
  } catch {
    return null;
  }
}
