import type { Project } from "@/data/site-data";
import { sanityClient } from "@/lib/sanity/client";
import { projectBySlugQuery } from "@/lib/sanity/queries";

type SanityProject = {
  slug?: string;
  title?: string;
  category?: string;
  categorySlug?: string;
  description?: string;
  image?: string;
  gallery?: string[];
};

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const item = await sanityClient.fetch<SanityProject | null>(projectBySlugQuery, { slug });

    if (!item?.slug || !item.title || !item.image) {
      return null;
    }

    return {
      slug: item.slug,
      title: item.title,
      category: item.category || "",
      categorySlug: item.categorySlug || "",
      description: item.description?.trim() || undefined,
      image: item.image,
      gallery: item.gallery || []
    };
  } catch {
    return null;
  }
}
