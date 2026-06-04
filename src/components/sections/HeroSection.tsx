"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { useLanguage } from "@/contexts/LanguageContext";
import { siteContent } from "@/data";

/**
 * メインビジュアルとなるHeroセクション
 * シネマティックな動画背景と、霧の中から浮かび上がるタイポグラフィ
 */
export function HeroSection() {
    const { language } = useLanguage();
    const content = siteContent[language].hero;

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* 背景動画 */}
            {/* 
                フォールバック: 動画が読み込めない場合は深い紺色のグラデーション背景が表示されます
                さらなる安全策: メモリ問題が発生する場合は、<video>タグを以下の静止画に置き換えてください
                <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
            */}
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23172033;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%230f1729;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23000000;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23grad)' /%3E%3C/svg%3E"
                className="absolute inset-0 h-full w-full object-cover opacity-40"
            >
                <source
                    src="https://player.vimeo.com/external/517088317.hd.mp4?s=f029311e8605330a103c809e3e7f22384f676b7e&profile_id=174"
                    type="video/mp4"
                />
            </video>

            {/* オーバーレイ：文字の可読性を確保 */}
            <div className="absolute inset-0 bg-black/40" />

            {/* コンテンツ */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={language}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.4, 0.25, 1],
                        }}
                        className="text-center"
                    >
                        {/* メインコピー */}
                        <h1 className={`text-hero tracking-tight text-white mb-8 ${language === "ja" ? "font-ja-serif" : "font-serif"}`}>
                            <span className="block">{content.title}</span>
                        </h1>

                        {/* サブコピー */}
                        <p className={`text-2xl md:text-3xl lg:text-4xl text-white/90 tracking-wide ${language === "ja" ? "font-ja-serif" : "font-serif"}`}>
                            {content.sub}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* スクロールインジケーター */}
            <ScrollIndicator />
        </section>
    );
}
