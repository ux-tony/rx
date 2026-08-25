import Image from "next/image";

type SiteHeaderProps = {
  studioName?: string | null;
  logoUrl?: string | null;
};

export function SiteHeader({ studioName, logoUrl }: SiteHeaderProps) {
  const name = studioName || "Roman Kharchenko Studio";

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
        <span>{name}</span>
      </a>

      <nav className="site-nav" aria-label="Основная навигация">
        <a href="#projects">Проекты</a>
        <a href="#services">Услуги</a>
        <a href="#faq">Вопросы</a>
        <a href="#contact">Контакты</a>
      </nav>

      <a className="site-header-cta" href="#contact">
        Обсудить проект
      </a>
    </header>
  );
}
