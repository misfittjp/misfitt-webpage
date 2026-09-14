import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MISFITT | Bespoke Private Tours & Cinematic Photography in Tokyo",
  description:
    "Unscripted, bespoke private tours and cinematic street photography in Tokyo. Guided by a nationally licensed expert uncovering the city's multifaceted layers.",
  keywords: [
    "Tokyo Private Tour",
    "Bespoke Tokyo Tour",
    "Tokyo Private Guide",
    "Tokyo Street Photography",
    "Cinematic Photography Tokyo",
    "Inbound Tourism Advisory",
    "Nationally Licensed Guide Tokyo",
    "Yuichi Narisawa",
  ],
  openGraph: {
    title: "MISFITT | Bespoke Private Tours & Cinematic Photography in Tokyo",
    description:
      "Unscripted bespoke private tours and cinematic street photography uncovering the multifaceted layers of Tokyo.",
    url: "https://misfitt.tokyo",
    siteName: "MISFITT",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MISFITT | Bespoke Private Tours & Cinematic Photography in Tokyo",
    description:
      "Bespoke private tours and cinematic photography uncovering Tokyo's multifaceted layers.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100 selection:bg-neutral-100 selection:text-neutral-950">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
