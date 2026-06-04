"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { toursContent } from "@/data/tours";

/**
 * ガイド（Yu）の紹介セクション
 * 地下鉄の写真を背景に、シネマティックな自己紹介を展開
 */
export function TourGuideSection() {
    const { language } = useLanguage();
    const content = toursContent[language].guide;

    return (
        <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
            {/* Background Image: Subway */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/guide/yu_subway.png"
                    alt="Yu in Tokyo Subway"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div>
                        <p className="text-white/60 uppercase tracking-[0.3em] text-xs mb-4 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-red-600 inline-block"></span>
                            {content.subtitle}
                        </p>
                        <h2 className={`text-4xl md:text-6xl font-bold text-white leading-tight ${language === "ja" ? "font-ja-serif" : "font-serif"}`}>
                            {language === "ja" ? (
                                <>
                                    都市の<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">翻訳者</span>として
                                </>
                            ) : (
                                <>
                                    The <span className="italic font-serif text-red-600">Translator</span><br />
                                    of the City
                                </>
                            )}
                        </h2>
                    </div>

                    <div className={`text-lg md:text-xl text-white/80 leading-relaxed font-light ${language === "ja" ? "font-ja-sans" : "font-sans"}`}>
                        {content.cinematicIntro.split('\n').map((line, i) => (
                            <p key={i} className="mb-2">{line}</p>
                        ))}
                    </div>

                    <div className="pt-4">
                        <Link
                            href={`/${language}/me?from=tours`}
                            className="group inline-flex items-center gap-4 text-white uppercase tracking-widest text-sm hover:text-red-500 transition-colors"
                        >
                            <span className="border-b border-white/30 group-hover:border-red-500 pb-1 transition-colors">
                                Read Full Bio
                            </span>
                            <span className="w-8 h-[1px] bg-white/30 group-hover:bg-red-500 transition-colors"></span>
                        </Link>
                    </div>
                </motion.div>

                {/* Right side spacer or additional visual elements if needed */}
                <div className="hidden md:block">
                    {/* Empty for now to let the background image shine on the right side */}
                </div>
            </div>
        </section>
    );
}
