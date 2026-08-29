"use client";

import Image from "next/image";

type SiteHeaderProps = {
  studioName?: string | null;
  logoUrl?: string | null;
  contactPhone?: string | null;
  rootHref?: string;
};

export function SiteHeader({ studioName, logoUrl, contactPhone, rootHref = "" }: SiteHeaderProps) {
  const name = studioName?.trim() || "";
  const displayName = name.replace(/\s+Studio$/i, "").replace(/^Roman Kharchenko$/i, "Роман Харченко");
  const phone = contactPhone?.trim();
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null;

  return (
    <header className="site-header">
      <a className="site-brand" href={`${rootHref}#top`} aria-label={`${name || "Студия"}: к началу страницы`}>
        {logoUrl ? (
          <span className="site-brand-mark">
            <Image alt="" fill sizes="40px" src={logoUrl} />
          </span>
        ) : (
          <span className="site-brand-monogram" aria-hidden="true">
            RX
          </span>
        )}
        {displayName ? <span>{displayName}</span> : null}
      </a>

      <nav className="site-nav" aria-label="Основная навигация">
        <a href={`${rootHref}#projects`}>Проекты</a>
        <a href={`${rootHref}#services`}>Услуги</a>
        <a href={`${rootHref}#faq`}>Вопросы</a>
        <a href={`${rootHref}#contact`}>Контакты</a>
      </nav>

      {phone && phoneHref ? (
        <a className="site-header-cta" href={phoneHref} aria-label={`Позвонить: ${phone}`}>
          {phone}
        </a>
      ) : null}
    </header>
  );
}
