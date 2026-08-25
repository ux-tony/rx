"use client";

import Image from "next/image";
import { useState } from "react";
import { DiscussionModal } from "@/components/discussion-modal";

type SiteHeaderProps = {
  studioName?: string | null;
  logoUrl?: string | null;
  contactEmail?: string | null;
};

export function SiteHeader({ studioName, logoUrl, contactEmail }: SiteHeaderProps) {
  const [opened, setOpened] = useState(false);
  const name = studioName || "Roman Kharchenko Studio";
  const displayName = name.replace(/\s+Studio$/i, "");

  return (
    <header className="site-header">
      <a className="site-brand" href="#top" aria-label={`${name}: к началу страницы`}>
        {logoUrl ? (
          <span className="site-brand-mark">
            <Image alt="" fill sizes="40px" src={logoUrl} />
          </span>
        ) : (
          <span className="site-brand-monogram" aria-hidden="true">
            RX
          </span>
        )}
        <span>{displayName}</span>
      </a>

      <nav className="site-nav" aria-label="Основная навигация">
        <a href="#projects">Проекты</a>
        <a href="#services">Услуги</a>
        <a href="#faq">Вопросы</a>
        <a href="#contact">Контакты</a>
      </nav>

      <button className="site-header-cta button-reset" onClick={() => setOpened(true)} type="button">
        Обсудить проект
      </button>

      <DiscussionModal contactEmail={contactEmail} opened={opened} onClose={() => setOpened(false)} />
    </header>
  );
}
