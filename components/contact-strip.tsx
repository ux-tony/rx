"use client";

import { useState } from "react";
import { TelegramIcon } from "@/components/telegram-icon";

type ContactStripProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  telegramUrl?: string | null;
};

export function ContactStrip({
  eyebrow,
  title,
  description,
  contactEmail,
  contactPhone,
  telegramUrl
}: ContactStripProps) {
  const [message, setMessage] = useState("");
  const phoneHref = contactPhone ? `tel:${contactPhone.replace(/[^\d+]/g, "")}` : null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!contactEmail) {
      setMessage("Укажите контактный email в Sanity, чтобы форма могла подготовить обращение.");
      return;
    }

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const task = String(data.get("task") || "").trim();
    const subject = encodeURIComponent(`Новый проект: ${name}`);
    const body = encodeURIComponent(`Имя: ${name}\nКонтакт: ${contact}\n\nО проекте:\n${task}`);

    setMessage("Открываем ваше почтовое приложение с подготовленным обращением.");
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="contact-strip" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">{eyebrow || "Контакты"}</p>
        <h2>{title || "Расскажите о будущем проекте."}</h2>
        <p>
          {description ||
            "Опишите задачу, масштаб и желаемые сроки. Мы свяжемся с вами, уточним вводные и предложим понятный следующий шаг."}
        </p>

        <div className="contact-links" aria-label="Прямые контакты студии">
          {contactEmail ? <a href={`mailto:${contactEmail}`}>{contactEmail}</a> : null}
          {phoneHref && contactPhone ? <a href={phoneHref}>{contactPhone}</a> : null}
          {telegramUrl ? (
            <a className="contact-telegram" href={telegramUrl} aria-label="Telegram" target="_blank" rel="noreferrer">
              <TelegramIcon className="contact-telegram-icon" />
              <span>Telegram</span>
            </a>
          ) : null}
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-field">
          <label htmlFor="contact-name">Имя</label>
          <input id="contact-name" name="name" autoComplete="name" placeholder="Как к вам обращаться" required />
        </div>

        <div className="contact-field">
          <label htmlFor="contact-value">Телефон или email</label>
          <input id="contact-value" name="contact" placeholder="8 (928) 000-00-00 или email" required />
        </div>

        <div className="contact-field">
          <label htmlFor="contact-task">О проекте</label>
          <textarea
            id="contact-task"
            name="task"
            placeholder="Тип объекта, площадь, сроки и основная задача"
            rows={6}
            required
          />
        </div>

        <div className="contact-form-footer">
          <button className="button-primary" type="submit" disabled={!contactEmail}>
            Подготовить обращение
          </button>
          <p>
            {contactEmail
              ? "После нажатия откроется ваше почтовое приложение. Отправка произойдёт только после вашего подтверждения."
              : "Форма станет активной после добавления email в Sanity."}
          </p>
        </div>
        <p className="contact-form-status" aria-live="polite">
          {message}
        </p>
      </form>
    </section>
  );
}
