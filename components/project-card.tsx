import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/site-data";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <Link className="project-card-trigger" href={`/projects/${project.slug}`}>
          <span className="project-media">
            <Image
              alt={project.description ? `${project.title}. ${project.description}` : project.title}
              className="project-media-image"
              fill
              sizes="(max-width: 780px) 100vw, (max-width: 1180px) 50vw, 60vw"
              src={project.image}
            />
            <span className="project-open-label">Открыть проект</span>
          </span>

          <span className="project-body">
            <span className="project-meta">{project.category}</span>
            <span className="project-title">{project.title}</span>
            {project.description ? <span className="project-description">{project.description}</span> : null}
          </span>
      </Link>
    </article>
  );
}
