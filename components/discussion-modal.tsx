"use client";

import { Button, FileInput, Modal, Stack, Text, TextInput, Textarea } from "@mantine/core";

type DiscussionModalProps = {
  contactEmail?: string | null;
  opened: boolean;
  onClose: () => void;
};

export function DiscussionModal({ contactEmail, opened, onClose }: DiscussionModalProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!contactEmail) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const task = String(data.get("task") || "");
    const subject = encodeURIComponent(`Новый проект: ${name}`);
    const body = encodeURIComponent(`Имя: ${name}\nТелефон: ${phone}\n\nЗадача:\n${task}`);

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Обсудить проект"
      centered
      radius={0}
      size="lg"
      overlayProps={{ backgroundOpacity: 0.18, blur: 2 }}
      classNames={{ content: "discussion-modal", header: "discussion-modal-header", body: "discussion-modal-body" }}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput autoComplete="name" label="ФИО" name="name" placeholder="Имя и фамилия" radius={0} required />
          <TextInput
            autoComplete="tel"
            label="Контактный телефон"
            name="phone"
            placeholder="+7 900 000-00-00"
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
            description="Файлы можно приложить в открывшемся почтовом окне."
            label="Документы"
            placeholder="План, ТЗ или референсы"
            radius={0}
            multiple
            clearable
          />
          <Text c="dimmed" size="sm">
            После нажатия откроется ваше почтовое приложение с заполненным письмом. Ничего не отправляется без вашего подтверждения.
          </Text>
          <Button disabled={!contactEmail} type="submit" radius={0}>
            Подготовить письмо
          </Button>
          {!contactEmail ? (
            <Text c="dimmed" size="sm">
              Контактный email ещё не указан в Sanity.
            </Text>
          ) : null}
        </Stack>
      </form>
    </Modal>
  );
}
