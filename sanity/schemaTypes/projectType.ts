import { defineArrayMember, defineField, defineType } from "sanity";

import { MultiImageArrayInput } from "../components/multi-image-array-input";

export const projectType = defineType({
  name: "project",
  title: "Проект",
  type: "document",
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: "title",
      title: "Название",
      type: "string",
      description: "Название проекта на карточке и отдельной странице.",
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
      description: "Адрес страницы создаётся из названия автоматически.",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "category",
      title: "Категория",
      type: "reference",
      to: [{ type: "projectCategory" }],
      description: "Используется в фильтре проектов на главной странице.",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "gallery",
      title: "Изображения проекта",
      type: "array",
      description: "Загрузите всю пачку изображений проекта. Их порядок можно менять перетаскиванием.",
      components: {
        input: MultiImageArrayInput
      },
      of: [
        defineArrayMember({
          title: "Изображение",
          type: "image",
          options: {
            hotspot: true
          }
        })
      ],
      validation: (rule) => rule.min(1).error("Добавьте хотя бы одно изображение.")
    }),
    defineField({
      name: "coverImage",
      title: "Обложка",
      type: "image",
      description: "Нажмите Select и выберите одно из уже загруженных изображений. Повторно загружать файл не нужно.",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "text",
      rows: 3,
      description: "Необязательное короткое описание на 2–3 строки. Если оставить пустым, блок не появится на сайте."
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
      subtitle: "category.title",
      media: "coverImage"
    }
  }
});
