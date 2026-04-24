import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Проект",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Название",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "category",
      title: "Категория",
      type: "string"
    }),
    defineField({
      name: "location",
      title: "Локация",
      type: "string"
    }),
    defineField({
      name: "year",
      title: "Год",
      type: "number"
    }),
    defineField({
      name: "coverImage",
      title: "Обложка",
      type: "image",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "gallery",
      title: "Галерея",
      type: "array",
      of: [
        defineField({
          name: "image",
          title: "Изображение",
          type: "image",
          options: {
            hotspot: true
          }
        })
      ]
    }),
    defineField({
      name: "description",
      title: "Краткое описание",
      type: "text",
      rows: 4
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
      subtitle: "location",
      media: "coverImage"
    }
  }
});
