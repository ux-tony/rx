import { defineArrayMember, defineField, defineType } from "sanity";

import {
  CurrentProjectPreview,
  encodeCurrentProjectPreview
} from "../components/current-project-preview";
import { MultiImageArrayInput } from "../components/multi-image-array-input";

export const currentProjectType = defineType({
  name: "currentProject",
  title: "Текущий проект",
  type: "document",
  __experimental_formPreviewTitle: false,
  components: {
    preview: CurrentProjectPreview
  },
  fields: [
    defineField({
      name: "projectNumber",
      title: "Номер проекта",
      type: "string",
      description: "Клиент вводит этот номер в форме «Обсудить проект». Например: RH-024.",
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
      rows: 3,
      description: "Необязательное короткое описание. Пустое поле не выводится на странице."
    }),
    defineField({
      name: "gallery",
      title: "Изображения проекта",
      type: "array",
      description: "Загрузите изображения и расположите их в нужном порядке.",
      components: {
        input: MultiImageArrayInput
      },
      of: [
        defineArrayMember({
          title: "Изображение",
          type: "image",
          options: { hotspot: true }
        })
      ],
      validation: (rule) => rule.min(1).error("Добавьте хотя бы одно изображение.")
    }),
    defineField({
      name: "coverImage",
      title: "Обложка",
      type: "image",
      description: "Если обложка не выбрана, используется первое изображение галереи.",
      options: { hotspot: true }
    }),
    defineField({
      name: "files",
      title: "Файлы клиента",
      description: "Файлы, загруженные клиентом со страницы текущего проекта.",
      type: "array",
      of: [
        defineArrayMember({
          name: "projectFile",
          title: "Файл",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Название", type: "string", readOnly: true }),
            defineField({ name: "pathname", title: "Путь в хранилище", type: "string", readOnly: true }),
            defineField({ name: "size", title: "Размер, байт", type: "number", readOnly: true }),
            defineField({ name: "contentType", title: "Тип файла", type: "string", readOnly: true }),
            defineField({ name: "uploadedAt", title: "Загружен", type: "datetime", readOnly: true })
          ],
          preview: {
            select: { title: "name", size: "size" },
            prepare({ title, size }) {
              const sizeLabel = typeof size === "number" ? `${(size / 1024 / 1024).toFixed(1)} МБ` : "";
              return { title: title || "Файл", subtitle: sizeLabel };
            }
          }
        })
      ]
    }),
    defineField({
      name: "published",
      title: "Открыть доступ по номеру",
      type: "boolean",
      initialValue: true
    })
  ],
  preview: {
    select: {
      id: "_id",
      title: "title",
      projectNumber: "projectNumber",
      media: "coverImage"
    },
    prepare({ id, title, projectNumber, media }) {
      return {
        title: title || "Текущий проект",
        subtitle: encodeCurrentProjectPreview(projectNumber, id),
        media
      };
    }
  }
});
