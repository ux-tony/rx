import { defineField, defineType } from "sanity";

export const contactsSectionType = defineType({
  name: "contactsSection",
  title: "Контакты",
  type: "document",
  __experimental_formPreviewTitle: false,
  initialValue: {
    contactsEyebrow: "КОНТАКТЫ",
    contactsTitle: "Готовы собрать полноценный каталог проектов, формы заявок и редактор контента.",
    contactsDescription:
      "Сейчас сайт работает на mock-данных и демонстрирует визуальный каркас MVP. Следующим этапом сюда можно подключить CMS, real media storage, формы обратной связи и мультиязычность.",
    contactEmail: "studio@rx-architect.test",
    contactPhone: "+7 (999) 000-00-00"
  },
  fields: [
    defineField({
      name: "contactsEyebrow",
      title: "Подпись",
      type: "string"
    }),
    defineField({
      name: "contactsTitle",
      title: "Заголовок",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "contactsDescription",
      title: "Описание",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "contactEmail",
      title: "Email",
      type: "string"
    }),
    defineField({
      name: "contactPhone",
      title: "Телефон",
      type: "string"
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Контакты"
      };
    }
  }
});
