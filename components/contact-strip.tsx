type ContactStripProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
};

export function ContactStrip({
  eyebrow,
  title,
  description,
  contactEmail,
  contactPhone
}: ContactStripProps) {
  const email = contactEmail || "studio@rx-architect.test";
  const phone = contactPhone || "+7 (999) 000-00-00";
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <section className="contact-strip" id="contact">
      <p className="eyebrow">{eyebrow || "КОНТАКТЫ"}</p>
      <h2>{title || "Готовы собрать полноценный каталог проектов, формы заявок и редактор контента."}</h2>
      <p>
        {description ||
          "Сейчас сайт работает на mock-данных и демонстрирует визуальный каркас MVP. Следующим этапом сюда можно подключить CMS, real media storage, формы обратной связи и мультиязычность."}
      </p>

      <div className="contact-actions">
        <a className="button-primary" href={`mailto:${email}`}>
          {email}
        </a>
        <a className="button-secondary" href={phoneHref}>
          {phone}
        </a>
      </div>
    </section>
  );
}
