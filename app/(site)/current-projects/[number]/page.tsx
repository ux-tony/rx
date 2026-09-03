import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ProjectPageGallery } from "@/components/project-page-gallery";
import { CurrentProjectComments } from "@/components/current-project-comments";
import { CurrentProjectFiles } from "@/components/current-project-files";
import { getCurrentProjectByNumber } from "@/lib/sanity/get-current-project-by-number";
import { getCurrentProjectComments } from "@/lib/sanity/get-current-project-comments";

type CurrentProjectPageProps = {
  params: Promise<{ number: string }>;
};

export const dynamic = "force-dynamic";

const resolveCurrentProject = cache(async (number: string) => {
  return getCurrentProjectByNumber(decodeURIComponent(number));
});

export async function generateMetadata({ params }: CurrentProjectPageProps): Promise<Metadata> {
  const { number } = await params;
  const project = await resolveCurrentProject(number);

  return {
    title: project ? `${project.title} | Текущий проект` : "Проект не найден",
    description: project?.description,
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function CurrentProjectPage({ params }: CurrentProjectPageProps) {
  const { number } = await params;
  const project = await resolveCurrentProject(number);

  if (!project) {
    notFound();
  }

  const comments = await getCurrentProjectComments(project.id);

  return (
    <main className="page-shell project-page current-project-page" id="top">
      <header className="project-page-intro">
        <p className="eyebrow">Текущий проект · {project.projectNumber}</p>
        <h1>{project.title}</h1>
        {project.description ? <p className="project-page-description">{project.description}</p> : null}
      </header>

      <ProjectPageGallery coverImage={project.image} images={project.gallery} title={project.title} />
      <CurrentProjectFiles
        enabled={Boolean(process.env.BLOB_READ_WRITE_TOKEN && process.env.SANITY_WRITE_TOKEN)}
        files={project.files}
        projectNumber={project.projectNumber}
      />
      <CurrentProjectComments
        comments={comments}
        enabled={Boolean(process.env.SANITY_WRITE_TOKEN)}
        projectNumber={project.projectNumber}
      />
    </main>
  );
}
