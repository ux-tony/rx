import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Секции сайта",
  type: "document",
  groups: [
    { name: "hero", title: "Hero секция", default: true },
    { name: "projects", title: "Проекты" },
    { name: "services", title: "Услуги" },
    { name: "faq", title: "FAQ" },
    { name: "contacts", title: "Контакты" }
  ],
  fields: [
    defineField({
      name: "studioName",
      title: "Название студии",
      type: "string",
      group: "hero"
    }),
    defineField({
      name: "logo",
      title: "Логотип 80x80",
      type: "image",
      group: "hero",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "heroTitle",
      title: "Hero: заголовок",
      type: "string",
      group: "hero"
    }),
    defineField({
      name: "heroDescription",
      title: "Hero: описание",
      type: "text",
      rows: 4,
      group: "hero"
    }),
    defineField({
      name: "architectPhoto",
      title: "Фото архитектора",
      type: "image",
      group: "hero",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "projectsEyebrow",
      title: "Проекты: подпись",
      type: "string",
      group: "projects"
    }),
    defineField({
      name: "projectsTitle",
      title: "Проекты: заголовок",
      type: "text",
      rows: 3,
      group: "projects"
    }),
    defineField({
      name: "projectsDescription",
      title: "Проекты: описание",
      type: "text",
      rows: 4,
      group: "projects"
    }),
    defineField({
      name: "servicesEyebrow",
      title: "Услуги: подпись",
      type: "string",
      group: "services"
    }),
    defineField({
      name: "servicesTitle",
      title: "Услуги: заголовок",
      type: "text",
      rows: 4,
      group: "services"
    }),
    defineField({
      name: "servicesDescription",
      title: "Услуги: описание",
      type: "text",
      rows: 4,
      group: "services"
    }),
    defineField({
      name: "faqEyebrow",
      title: "FAQ: подпись",
      type: "string",
      group: "faq"
    }),
    defineField({
      name: "faqTitle",
      title: "FAQ: заголовок",
      type: "text",
      rows: 4,
      group: "faq"
    }),
    defineField({
      name: "faqDescription",
      title: "FAQ: описание",
      type: "text",
      rows: 4,
      group: "faq"
    }),
    defineField({
      name: "contactsEyebrow",
      title: "Контакты: подпись",
      type: "string",
      group: "contacts"
    }),
    defineField({
      name: "contactsTitle",
      title: "Контакты: заголовок",
      type: "text",
      rows: 4,
      group: "contacts"
    }),
    defineField({
      name: "contactsDescription",
      title: "Контакты: описание",
      type: "text",
      rows: 4,
      group: "contacts"
    }),
    defineField({
      name: "contactEmail",
      title: "Email",
      type: "string",
      group: "contacts"
    }),
    defineField({
      name: "contactPhone",
      title: "Телефон",
      type: "string",
      group: "contacts"
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Глобальные секции сайта"
      };
    }
  }
});
