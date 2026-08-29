type SiteFooterProps = {
  studioName?: string | null;
};

export function SiteFooter({ studioName }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>
        {studioName ? `${studioName} ` : null}© {currentYear}
      </p>
      <a href="#top">
        <span>Наверх</span>
        <span className="site-footer-arrow" aria-hidden="true">
          ↑
        </span>
      </a>
    </footer>
  );
}
