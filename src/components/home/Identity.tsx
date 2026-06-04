"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { siteContent } from "@/data";
import { ScrambleText } from "@/components/effects/ScrambleText";

/**
 * Sequence 04: Identity
 * Yu — Cultural Fixer
 * The story of how the dots connected
 */
export function Identity() {
    const { language } = useLanguage();
    const currentLang = (language === 'en' || language === 'ja') ? language : 'ja';
    // @ts-ignore - Handle missing type definition temporarily
    const content = siteContent[currentLang].identity;

    return (
        <section className="relative py-24 md:py-32 bg-black overflow-hidden">
            {/* Background: Yu Silhouette Image - Monochrome + Cinematic + Gridlines */}
            <div className="absolute inset-0">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/images/intro/yu_silhouette.JPG)',
                        filter: 'grayscale(100%) contrast(120%) brightness(70%)',
                        opacity: 0.4
                    }}
                />

                {/* Gridline Effect */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
                    <defs>
                        <pattern id="grid-identity" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-identity)" />
                </svg>

                {/* Dark overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-serif text-white tracking-wider mb-2">
                        Yu
                    </h2>
                    <p className="text-white/50 font-mono-tech text-sm tracking-[0.3em] uppercase">
                        Cultural Fixer
                    </p>
                </motion.div>

                {/* Story */}
                <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    <div className="space-y-6 text-white/70 leading-relaxed text-base md:text-lg font-ja-serif whitespace-pre-line text-center">
                        <p className="text-balance">
                            <ScrambleText text={content} trigger={language} />
                        </p>
                    </div>
                </motion.div>

                {/* Link to profile */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <a
                        href="/me"
                        className="inline-block border border-white/30 hover:border-white/60 px-8 py-3 text-white/70 hover:text-white transition-all duration-300 font-mono-tech text-xs tracking-widest"
                    >
                        READ FULL STORY →
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
