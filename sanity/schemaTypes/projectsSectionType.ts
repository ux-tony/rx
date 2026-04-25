import { defineField, defineType } from "sanity";

export const projectsSectionType = defineType({
  name: "projectsSection",
  title: "Проекты",
  type: "document",
  __experimental_formPreviewTitle: false,
  initialValue: {
    projectsEyebrow: "ПРОЕКТЫ",
    projectsTitle: "Архитектурные пространства, где материал и свет работают на ощущение тишины.",
    projectsDescription:
      "Подборка демонстрационных кейсов для MVP. В реальном проекте этот блок подключается к CMS или headless API."
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
