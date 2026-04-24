import { faqItems, metrics, projectCategories, projects, services } from "@/data/site-data";
import { ContactStrip } from "@/components/contact-strip";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";

export default async function HomePage() {
  const siteSettings = await getSiteSettings();

  return (
    <main className="page-shell">
      <HeroSection metrics={metrics} siteSettings={siteSettings} />

      <section className="content-section" id="projects">
        <SectionHeading
          eyebrow="Проекты"
          title="Архитектурные пространства, где материал и свет работают на ощущение тишины."
          description="Подборка демонстрационных кейсов для MVP. В реальном проекте этот блок подключается к CMS или headless API."
          fullWidth
        />

        <div className="category-row category-row-hidden" aria-label="Категории проектов">
          {projectCategories.map((category) => (
            <span className="category-pill" key={category}>
              {category}
            </span>
          ))}
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="content-section split-layout">
        <div>
          <SectionHeading
            eyebrow="Подход"
            title="Спокойный интерфейс, где проекты говорят сами за себя."
            description="Визуальный язык сайта построен вокруг чистой сетки, больших отступов и тактильных архитектурных кадров без лишнего интерфейсного шума."
          />
        </div>

        <div className="service-list" aria-label="Направления работы">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <p className="service-index">{service.index}</p>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <FaqSection items={faqItems} />
      <ContactStrip
        contactEmail={siteSettings?.contactEmail}
        contactPhone={siteSettings?.contactPhone}
      />
    </main>
  );
}
