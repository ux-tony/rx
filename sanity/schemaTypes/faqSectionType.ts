import { defineField, defineType } from "sanity";

export const faqSectionType = defineType({
  name: "faqSection",
  title: "Вопросы и ответы",
  type: "document",
  __experimental_formPreviewTitle: false,
  initialValue: {
    faqEyebrow: "Вопросы и ответы",
    faqTitle: "Частые вопросы, которые помогают быстро понять формат работы, сроки и состав архитектурного проекта.",
    faqDescription:
      "Собрали базовые вопросы заказчиков перед стартом: про бюджет, сроки, объём проектирования, участие в процессе и сопровождение реализации."
  },
  fields: [
    defineField({
      name: "faqEyebrow",
      title: "Подпись",
      type: "string"
    }),
    defineField({
      name: "faqTitle",
      title: "Заголовок",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "faqDescription",
      title: "Описание",
      type: "text",
      rows: 4
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Вопросы и ответы"
      };
    }
  }
});
