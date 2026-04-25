import type { StructureResolver } from "sanity/structure";

export const studioStructure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      S.listItem()
        .id("site-sections")
        .title("Секции сайта")
        .child(
          S.list()
            .id("site-sections-list")
            .title("Секции сайта")
            .items([
              S.listItem()
                .id("hero-section-item")
                .title("Hero секция")
                .child(S.document().schemaType("heroSection").documentId("heroSection").title("Hero секция")),
              S.listItem()
                .id("projects-section-item")
                .title("Проекты")
                .child(S.document().schemaType("projectsSection").documentId("projectsSection").title("Проекты")),
              S.listItem()
                .id("services-section-item")
                .title("Услуги")
                .child(S.document().schemaType("servicesSection").documentId("servicesSection").title("Услуги")),
              S.listItem()
                .id("faq-section-item")
                .title("FAQ")
                .child(S.document().schemaType("faqSection").documentId("faqSection").title("FAQ")),
              S.listItem()
                .id("contacts-section-item")
                .title("Контакты")
                .child(S.document().schemaType("contactsSection").documentId("contactsSection").title("Контакты"))
            ])
        ),
      S.documentTypeListItem("project").id("projects-documents").title("Проекты (Портфолио)"),
      S.documentTypeListItem("faqItem").id("faq-documents").title("Вопросы и ответы"),
      S.documentTypeListItem("service").id("services-documents").title("Услуги")
    ]);
