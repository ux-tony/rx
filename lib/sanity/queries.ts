import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  {
    "hero": *[_type == "heroSection"][0]{
      studioName,
      heroEyebrow,
      "logoUrl": logo.asset->url,
      heroTitle,
      heroDescription,
      seoTitle,
      seoDescription,
      primaryCtaLabel,
      primaryCtaHref,
      secondaryCtaLabel,
      secondaryCtaHref,
      metrics[]{
        value,
        label
      },
      "architectPhotoUrl": architectPhoto.asset->url
    },
    "projects": *[_type == "projectsSection"][0]{
      projectsEyebrow,
      projectsTitle,
      projectsDescription
    },
    "services": *[_type == "servicesSection"][0]{
      servicesEyebrow,
      servicesTitle,
      servicesDescription
    },
    "faq": *[_type == "faqSection"][0]{
      faqEyebrow,
      faqTitle,
      faqDescription
    },
    "contacts": *[_type == "contactsSection"][0]{
      contactsEyebrow,
      contactsTitle,
      contactsDescription,
      contactEmail,
      contactPhone
    }
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

export const servicesQuery = groq`
  *[_type == "service" && published == true] | order(index asc, _createdAt asc){
    index,
    title,
    description
  }
`;
