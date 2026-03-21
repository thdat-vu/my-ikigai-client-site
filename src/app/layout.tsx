import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/inter/vietnamese.css";

export const metadata: Metadata = {
  title: "MyIkigai — Decode Your Soul. Build Your Path.",
  description:
    "Bridging destiny and digital intelligence. Discover your MBTI, decode your astrology, and get an AI-powered life roadmap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
