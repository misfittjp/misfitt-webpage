"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { toursContent } from "@/data/tours";

/**
 * FAQ（よくある質問）セクション
 * アコーディオン形式で表示
 */
export function TourFAQSection() {
    const { language } = useLanguage();
    const content = toursContent[language].faq;
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
                    <h2 className={`text-4xl md:text-5xl font-bold text-white ${language === "ja" ? "font-ja-serif" : "font-serif"}`}>
                        {content.title}
                    </h2>
                </motion.div>

                {/* FAQ項目 */}
                <div className="space-y-4">
                    {content.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.05 * index }}
                            className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
                        >
                            {/* 質問 */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200"
                            >
                                <span className={`text-lg font-semibold text-white pr-4 ${language === "ja" ? "font-ja-sans" : "font-sans"}`}>
                                    {item.question}
                                </span>
                                <motion.span
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-white/60 text-2xl flex-shrink-0"
                                >
                                    ↓
                                </motion.span>
                            </button>

                            {/* 回答 */}
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 pt-2">
                                            <p className={`text-white/70 leading-relaxed ${language === "ja" ? "font-ja-sans" : "font-sans"}`}>
                                                {item.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* お問い合わせCTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <p className="text-white/60 mb-6">
                        {language === "en"
                            ? "Have more questions? We're here to help."
                            : "他にご質問がありますか？お気軽にお問い合わせください。"}
                    </p>
                    <a
                        href="mailto:hq@misfitt.tokyo"
                        className="inline-block px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105"
                    >
                        {language === "en" ? "Contact Us" : "お問い合わせ"}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
