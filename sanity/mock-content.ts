import { faqItems, projects } from "@/data/site-data";

export const mockSiteSettings = {
  studioName: "Roman Kharchenko Studio",
  heroTitle: "Архитектурная студия Романа Харченко.",
  heroDescription:
    "Частная архитектурная практика с фокусом на ясную композицию, материал и выверенную атмосферу пространства.",
  contactEmail: "studio@rx-architect.test",
  contactPhone: "+7 (999) 000-00-00"
};

export const mockProjects = projects.map((project) => ({
  ...project
}));

export const mockFaqItems = faqItems.map((item, index) => ({
  ...item,
  order: (index + 1) * 10
}));
