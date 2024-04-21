import type { Metadata } from "next";
import { Tilt_Neon } from 'next/font/google';
import "./globals.css";


export const metadata: Metadata = {
  title: "Doppalf",
  description: "Doppalf Personal AI",
};

const tileNeon = Tilt_Neon({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-tilt-neon',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${tileNeon.variable}`}>
      <body className="bg-seasalt dark:bg-dark_rich_black">{children}</body>
    </html>
  );
}
