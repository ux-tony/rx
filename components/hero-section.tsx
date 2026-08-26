"use client";

import { useState } from "react";
import Image from "next/image";
import type { Metric } from "@/data/site-data";
import architectPhoto from "@/img/Foto001-hero-architectural.png";
import { DiscussionModal } from "@/components/discussion-modal";
import type { SiteSettings } from "@/lib/sanity/get-site-settings";

type HeroSectionProps = {
  metrics: Metric[];
  siteSettings?: SiteSettings | null;
};

const editorialMetrics: Metric[] = [
  { value: "01", label: "Единая концепция от первого эскиза до реализации" },
  { value: "02", label: "Материал, свет и функция работают как одно целое" },
  { value: "03", label: "Прямой диалог с автором проекта на ключевых этапах" }
];

export function HeroSection({ metrics, siteSettings }: HeroSectionProps) {
  const [opened, setOpened] = useState(false);
  const heroEyebrow = siteSettings?.heroEyebrow || "Архитектурная студия";
  const heroTitle = siteSettings?.heroTitle || "Роман Харченко. Архитектор.";
  const heroDescription =
    siteSettings?.heroDescription ||
    "Я создаю пространства, в которых архитектура, интерьер и ландшафт работают как единое целое. В основе каждого проекта: характер места, ясная логика и внимание к тому, как человек будет жить, работать и чувствовать себя внутри.";
  const primaryCtaLabel = siteSettings?.primaryCtaLabel || "Смотреть проекты";
  const primaryCtaHref = siteSettings?.primaryCtaHref || "#projects";
  const secondaryCtaLabel = siteSettings?.secondaryCtaLabel || "Обсудить задачу";
  const resolvedMetrics = siteSettings?.metrics && siteSettings.metrics.length > 0 ? siteSettings.metrics : metrics.length > 0 ? metrics : editorialMetrics;
  const architectPhotoSrc = architectPhoto;

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-heading">
            <p className="eyebrow">{heroEyebrow}</p>
            <h1 id="hero-title">{heroTitle}</h1>
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

      {resolvedMetrics.length > 0 ? (
        <section className="hero-metrics" aria-label="О студии в цифрах">
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
