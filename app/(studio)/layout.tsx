import type { Metadata } from "next";
import "../studio.css";

export const metadata: Metadata = {
  title: "Sanity Studio | Roman Kharchenko",
  description: "Контентная админка для сайта архитектурной студии."
};

export default function StudioLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
