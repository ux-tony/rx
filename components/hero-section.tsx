import Image from "next/image";
import type { Metric } from "@/data/site-data";
import architectPhoto from "@/img/Foto001.jpg";
import type { SiteSettings } from "@/lib/sanity/get-site-settings";

type HeroSectionProps = {
  metrics: Metric[];
  siteSettings?: SiteSettings | null;
};

export function HeroSection({ metrics, siteSettings }: HeroSectionProps) {
  const studioName = siteSettings?.studioName || "Roman Kharchenko Studio";
  const logoUrl = siteSettings?.logoUrl;
  const heroTitle = siteSettings?.heroTitle || "Архитектурная студия Романа Харченко.";
  const heroDescription =
    siteSettings?.heroDescription ||
    "Частная архитектурная практика с фокусом на ясную композицию, материал и выверенную атмосферу пространства.";
  const architectPhotoSrc = siteSettings?.architectPhotoUrl || architectPhoto;

  return (
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
          <p className="eyebrow">Архитектурная студия</p>
          <h1>{heroTitle}</h1>
          <p>{heroDescription}</p>
        </div>

        <div className="hero-actions">
          <a className="button-primary" href="#projects">
            Смотреть проекты
          </a>
          <a className="button-secondary" href="#contact">
            Обсудить задачу
          </a>
        </div>

        <div className="hero-metrics">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
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
  );
}
