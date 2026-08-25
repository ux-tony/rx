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
    <section className="faq-shell">
      <SectionHeading
        eyebrow={eyebrow || "Вопросы и ответы"}
        title={title || "Частые вопросы, которые помогают быстро понять формат работы, сроки и состав архитектурного проекта."}
        description={
          description ||
          "Собрали базовые вопросы заказчиков перед стартом: про бюджет, сроки, объём проектирования, участие в процессе и сопровождение реализации."
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
