"use client";

import Image from "next/image";

type SiteHeaderProps = {
  studioName?: string | null;
  logoUrl?: string | null;
  contactPhone?: string | null;
};

export function SiteHeader({ studioName, logoUrl, contactPhone }: SiteHeaderProps) {
  const name = studioName || "Roman Kharchenko Studio";
  const displayName = name.replace(/\s+Studio$/i, "");
  const phone = contactPhone || "8 (928) 000-00-00";
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

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

      <a className="site-header-cta" href={phoneHref} aria-label={`Позвонить: ${phone}`}>
        {phone}
      </a>
    </header>
  );
}
