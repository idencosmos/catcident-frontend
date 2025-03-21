// src/app/fonts.ts
import { Inter } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
  preload: true,
});

export const combinedFonts = `${inter.variable} ${notoSansKR.variable}`;
