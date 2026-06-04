"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { toursContent } from "@/data/tours";

/**
 * ゲストレビューのカルーセル表示
 */
export function TestimonialsSection() {
    const { language } = useLanguage();
    const content = toursContent[language].testimonials;
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % content.reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev - 1 + content.reviews.length) % content.reviews.length);
    };

    const currentReview = content.reviews[currentIndex];

    return (
        <section className="relative py-24 md:py-32 bg-black">
            <div className="max-w-4xl mx-auto px-6">
                {/* セクションタイトル */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-sm uppercase tracking-widest text-white/40 mb-4">{content.subtitle}</p>
                    <h2 className={`text-4xl md:text-5xl font-bold text-white ${language === "ja" ? "font-ja-serif" : "font-serif"}`}>
                        {content.title}
                    </h2>
                </motion.div>

                {/* カルーセル */}
                <div className="relative">
                    {/* レビューカード */}
                    <div className="relative min-h-[300px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                                className="w-full"
                            >
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
                                    {/* 星評価 */}
                                    <div className="flex gap-1 mb-6 justify-center">
                                        {[...Array(currentReview.rating)].map((_, i) => (
                                            <span key={i} className="text-yellow-400 text-2xl">★</span>
                                        ))}
                                    </div>

                                    {/* レビューテキスト */}
                                    <blockquote className={`text-xl md:text-2xl text-white/90 text-center mb-8 italic ${language === "ja" ? "font-ja-serif" : "font-serif"}`}>
                                        "{currentReview.text}"
                                    </blockquote>

                                    {/* 著者情報 */}
                                    <div className="text-center">
                                        <p className="text-white font-semibold">{currentReview.author}</p>
                                        <p className="text-white/50 text-sm">{currentReview.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ナビゲーションボタン */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prevReview}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                            aria-label="Previous review"
                        >
                            <span className="text-white text-xl">←</span>
                        </button>

                        {/* インジケーター */}
                        <div className="flex gap-2">
                            {content.reviews.map((_: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white w-8" : "bg-white/30"
                                        }`}
                                    aria-label={`Go to review ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextReview}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                            aria-label="Next review"
                        >
                            <span className="text-white text-xl">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
