"use client";

import { useMemo, useState } from "react";
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

  return (
    <section className="content-section" id="projects">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} fullWidth />

      <div className="category-row" aria-label="Категории проектов">
        <button
          className={`category-pill-button${activeCategory === ALL_CATEGORY ? " category-pill-active" : ""}`}
          onClick={() => setActiveCategory(ALL_CATEGORY)}
          type="button"
        >
          Все проекты
        </button>

        {availableCategories.map((category) => (
          <button
            className={`category-pill-button${activeCategory === category.title ? " category-pill-active" : ""}`}
            key={category.slug}
            onClick={() => setActiveCategory(category.title)}
            type="button"
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
