import { sanityClient } from "@/lib/sanity/client";
import { currentProjectCommentsQuery } from "@/lib/sanity/queries";

export type CurrentProjectComment = {
  id: string;
  authorName: string;
  message: string;
  createdAt: string;
  createdAtLabel: string;
  reply?: string;
};

type SanityCurrentProjectComment = {
  _id?: string;
  authorName?: string;
  message?: string;
  createdAt?: string;
  reply?: string;
};

export async function getCurrentProjectComments(projectId: string): Promise<CurrentProjectComment[]> {
  try {
    const items = await sanityClient.fetch<SanityCurrentProjectComment[]>(currentProjectCommentsQuery, { projectId });

    return items
      .filter((item) => item._id && item.authorName && item.message && item.createdAt)
      .map((item) => ({
        id: item._id as string,
        authorName: item.authorName as string,
        message: item.message as string,
        createdAt: item.createdAt as string,
        createdAtLabel: new Intl.DateTimeFormat("ru-RU", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "Europe/Moscow"
        }).format(new Date(item.createdAt as string)),
        reply: item.reply?.trim() || undefined
      }));
  } catch {
    return [];
  }
}
