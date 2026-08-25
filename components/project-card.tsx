"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@mantine/core";
import type { Project } from "@/data/site-data";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [opened, setOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  function openGallery() {
    setActiveIndex(0);
    setOpened(true);
  }

  function showPrev() {
    setActiveIndex((current) => (current === 0 ? gallery.length - 1 : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current === gallery.length - 1 ? 0 : current + 1));
  }

  useEffect(() => {
    if (!opened) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        showPrev();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    const nextIndex = activeIndex === gallery.length - 1 ? 0 : activeIndex + 1;
    const previousIndex = activeIndex === 0 ? gallery.length - 1 : activeIndex - 1;
    [gallery[nextIndex], gallery[previousIndex]].forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, gallery, opened]);

  return (
    <>
      <article className="project-card">
        <button className="project-card-trigger" onClick={openGallery} type="button">
          <span className="project-media">
            <Image
              alt={`${project.title}. ${project.description}`}
              className="project-media-image"
              fill
              sizes="(max-width: 780px) 100vw, (max-width: 1180px) 50vw, 60vw"
              src={project.image}
            />
            <span className="project-open-label">Открыть проект</span>
          </span>

          <span className="project-body">
            <span className="project-meta">{project.category}</span>
            <span className="project-title">{project.title}</span>
            <span className="project-description">{project.description}</span>
          </span>
        </button>
      </article>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        fullScreen
        padding={0}
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.15, color: "#000000", blur: 0 }}
        styles={{
          content: { background: "transparent", overflow: "hidden" },
          body: { padding: 0, height: "100dvh", overflow: "hidden" }
        }}
      >
        <div
          className="project-gallery-shell"
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) {
              return;
            }

            const distance = event.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(distance) > 48) {
              distance > 0 ? showPrev() : showNext();
            }
            touchStartX.current = null;
          }}
        >
          <div className="project-gallery-stage">
            <Image
              alt={`${project.title}, изображение ${activeIndex + 1} из ${gallery.length}`}
              className="project-gallery-image"
              fill
              priority
              sizes="100vw"
              src={gallery[activeIndex]}
            />

            <div className="project-gallery-caption">
              <p>{project.title}</p>
              <span>
                {String(activeIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </span>
            </div>

            {gallery.length > 1 ? (
              <>
                <button aria-label="Предыдущее изображение" className="project-gallery-arrow project-gallery-arrow-left" onClick={showPrev} type="button">
                  ←
                </button>
                <button aria-label="Следующее изображение" className="project-gallery-arrow project-gallery-arrow-right" onClick={showNext} type="button">
                  →
                </button>
              </>
            ) : null}

            <button aria-label="Закрыть галерею" className="project-gallery-close" onClick={() => setOpened(false)} type="button">
              ×
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
