import Image from "next/image";
import { TelegramIcon } from "@/components/telegram-icon";

type ContactStripProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  telegramUrl?: string | null;
  contactImageUrl?: string | null;
};

export function ContactStrip({
  eyebrow,
  title,
  description,
  contactEmail,
  contactPhone,
  telegramUrl,
  contactImageUrl
}: ContactStripProps) {
  const email = contactEmail || "studio@rx-architect.test";
  const phone = contactPhone || "+7 (999) 000-00-00";
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const telegramHref = telegramUrl || "https://t.me/";

  return (
    <section className="contact-strip" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">{eyebrow || "Сотрудничество"}</p>
        <h2>
          {title ||
            "Открыты к новым частным и коммерческим проектам, где важны качество среды, ясная архитектурная логика и внимательная работа с деталями."}
        </h2>
        <p>
          {description ||
            "Подключаемся к интерьерным и архитектурным задачам разного масштаба: от частных пространств до гостиниц, ресторанов, фасадов и территорий коммерческих объектов. На старте обсуждаем задачу, рамку бюджета и состав этапов, чтобы собрать рабочий маршрут без лишних итераций."}
        </p>

        <div className="contact-actions">
          <a className="button-primary" href={`mailto:${email}`}>
            {email}
          </a>
          <a className="button-secondary" href={phoneHref}>
            {phone}
          </a>
          <a className="contact-telegram" href={telegramHref} aria-label="Telegram" target="_blank" rel="noreferrer">
            <TelegramIcon className="contact-telegram-icon" />
          </a>
        </div>
      </div>

      <div className="contact-visual">
        {contactImageUrl ? (
          <Image alt="Визуал сотрудничества" className="contact-visual-image" fill src={contactImageUrl} sizes="(max-width: 1180px) 100vw, 38vw" />
        ) : (
          <div className="contact-visual-placeholder">
            <span>Изображение / moodboard</span>
          </div>
        )}
      </div>
    </section>
  );
}
