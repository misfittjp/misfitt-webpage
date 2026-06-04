"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { toursContent } from "@/data/tours";

/**
 * ツアーが100%オーダーメイドであることを訴求するセクション
 * ミニマルでタイポグラフィカルなデザイン
 */
export function TourTailorMadeSection() {
    const { language } = useLanguage();
    const content = toursContent[language].tailorMade;

    return (
        <section className="relative py-32 bg-black overflow-hidden">
            {/* Background Accents (Subtle) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Left: Typography */}
                    <div className="space-y-8">
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-red-600 uppercase tracking-[0.2em] text-sm font-medium flex items-center gap-2"
                        >
                            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                            {content.subtitle}
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className={`text-5xl md:text-7xl font-bold text-white leading-[0.9] ${language === "ja" ? "font-ja-serif" : "font-serif"}`}
                        >
                            <span className="block mb-2 text-white/40 text-4xl md:text-5xl font-sans tracking-tight">100%</span>
                            {language === "ja" ? "オーダーメイド" : "Tailor-Made"}
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className={`text-lg md:text-xl text-gray-400 leading-relaxed font-light whitespace-pre-line ${language === "ja" ? "font-ja-sans" : "font-sans"}`}
                        >
                            {content.description}
                        </motion.div>
                    </div>

                    {/* Right: Steps / Concept Visualization */}
                    <div className="relative">
                        <div className="absolute -inset-4 border border-white/5 rounded-2xl md:rotate-3 transition-transform" />
                        <div className="space-y-6 md:pl-10">
                            {content.steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                                    className="flex items-start gap-6 group"
                                >
                                    <div className="text-2xl md:text-3xl font-mono text-white/20 group-hover:text-red-600 transition-colors">
                                        0{index + 1}
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-sm uppercase tracking-widest text-white/50 mb-1">{step.icon}</h4>
                                        <p className={`text-xl md:text-2xl text-white font-medium ${language === "ja" ? "font-ja-serif" : "font-serif"}`}>
                                            {step.text}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider Line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
    );
}
