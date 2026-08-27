import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ProjectPageGallery } from "@/components/project-page-gallery";
import { SiteHeader } from "@/components/site-header";
import { projects as fallbackProjects } from "@/data/site-data";
import { getProjectBySlug } from "@/lib/sanity/get-project-by-slug";
import { getProjects } from "@/lib/sanity/get-projects";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

const resolveProject = cache(async (slug: string) => {
  return (await getProjectBySlug(slug)) || fallbackProjects.find((project) => project.slug === slug) || null;
});

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await resolveProject(slug);

  if (!project) {
    return { title: "Проект не найден" };
  }

  return {
    title: `${project.title} | Roman Kharchenko Studio`,
    description: project.description || `${project.title}. Проект архитектурной студии Романа Харченко.`
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, cmsProjects, siteSettings] = await Promise.all([resolveProject(slug), getProjects(), getSiteSettings()]);

  if (!project) {
    notFound();
  }

  const availableProjects = cmsProjects.length > 0 ? cmsProjects : fallbackProjects;
  const currentIndex = availableProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = currentIndex >= 0 ? availableProjects[(currentIndex + 1) % availableProjects.length] : null;

  return (
    <main className="page-shell project-page" id="top">
      <SiteHeader
        contactPhone={siteSettings?.contactPhone}
        logoUrl={siteSettings?.logoUrl}
        rootHref="/"
        studioName={siteSettings?.studioName}
      />

      <header className="project-page-intro">
        <Link className="project-page-back" href="/#projects">
          ← Назад
        </Link>
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        {project.description ? <p className="project-page-description">{project.description}</p> : null}
      </header>

      <ProjectPageGallery coverImage={project.image} images={project.gallery || []} title={project.title} />

      <nav className="project-page-navigation" aria-label="Навигация по проектам">
        {nextProject && nextProject.slug !== project.slug ? (
          <Link className="project-page-next-link" href={`/projects/${nextProject.slug}`}>
            <span>Следующий проект</span>
            <strong>{nextProject.title}</strong>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
