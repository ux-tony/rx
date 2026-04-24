import { cache } from "react";
import type { FaqItem } from "@/data/site-data";
import { sanityClient } from "@/lib/sanity/client";
import { faqItemsQuery } from "@/lib/sanity/queries";

type SanityFaqItem = {
  question?: string;
  answer?: string;
};

export const getFaqItems = cache(async (): Promise<FaqItem[]> => {
  try {
    const items = await sanityClient.fetch<SanityFaqItem[]>(faqItemsQuery);

    return items
      .filter((item) => item.question && item.answer)
      .map((item) => ({
        question: item.question as string,
        answer: item.answer as string
      }));
  } catch {
    return [];
  }
});
