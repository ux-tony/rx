import { NextResponse } from "next/server";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { getCurrentProjectByNumber } from "@/lib/sanity/get-current-project-by-number";
import { sanityClient } from "@/lib/sanity/client";

type CommentRequest = {
  projectNumber?: unknown;
  authorName?: unknown;
  message?: unknown;
  website?: unknown;
};

type CommentUpdateRequest = {
  commentId?: unknown;
  editToken?: unknown;
  message?: unknown;
};

export const runtime = "nodejs";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function tokensMatch(actualHash: string, token: string) {
  const expected = Buffer.from(actualHash, "hex");
  const actual = Buffer.from(hashToken(token), "hex");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function POST(request: Request) {
  const token = process.env.SANITY_WRITE_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "Приём комментариев пока не настроен." }, { status: 503 });
  }

  let body: CommentRequest;

  try {
    body = (await request.json()) as CommentRequest;
  } catch {
    return NextResponse.json({ error: "Не удалось прочитать сообщение." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const projectNumber = typeof body.projectNumber === "string" ? body.projectNumber.trim() : "";
  const authorName = typeof body.authorName === "string" ? body.authorName.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!projectNumber || authorName.length < 2 || authorName.length > 80 || message.length < 3 || message.length > 2000) {
    return NextResponse.json({ error: "Проверьте имя и текст комментария." }, { status: 400 });
  }

  const project = await getCurrentProjectByNumber(projectNumber);

  if (!project) {
    return NextResponse.json({ error: "Проект не найден." }, { status: 404 });
  }

  const writeClient = sanityClient.withConfig({ token, useCdn: false });
  const editToken = randomBytes(32).toString("base64url");
  const comment = await writeClient.create({
    _type: "currentProjectComment",
    project: {
      _type: "reference",
      _ref: project.id
    },
    authorName,
    message,
    createdAt: new Date().toISOString(),
    editTokenHash: hashToken(editToken),
    visible: true
  });

  return NextResponse.json({ ok: true, commentId: comment._id, editToken }, { status: 201 });
}

export async function PATCH(request: Request) {
  const token = process.env.SANITY_WRITE_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "Редактирование комментариев пока не настроено." }, { status: 503 });
  }

  let body: CommentUpdateRequest;

  try {
    body = (await request.json()) as CommentUpdateRequest;
  } catch {
    return NextResponse.json({ error: "Не удалось прочитать изменения." }, { status: 400 });
  }

  const commentId = typeof body.commentId === "string" ? body.commentId.trim() : "";
  const editToken = typeof body.editToken === "string" ? body.editToken.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!commentId || !editToken || message.length < 3 || message.length > 2000) {
    return NextResponse.json({ error: "Проверьте текст комментария." }, { status: 400 });
  }

  const writeClient = sanityClient.withConfig({ token, useCdn: false, perspective: "raw" });
  const documents = await writeClient.fetch<Array<{ _id: string; editTokenHash?: string; reply?: string }>>(
    '*[_id == $id || _id == "drafts." + $id]{_id, editTokenHash, reply}',
    { id: commentId }
  );
  const publishedComment = documents.find((document) => document._id === commentId);

  if (!publishedComment?.editTokenHash || !tokensMatch(publishedComment.editTokenHash, editToken)) {
    return NextResponse.json({ error: "Нет доступа к редактированию этого комментария." }, { status: 403 });
  }

  if (documents.some((document) => document.reply?.trim())) {
    return NextResponse.json({ error: "Комментарий уже получил ответ и больше не редактируется." }, { status: 409 });
  }

  const transaction = writeClient.transaction().patch(commentId, (patch) => patch.set({ message }));
  const draft = documents.find((document) => document._id === `drafts.${commentId}`);

  if (draft) {
    transaction.patch(draft._id, (patch) => patch.set({ message }));
  }

  await transaction.commit();
  return NextResponse.json({ ok: true });
}
