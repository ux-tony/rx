import { defineField, defineType } from "sanity";

export const heroSectionType = defineType({
  name: "heroSection",
  title: "Hero секция",
  type: "document",
  __experimental_formPreviewTitle: false,
  initialValue: {
    studioName: "Roman Kharchenko Studio",
    heroEyebrow: "Архитектурная студия",
    heroTitle: "Архитектурная студия Романа Харченко.",
    heroDescription:
      "Частная архитектурная практика с фокусом на ясную композицию, материал и выверенную атмосферу пространства.",
    seoTitle: "Roman Kharchenko Studio",
    seoDescription: "Минималистичное портфолио архитектурной студии с акцентом на проекты, свет, материал и визуальную подачу.",
    primaryCtaLabel: "Смотреть проекты",
    primaryCtaHref: "#projects",
    secondaryCtaLabel: "Обсудить задачу",
    secondaryCtaHref: "#contact",
    metrics: [
      {
        value: "18",
        label: "концептов в коллекции MVP для будущего каталога"
      },
      {
        value: "2-3",
        label: "колонки на desktop с сохранением чистой мобильной сетки"
      },
      {
        value: "1",
        label: "акцентный оттенок во всей визуальной системе"
      }
    ]
  },
  fields: [
    defineField({
      name: "studioName",
      title: "Название студии",
      description: "Брендовое название студии. Сейчас используется как служебное имя и alt для логотипа.",
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
      name: "architectPhoto",
      title: "Фото архитектора",
      type: "image",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Основная кнопка: текст",
      type: "string"
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Основная кнопка: ссылка",
      type: "string"
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Вторая кнопка: текст",
      type: "string"
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Вторая кнопка: ссылка",
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
