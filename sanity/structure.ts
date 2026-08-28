import { CommentIcon, DocumentIcon } from "@sanity/icons";
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
                .title("Вопросы и ответы")
                .child(S.document().schemaType("faqSection").documentId("faqSection").title("Вопросы и ответы")),
              S.listItem()
                .id("contacts-section-item")
                .title("Контакты")
                .child(S.document().schemaType("contactsSection").documentId("contactsSection").title("Контакты"))
            ])
        ),
      S.documentTypeListItem("projectCategory").id("project-categories").title("Категории проектов"),
      S.documentTypeListItem("project").id("projects-documents").title("Проекты (Портфолио)"),
      S.listItem()
        .id("current-projects-documents")
        .title("Текущие проекты")
        .schemaType("currentProject")
        .child(
          S.documentTypeList("currentProject")
            .id("current-projects-list")
            .title("Текущие проекты")
            .child(async (projectId, { structureContext }) => {
              const commentCount = await structureContext
                .getClient({ apiVersion: "2026-04-24" })
                .fetch<number>(
                  `count(*[
                    _type == "currentProjectComment" &&
                    !(_id in path("drafts.**")) &&
                    project._ref == $projectId
                  ])`,
                  { projectId }
                );

              return S.list()
                .id("current-project-content")
                .title("Текущий проект")
                .items([
                  S.listItem()
                    .id("current-project-details")
                    .title("Данные проекта")
                    .icon(DocumentIcon)
                    .schemaType("currentProject")
                    .child(
                      S.document()
                        .schemaType("currentProject")
                        .documentId(projectId)
                        .title("Данные проекта")
                    ),
                  S.listItem()
                    .id("current-project-comments")
                    .title(`Комментарии (${commentCount})`)
                    .icon(CommentIcon)
                    .schemaType("currentProjectComment")
                    .child(
                      S.documentList()
                        .id("current-project-comments-list")
                        .title("Комментарии")
                        .schemaType("currentProjectComment")
                        .filter('_type == "currentProjectComment" && project._ref == $projectId')
                        .params({ projectId })
                        .initialValueTemplates([])
                    )
                ]);
            })
        ),
      S.documentTypeListItem("faqItem").id("faq-documents").title("Вопросы и ответы"),
      S.documentTypeListItem("service").id("services-documents").title("Услуги")
    ]);
