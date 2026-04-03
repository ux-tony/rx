import type { Project } from "@/data/site-data";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-media">
        <div className="project-media-image" style={{ backgroundImage: `url(${project.image})` }} />
      </div>

      <div className="project-body">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.location}</span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </article>
  );
}
