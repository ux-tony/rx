"use client";

import { useState } from "react";
import Image from "next/image";
import type { Metric } from "@/data/site-data";
import architectPhoto from "@/img/Foto001.jpg";
import { DiscussionModal } from "@/components/discussion-modal";
import type { SiteSettings } from "@/lib/sanity/get-site-settings";

type HeroSectionProps = {
  metrics: Metric[];
  siteSettings?: SiteSettings | null;
};

export function HeroSection({ metrics, siteSettings }: HeroSectionProps) {
  const [opened, setOpened] = useState(false);

  const studioName = siteSettings?.studioName || "Roman Kharchenko Studio";
  const heroEyebrow = siteSettings?.heroEyebrow || "Архитектурная студия";
  const logoUrl = siteSettings?.logoUrl;
  const heroTitle = siteSettings?.heroTitle || "Архитектурная студия Романа Харченко.";
  const heroDescription =
    siteSettings?.heroDescription ||
    "Частная архитектурная практика с фокусом на ясную композицию, материал, свет и спокойный визуальный язык в жилых и общественных пространствах.";
  const primaryCtaLabel = siteSettings?.primaryCtaLabel || "Смотреть проекты";
  const primaryCtaHref = siteSettings?.primaryCtaHref || "#projects";
  const secondaryCtaLabel = siteSettings?.secondaryCtaLabel || "Обсудить задачу";
  const resolvedMetrics = siteSettings?.metrics && siteSettings.metrics.length > 0 ? siteSettings.metrics : metrics;
  const architectPhotoSrc = siteSettings?.architectPhotoUrl || architectPhoto;

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-topline">
            {logoUrl ? (
              <div className="hero-logo" aria-label="Логотип студии">
                <Image alt={studioName} className="hero-logo-image" fill src={logoUrl} sizes="80px" />
              </div>
            ) : (
              <div className="hero-logo hero-logo-placeholder" aria-label="Место для логотипа">
                <span>80×80</span>
              </div>
            )}
          </div>

          <div className="section-heading">
            <p className="eyebrow">{heroEyebrow}</p>
            <h1>{heroTitle}</h1>
            <p>{heroDescription}</p>
          </div>

          <div className="hero-actions">
            <a className="button-primary" href={primaryCtaHref}>
              {primaryCtaLabel}
            </a>
            <button className="button-secondary button-reset" onClick={() => setOpened(true)} type="button">
              {secondaryCtaLabel}
            </button>
          </div>

          <div className="hero-metrics">
            {resolvedMetrics.map((metric) => (
              <article className="metric-card" key={`${metric.value}-${metric.label}`}>
                <p className="metric-value">{metric.value}</p>
                <p className="metric-label">{metric.label}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <Image
            src={architectPhotoSrc}
            alt="Портрет архитектора"
            className="hero-portrait"
            fill
            priority
            sizes="(max-width: 1180px) 100vw, 48vw"
          />
        </div>
      </section>

      <DiscussionModal opened={opened} onClose={() => setOpened(false)} />
    </>
  );
}
