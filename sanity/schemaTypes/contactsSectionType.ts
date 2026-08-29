import { defineField, defineType } from "sanity";

export const contactsSectionType = defineType({
  name: "contactsSection",
  title: "Контакты",
  type: "document",
  __experimental_formPreviewTitle: false,
  initialValue: {
    contactsEyebrow: "КОНТАКТЫ",
    contactsTitle: "Расскажите о будущем проекте.",
    contactsDescription:
      "Опишите задачу, масштаб и желаемые сроки. Мы свяжемся с вами, уточним вводные и предложим понятный следующий шаг.",
    contactEmail: "rx@4758585.ru",
    contactPhone: "8 (928) 000-00-00"
  },
  fields: [
    defineField({
      name: "contactsEyebrow",
      title: "Подпись",
      type: "string"
    }),
    defineField({
      name: "contactsTitle",
      title: "Заголовок",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "contactsDescription",
      title: "Описание",
      type: "text",
      rows: 5
    }),
    defineField({
      name: "contactEmail",
      title: "Email",
      description: "Используется формой обращения и формой обсуждения нового проекта.",
      type: "string",
      validation: (rule) => rule.email()
    }),
    defineField({
      name: "contactPhone",
      title: "Телефон",
      description: "Показывается в шапке сайта, разделе контактов и на страницах проектов.",
      type: "string"
    }),
    defineField({
      name: "telegramUrl",
      title: "Telegram URL",
      type: "string"
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Контакты"
      };
    }
  }
});
