import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BaliKala — Platform Interaktif Hari Raya Besar Hindu Bali",
  description: "Jelajahi hari raya besar Hindu di Bali seperti Nyepi, Galungan, Kuningan, Saraswati, dan Pagerwesi secara interaktif. Media edukasi, kalender budaya, dan pelestarian adat Bali.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F5F0] text-[#2D2D2D] font-sans selection:bg-[#C89B3C]/30 selection:text-[#8B5E3C]">
        {children}
      </body>
    </html>
  );
}
