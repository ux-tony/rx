import { faqItems, projectCategories, projects, services } from "@/data/site-data";

export const mockHeroSection = {
  studioName: "Roman Kharchenko Studio",
  heroEyebrow: "Архитектурная студия",
  heroTitle: "Роман Харченко. Архитектор.",
  heroDescription:
    "Я создаю пространства, в которых архитектура, интерьер и ландшафт работают как единое целое. В основе каждого проекта: характер места, ясная логика и внимание к тому, как человек будет жить, работать и чувствовать себя внутри.",
  seoTitle: "Roman Kharchenko Studio",
  seoDescription:
    "Портфолио архитектурной студии: жилые и общественные интерьеры, фасады, hospitality, ландшафт и концепции коммерческих территорий.",
  primaryCtaLabel: "Смотреть проекты",
  primaryCtaHref: "#projects",
  secondaryCtaLabel: "Обсудить задачу",
  secondaryCtaHref: "#contact",
  metrics: [
    {
      value: "18",
      label: "концепций и предварительных сценариев для будущей коллекции портфолио"
    },
    {
      value: "2-3",
      label: "формата подачи, чтобы сайт одинаково уверенно работал на desktop и mobile"
    },
    {
      value: "1",
      label: "контактный маршрут от первого обращения до запуска проектной работы"
    }
  ]
};

export const mockProjectsSection = {
  projectsEyebrow: "Проекты",
  projectsTitle: "Проекты студии.",
  projectsDescription:
    "Частные и общественные пространства, интерьеры, фасады и территории, в которых архитектурная идея доведена до ясного и цельного решения."
};

export const mockServicesSection = {
  servicesEyebrow: "Услуги",
  servicesTitle: "Направления работы.",
  servicesDescription:
    "Студия разрабатывает жилые и общественные интерьеры, фасады зданий, гостиницы и рестораны, а также ландшафтный дизайн и концепции территорий для коммерческих объектов."
};

export const mockFaqSection = {
  faqEyebrow: "Вопросы и ответы",
  faqTitle: "О работе над проектом.",
  faqDescription:
    "Собрали базовые вопросы заказчиков перед стартом: про бюджет, сроки, объём проектирования, участие в процессе и сопровождение реализации."
};

export const mockContactsSection = {
  contactsEyebrow: "Сотрудничество",
  contactsTitle:
    "Открыты к новым частным и коммерческим проектам, где важны качество среды, ясная архитектурная логика и внимательная работа с деталями.",
  contactsDescription:
    "Подключаемся к интерьерным и архитектурным задачам разного масштаба: от частных пространств до гостиниц, ресторанов, фасадов и территорий коммерческих объектов. На старте обсуждаем задачу, рамку бюджета и состав этапов, чтобы собрать рабочий маршрут без лишних итераций.",
  contactEmail: "studio@rx-architect.test",
  contactPhone: "+7 (999) 000-00-00",
  telegramUrl: "https://t.me/"
};

export const mockProjectCategories = projectCategories.map((category, index) => ({
  title: category.title,
  slug: category.slug,
  order: (index + 1) * 10
}));

export const mockProjects = projects.map((project) => ({
  ...project
}));

export const mockServices = services.map((item) => ({
  ...item
}));

export const mockFaqItems = faqItems.map((item, index) => ({
  ...item,
  order: (index + 1) * 10
}));
