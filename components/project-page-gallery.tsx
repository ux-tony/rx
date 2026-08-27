"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "@mantine/core";

type ProjectPageGalleryProps = {
  title: string;
  coverImage: string;
  images: string[];
};

export function ProjectPageGallery({ title, coverImage, images }: ProjectPageGalleryProps) {
  const [opened, setOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const allImages = useMemo(() => Array.from(new Set([coverImage, ...images].filter(Boolean))), [coverImage, images]);
  const galleryImages = allImages.filter((image) => image !== coverImage);

  function openImage(image: string) {
    setActiveIndex(Math.max(0, allImages.indexOf(image)));
    setOpened(true);
  }

  function showPrev() {
    setActiveIndex((current) => (current === 0 ? allImages.length - 1 : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current === allImages.length - 1 ? 0 : current + 1));
  }

  useEffect(() => {
    if (!opened || allImages.length < 2) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current === 0 ? allImages.length - 1 : current - 1));
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current === allImages.length - 1 ? 0 : current + 1));
      }
    }

    const nextIndex = activeIndex === allImages.length - 1 ? 0 : activeIndex + 1;
    const previousIndex = activeIndex === 0 ? allImages.length - 1 : activeIndex - 1;

    [allImages[nextIndex], allImages[previousIndex]].forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, allImages, opened]);

  return (
    <>
      <button className="project-page-cover" onClick={() => openImage(coverImage)} type="button">
        <Image alt={`Обложка проекта ${title}`} fill priority sizes="100vw" src={coverImage} />
        <span>Смотреть изображение</span>
      </button>

      {galleryImages.length > 0 ? (
        <section className="project-page-gallery" aria-label={`Галерея проекта ${title}`}>
          {galleryImages.map((image, index) => (
            <button
              aria-label={`Открыть изображение ${index + 2} проекта ${title}`}
              className="project-page-gallery-item"
              key={image}
              onClick={() => openImage(image)}
              type="button"
            >
              <Image alt="" fill sizes="(max-width: 780px) 100vw, 60vw" src={image} />
            </button>
          ))}
        </section>
      ) : null}

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
              alt={`${title}, изображение ${activeIndex + 1} из ${allImages.length}`}
              className="project-gallery-image"
              fill
              priority
              sizes="100vw"
              src={allImages[activeIndex]}
            />

            <div className="project-gallery-caption">
              <p>{title}</p>
              <span>
                {String(activeIndex + 1).padStart(2, "0")} / {String(allImages.length).padStart(2, "0")}
              </span>
            </div>

            {allImages.length > 1 ? (
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
