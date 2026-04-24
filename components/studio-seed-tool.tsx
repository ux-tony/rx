"use client";

import { useState } from "react";
import { Alert, Button, Group, Loader, Stack, Text } from "@mantine/core";
import { useClient } from "sanity";
import { mockFaqItems, mockProjects, mockServices, mockSiteSettings } from "@/sanity/mock-content";

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
    const response = await fetch(url);
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
      setMessage("Импортируем mock-данные в Sanity...");

      const existing = await client.fetch<{ _id: string }[]>(
        '*[_type in ["siteSettings","project","service","faqItem"]]{_id}'
      );

      let transaction = client.transaction();

      for (const doc of existing) {
        transaction = transaction.delete(doc._id);
      }

      await transaction.commit();

      await client.createOrReplace({
        _id: "siteSettings",
        _type: "siteSettings",
        ...mockSiteSettings
      });

      for (const item of mockFaqItems) {
        await client.createOrReplace({
          _id: `faq-${item.order}`,
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
                project.gallery.map((url, index) =>
                  uploadImage(url, `${project.slug}-gallery-${index + 1}.jpg`)
                )
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
          category: project.category,
          coverImage,
          gallery,
          description: project.description,
          published: true
        });
      }

      setStatus("success");
      setMessage("Mock-данные загружены. Обновите сайт, и контент появится на фронтенде.");
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
            Импорт mock-данных
          </Text>
          <Text c="dimmed" mt={8}>
            Этот импорт очистит текущие документы типов `Секции сайта`, `Проект`, `Услуга` и `FAQ`, а затем загрузит
            стартовый контент из MVP прямо в ваш Sanity project.
          </Text>
        </div>

        <Group>
          <Button onClick={seedMockData} radius={0} variant="filled">
            Загрузить mock-данные
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
