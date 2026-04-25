import { defineField, defineType } from "sanity";

export const servicesSectionType = defineType({
  name: "servicesSection",
  title: "Услуги",
  type: "document",
  __experimental_formPreviewTitle: false,
  initialValue: {
    servicesEyebrow: "ПОДХОД",
    servicesTitle: "Спокойный интерфейс, где проекты говорят сами за себя.",
    servicesDescription:
      "Визуальный язык сайта построен вокруг чистой сетки, больших отступов и тактильных архитектурных кадров без лишнего интерфейсного шума."
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
        title: ""
      };
    }
  }
});
