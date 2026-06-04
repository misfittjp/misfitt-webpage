"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { guestReviews } from "@/data/sections/reviews";

// ハイライトするレビュー（厳選されたもの）
// ハイライトするレビュー（厳選されたもの）
const highlightReviews = [
    guestReviews.find(r => r.name === "Guillermo") || guestReviews[0], // Guillermo - "He is Tokyo"
    guestReviews[1],  // Julia - 8h
    guestReviews[2],  // Chanel - "This trip changed my life"
    guestReviews[3],  // Nicholas - "10/10"
    guestReviews[5],  // Doug - "really great experience"
];

/**
 * Hero Quote Section
 * 「THE PROOF」見出しと共に、厳選されたレビューを自動ローテーション表示
 */
export function HeroQuoteSection() {
    const { language } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    // 10秒ごとに次のレビューに切り替え
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % highlightReviews.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const currentReview = highlightReviews[currentIndex];

    // テキストを短縮（200文字まで）
    const truncatedText = currentReview.text.length > 200
        ? currentReview.text.substring(0, 200) + "..."
        : currentReview.text;

    return (
        <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* 背景画像（現在のレビュー画像） */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    {currentReview.image ? (
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950"
                            style={{
                                backgroundImage: `url(${currentReview.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'grayscale(100%) brightness(40%) contrast(120%)',
                            }}
                        />
                    ) : (
                        // 画像がない場合の背景フォールバック（抽象的なグラデーション）
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-black to-zinc-900" />
                    )}
                    {/* ノイズオーバーレイ */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* 黒オーバーレイ */}
            <div className="absolute inset-0 bg-black/50" />

            {/* コンテンツ */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* THE PROOF 見出し */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-sm md:text-base tracking-[0.3em] text-white/40 uppercase mb-8 md:mb-12"
                >
                    {language === "ja" ? "証言" : "THE PROOF"}
                </motion.h2>

                {/* ローテーションするレビュー */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="space-y-8 md:space-y-12"
                    >
                        {/* プロフィール画像またはイニシャル */}
                        <div className="flex justify-center">
                            {currentReview.image ? (
                                <img
                                    src={currentReview.image}
                                    alt={currentReview.name}
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white/20"
                                    style={{
                                        filter: 'grayscale(0%) brightness(100%) contrast(100%)'
                                    }}
                                    onError={(e) => {
                                        // 画像エラー時のフォールバック処理
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const fallback = target.nextElementSibling as HTMLDivElement;
                                        if (fallback) fallback.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            {/* フォールバック用イニシャル（画像がない場合、またはエラー時） */}
                            <div
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-4xl font-serif border-2 border-white/20"
                                style={{ display: currentReview.image ? 'none' : 'flex' }}
                            >
                                {currentReview.name[0]}
                            </div>
                        </div>

                        {/* 引用文 */}
                        <blockquote className="text-2xl md:text-4xl lg:text-5xl font-serif text-white leading-tight">
                            "{truncatedText}"
                        </blockquote>

                        {/* 著者名と国 */}
                        <div className="space-y-2">
                            <p className="text-white font-semibold text-xl md:text-2xl">
                                {currentReview.name}
                            </p>
                            <p className="text-white/60 text-base md:text-lg tracking-wide">
                                {currentReview.location}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* インジケーター */}
                <div className="flex justify-center gap-2 mt-12 md:mt-16">
                    {highlightReviews.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "bg-white w-8"
                                : "bg-white/30 hover:bg-white/50"
                                }`}
                            aria-label={`Review ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
