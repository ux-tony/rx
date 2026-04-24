import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider, createTheme, mantineHtmlProps } from "@mantine/core";
import { Manrope } from "next/font/google";
import "@mantine/core/styles.css";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"]
});

const theme = createTheme({
  primaryColor: "dark",
  fontFamily: manrope.style.fontFamily,
  headings: {
    fontFamily: manrope.style.fontFamily
  }
});

export const metadata: Metadata = {
  title: "RX Architect",
  description: "Минималистичное портфолио архитектора с акцентом на проекты и визуальную подачу."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className={manrope.className}>
        <MantineProvider defaultColorScheme="light" theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
