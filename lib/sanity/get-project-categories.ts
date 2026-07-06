import type { ProjectCategory } from "@/data/site-data";
import { sanityClient } from "@/lib/sanity/client";
import { projectCategoriesQuery } from "@/lib/sanity/queries";

type SanityProjectCategory = {
  title?: string;
  slug?: string;
};

export async function getProjectCategories(): Promise<ProjectCategory[]> {
  try {
    const items = await sanityClient.fetch<SanityProjectCategory[]>(projectCategoriesQuery);

    return items
      .filter((item) => item.title && item.slug)
      .map((item) => ({
        title: item.title as string,
        slug: item.slug as string
      }));
  } catch {
    return [];
  }
}
