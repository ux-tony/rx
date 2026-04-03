"use client";

import { Accordion } from "@mantine/core";
import type { FaqItem } from "@/data/site-data";
import { SectionHeading } from "@/components/section-heading";

type FaqSectionProps = {
  items: FaqItem[];
};

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <section className="faq-shell">
      <SectionHeading
        eyebrow="FAQ"
        title="Точечное применение Mantine без ощущения шаблонной библиотеки."
        description="На этапе MVP интерактивный FAQ собран на Mantine Accordion и стилизован под общую визуальную систему, чтобы сохранить стек из ТЗ."
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
