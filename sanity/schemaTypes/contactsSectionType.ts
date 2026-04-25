import { defineField, defineType } from "sanity";

export const contactsSectionType = defineType({
  name: "contactsSection",
  title: "Контакты",
  type: "document",
  __experimental_formPreviewTitle: false,
  initialValue: {
    contactsEyebrow: "Сотрудничество",
    contactsTitle:
      "Открыты к новым частным и коммерческим проектам, где важны качество среды, ясная архитектурная логика и внимательная работа с деталями.",
    contactsDescription:
      "Подключаемся к интерьерным и архитектурным задачам разного масштаба: от частных пространств до гостиниц, ресторанов, фасадов и территорий коммерческих объектов. На старте обсуждаем задачу, рамку бюджета и состав этапов, чтобы собрать рабочий маршрут без лишних итераций.",
    contactEmail: "studio@rx-architect.test",
    contactPhone: "+7 (999) 000-00-00",
    telegramUrl: "https://t.me/"
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
      type: "string"
    }),
    defineField({
      name: "contactPhone",
      title: "Телефон",
      type: "string"
    }),
    defineField({
      name: "telegramUrl",
      title: "Telegram URL",
      type: "string"
    }),
    defineField({
      name: "contactImage",
      title: "Изображение справа",
      type: "image",
      options: {
        hotspot: true
      }
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Контакты"
      };
    }
  }
});
