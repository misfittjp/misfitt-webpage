"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function Home() {
    return (
        <LanguageProvider>
            <main className="min-h-screen">
                {/* 言語切り替えボタン */}
                <LanguageSwitcher />

                {/* ヒーローセクション */}
                <HeroSection />

                {/* マニフェスト */}
                <ManifestoSection />

                {/* 創業者 */}
                <FounderSection />

                {/* サービス */}
                <ServicesSection />
            </main>
        </LanguageProvider>
    );
}
