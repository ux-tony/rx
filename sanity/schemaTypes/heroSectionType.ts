import { defineField, defineType } from "sanity";

export const heroSectionType = defineType({
  name: "heroSection",
  title: "Hero секция",
  type: "document",
  initialValue: {
    studioName: "Roman Kharchenko Studio",
    heroTitle: "Архитектурная студия Романа Харченко.",
    heroDescription:
      "Частная архитектурная практика с фокусом на ясную композицию, материал и выверенную атмосферу пространства."
  },
  fields: [
    defineField({
      name: "studioName",
      title: "Название студии",
      type: "string"
    }),
    defineField({
      name: "logo",
      title: "Логотип 80x80",
      type: "image",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "heroTitle",
      title: "Заголовок",
      type: "string"
    }),
    defineField({
      name: "heroDescription",
      title: "Описание",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "architectPhoto",
      title: "Фото архитектора",
      type: "image",
      options: {
        hotspot: true
      }
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Hero секция"
      };
    }
  }
});
