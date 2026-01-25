import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Misfitt - Quiet Luxury x Street x Unorthodox",
    description: "新時代のクリエイティブカンパニー。媚びないが誠実な、プロフェッショナルの凄み。",
    keywords: ["Misfitt", "クリエイティブ", "デザイン", "開発", "ブランディング"],
    authors: [{ name: "Misfitt" }],
    openGraph: {
        title: "Misfitt",
        description: "Quiet Luxury x Street x Unorthodox",
        type: "website",
    },
};

// src/app/layout.tsx

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja" suppressHydrationWarning>
            {/* bodyタグにも suppressHydrationWarning を追加します */}
            <body
                className="min-h-screen overflow-x-hidden bg-black text-white font-sans"
                suppressHydrationWarning
            >
                {children}
            </body>
        </html>
    );
}