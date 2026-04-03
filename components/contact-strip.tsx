export function ContactStrip() {
  return (
    <section className="contact-strip" id="contact">
      <p className="eyebrow">Контакт</p>
      <h2>Готовы собрать полноценный каталог проектов, формы заявок и редактор контента.</h2>
      <p>
        Сейчас сайт работает на mock-данных и демонстрирует визуальный каркас MVP. Следующим этапом
        сюда можно подключить CMS, real media storage, формы обратной связи и мультиязычность.
      </p>

      <div className="contact-actions">
        <a className="button-primary" href="mailto:studio@rx-architect.test">
          studio@rx-architect.test
        </a>
        <a className="button-secondary" href="tel:+79990000000">
          +7 (999) 000-00-00
        </a>
      </div>
    </section>
  );
}
