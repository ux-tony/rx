import type { ServiceItem } from "@/data/site-data";
import { sanityClient } from "@/lib/sanity/client";
import { servicesQuery } from "@/lib/sanity/queries";

type SanityService = {
  index?: string;
  title?: string;
  description?: string;
};

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const items = await sanityClient.fetch<SanityService[]>(servicesQuery);

    return items
      .filter((item) => item.index && item.title)
      .map((item) => ({
        index: item.index as string,
        title: item.title as string,
        description: item.description || ""
      }));
  } catch {
    return [];
  }
}
