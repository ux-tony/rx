import { sanityClient } from "@/lib/sanity/client";
import { currentProjectsQuery } from "@/lib/sanity/queries";

export type CurrentProject = {
  id: string;
  projectNumber: string;
  title: string;
  description?: string;
  image: string;
  gallery: string[];
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
      gallery: item.gallery || []
    };
  } catch {
    return null;
  }
}
