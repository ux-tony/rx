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
  eyebrow: "Проекты",
  title: "Архитектурные пространства, где материал, свет и масштаб работают на спокойное впечатление.",
  description: "Подборка демонстрационных кейсов с акцентом на частные резиденции, интерьеры, общественные пространства и hospitality."
};

const fallbackServicesHeading = {
  eyebrow: "Услуги",
  title: "Проектирование пространств от первой идеи до согласованного архитектурного образа.",
  description:
    "Студия разрабатывает жилые и общественные интерьеры, фасады зданий, гостиницы и рестораны, а также ландшафтный дизайн и концепции территорий для коммерческих объектов."
};

const fallbackFaqHeading = {
  eyebrow: "Вопросы и ответы",
  title: "Частые вопросы, которые помогают быстро понять формат работы, сроки и состав архитектурного проекта.",
  description:
    "Собрали базовые вопросы заказчиков перед стартом: про бюджет, сроки, объём проектирования, участие в процессе и сопровождение реализации."
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

        <div className="service-list" aria-label="Услуги студии">
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
        eyebrow={siteSettings?.faqEyebrow || fallbackFaqHeading.eyebrow}
        title={siteSettings?.faqTitle || fallbackFaqHeading.title}
        description={siteSettings?.faqDescription || fallbackFaqHeading.description}
      />

      <ContactStrip
        eyebrow={siteSettings?.contactsEyebrow}
        title={siteSettings?.contactsTitle}
        description={siteSettings?.contactsDescription}
        contactEmail={siteSettings?.contactEmail}
        contactPhone={siteSettings?.contactPhone}
        telegramUrl={siteSettings?.telegramUrl}
        contactImageUrl={siteSettings?.contactImageUrl}
      />
    </main>
  );
}
