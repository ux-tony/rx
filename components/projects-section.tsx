"use client";

import { startTransition, useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/data/site-data";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";

type ProjectsSectionProps = {
  projects: Project[];
  categories: ProjectCategory[];
  eyebrow: string;
  title: string;
  description: string;
};

const ALL_CATEGORY = "all";

export function ProjectsSection({ projects, categories, eyebrow, title, description }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  const visibleProjects = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  const availableCategories = useMemo(() => {
    if (categories.length > 0) {
      return categories;
    }

    return Array.from(
      new Map(
        projects.map((project) => [
          project.category,
          {
            slug: project.categorySlug || project.category,
            title: project.category
          }
        ])
      ).values()
    );
  }, [categories, projects]);

  function selectCategory(category: string) {
    startTransition(() => setActiveCategory(category));
  }

  return (
    <section className="content-section projects-section" id="projects">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} fullWidth />

      <div className="projects-toolbar">
        <div className="category-row" aria-label="Категории проектов" role="group">
          <button
            aria-pressed={activeCategory === ALL_CATEGORY}
            className={`category-pill-button${activeCategory === ALL_CATEGORY ? " category-pill-active" : ""}`}
            onClick={() => selectCategory(ALL_CATEGORY)}
            type="button"
          >
            Все проекты
          </button>

          {availableCategories.map((category) => (
            <button
              aria-pressed={activeCategory === category.title}
              className={`category-pill-button${activeCategory === category.title ? " category-pill-active" : ""}`}
              key={category.slug}
              onClick={() => selectCategory(category.title)}
              type="button"
            >
              {category.title}
            </button>
          ))}
        </div>

      </div>

      {visibleProjects.length > 0 ? (
        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="projects-empty">В этой категории пока нет опубликованных проектов.</p>
      )}
    </section>
  );
}
