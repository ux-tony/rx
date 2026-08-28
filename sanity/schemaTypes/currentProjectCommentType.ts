import { defineField, defineType } from "sanity";

export const currentProjectCommentType = defineType({
  name: "currentProjectComment",
  title: "Комментарий к текущему проекту",
  type: "document",
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: "project",
      title: "Проект",
      type: "reference",
      to: [{ type: "currentProject" }],
      readOnly: true,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "authorName",
      title: "Имя клиента",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "message",
      title: "Комментарий клиента",
      type: "text",
      rows: 5,
      readOnly: true,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "createdAt",
      title: "Дата отправки",
      type: "datetime",
      readOnly: true,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "editTokenHash",
      title: "Ключ редактирования",
      type: "string",
      hidden: true,
      readOnly: true
    }),
    defineField({
      name: "reply",
      title: "Ответ студии",
      type: "text",
      rows: 5,
      description: "Ответ появится на странице проекта после публикации документа."
    }),
    defineField({
      name: "visible",
      title: "Показывать на странице проекта",
      type: "boolean",
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: "authorName",
      projectTitle: "project.title",
      projectNumber: "project.projectNumber",
      message: "message"
    },
    prepare({ title, projectTitle, projectNumber, message }) {
      return {
        title: title || "Комментарий клиента",
        subtitle: `${projectTitle || "Текущий проект"} · ${projectNumber || "без номера"} · ${message || ""}`
      };
    }
  }
});
