import { defineField, defineType } from "sanity";

export const projectsSectionType = defineType({
  name: "projectsSection",
  title: "Проекты",
  type: "document",
  __experimental_formPreviewTitle: false,
  initialValue: {
    projectsEyebrow: "Проекты студии",
    projectsTitle: "От идеи до пространства.",
    projectsDescription:
      "Воплощаем архитектурные идеи разного масштаба и сложности: от частных интерьеров до общественных пространств, фасадов и территорий. Каждый проект доводим до цельного, функционального и выразительного решения."
  },
  fields: [
    defineField({
      name: "projectsEyebrow",
      title: "Подпись",
      type: "string"
    }),
    defineField({
      name: "projectsTitle",
      title: "Заголовок",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "projectsDescription",
      title: "Описание",
      type: "text",
      rows: 4
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Проекты"
      };
    }
  }
});
