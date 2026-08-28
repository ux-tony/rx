import { contactsSectionType } from "@/sanity/schemaTypes/contactsSectionType";
import { currentProjectCommentType } from "@/sanity/schemaTypes/currentProjectCommentType";
import { currentProjectType } from "@/sanity/schemaTypes/currentProjectType";
import { faqItemType } from "@/sanity/schemaTypes/faqItemType";
import { faqSectionType } from "@/sanity/schemaTypes/faqSectionType";
import { heroSectionType } from "@/sanity/schemaTypes/heroSectionType";
import { projectCategoryType } from "@/sanity/schemaTypes/projectCategoryType";
import { projectType } from "@/sanity/schemaTypes/projectType";
import { projectsSectionType } from "@/sanity/schemaTypes/projectsSectionType";
import { serviceType } from "@/sanity/schemaTypes/serviceType";
import { servicesSectionType } from "@/sanity/schemaTypes/servicesSectionType";

export const schemaTypes = [
  heroSectionType,
  projectsSectionType,
  servicesSectionType,
  faqSectionType,
  contactsSectionType,
  projectCategoryType,
  projectType,
  currentProjectType,
  currentProjectCommentType,
  serviceType,
  faqItemType
];
