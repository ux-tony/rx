import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    studioName,
    heroTitle,
    heroDescription,
    contactEmail,
    contactPhone,
    "architectPhotoUrl": architectPhoto.asset->url
  }
`;
