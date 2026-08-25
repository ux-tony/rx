type SiteFooterProps = {
  studioName?: string | null;
};

export function SiteFooter({ studioName }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <p>{studioName || "Roman Kharchenko Studio"}</p>
      <a href="#top">Наверх</a>
    </footer>
  );
}
