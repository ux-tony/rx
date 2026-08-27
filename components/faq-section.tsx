"use client";

import { Accordion } from "@mantine/core";
import type { FaqItem } from "@/data/site-data";
import { SectionHeading } from "@/components/section-heading";

type FaqSectionProps = {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function FaqSection({ items, eyebrow, title, description }: FaqSectionProps) {
  return (
    <section className="faq-shell" id="faq">
      <SectionHeading
        eyebrow={eyebrow || "Вопросы и ответы"}
        title={title || "Главное до начала работы."}
        description={
          description ||
          "Здесь собраны ответы о сроках, бюджете, этапах, составе проекта и участии заказчика — всё, что поможет заранее понять процесс работы со студией."
        }
        fullWidth
      />

      <Accordion chevronPosition="right" radius={0} variant="default">
        {items.map((item) => (
          <Accordion.Item key={item.question} value={item.question}>
            <Accordion.Control>{item.question}</Accordion.Control>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
}
