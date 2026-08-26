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
const heroEyebrow = "Архитектурная студия";
const heroTitle = "Роман Харченко. Архитектор.";
const heroDescription =
  "Я создаю пространства, в которых архитектура, интерьер и ландшафт работают как единое целое. В основе каждого проекта: характер места, ясная логика и внимание к тому, как человек будет жить, работать и чувствовать себя внутри.";
const projectsTitle = "Проекты студии.";
const servicesTitle = "Направления работы.";
const faqTitle = "О работе над проектом.";

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

function migrateHeroEyebrow(value?: string | null) {
  const normalized = cleanCopy(value);
  return normalized === "Студия архитектуры и дизайна" ? heroEyebrow : normalized;
}

function migrateHeroTitle(value?: string | null) {
  const normalized = cleanCopy(value);
  return normalized === "Архитектурная студия Романа Харченко." ? heroTitle : normalized;
}

function migrateHeroDescription(value?: string | null) {
  const normalized = cleanCopy(value);
  return normalized?.startsWith("Проектирование жилых и общественных интерьеров") || normalized?.startsWith("Частная архитектурная практика")
    ? heroDescription
    : normalized;
}

function migrateSectionTitle(value: string | null | undefined, section: "projects" | "services" | "faq") {
  const normalized = cleanCopy(value);

  if (section === "projects" && normalized?.startsWith("Архитектурные пространства")) {
    return projectsTitle;
  }

  if (section === "services" && normalized?.startsWith("Проектирование пространств от первой идеи")) {
    return servicesTitle;
  }

  if (section === "faq" && normalized?.startsWith("Частые вопросы, которые помогают")) {
    return faqTitle;
  }

  return normalized;
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
      heroEyebrow: migrateHeroEyebrow(merged.heroEyebrow),
      heroTitle: migrateHeroTitle(merged.heroTitle),
      heroDescription: migrateHeroDescription(merged.heroDescription),
      seoTitle: cleanCopy(merged.seoTitle),
      seoDescription: cleanCopy(merged.seoDescription),
      primaryCtaLabel: cleanCopy(merged.primaryCtaLabel),
      primaryCtaHref: merged.primaryCtaHref,
      secondaryCtaLabel: cleanCopy(merged.secondaryCtaLabel),
      secondaryCtaHref: merged.secondaryCtaHref,
      metrics: merged.metrics?.filter((metric) => cleanCopy(metric.value) && cleanCopy(metric.label)),
      projectsEyebrow: cleanCopy(merged.projectsEyebrow),
      projectsTitle: migrateSectionTitle(merged.projectsTitle, "projects"),
      projectsDescription: cleanCopy(merged.projectsDescription),
      servicesEyebrow: cleanCopy(merged.servicesEyebrow),
      servicesTitle: migrateSectionTitle(merged.servicesTitle, "services"),
      servicesDescription: cleanCopy(merged.servicesDescription),
      faqEyebrow: cleanCopy(merged.faqEyebrow),
      faqTitle: migrateSectionTitle(merged.faqTitle, "faq"),
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
