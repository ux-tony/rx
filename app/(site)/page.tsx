import { faqItems, metrics, projectCategories, projects, services } from "@/data/site-data";
import { ContactStrip } from "@/components/contact-strip";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getFaqItems } from "@/lib/sanity/get-faq-items";
import { getProjects } from "@/lib/sanity/get-projects";
import { getServices } from "@/lib/sanity/get-services";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";

export const dynamic = "force-dynamic";

const fallbackProjectsHeading = {
  eyebrow: "ПРОЕКТЫ",
  title: "Архитектурные пространства, где материал и свет работают на ощущение тишины.",
  description: "Подборка демонстрационных кейсов для MVP. В реальном проекте этот блок подключается к CMS или headless API."
};

const fallbackServicesHeading = {
  eyebrow: "ПОДХОД",
  title: "Спокойный интерфейс, где проекты говорят сами за себя.",
  description:
    "Визуальный язык сайта построен вокруг чистой сетки, больших отступов и тактильных архитектурных кадров без лишнего интерфейсного шума."
};

const fallbackFaqHeading = {
  eyebrow: "FAQ",
  title: "Точечное применение Mantine без ощущения шаблонной библиотеки.",
  description:
    "На этапе MVP интерактивный FAQ собран на Mantine Accordion и стилизован под общую визуальную систему, чтобы сохранить стек из ТЗ."
};

const fallbackContactsHeading = {
  eyebrow: "КОНТАКТЫ",
  title: "Готовы собрать полноценный каталог проектов, формы заявок и редактор контента.",
  description:
    "Сейчас сайт работает на mock-данных и демонстрирует визуальный каркас MVP. Следующим этапом сюда можно подключить CMS, real media storage, формы обратной связи и мультиязычность."
};

export default async function HomePage() {
  const siteSettings = await getSiteSettings();
  const cmsProjects = await getProjects();
  const cmsServices = await getServices();
  const cmsFaqItems = await getFaqItems();

  const resolvedProjects = cmsProjects.length > 0 ? cmsProjects : projects;
  const resolvedServices = cmsServices.length > 0 ? cmsServices : services;
  const resolvedFaqItems = cmsFaqItems.length > 0 ? cmsFaqItems : faqItems;

  return (
    <main className="page-shell">
      <HeroSection metrics={metrics} siteSettings={siteSettings} />

      <section className="content-section" id="projects">
        <SectionHeading
          eyebrow={siteSettings?.projectsEyebrow || fallbackProjectsHeading.eyebrow}
          title={siteSettings?.projectsTitle || fallbackProjectsHeading.title}
          description={siteSettings?.projectsDescription || fallbackProjectsHeading.description}
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
            eyebrow={siteSettings?.servicesEyebrow || fallbackServicesHeading.eyebrow}
            title={siteSettings?.servicesTitle || fallbackServicesHeading.title}
            description={siteSettings?.servicesDescription || fallbackServicesHeading.description}
          />
        </div>

        <div className="service-list" aria-label="Направления работы">
          {resolvedServices.map((service) => (
            <article className="service-card" key={`${service.index}-${service.title}`}>
              <p className="service-index">{service.index}</p>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <FaqSection
        items={resolvedFaqItems}
        eyebrow={siteSettings?.faqEyebrow}
        title={siteSettings?.faqTitle}
        description={siteSettings?.faqDescription}
      />

      <ContactStrip
        eyebrow={siteSettings?.contactsEyebrow}
        title={siteSettings?.contactsTitle}
        description={siteSettings?.contactsDescription}
        contactEmail={siteSettings?.contactEmail}
        contactPhone={siteSettings?.contactPhone}
      />
    </main>
  );
}
