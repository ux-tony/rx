"use client";

import { useState } from "react";
import { Alert, Button, Group, Loader, Stack, Text } from "@mantine/core";
import { useClient } from "sanity";
import {
  mockFaqItems,
  mockProjectCategories,
  mockProjects,
  mockServices
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
      setMessage("Синхронизируем категории, проекты, услуги и FAQ...");

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
        const coverImage = await uploadImage(project.image, `${project.slug}-cover.jpg`);
        const gallery =
          project.gallery && project.gallery.length > 0
            ? await Promise.all(
                project.gallery.map(async (url, index) => ({
                  ...(await uploadImage(url, `${project.slug}-gallery-${index + 1}.jpg`)),
                  _key: `${project.slug}-gallery-${index + 1}`
                }))
              )
            : [];

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
        `Готово: ${mockProjectCategories.length} категории, ${mockProjects.length} проектов, ${mockServices.length} услуги и ${mockFaqItems.length} вопросов.`
      );
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Не удалось импортировать mock-данные.");
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <Stack gap="md">
        <div>
          <Text fw={700} size="xl">
            Синхронизация контента
          </Text>
          <Text c="dimmed" mt={8}>
            Добавляет текущие проекты, категории, услуги и FAQ в Sanity. Hero, контакты и настройки сайта не изменяются.
          </Text>
        </div>

        <Group>
          <Button onClick={seedMockData} radius={0} variant="filled">
            Синхронизировать с Sanity
          </Button>
          {status === "loading" ? <Loader size="sm" /> : null}
        </Group>

        {status !== "idle" ? (
          <Alert color={status === "error" ? "red" : status === "success" ? "green" : "blue"} radius={0}>
            {message}
          </Alert>
        ) : null}
      </Stack>
    </div>
  );
}
