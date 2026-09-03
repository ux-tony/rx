"use client";

import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { CurrentProjectFile } from "@/lib/sanity/get-current-project-by-number";

type CurrentProjectFilesProps = {
  enabled: boolean;
  files: CurrentProjectFile[];
  projectNumber: string;
};

const megabyte = 1024 * 1024;
const maxFileSize = 20 * megabyte;
const maxBatchSize = 50 * megabyte;
const maxFilesPerBatch = 5;
const acceptedExtensions = ".jpg,.jpeg,.png,.webp,.tif,.tiff,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.dwg,.dxf,.zip,.rar,.7z,.txt";

function formatFileSize(size: number) {
  return size >= megabyte ? `${(size / megabyte).toFixed(1)} МБ` : `${Math.max(1, Math.round(size / 1024))} КБ`;
}

function formatUploadDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("ru-RU");
}

function safePathSegment(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}._-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(-120);
}

export function CurrentProjectFiles({ enabled, files, projectNumber }: CurrentProjectFilesProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  function selectFiles(list: FileList | null) {
    const nextFiles = Array.from(list || []);

    if (nextFiles.length > maxFilesPerBatch) {
      setSelectedFiles([]);
      setStatus(`Можно выбрать не больше ${maxFilesPerBatch} файлов за раз.`);
      return;
    }

    const oversizedFile = nextFiles.find((file) => file.size > maxFileSize);
    if (oversizedFile) {
      setSelectedFiles([]);
      setStatus(`Файл «${oversizedFile.name}» больше 20 МБ.`);
      return;
    }

    if (nextFiles.reduce((total, file) => total + file.size, 0) > maxBatchSize) {
      setSelectedFiles([]);
      setStatus("Общий размер выбранных файлов не должен превышать 50 МБ.");
      return;
    }

    setSelectedFiles(nextFiles);
    setProgress(0);
    setStatus(nextFiles.length > 0 ? `Выбрано файлов: ${nextFiles.length}` : "");
  }

  async function handleUpload() {
    if (selectedFiles.length === 0) {
      return;
    }

    setUploading(true);
    setProgress(0);
    setStatus("Загрузка файлов...");

    try {
      for (let index = 0; index < selectedFiles.length; index += 1) {
        const file = selectedFiles[index];
        const projectPart = safePathSegment(projectNumber.toLocaleUpperCase("ru-RU")) || "project";
        const filePart = safePathSegment(file.name) || `file-${index + 1}`;

        await upload(`current-projects/${projectPart}/${filePart}`, file, {
          access: "private",
          clientPayload: JSON.stringify({ projectNumber, originalName: file.name, size: file.size }),
          contentType: file.type || "application/octet-stream",
          handleUploadUrl: "/api/current-project-files/upload",
          multipart: file.size > 5 * megabyte,
          onUploadProgress: ({ percentage }) => {
            setProgress(Math.round(((index + percentage / 100) / selectedFiles.length) * 100));
          }
        });
      }

      setSelectedFiles([]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setProgress(100);
      setStatus("Файлы загружены.");
      window.setTimeout(() => router.refresh(), 1200);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Не удалось загрузить файлы.");
    } finally {
      setUploading(false);
    }
  }

  if (!enabled && files.length === 0) {
    return null;
  }

  return (
    <section className="current-project-files" aria-labelledby="current-project-files-title">
      <div className="current-project-files-heading">
        <p className="eyebrow">Материалы</p>
        <h2 id="current-project-files-title">Файлы проекта</h2>
        <p>Здесь можно передать чертежи, документы и дополнительные материалы студии.</p>
      </div>

      <div className="current-project-files-content">
        {files.length > 0 ? (
          <ul className="current-project-files-list">
            {files.map((file) => (
              <li key={file.id}>
                <a href={`/api/current-project-files/download?projectNumber=${encodeURIComponent(projectNumber)}&fileId=${encodeURIComponent(file.id)}`}>
                  <span>{file.name}</span>
                  <small>{[formatFileSize(file.size), formatUploadDate(file.uploadedAt)].filter(Boolean).join(" · ")}</small>
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        {enabled ? (
          <div className="current-project-file-upload">
            <input
              accept={acceptedExtensions}
              disabled={uploading}
              id="current-project-file-input"
              multiple
              onChange={(event) => selectFiles(event.currentTarget.files)}
              ref={inputRef}
              type="file"
            />
            <label htmlFor="current-project-file-input">
              {selectedFiles.length > 0 ? "Изменить выбор" : "Выбрать файлы"}
            </label>
            {selectedFiles.length > 0 ? (
              <div className="current-project-file-selection">
                {selectedFiles.map((file) => (
                  <p key={`${file.name}-${file.size}`}>
                    <span>{file.name}</span>
                    <small>{formatFileSize(file.size)}</small>
                  </p>
                ))}
              </div>
            ) : null}
            <p className="current-project-file-limits">До 20 МБ на файл, не больше 5 файлов за раз.</p>
            {uploading ? (
              <div className="current-project-file-progress" aria-label={`Загружено ${progress}%`}>
                <span style={{ width: `${progress}%` }} />
              </div>
            ) : null}
            <button disabled={uploading || selectedFiles.length === 0} onClick={handleUpload} type="button">
              {uploading ? `Загружаем ${progress}%` : "Загрузить файлы"}
            </button>
            <p aria-live="polite" className="current-project-file-status">{status}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
