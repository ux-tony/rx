import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Настройки сайта",
  type: "document",
  fields: [
    defineField({
      name: "studioName",
      title: "Название студии",
      type: "string"
    }),
    defineField({
      name: "heroTitle",
      title: "Hero-заголовок",
      type: "string"
    }),
    defineField({
      name: "heroDescription",
      title: "Hero-описание",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "architectPhoto",
      title: "Фото архитектора",
      type: "image",
      options: {
        hotspot: true
      }
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
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Глобальные настройки сайта"
      };
    }
  }
});
