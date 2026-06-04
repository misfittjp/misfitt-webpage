"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { reviewStats } from "@/data/sections/reviews";

/**
 * Social Proof Header
 * "The Highest Rated Experience" バッジと品質保証のタグラインを表示
 */
export function SocialProofHeader() {
    const { language } = useLanguage();
    const dataKey = language === "ja" ? "ja" : "en";

    return (
        <section className="relative py-24 bg-black overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center space-y-8"
                >
                    {/* Top Tagline */}
                    <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.3em] font-light">
                        {reviewStats.badge[dataKey as keyof typeof reviewStats.badge]}
                    </p>

                    {/* Crown Icon & Title */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                {/* Crown Icon SVG */}
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12 md:w-16 md:h-16 text-yellow-500/80">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" className="hidden" />
                                    {/* Real Crown Path */}
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" className="hidden" />
                                    {/* Elegant Crown / Wreath abstract */}
                                    <path d="M2 12h20" strokeOpacity="0.1" />
                                    <path d="M9 21h6" strokeLinecap="round" />
                                    <path d="M12 17v4" strokeLinecap="round" />
                                    <path d="M5 10l2-2 3 3 2-4 2 4 3-3 2 2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 17a5 5 0 0 0-5-5" strokeLinecap="round" />
                                    <path d="M12 17a5 5 0 0 1 5-5" strokeLinecap="round" />
                                    {/* Crown Points */}
                                    <path d="M5 10L3 3l6 4 3-5 3 5 6-4-2 7H5z" strokeLinejoin="round" />
                                </svg>
                            </motion.div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full" />
                        </div>

                        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-wider flex flex-col items-center">
                            <span className="block bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                                {reviewStats.acclaim.title[dataKey as keyof typeof reviewStats.acclaim.title]}
                            </span>
                        </h2>
                    </div>

                    {/* Subtext */}
                    <div className="space-y-4">
                        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <p className="text-white/70 text-sm md:text-base font-light tracking-widest uppercase">
                            {reviewStats.acclaim.sub[dataKey as keyof typeof reviewStats.acclaim.sub]}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
