"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { toursContent } from "@/data/tours";

/**
 * ビデオテスティモニアルセクション
 * 実際のツアー参加者の声を動画で見せる（ドキュメンタリースタイル）
 */
export function VideoTestimonialsSection() {
    const { language } = useLanguage();
    const content = toursContent[language].videoTestimonials;
    const [selectedVideo, setSelectedVideo] = useState<typeof content.items[0] | null>(null);

    return (
        <section className="relative py-24 md:py-32 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                {/* セクションタイトル */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-sm uppercase tracking-widest text-white/40 mb-4">{content.subtitle}</p>
                    <h2 className={`text-3xl md:text-5xl font-bold text-white ${language === "ja" ? "font-ja-serif" : "font-serif"}`}>
                        {content.title}
                    </h2>
                </motion.div>

                {/* 動画グリッド */}
                <div className="grid md:grid-cols-3 gap-8">
                    {content.items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5"
                            onClick={() => setSelectedVideo(item)}
                        >
                            {/* サムネイル */}
                            <img
                                src={item.thumbnail}
                                alt={item.name}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                            />

                            {/* オーバーレイ (再生ボタン) */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>

                            {/* 情報（常に表示、ホバーで強調） */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                <h3 className="text-white font-medium text-lg mb-1">{item.name}</h3>
                                <div className="flex justify-between items-center text-xs text-white/60">
                                    <span>{item.location}</span>
                                    <span className="uppercase tracking-wider">{item.duration}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 動画モーダル */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
                        onClick={() => setSelectedVideo(null)}
                    >
                        {/* 閉じるボタン */}
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedVideo(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                src={selectedVideo.videoUrl}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
