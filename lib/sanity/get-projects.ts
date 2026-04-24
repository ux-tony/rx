import { cache } from "react";
import type { Project } from "@/data/site-data";
import { sanityClient } from "@/lib/sanity/client";
import { projectsQuery } from "@/lib/sanity/queries";

type SanityProject = {
  slug?: string;
  title?: string;
  category?: string;
  location?: string;
  description?: string;
  image?: string;
};

export const getProjects = cache(async (): Promise<Project[]> => {
  try {
    const items = await sanityClient.fetch<SanityProject[]>(projectsQuery);

    return items
      .filter((item) => item.slug && item.title && item.image)
      .map((item) => ({
        slug: item.slug as string,
        title: item.title as string,
        category: item.category || "",
        location: item.location || "",
        description: item.description || "",
        image: item.image as string
      }));
  } catch {
    return [];
  }
});
