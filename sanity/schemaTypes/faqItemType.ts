import { defineField, defineType } from "sanity";

export const faqItemType = defineType({
  name: "faqItem",
  title: "FAQ",
  type: "document",
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: "question",
      title: "Вопрос",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "answer",
      title: "Ответ",
      type: "text",
      rows: 5,
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
      title: "question",
      subtitle: "answer"
    }
  }
});
