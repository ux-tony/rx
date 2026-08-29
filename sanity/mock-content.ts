import { faqItems, projectCategories, projects, services } from "@/data/site-data";

export const mockHeroSection = {
  studioName: "Роман Харченко",
  heroEyebrow: "Архитектурная студия",
  heroTitle: "Романа Харченко",
  heroDescription:
    "Я создаю пространства, в которых архитектура, интерьер и ландшафт работают как единое целое. В основе каждого проекта: характер места, ясная логика и внимание к тому, как человек будет жить, работать и чувствовать себя внутри.",
  seoTitle: "RX Architect",
  seoDescription: "Минималистичное портфолио архитектора с акцентом на проекты и визуальную подачу.",
  primaryCtaLabel: "Смотреть проекты",
  primaryCtaHref: "#project-list",
  secondaryCtaLabel: "Обсудить задачу",
  metrics: [
    {
      value: "100+",
      label: "реализованных проектов"
    },
    {
      value: "3",
      label: "направления, закрывающие полный цикл"
    },
    {
      value: "1",
      label: "цель — создавать пространства, которые работают"
    }
  ]
};

export const mockProjectsSection = {
  projectsEyebrow: "Проекты студии",
  projectsTitle: "От идеи до пространства.",
  projectsDescription:
    "Воплощаем архитектурные идеи разного масштаба и сложности: от частных интерьеров до общественных пространств, фасадов и территорий. Каждый проект доводим до цельного, функционального и выразительного решения."
};

export const mockServicesSection = {
  servicesEyebrow: "Услуги",
  servicesTitle: "Направления работы.",
  servicesDescription:
    "Студия разрабатывает жилые и общественные интерьеры, фасады зданий, гостиницы и рестораны, а также ландшафтный дизайн и концепции территорий для коммерческих объектов."
};

export const mockFaqSection = {
  faqEyebrow: "Вопросы и ответы",
  faqTitle: "Главное до начала работы.",
  faqDescription:
    "Здесь собраны ответы о сроках, бюджете, этапах, составе проекта и участии заказчика — всё, что поможет заранее понять процесс работы со студией."
};

export const mockContactsSection = {
  contactsEyebrow: "КОНТАКТЫ",
  contactsTitle: "Расскажите о будущем проекте.",
  contactsDescription:
    "Опишите задачу, масштаб и желаемые сроки. Мы свяжемся с вами, уточним вводные и предложим понятный следующий шаг.",
  contactEmail: "rx@4758585.ru",
  contactPhone: "8 (928) 000-00-00"
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
