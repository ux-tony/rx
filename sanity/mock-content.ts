import { faqItems, projects, services } from "@/data/site-data";

export const mockHeroSection = {
  studioName: "Roman Kharchenko Studio",
  heroTitle: "Архитектурная студия Романа Харченко.",
  heroDescription: "Частная архитектурная практика с фокусом на ясную композицию, материал и выверенную атмосферу пространства."
};

export const mockProjectsSection = {
  projectsEyebrow: "ПРОЕКТЫ",
  projectsTitle: "Архитектурные пространства, где материал и свет работают на ощущение тишины.",
  projectsDescription: "Подборка демонстрационных кейсов для MVP. В реальном проекте этот блок подключается к CMS или headless API."
};

export const mockServicesSection = {
  servicesEyebrow: "ПОДХОД",
  servicesTitle: "Спокойный интерфейс, где проекты говорят сами за себя.",
  servicesDescription: "Визуальный язык сайта построен вокруг чистой сетки, больших отступов и тактильных архитектурных кадров без лишнего интерфейсного шума."
};

export const mockFaqSection = {
  faqEyebrow: "FAQ",
  faqTitle: "Точечное применение Mantine без ощущения шаблонной библиотеки.",
  faqDescription: "На этапе MVP интерактивный FAQ собран на Mantine Accordion и стилизован под общую визуальную систему, чтобы сохранить стек из ТЗ."
};

export const mockContactsSection = {
  contactsEyebrow: "КОНТАКТЫ",
  contactsTitle: "Готовы собрать полноценный каталог проектов, формы заявок и редактор контента.",
  contactsDescription:
    "Сейчас сайт работает на mock-данных и демонстрирует визуальный каркас MVP. Следующим этапом сюда можно подключить CMS, real media storage, формы обратной связи и мультиязычность.",
  contactEmail: "studio@rx-architect.test",
  contactPhone: "+7 (999) 000-00-00"
};

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
