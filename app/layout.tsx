import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = EB_Garamond({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = { title: "PAINTING.exe" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
