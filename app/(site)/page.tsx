import { faqItems, metrics, projectCategories, projects, services } from "@/data/site-data";
import { ContactStrip } from "@/components/contact-strip";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getFaqItems } from "@/lib/sanity/get-faq-items";
import { getProjects } from "@/lib/sanity/get-projects";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const siteSettings = await getSiteSettings();
  const cmsProjects = await getProjects();
  const cmsFaqItems = await getFaqItems();
  const resolvedProjects = cmsProjects.length > 0 ? cmsProjects : projects;
  const resolvedFaqItems = cmsFaqItems.length > 0 ? cmsFaqItems : faqItems;

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
          {resolvedProjects.map((project) => (
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

      <FaqSection items={resolvedFaqItems} />
      <ContactStrip
        contactEmail={siteSettings?.contactEmail}
        contactPhone={siteSettings?.contactPhone}
      />
    </main>
  );
}
