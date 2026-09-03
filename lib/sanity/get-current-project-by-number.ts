import { sanityClient } from "@/lib/sanity/client";
import { currentProjectsQuery } from "@/lib/sanity/queries";

export type CurrentProject = {
  id: string;
  projectNumber: string;
  title: string;
  description?: string;
  image: string;
  gallery: string[];
  files: CurrentProjectFile[];
};

export type CurrentProjectFile = {
  id: string;
  name: string;
  pathname: string;
  size: number;
  contentType?: string;
  uploadedAt: string;
};

type SanityCurrentProject = Partial<CurrentProject>;

export async function getCurrentProjectByNumber(projectNumber: string): Promise<CurrentProject | null> {
  try {
    const normalizedNumber = projectNumber.trim().toLocaleUpperCase("ru-RU");
    const items = await sanityClient.fetch<SanityCurrentProject[]>(currentProjectsQuery);
    const item = items.find(
      (candidate) => candidate.projectNumber?.trim().toLocaleUpperCase("ru-RU") === normalizedNumber
    );

    if (!item?.id || !item.projectNumber || !item.title || !item.image) {
      return null;
    }

    return {
      id: item.id,
      projectNumber: item.projectNumber,
      title: item.title,
      description: item.description?.trim() || undefined,
      image: item.image,
      gallery: item.gallery || [],
      files: (item.files || []).filter(
        (file): file is CurrentProjectFile =>
          Boolean(file?.id && file.name && file.pathname && typeof file.size === "number" && file.uploadedAt)
      )
    };
  } catch {
    return null;
  }
}
