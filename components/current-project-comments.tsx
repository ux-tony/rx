"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { CurrentProjectComment } from "@/lib/sanity/get-current-project-comments";

type CurrentProjectCommentsProps = {
  comments: CurrentProjectComment[];
  enabled: boolean;
  projectNumber: string;
};

const authorNameStorageKey = "rx-current-project-comment-author";

export function CurrentProjectComments({ comments, enabled, projectNumber }: CurrentProjectCommentsProps) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ownedComments, setOwnedComments] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState("");
  const [authorName, setAuthorName] = useState("");
  const storageKey = `rx-current-project-comments:${projectNumber.toLocaleUpperCase("ru-RU")}`;

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      setOwnedComments(stored ? (JSON.parse(stored) as Record<string, string>) : {});
    } catch {
      setOwnedComments({});
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      setAuthorName(window.localStorage.getItem(authorNameStorageKey) || "");
    } catch {
      setAuthorName("");
    }
  }, []);

  function storeOwnedComments(value: Record<string, string>) {
    setOwnedComments(value);
    window.localStorage.setItem(storageKey, JSON.stringify(value));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const response = await fetch("/api/current-project-comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectNumber,
        authorName,
        message: data.get("message"),
        website: data.get("website")
      })
    });
    const result = (await response.json()) as { error?: string; commentId?: string; editToken?: string };

    if (!response.ok) {
      setStatus(result.error || "Не удалось отправить комментарий.");
      setSubmitting(false);
      return;
    }

    form.reset();
    window.localStorage.setItem(authorNameStorageKey, authorName.trim());
    if (result.commentId && result.editToken) {
      storeOwnedComments({ ...ownedComments, [result.commentId]: result.editToken });
    }
    setStatus("Комментарий отправлен.");
    setSubmitting(false);
    router.refresh();
  }

  async function saveComment(commentId: string) {
    const editToken = ownedComments[commentId];

    if (!editToken) {
      return;
    }

    setSubmitting(true);
    setStatus("");
    const response = await fetch("/api/current-project-comments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId, editToken, message: editingMessage })
    });
    const result = (await response.json()) as { error?: string };

    if (!response.ok) {
      setStatus(result.error || "Не удалось сохранить изменения.");
      setSubmitting(false);
      return;
    }

    setEditingId(null);
    setEditingMessage("");
    setStatus("Комментарий обновлён.");
    setSubmitting(false);
    router.refresh();
  }

  if (!enabled && comments.length === 0) {
    return null;
  }

  return (
    <section className="current-project-comments" aria-labelledby="current-project-comments-title">
      <div className="current-project-comments-heading">
        <p className="eyebrow">Обсуждение</p>
        <h2 id="current-project-comments-title">Комментарии по проекту</h2>
      </div>

      {comments.length > 0 ? (
        <div className="current-project-comments-list">
          {comments.map((comment) => (
            <article className="current-project-comment" key={comment.id}>
              <header>
                <strong>{comment.authorName}</strong>
                <time dateTime={comment.createdAt}>{comment.createdAtLabel}</time>
              </header>
              {editingId === comment.id ? (
                <div className="current-project-comment-editor">
                  <textarea
                    aria-label="Текст комментария"
                    maxLength={2000}
                    minLength={3}
                    onChange={(event) => setEditingMessage(event.currentTarget.value)}
                    rows={5}
                    value={editingMessage}
                  />
                  <div>
                    <button disabled={submitting || editingMessage.trim().length < 3} onClick={() => saveComment(comment.id)} type="button">
                      Сохранить
                    </button>
                    <button
                      disabled={submitting}
                      onClick={() => {
                        setEditingId(null);
                        setEditingMessage("");
                      }}
                      type="button"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <p>{comment.message}</p>
              )}
              {!comment.reply && ownedComments[comment.id] && editingId !== comment.id ? (
                <button
                  className="current-project-comment-edit"
                  onClick={() => {
                    setEditingId(comment.id);
                    setEditingMessage(comment.message);
                  }}
                  type="button"
                >
                  Редактировать
                </button>
              ) : null}
              {comment.reply ? (
                <div className="current-project-comment-reply">
                  <strong>Ответ студии</strong>
                  <p>{comment.reply}</p>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}

      {enabled ? (
        <form className="current-project-comment-form" onSubmit={handleSubmit}>
          <label>
            <span>Ваше имя</span>
            <input
              autoComplete="name"
              maxLength={80}
              minLength={2}
              name="authorName"
              onChange={(event) => setAuthorName(event.currentTarget.value)}
              required
              value={authorName}
            />
          </label>
          <label>
            <span>Комментарий</span>
            <textarea maxLength={2000} minLength={3} name="message" required rows={5} />
          </label>
          <label className="current-project-comment-honeypot" aria-hidden="true">
            <span>Сайт</span>
            <input autoComplete="off" name="website" tabIndex={-1} />
          </label>
          <button disabled={submitting} type="submit">
            {submitting ? "Отправляем..." : "Отправить комментарий"}
          </button>
          <p aria-live="polite" className="current-project-comment-status">
            {status}
          </p>
        </form>
      ) : null}
    </section>
  );
}
