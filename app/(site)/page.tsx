import { ContactStrip } from "@/components/contact-strip";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getFaqItems } from "@/lib/sanity/get-faq-items";
import { getProjectCategories } from "@/lib/sanity/get-project-categories";
import { getProjects } from "@/lib/sanity/get-projects";
import { getServices } from "@/lib/sanity/get-services";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [siteSettings, cmsProjects, cmsProjectCategories, cmsServices, cmsFaqItems] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getProjectCategories(),
    getServices(),
    getFaqItems()
  ]);

  return (
    <main className="page-shell" id="top">
      <SiteHeader studioName={siteSettings?.studioName} logoUrl={siteSettings?.logoUrl} contactPhone={siteSettings?.contactPhone} />
      <HeroSection metrics={siteSettings?.metrics || []} siteSettings={siteSettings} />

      <ProjectsSection
        projects={cmsProjects}
        categories={cmsProjectCategories}
        eyebrow={siteSettings?.projectsEyebrow}
        title={siteSettings?.projectsTitle}
        description={siteSettings?.projectsDescription}
      />

      <section className="content-section split-layout" id="services">
        <div>
          <SectionHeading
            eyebrow={siteSettings?.servicesEyebrow}
            title={siteSettings?.servicesTitle}
            description={siteSettings?.servicesDescription}
          />
        </div>

        <div className="service-list" aria-label="Услуги студии">
          {cmsServices.map((service) => (
            <article className="service-card" key={`${service.index}-${service.title}`}>
              <p className="service-index">{service.index}</p>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <FaqSection
        items={cmsFaqItems}
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
        telegramUrl={siteSettings?.telegramUrl}
      />

      <SiteFooter studioName={siteSettings?.studioName} />
    </main>
  );
}
