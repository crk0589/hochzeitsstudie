import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mareike & Moritz – Hochzeitsstudie 2026",
  description:
    "Die repräsentative und wissenschaftlich fundierte Hochzeitsstudie 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}