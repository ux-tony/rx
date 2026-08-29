import { defineField, defineType } from "sanity";

export const servicesSectionType = defineType({
  name: "servicesSection",
  title: "Услуги",
  type: "document",
  __experimental_formPreviewTitle: false,
  initialValue: {
    servicesEyebrow: "Услуги",
    servicesTitle: "Направления работы.",
    servicesDescription:
      "Студия разрабатывает жилые и общественные интерьеры, фасады зданий, гостиницы и рестораны, а также ландшафтный дизайн и концепции территорий для коммерческих объектов."
  },
  fields: [
    defineField({
      name: "servicesEyebrow",
      title: "Подпись",
      type: "string"
    }),
    defineField({
      name: "servicesTitle",
      title: "Заголовок",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "servicesDescription",
      title: "Описание",
      type: "text",
      rows: 4
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Услуги"
      };
    }
  }
});
