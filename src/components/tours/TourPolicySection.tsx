"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { tourPolicy } from "@/data/sections/tourPolicy";

/**
 * Tour Policy Section
 * ツアーポリシー情報をリスト形式で表示
 * グループサイズ、支払い方法、キャンセルポリシー等
 */
export function TourPolicySection() {
    const { language } = useLanguage();
    // languageは "ja" だが、データのキーは "ja"
    const dataKey = language === "ja" ? "ja" : "en";
    const content = tourPolicy[dataKey as keyof typeof tourPolicy];

    return (
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-black to-slate-950">
            <div className="max-w-6xl mx-auto px-6">
                {/* タイトル */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`text-3xl md:text-4xl font-bold text-white text-center mb-12 md:mb-16 ${language === "ja" ? "font-ja-serif" : "font-serif"}`}
                >
                    {content.title}
                </motion.h2>

                {/* ポリシーアイテム */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                {/* アイコン */}
                                <span className="text-3xl md:text-4xl flex-shrink-0">
                                    {item.icon}
                                </span>

                                {/* テキスト */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-semibold text-base md:text-lg mb-2">
                                        {item.label}
                                    </h3>
                                    <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
