import { head } from "@vercel/blob";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getCurrentProjectByNumber } from "@/lib/sanity/get-current-project-by-number";
import { sanityClient } from "@/lib/sanity/client";

type ClientPayload = {
  projectNumber?: unknown;
  originalName?: unknown;
  size?: unknown;
};

type UploadTokenPayload = {
  projectId: string;
  projectNumber: string;
  originalName: string;
};

export const runtime = "nodejs";

const megabyte = 1024 * 1024;
const maxFileSize = 20 * megabyte;
const maxProjectSize = 100 * megabyte;
const maxProjectFiles = 20;
const allowedExtensions = new Set([
  "jpg", "jpeg", "png", "webp", "tif", "tiff", "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
  "dwg", "dxf", "zip", "rar", "7z", "txt"
]);
const allowedContentTypes = [
  "image/jpeg", "image/png", "image/webp", "image/tiff", "application/pdf", "text/plain",
  "application/msword", "application/vnd.ms-excel", "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/zip", "application/x-zip-compressed", "application/x-7z-compressed", "application/vnd.rar",
  "application/x-rar-compressed", "application/acad", "application/x-acad", "application/x-autocad",
  "application/dwg", "image/vnd.dwg", "application/dxf", "image/vnd.dxf", "application/octet-stream"
];

function parseClientPayload(value: string | null): ClientPayload {
  try {
    return value ? (JSON.parse(value) as ClientPayload) : {};
  } catch {
    return {};
  }
}

function getExtension(fileName: string) {
  return fileName.split(".").pop()?.toLocaleLowerCase("ru-RU") || "";
}

function baseDocumentId(value: string) {
  return value.startsWith("drafts.") ? value.slice("drafts.".length) : value;
}

function safePathSegment(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}._-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(-120);
}

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN || !process.env.SANITY_WRITE_TOKEN) {
    return NextResponse.json({ error: "Загрузка файлов пока не настроена." }, { status: 503 });
  }

  let body: HandleUploadBody;

  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Не удалось прочитать запрос." }, { status: 400 });
  }

  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const origin = request.headers.get("origin");
        if (origin && new URL(origin).host !== new URL(request.url).host) {
          throw new Error("Загрузка с этого адреса запрещена.");
        }

        const payload = parseClientPayload(clientPayload);
        const projectNumber = typeof payload.projectNumber === "string" ? payload.projectNumber.trim() : "";
        const originalName = typeof payload.originalName === "string" ? payload.originalName.trim().slice(0, 180) : "";
        const claimedSize = typeof payload.size === "number" ? payload.size : 0;

        if (!projectNumber || !originalName || claimedSize <= 0 || claimedSize > maxFileSize || !allowedExtensions.has(getExtension(originalName))) {
          throw new Error("Недопустимый файл или превышен лимит 20 МБ.");
        }

        const projectPath = safePathSegment(projectNumber.toLocaleUpperCase("ru-RU"));
        if (!projectPath || !pathname.startsWith(`current-projects/${projectPath}/`)) {
          throw new Error("Некорректный путь файла.");
        }

        const project = await getCurrentProjectByNumber(projectNumber);
        if (!project) {
          throw new Error("Проект не найден.");
        }

        const usedSize = project.files.reduce((total, file) => total + file.size, 0);
        if (project.files.length >= maxProjectFiles || usedSize + claimedSize > maxProjectSize) {
          throw new Error("Для этого проекта достигнут лимит хранилища 100 МБ.");
        }

        return {
          addRandomSuffix: true,
          allowedContentTypes,
          maximumSizeInBytes: maxFileSize,
          tokenPayload: JSON.stringify({
            projectId: baseDocumentId(project.id),
            projectNumber: project.projectNumber,
            originalName
          } satisfies UploadTokenPayload),
          validUntil: Date.now() + 15 * 60 * 1000
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const payload = JSON.parse(tokenPayload || "{}") as Partial<UploadTokenPayload>;
        if (!payload.projectId || !payload.projectNumber || !payload.originalName) {
          throw new Error("Не удалось связать файл с проектом.");
        }

        const metadata = await head(blob.pathname);
        if (metadata.size > maxFileSize || !allowedExtensions.has(getExtension(payload.originalName))) {
          throw new Error("Файл не прошёл проверку.");
        }

        const writeClient = sanityClient.withConfig({ token: process.env.SANITY_WRITE_TOKEN, useCdn: false, perspective: "raw" });
        const documentIds = await writeClient.fetch<string[]>(
          `*[_id == $id || _id == "drafts." + $id]._id`,
          { id: payload.projectId }
        );

        for (const documentId of documentIds) {
          const alreadyAdded = await writeClient.fetch<boolean>(
            `count(*[_id == $id && $pathname in files[].pathname]) > 0`,
            { id: documentId, pathname: blob.pathname }
          );
          if (!alreadyAdded) {
            await writeClient
              .patch(documentId)
              .setIfMissing({ files: [] })
              .append("files", [{
                _key: randomUUID(),
                _type: "projectFile",
                name: payload.originalName,
                pathname: blob.pathname,
                size: metadata.size,
                contentType: metadata.contentType,
                uploadedAt: new Date().toISOString()
              }])
              .commit();
          }
        }
      }
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Не удалось загрузить файл." },
      { status: 400 }
    );
  }
}
