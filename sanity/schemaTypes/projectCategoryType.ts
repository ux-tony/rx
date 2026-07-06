import { defineField, defineType } from "sanity";

export const projectCategoryType = defineType({
  name: "projectCategory",
  title: "Категория проекта",
  type: "document",
  __experimental_formPreviewTitle: false,
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
      name: "order",
      title: "Порядок",
      type: "number",
      initialValue: 10
    })
  ],
  preview: {
    select: {
      title: "title"
    }
  }
});
