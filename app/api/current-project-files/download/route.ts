import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getCurrentProjectByNumber } from "@/lib/sanity/get-current-project-by-number";

export const runtime = "nodejs";

function contentDisposition(fileName: string) {
  return `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

export async function GET(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Скачивание файлов пока не настроено." }, { status: 503 });
  }

  const url = new URL(request.url);
  const projectNumber = url.searchParams.get("projectNumber")?.trim() || "";
  const fileId = url.searchParams.get("fileId")?.trim() || "";
  const project = projectNumber ? await getCurrentProjectByNumber(projectNumber) : null;
  const file = project?.files.find((item) => item.id === fileId);

  if (!project || !file) {
    return NextResponse.json({ error: "Файл не найден." }, { status: 404 });
  }

  const result = await get(file.pathname, {
    access: "private",
    ifNoneMatch: request.headers.get("if-none-match") || undefined
  });

  if (!result) {
    return NextResponse.json({ error: "Файл не найден." }, { status: 404 });
  }

  if (result.statusCode === 304) {
    return new NextResponse(null, {
      status: 304,
      headers: {
        "Cache-Control": "private, no-cache",
        ETag: result.blob.etag
      }
    });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Cache-Control": "private, no-cache",
      "Content-Disposition": contentDisposition(file.name),
      "Content-Type": result.blob.contentType || file.contentType || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      ETag: result.blob.etag
    }
  });
}
