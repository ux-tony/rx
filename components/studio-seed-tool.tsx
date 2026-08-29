"use client";

import { useState } from "react";
import { useClient } from "sanity";
import {
  mockContactsSection,
  mockFaqItems,
  mockFaqSection,
  mockHeroSection,
  mockProjectCategories,
  mockProjects,
  mockProjectsSection,
  mockServices,
  mockServicesSection
} from "@/sanity/mock-content";

type UploadedImage = {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
};

export function StudioSeedTool() {
  const client = useClient({ apiVersion: "2026-04-24" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function uploadImage(url: string, filename: string): Promise<UploadedImage> {
    const existingAssetId = await client.fetch<string | null>(
      '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id',
      { filename }
    );

    if (existingAssetId) {
      return {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: existingAssetId
        }
      };
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Не удалось загрузить изображение ${filename}.`);
    }

    const blob = await response.blob();
    const asset = await client.assets.upload("image", blob, { filename });

    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id
      }
    };
  }

  async function seedMockData() {
    try {
      setStatus("loading");
      setMessage("Синхронизируем секции сайта, категории, проекты, услуги и FAQ...");

      const existingHero = await client.fetch<{ logo?: UploadedImage } | null>(
        '*[_id == "heroSection"][0]{logo}'
      );

      await client.createOrReplace({
        _id: "heroSection",
        _type: "heroSection",
        ...mockHeroSection,
        metrics: mockHeroSection.metrics.map((metric, index) => ({
          ...metric,
          _key: `metric-${index + 1}`
        })),
        ...(existingHero?.logo ? { logo: existingHero.logo } : {})
      });

      await client.createOrReplace({
        _id: "projectsSection",
        _type: "projectsSection",
        ...mockProjectsSection
      });

      await client.createOrReplace({
        _id: "servicesSection",
        _type: "servicesSection",
        ...mockServicesSection
      });

      await client.createOrReplace({
        _id: "faqSection",
        _type: "faqSection",
        ...mockFaqSection
      });

      await client.createOrReplace({
        _id: "contactsSection",
        _type: "contactsSection",
        ...mockContactsSection
      });

      const singletonDraftIds = [
        "drafts.heroSection",
        "drafts.projectsSection",
        "drafts.servicesSection",
        "drafts.faqSection",
        "drafts.contactsSection"
      ];
      const existingSingletonDraftIds = await client.fetch<string[]>('*[_id in $ids]._id', {
        ids: singletonDraftIds
      });

      if (existingSingletonDraftIds.length > 0) {
        let cleanupTransaction = client.transaction();

        for (const draftId of existingSingletonDraftIds) {
          cleanupTransaction = cleanupTransaction.delete(draftId);
        }

        await cleanupTransaction.commit();
      }

      for (const category of mockProjectCategories) {
        await client.createOrReplace({
          _id: `project-category-${category.slug}`,
          _type: "projectCategory",
          title: category.title,
          slug: {
            _type: "slug",
            current: category.slug
          },
          order: category.order
        });
      }

      const existingFaqIds = await client.fetch<string[]>('*[_type == "faqItem"]._id');

      for (const [index, item] of mockFaqItems.entries()) {
        const existingId = index === 0 && existingFaqIds.length === 1 ? existingFaqIds[0] : null;

        await client.createOrReplace({
          _id: existingId ?? `faq-${item.order}`,
          _type: "faqItem",
          question: item.question,
          answer: item.answer,
          order: item.order
        });
      }

      for (const item of mockServices) {
        await client.createOrReplace({
          _id: `service-${item.index}`,
          _type: "service",
          index: item.index,
          title: item.title,
          description: item.description,
          published: true
        });
      }

      for (const project of mockProjects) {
        const gallerySources = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
        const gallery = await Promise.all(
          gallerySources.map(async (url, index) => ({
            ...(await uploadImage(url, `${project.slug}-gallery-${index + 1}.jpg`)),
            _key: `${project.slug}-gallery-${index + 1}`
          }))
        );
        const coverImage: UploadedImage = {
          _type: "image",
          asset: gallery[0].asset
        };

        await client.createOrReplace({
          _id: `project-${project.slug}`,
          _type: "project",
          title: project.title,
          slug: {
            _type: "slug",
            current: project.slug
          },
          category: {
            _type: "reference",
            _ref: `project-category-${project.categorySlug}`
          },
          coverImage,
          gallery,
          description: project.description,
          published: true
        });
      }

      setStatus("success");
      setMessage(
        `Готово: 5 секций сайта, ${mockProjectCategories.length} категорий, ${mockProjects.length} проектов, ${mockServices.length} услуг и ${mockFaqItems.length} вопросов.`
      );
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Не удалось импортировать mock-данные.");
    }
  }

  return (
    <div
      style={{
        display: "grid",
        gap: 20,
        maxWidth: 760,
        padding: 32
      }}
    >
      <div>
        <h1 style={{ fontSize: 24, margin: 0 }}>Синхронизация контента</h1>
        <p style={{ color: "#6e7680", lineHeight: 1.5, margin: "10px 0 0" }}>
          Переносит текущий контент сайта в Sanity: Hero, заголовки разделов, контакты, категории, проекты,
          услуги и FAQ. После синхронизации весь этот контент редактируется из админки.
        </p>
      </div>

      <div>
        <button
          type="button"
          onClick={seedMockData}
          disabled={status === "loading"}
          style={{
            background: status === "loading" ? "#777" : "#111",
            border: 0,
            color: "#fff",
            cursor: status === "loading" ? "wait" : "pointer",
            font: "inherit",
            fontWeight: 600,
            padding: "12px 18px"
          }}
        >
          {status === "loading" ? "Синхронизация..." : "Синхронизировать с Sanity"}
        </button>
      </div>

      {status !== "idle" ? (
        <div
          role="status"
          style={{
            background: status === "error" ? "#fff0f0" : status === "success" ? "#edf9f0" : "#f1f5f9",
            border: `1px solid ${status === "error" ? "#e5484d" : status === "success" ? "#30a46c" : "#94a3b8"}`,
            lineHeight: 1.5,
            padding: 14
          }}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}
