"use client";

import { useState } from "react";
import { Button, FileInput, Modal, Stack, Tabs, Text, TextInput, Textarea } from "@mantine/core";

type DiscussionModalProps = {
  opened: boolean;
  onClose: () => void;
};

export function DiscussionModal({ opened, onClose }: DiscussionModalProps) {
  const [requestSent, setRequestSent] = useState(false);
  const [projectOpened, setProjectOpened] = useState(false);

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setRequestSent(false);
        setProjectOpened(false);
        onClose();
      }}
      title="Обсудить задачу"
      centered
      radius={0}
      size="lg"
      overlayProps={{ backgroundOpacity: 0.18, blur: 2 }}
      classNames={{ content: "discussion-modal", header: "discussion-modal-header", body: "discussion-modal-body" }}
    >
      <Tabs defaultValue="new" variant="outline" radius={0}>
        <Tabs.List grow>
          <Tabs.Tab value="new">Новая</Tabs.Tab>
          <Tabs.Tab value="current">Текущая</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="new" pt="lg">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setRequestSent(true);
            }}
          >
            <Stack gap="md">
              <TextInput label="ФИО" placeholder="Введите имя и фамилию" radius={0} required />
              <TextInput label="Контактный телефон" placeholder="+7 (___) ___-__-__" radius={0} required />
              <Textarea label="Задача" placeholder="Коротко опишите объект, формат работ и ожидания" radius={0} minRows={5} required />
              <FileInput
                label="Прикрепить документы"
                placeholder="План, ТЗ, референсы, фото"
                radius={0}
                multiple
                clearable
              />
              {requestSent ? (
                <Text c="dimmed" size="sm">
                  Заявка зафиксирована в интерфейсе MVP. На следующем этапе подключим реальную отправку в CRM или почту.
                </Text>
              ) : null}
              <Button type="submit" radius={0}>
                Отправить
              </Button>
            </Stack>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="current" pt="lg">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setProjectOpened(true);
            }}
          >
            <Stack gap="md">
              <TextInput label="Номер проекта" placeholder="Например, RH-024" radius={0} required />
              {projectOpened ? (
                <Text c="dimmed" size="sm">
                  В production-версии по номеру будет открываться карточка текущего проекта с этапами, комментариями и файлами.
                </Text>
              ) : null}
              <Button type="submit" radius={0} variant="default">
                Открыть
              </Button>
            </Stack>
          </form>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
}
