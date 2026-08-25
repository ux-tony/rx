import Image from "next/image";
import architectPhoto from "@/img/Foto001.jpg";
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
  const phoneHref = contactPhone ? `tel:${contactPhone.replace(/[^\d+]/g, "")}` : null;
  const hasContacts = Boolean(contactEmail || phoneHref || telegramUrl);

  return (
    <section className="contact-strip" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">{eyebrow || "Сотрудничество"}</p>
        <h2>{title || "Обсудим пространство, которое должно точно отвечать вашей задаче."}</h2>
        <p>
          {description ||
            "На первой встрече определим цели, масштаб, сроки и состав проекта. После разговора предложим понятный маршрут работы без лишних этапов."}
        </p>

        {hasContacts ? (
          <div className="contact-actions">
            {contactEmail ? (
              <a className="button-primary" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            ) : null}
            {phoneHref && contactPhone ? (
              <a className="button-secondary" href={phoneHref}>
                {contactPhone}
              </a>
            ) : null}
            {telegramUrl ? (
              <a className="contact-telegram" href={telegramUrl} aria-label="Telegram" target="_blank" rel="noreferrer">
                <TelegramIcon className="contact-telegram-icon" />
              </a>
            ) : null}
          </div>
        ) : (
          <p className="contact-note">Контактные данные появятся здесь после публикации в Sanity.</p>
        )}
      </div>

      <div className="contact-visual">
        <Image
          alt="Роман Харченко в архитектурной студии"
          className="contact-visual-image"
          fill
          src={contactImageUrl || architectPhoto}
          sizes="(max-width: 1180px) 100vw, 38vw"
        />
      </div>
    </section>
  );
}
