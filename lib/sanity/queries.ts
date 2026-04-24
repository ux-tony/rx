import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    studioName,
    "logoUrl": logo.asset->url,
    heroTitle,
    heroDescription,
    contactEmail,
    contactPhone,
    "architectPhotoUrl": architectPhoto.asset->url
  }
`;

export const projectsQuery = groq`
  *[_type == "project" && published == true] | order(_createdAt desc){
    title,
    category,
    description,
    "slug": slug.current,
    "image": coverImage.asset->url,
    "gallery": gallery[].asset->url
  }
`;

export const faqItemsQuery = groq`
  *[_type == "faqItem"] | order(order asc, _createdAt asc){
    question,
    answer
  }
`;
