export function StudioSetupNotice() {
  return (
    <main className="studio-setup">
      <section className="studio-setup__card">
        <p className="studio-setup__eyebrow">Sanity Studio</p>
        <h1 className="studio-setup__title">Админка подготовлена, осталось подключить проект Sanity.</h1>
        <p className="studio-setup__text">
          Студия уже встроена в приложение на маршруте <code>/studio</code>, но для полноценного
          входа нужно добавить переменные окружения Sanity. Это позволяет не ломать текущий MVP и
          продолжать работу над фронтендом без жёсткой привязки к CMS.
        </p>
        <ol className="studio-setup__list">
          <li>Создайте или выберите проект в Sanity.</li>
          <li>Заполните файл `.env.local` по образцу из `.env.example`.</li>
          <li>Перезапустите dev-сервер или redeploy на Vercel.</li>
          <li>Откройте `/studio` и войдите через Sanity account.</li>
        </ol>
        <div className="studio-setup__code">/studio</div>
      </section>
    </main>
  );
}
