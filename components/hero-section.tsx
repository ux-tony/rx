"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import type { Metric } from "@/data/site-data";
import architectPhoto from "@/img/Foto001-hero-architectural-v6-clean.png";
import { DiscussionModal } from "@/components/discussion-modal";
import type { SiteSettings } from "@/lib/sanity/get-site-settings";

type HeroSectionProps = {
  metrics: Metric[];
  siteSettings?: SiteSettings | null;
};

export function HeroSection({ metrics, siteSettings }: HeroSectionProps) {
  const [opened, setOpened] = useState(false);
  const [metricsVisible, setMetricsVisible] = useState(false);
  const metricsRef = useRef<HTMLElement>(null);
  const heroEyebrow = siteSettings?.heroEyebrow;
  const heroTitle = siteSettings?.heroTitle;
  const heroDescription = siteSettings?.heroDescription;
  const primaryCtaLabel = siteSettings?.primaryCtaLabel;
  const primaryCtaHref = siteSettings?.primaryCtaHref;
  const secondaryCtaLabel = siteSettings?.secondaryCtaLabel;
  const resolvedMetrics = siteSettings?.metrics && siteSettings.metrics.length > 0 ? siteSettings.metrics : metrics;
  const architectPhotoSrc = siteSettings?.heroImageUrl || architectPhoto;
  const portraitHeroImage = Boolean(
    siteSettings?.heroImageUrl && siteSettings.heroImageAspectRatio && siteSettings.heroImageAspectRatio < 1
  );
  const heroStyle = siteSettings?.heroBackgroundColor
    ? ({ "--hero-background": siteSettings.heroBackgroundColor } as CSSProperties)
    : undefined;

  useEffect(() => {
    const section = metricsRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        className={`hero${portraitHeroImage ? " has-portrait-image" : ""}`}
        aria-labelledby={heroTitle ? "hero-title" : undefined}
        style={heroStyle}
      >
        <div className="hero-copy">
          <div className="hero-heading">
            {heroEyebrow ? <p className="eyebrow">{heroEyebrow}</p> : null}
            {heroTitle ? <h1 id="hero-title">{heroTitle}</h1> : null}
            {heroDescription ? <p>{heroDescription}</p> : null}
          </div>

          <div className="hero-actions">
            {primaryCtaLabel && primaryCtaHref ? (
              <a className="button-primary" href={primaryCtaHref}>
                {primaryCtaLabel}
              </a>
            ) : null}
            {secondaryCtaLabel ? (
              <button className="button-secondary button-reset" onClick={() => setOpened(true)} type="button">
                {secondaryCtaLabel}
              </button>
            ) : null}
          </div>
        </div>

        <div className="hero-visual">
          <Image
            src={architectPhotoSrc}
            alt="Портрет архитектора"
            className="hero-portrait"
            fill
            priority
            quality={100}
            sizes="100vw"
          />
        </div>
      </section>

      {resolvedMetrics.length > 0 ? (
        <section
          className={`hero-metrics${metricsVisible ? " is-visible" : ""}`}
          aria-label="О студии в цифрах"
          ref={metricsRef}
        >
          {resolvedMetrics.map((metric) => (
            <article className="metric-card" key={`${metric.value}-${metric.label}`}>
              <p className="metric-value">{metric.value}</p>
              <p className="metric-label">{metric.label}</p>
            </article>
          ))}
        </section>
      ) : null}

      <DiscussionModal contactEmail={siteSettings?.contactEmail} opened={opened} onClose={() => setOpened(false)} />
    </>
  );
}
