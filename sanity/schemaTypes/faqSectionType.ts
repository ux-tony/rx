import { defineField, defineType } from "sanity";

export const faqSectionType = defineType({
  name: "faqSection",
  title: "Вопросы и ответы",
  type: "document",
  __experimental_formPreviewTitle: false,
  initialValue: {
    faqEyebrow: "Вопросы и ответы",
    faqTitle: "Главное до начала работы.",
    faqDescription:
      "Здесь собраны ответы о сроках, бюджете, этапах, составе проекта и участии заказчика — всё, что поможет заранее понять процесс работы со студией."
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
