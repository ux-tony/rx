"use client";

import { type ChangeEvent, useRef, useState } from "react";
import { type ArrayOfObjectsInputProps, useClient } from "sanity";

type GalleryImage = {
  _key: string;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

function createKey(index: number) {
  return `${Date.now().toString(36)}-${index}-${Math.random().toString(36).slice(2, 10)}`;
}

export function MultiImageArrayInput(props: ArrayOfObjectsInputProps) {
  const client = useClient({ apiVersion: "2026-04-24" });
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [errorMessage, setErrorMessage] = useState("");

  async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = "";

    if (files.length === 0) {
      return;
    }

    setIsUploading(true);
    setErrorMessage("");
    setProgress({ completed: 0, total: files.length });

    let failedUploads = 0;

    for (const [index, file] of files.entries()) {
      try {
        const asset = await client.assets.upload("image", file, {
          filename: file.name
        });

        const galleryImage: GalleryImage = {
          _key: createKey(index),
          _type: "image",
          asset: {
            _ref: asset._id,
            _type: "reference"
          }
        };

        props.onItemAppend(galleryImage);
      } catch {
        failedUploads += 1;
      } finally {
        setProgress((current) => ({
          ...current,
          completed: current.completed + 1
        }));
      }
    }

    if (failedUploads > 0) {
      setErrorMessage(
        failedUploads === files.length
          ? "Не удалось загрузить изображения. Попробуйте ещё раз."
          : `Не удалось загрузить файлов: ${failedUploads}. Остальные изображения добавлены.`
      );
    }

    setIsUploading(false);
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          alignItems: "center",
          background: "var(--card-bg-color)",
          border: "1px solid var(--card-border-color)",
          borderRadius: 3,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          padding: 12
        }}
      >
        <button
          type="button"
          disabled={props.readOnly || isUploading}
          onClick={() => inputRef.current?.click()}
          style={{
            background: "var(--card-focus-ring-color)",
            border: 0,
            borderRadius: 3,
            color: "white",
            cursor: props.readOnly || isUploading ? "not-allowed" : "pointer",
            font: "inherit",
            fontWeight: 600,
            opacity: props.readOnly || isUploading ? 0.55 : 1,
            padding: "10px 14px"
          }}
        >
          {isUploading ? "Загрузка изображений..." : "Загрузить несколько изображений"}
        </button>

        <span style={{ color: "var(--card-muted-fg-color)", fontSize: 13 }}>
          {isUploading
            ? `Загружено ${progress.completed} из ${progress.total}`
            : "Можно выбрать сразу несколько файлов"}
        </span>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={props.readOnly || isUploading}
          onChange={handleFiles}
          style={{ display: "none" }}
        />

        {errorMessage ? (
          <div style={{ color: "var(--card-critical-fg-color)", flexBasis: "100%", fontSize: 13 }}>
            {errorMessage}
          </div>
        ) : null}
      </div>

      {props.renderDefault(props)}
    </div>
  );
}
