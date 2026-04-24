import { defineField, defineType } from "sanity";

export const faqSectionType = defineType({
  name: "faqSection",
  title: "FAQ",
  type: "document",
  initialValue: {
    faqEyebrow: "FAQ",
    faqTitle: "Точечное применение Mantine без ощущения шаблонной библиотеки.",
    faqDescription:
      "На этапе MVP интерактивный FAQ собран на Mantine Accordion и стилизован под общую визуальную систему, чтобы сохранить стек из ТЗ."
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
        title: "FAQ"
      };
    }
  }
});
