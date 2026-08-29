import { defineField, defineType } from "sanity";

export const heroSectionType = defineType({
  name: "heroSection",
  title: "Hero секция",
  type: "document",
  __experimental_formPreviewTitle: false,
  initialValue: {
    studioName: "Роман Харченко",
    heroEyebrow: "Архитектурная студия",
    heroTitle: "Романа Харченко",
    heroDescription:
      "Я создаю пространства, в которых архитектура, интерьер и ландшафт работают как единое целое. В основе каждого проекта: характер места, ясная логика и внимание к тому, как человек будет жить, работать и чувствовать себя внутри.",
    seoTitle: "RX Architect",
    seoDescription: "Минималистичное портфолио архитектора с акцентом на проекты и визуальную подачу.",
    primaryCtaLabel: "Смотреть проекты",
    primaryCtaHref: "#project-list",
    secondaryCtaLabel: "Обсудить задачу",
    metrics: [
      {
        value: "100+",
        label: "реализованных проектов"
      },
      {
        value: "3",
        label: "направления, закрывающие полный цикл"
      },
      {
        value: "1",
        label: "цель — создавать пространства, которые работают"
      }
    ]
  },
  fields: [
    defineField({
      name: "studioName",
      title: "Название студии",
      description: "Показывается рядом с логотипом в шапке и в копирайте футера.",
      type: "string"
    }),
    defineField({
      name: "heroEyebrow",
      title: "Подпись над заголовком",
      description: "Небольшая подпись над главным заголовком, сейчас это текст «Архитектурная студия».",
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
      name: "seoTitle",
      title: "SEO Title",
      description: "Заголовок страницы для браузера и поисковиков.",
      type: "string"
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      description: "Meta description для поисковиков и предпросмотра страницы.",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Основная кнопка: текст",
      type: "string"
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Основная кнопка: ссылка",
      description: "Для перехода к карточкам проектов используйте #project-list.",
      type: "string"
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Вторая кнопка: текст",
      description: "Кнопка открывает форму обсуждения проекта.",
      type: "string"
    }),
    defineField({
      name: "metrics",
      title: "Метрики",
      type: "array",
      of: [
        defineField({
          name: "metric",
          title: "Метрика",
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Значение",
              type: "string"
            }),
            defineField({
              name: "label",
              title: "Описание",
              type: "text",
              rows: 3
            })
          ],
          preview: {
            select: {
              title: "value",
              subtitle: "label"
            }
          }
        })
      ]
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
