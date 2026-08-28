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
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragStart = useRef<{ pointerId: number; x: number; y: number; originX: number; originY: number } | null>(null);
  const touchStartX = useRef<number | null>(null);
  const allImages = useMemo(() => Array.from(new Set([coverImage, ...images].filter(Boolean))), [coverImage, images]);
  const galleryImages = allImages.filter((image) => image !== coverImage);

  function resetZoom() {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
    dragStart.current = null;
  }

  function constrainPosition(x: number, y: number, nextScale = scale) {
    const rect = stageRef.current?.getBoundingClientRect();

    if (!rect || nextScale <= 1) {
      return { x: 0, y: 0 };
    }

    const maxX = (rect.width * (nextScale - 1)) / 2;
    const maxY = (rect.height * (nextScale - 1)) / 2;

    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y))
    };
  }

  function openImage(image: string) {
    resetZoom();
    setActiveIndex(Math.max(0, allImages.indexOf(image)));
    setOpened(true);
  }

  function closeGallery() {
    resetZoom();
    setOpened(false);
  }

  function showPrev() {
    resetZoom();
    setActiveIndex((current) => (current === 0 ? allImages.length - 1 : current - 1));
  }

  function showNext() {
    resetZoom();
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

  useEffect(() => {
    if (!opened) {
      return;
    }

    function handleWheel(event: WheelEvent) {
      const stage = stageRef.current;
      if (!stage || !(event.target instanceof Node) || !stage.contains(event.target)) {
        return;
      }

      event.preventDefault();

      const rect = stage.getBoundingClientRect();
      if (!rect) {
        return;
      }

      const nextScale = Math.max(1, Math.min(5, scale * Math.exp(-event.deltaY * 0.0015)));

      if (nextScale === 1) {
        setScale(1);
        setPosition({ x: 0, y: 0 });
        return;
      }

      const pointerX = event.clientX - rect.left - rect.width / 2;
      const pointerY = event.clientY - rect.top - rect.height / 2;
      const ratio = nextScale / scale;
      const nextX = pointerX - (pointerX - position.x) * ratio;
      const nextY = pointerY - (pointerY - position.y) * ratio;
      const maxX = (rect.width * (nextScale - 1)) / 2;
      const maxY = (rect.height * (nextScale - 1)) / 2;

      setScale(nextScale);
      setPosition({
        x: Math.max(-maxX, Math.min(maxX, nextX)),
        y: Math.max(-maxY, Math.min(maxY, nextY))
      });
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [opened, position.x, position.y, scale]);

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
        onClose={closeGallery}
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

            if (scale > 1) {
              touchStartX.current = null;
              return;
            }

            const distance = event.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(distance) > 48) {
              distance > 0 ? showPrev() : showNext();
            }
            touchStartX.current = null;
          }}
        >
          <div
            className={`project-gallery-stage${scale > 1 ? " project-gallery-stage-zoomed" : ""}${isDragging ? " project-gallery-stage-dragging" : ""}`}
            onDoubleClick={resetZoom}
            onPointerDown={(event) => {
              if (scale <= 1 || event.button !== 0 || (event.target as HTMLElement).closest("button")) {
                return;
              }

              event.currentTarget.setPointerCapture(event.pointerId);
              dragStart.current = {
                pointerId: event.pointerId,
                x: event.clientX,
                y: event.clientY,
                originX: position.x,
                originY: position.y
              };
              setIsDragging(true);
            }}
            onPointerMove={(event) => {
              const start = dragStart.current;
              if (!start || start.pointerId !== event.pointerId) {
                return;
              }

              setPosition(constrainPosition(
                start.originX + event.clientX - start.x,
                start.originY + event.clientY - start.y
              ));
            }}
            onPointerUp={(event) => {
              if (dragStart.current?.pointerId === event.pointerId) {
                dragStart.current = null;
                setIsDragging(false);
              }
            }}
            onPointerCancel={() => {
              dragStart.current = null;
              setIsDragging(false);
            }}
            ref={stageRef}
            style={{ touchAction: scale > 1 ? "none" : "pan-y" }}
          >
            <Image
              alt={`${title}, изображение ${activeIndex + 1} из ${allImages.length}`}
              className="project-gallery-image"
              draggable={false}
              fill
              priority
              sizes="100vw"
              src={allImages[activeIndex]}
              style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})` }}
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

            <button aria-label="Закрыть галерею" className="project-gallery-close" onClick={closeGallery} type="button">
              ×
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
