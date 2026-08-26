"use client";

import { useState } from "react";
import { Button, FileInput, Modal, Stack, Tabs, Text, TextInput, Textarea } from "@mantine/core";

type DiscussionModalProps = {
  contactEmail?: string | null;
  opened: boolean;
  onClose: () => void;
};

export function DiscussionModal({ contactEmail, opened, onClose }: DiscussionModalProps) {
  const [projectStatus, setProjectStatus] = useState("");

  function closeModal() {
    setProjectStatus("");
    onClose();
  }

  function handleNewProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!contactEmail) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const task = String(data.get("task") || "").trim();
    const subject = encodeURIComponent(`Новый проект: ${name}`);
    const body = encodeURIComponent(`Имя: ${name}\nТелефон: ${phone}\n\nЗадача:\n${task}`);

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  function handleCurrentProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const projectNumber = String(data.get("projectNumber") || "").trim();
    setProjectStatus(`Проект ${projectNumber} принят для поиска. Доступ к карточке подключим на следующем этапе.`);
  }

  return (
    <Modal
      opened={opened}
      onClose={closeModal}
      title="Обсудить проект"
      centered
      radius={0}
      size="lg"
      overlayProps={{ backgroundOpacity: 0.2, blur: 2 }}
      classNames={{ content: "discussion-modal", header: "discussion-modal-header", body: "discussion-modal-body" }}
    >
      <Tabs defaultValue="new" variant="outline" radius={0}>
        <Tabs.List grow>
          <Tabs.Tab value="new">Новый проект</Tabs.Tab>
          <Tabs.Tab value="current">Текущий проект</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="new" pt="lg">
          <form onSubmit={handleNewProject}>
            <Stack gap="md">
              <TextInput autoComplete="name" label="ФИО" name="name" placeholder="Имя и фамилия" radius={0} required />
              <TextInput
                autoComplete="tel"
                label="Контактный телефон"
                name="phone"
                placeholder="8 (928) 000-00-00"
                radius={0}
                type="tel"
                required
              />
              <Textarea
                label="Задача"
                name="task"
                placeholder="Расскажите об объекте, сроках и ожидаемом результате"
                radius={0}
                minRows={5}
                required
              />
              <FileInput
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                description="Выбранные файлы нужно будет приложить в открывшемся почтовом окне."
                label="Документы"
                placeholder="План, ТЗ или референсы"
                radius={0}
                multiple
                clearable
              />
              <Button disabled={!contactEmail} type="submit" radius={0}>
                Продолжить в почте
              </Button>
              {!contactEmail ? (
                <Text c="dimmed" size="sm">
                  Для отправки нужно указать контактный email в Sanity.
                </Text>
              ) : null}
            </Stack>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="current" pt="lg">
          <form onSubmit={handleCurrentProject}>
            <Stack gap="md">
              <TextInput label="Номер проекта" name="projectNumber" placeholder="Например, RH-024" radius={0} required />
              <Button type="submit" radius={0} variant="default">
                Открыть проект
              </Button>
              <Text aria-live="polite" c="dimmed" size="sm">
                {projectStatus}
              </Text>
            </Stack>
          </form>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
}
