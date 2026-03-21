import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/inter/vietnamese.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "My Ikigai",
  description: "Decode your Sould. Find your Ikigai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">
      </body>
    </html>
  );
}
