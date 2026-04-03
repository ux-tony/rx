import type { Metric } from "@/data/site-data";

type HeroSectionProps = {
  metrics: Metric[];
};

const featuredImage =
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=80";

export function HeroSection({ metrics }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="hero-topline">
          <span>RX Architect Studio</span>
          <span className="hero-badge">Residential / Hospitality / Cultural</span>
        </div>

        <div className="section-heading">
          <p className="eyebrow">Архитектурное портфолио</p>
          <h1>Пространства с тихой роскошью и точной геометрией.</h1>
          <p>
            MVP-концепт сайта архитектора: крупные изображения, минимум интерфейсных элементов,
            выразительная типографика и чистая мобильная адаптация.
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
        <div className="hero-image" style={{ backgroundImage: `url(${featuredImage})` }} />
        <div className="hero-overlay">
          <span className="hero-note">Featured concept / Private residence</span>

          <div className="hero-caption">
            <div>
              <h2>House Atria</h2>
              <p>Московская область / 540 м² / 2026</p>
            </div>
            <span>Свет, натуральный камень, панорамные оси</span>
          </div>
        </div>
      </div>
    </section>
  );
}
