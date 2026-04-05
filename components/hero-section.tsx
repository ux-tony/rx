import Image from "next/image";
import type { Metric } from "@/data/site-data";
import architectPhoto from "@/img/Foto001.jpg";

type HeroSectionProps = {
  metrics: Metric[];
};

export function HeroSection({ metrics }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="hero-topline">
          <div className="logo-mock" aria-label="Логотип студии">
            RK
          </div>
        </div>

        <div className="section-heading">
          <p className="eyebrow">Архитектурная студия</p>
          <h1>Архитектурная студия Романа Харченко.</h1>
          <p>
            Частная архитектурная практика с фокусом на ясную композицию, материал и выверенную
            атмосферу пространства.
          </p>
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
          src={architectPhoto}
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
