import type { Metadata } from "next";
import "./globals.css";
import { VisualEffectsProvider } from "@/contexts/VisualEffectsContext";
import GlobalVisualEffects from "@/components/GlobalVisualEffects";

export const metadata: Metadata = {
    title: "Misfitt - Quiet Luxury x Street x Unorthodox",
    description: "新時代のクリエイティブカンパニー。日本を『再定義』する。",
    keywords: ["Misfitt", "クリエイティブ", "デザイン", "開発", "ブランディング"],
    authors: [{ name: "Misfitt" }],
    openGraph: {
        title: "Misfitt",
        description: "Quiet Luxury x Street x Unorthodox",
        type: "website",
    },
};

// シンプルなルートレイアウト(言語判定なし)
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning>
            <body
                className="min-h-screen overflow-x-hidden bg-black text-white font-sans"
                suppressHydrationWarning
            >
                <VisualEffectsProvider>
                    <GlobalVisualEffects />
                    {children}
                </VisualEffectsProvider>
            </body>
        </html>
    );
}