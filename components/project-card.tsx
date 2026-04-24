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
        centered
        size="xl"
        padding="md"
        overlayProps={{ backgroundOpacity: 0.82, blur: 3 }}
        title={project.title}
      >
        <div className="project-gallery-shell">
          <div className="project-gallery-stage">
            <img alt={project.title} className="project-gallery-image" src={gallery[activeIndex]} />
          </div>

          {gallery.length > 1 ? (
            <div className="project-gallery-controls">
              <ActionIcon aria-label="Предыдущее изображение" onClick={showPrev} radius={0} size="lg" variant="default">
                {"<"}
              </ActionIcon>
              <span className="project-gallery-counter">
                {activeIndex + 1} / {gallery.length}
              </span>
              <ActionIcon aria-label="Следующее изображение" onClick={showNext} radius={0} size="lg" variant="default">
                {">"}
              </ActionIcon>
            </div>
          ) : null}

          {gallery.length > 1 ? (
            <div className="project-gallery-thumbs">
              {gallery.map((image, index) => (
                <button
                  className={`project-gallery-thumb${index === activeIndex ? " is-active" : ""}`}
                  key={`${project.slug}-${index}`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <img alt={`${project.title} ${index + 1}`} src={image} />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  );
}
