"use client";

import { useState } from "react";
import { ActionIcon, Modal } from "@mantine/core";
import type { Project } from "@/data/site-data";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [opened, setOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  return (
    <>
      <article
        className="project-card"
        onClick={openGallery}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openGallery();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className="project-media">
          <div className="project-media-image" style={{ backgroundImage: `url(${project.image})` }} />
        </div>

        <div className="project-body">
          <div className="project-meta">
            <span>{project.category}</span>
          </div>

          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      </article>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        fullScreen
        padding={0}
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.15, color: "#000000", blur: 0 }}
        styles={{
          content: {
            background: "transparent",
            overflow: "hidden"
          },
          body: {
            padding: 0,
            height: "100dvh",
            overflow: "hidden"
          }
        }}
      >
        <div className="project-gallery-shell">
          <div className="project-gallery-stage">
            <img alt={project.title} className="project-gallery-image" src={gallery[activeIndex]} />
            {gallery.length > 1 ? (
              <>
                <ActionIcon
                  aria-label="Предыдущее изображение"
                  className="project-gallery-arrow project-gallery-arrow-left"
                  onClick={showPrev}
                  radius={0}
                  size="xl"
                  variant="default"
                >
                  {"<"}
                </ActionIcon>
                <ActionIcon
                  aria-label="Следующее изображение"
                  className="project-gallery-arrow project-gallery-arrow-right"
                  onClick={showNext}
                  radius={0}
                  size="xl"
                  variant="default"
                >
                  {">"}
                </ActionIcon>
              </>
            ) : null}
            <button
              aria-label="Закрыть галерею"
              className="project-gallery-close"
              onClick={() => setOpened(false)}
              type="button"
            >
              ×
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
