import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Услуга",
  type: "document",
  fields: [
    defineField({
      name: "index",
      title: "Номер",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "title",
      title: "Название",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "published",
      title: "Показывать на сайте",
      type: "boolean",
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "index"
    }
  }
});
