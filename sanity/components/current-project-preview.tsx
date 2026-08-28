"use client";

import { CommentIcon } from "@sanity/icons";
import { useEffect, useMemo, useState } from "react";
import { type PreviewProps, useClient } from "sanity";

const previewSeparator = "::current-project::";

export function encodeCurrentProjectPreview(projectNumber: string | undefined, projectId: string | undefined) {
  return `${projectNumber ?? "Без номера"}${previewSeparator}${projectId ?? ""}`;
}

export function CurrentProjectPreview(props: PreviewProps) {
  const client = useClient({ apiVersion: "2026-04-24" });
  const { projectId, projectNumber } = useMemo(() => {
    const subtitle = typeof props.subtitle === "string" ? props.subtitle : "";
    const [number, id] = subtitle.split(previewSeparator);

    return {
      projectId: id?.replace(/^drafts\./, "") ?? "",
      projectNumber: number || "Без номера"
    };
  }, [props.subtitle]);
  const [commentCount, setCommentCount] = useState<number | null>(null);

  useEffect(() => {
    if (!projectId) {
      setCommentCount(0);
      return;
    }

    const params = { projectId };
    const countQuery = `count(*[
      _type == "currentProjectComment" &&
      !(_id in path("drafts.**")) &&
      project._ref == $projectId
    ])`;
    const listenQuery = `*[
      _type == "currentProjectComment" &&
      project._ref == $projectId
    ]`;
    let active = true;

    const refreshCount = async () => {
      const count = await client.fetch<number>(countQuery, params);

      if (active) {
        setCommentCount(count);
      }
    };

    void refreshCount();
    const subscription = client.listen(listenQuery, params).subscribe({
      next: () => void refreshCount()
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [client, projectId]);

  return props.renderDefault({
    ...props,
    subtitle: (
      <span style={{ alignItems: "center", display: "inline-flex", gap: 12 }}>
        <span>{projectNumber}</span>
        <span
          aria-label={`Комментариев: ${commentCount ?? 0}`}
          style={{ alignItems: "center", display: "inline-flex", gap: 4 }}
        >
          <CommentIcon aria-hidden="true" />
          <span>{commentCount ?? "..."}</span>
        </span>
      </span>
    )
  });
}
