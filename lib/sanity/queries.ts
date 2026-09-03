import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  {
    "hero": *[_id == "heroSection"][0]{
      studioName,
      heroEyebrow,
      "logoUrl": logo.asset->url,
      heroTitle,
      heroDescription,
      "heroImageUrl": heroImage.asset->url,
      "heroImageAspectRatio": heroImage.asset->metadata.dimensions.aspectRatio,
      heroBackgroundColor,
      seoTitle,
      seoDescription,
      primaryCtaLabel,
      primaryCtaHref,
      secondaryCtaLabel,
      metrics[]{
        value,
        label
      }
    },
    "projects": *[_id == "projectsSection"][0]{
      projectsEyebrow,
      projectsTitle,
      projectsDescription
    },
    "services": *[_id == "servicesSection"][0]{
      servicesEyebrow,
      servicesTitle,
      servicesDescription
    },
    "faq": *[_id == "faqSection"][0]{
      faqEyebrow,
      faqTitle,
      faqDescription
    },
    "contacts": *[_id == "contactsSection"][0]{
      contactsEyebrow,
      contactsTitle,
      contactsDescription,
      contactEmail,
      contactPhone,
      telegramUrl
    }
  }
`;

export const projectCategoriesQuery = groq`
  *[_type == "projectCategory"] | order(order asc, title asc){
    title,
    "slug": slug.current
  }
`;

export const projectsQuery = groq`
  *[_type == "project" && published == true] | order(_createdAt desc){
    title,
    "category": coalesce(category->title, category),
    "categorySlug": category->slug.current,
    description,
    "slug": slug.current,
    "image": coalesce(coverImage.asset->url, gallery[0].asset->url),
    "gallery": gallery[].asset->url
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && published == true && slug.current == $slug][0]{
    title,
    "category": category->title,
    "categorySlug": category->slug.current,
    description,
    "slug": slug.current,
    "image": coalesce(coverImage.asset->url, gallery[0].asset->url),
    "gallery": gallery[].asset->url
  }
`;

export const currentProjectsQuery = groq`
  *[_type == "currentProject" && published == true]{
    "id": _id,
    projectNumber,
    title,
    description,
    "image": coalesce(coverImage.asset->url, gallery[0].asset->url),
    "gallery": gallery[].asset->url,
    "files": files[]{
      "id": _key,
      name,
      pathname,
      size,
      contentType,
      uploadedAt
    }
  }
`;

export const currentProjectCommentsQuery = groq`
  *[
    _type == "currentProjectComment" &&
    visible == true &&
    project._ref == $projectId
  ] | order(createdAt asc){
    _id,
    authorName,
    message,
    createdAt,
    reply
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
