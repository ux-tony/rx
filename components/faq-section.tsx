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
        eyebrow={eyebrow || "FAQ"}
        title={title || "Точечное применение Mantine без ощущения шаблонной библиотеки."}
        description={
          description ||
          "На этапе MVP интерактивный FAQ собран на Mantine Accordion и стилизован под общую визуальную систему, чтобы сохранить стек из ТЗ."
        }
      />

      <Accordion chevronPosition="right" radius="md" variant="default">
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
