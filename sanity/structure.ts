import type { StructureResolver } from "sanity/structure";

export const studioStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Секции сайта")
        .child(
          S.list()
            .title("Секции сайта")
            .items([
              S.listItem()
                .title("Hero секция")
                .child(S.document().schemaType("heroSection").documentId("heroSection")),
              S.listItem()
                .title("Проекты")
                .child(S.document().schemaType("projectsSection").documentId("projectsSection")),
              S.listItem()
                .title("Услуги")
                .child(S.document().schemaType("servicesSection").documentId("servicesSection")),
              S.listItem()
                .title("FAQ")
                .child(S.document().schemaType("faqSection").documentId("faqSection")),
              S.listItem()
                .title("Контакты")
                .child(S.document().schemaType("contactsSection").documentId("contactsSection"))
            ])
        ),
      S.documentTypeListItem("project").title("Проект"),
      S.documentTypeListItem("faqItem").title("FAQ"),
      S.documentTypeListItem("service").title("Услуги")
    ]);
