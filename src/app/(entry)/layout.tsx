import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "../globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clarionis — Enterprise AI Platform",
  description:
    "A premium AI company website concept for enterprise customers, focused on trust, operational intelligence, and demo conversion.",
};

export default function EntryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full bg-[var(--bg)] text-[var(--fg)] antialiased">{children}</body>
    </html>
  );
}
