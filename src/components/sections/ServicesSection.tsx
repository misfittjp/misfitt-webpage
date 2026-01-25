"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { siteContent } from "@/data";
import { FadeIn } from "@/components/animations/FadeIn";
import { motion } from "framer-motion";

export function ServicesSection() {
    const { language } = useLanguage();
    const currentLang = (language === 'en' || language === 'ja') ? language : 'ja';
    const content = siteContent[currentLang].services;

    return (
        <section className="py-24 bg-black text-white px-6 border-t border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                <FadeIn>
                    <div className="mb-20">
                        <span className="text-xs uppercase tracking-[0.4em] text-white/50 block mb-4">
                            {content.subtitle}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
                            {content.title}
                        </h2>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    {content.items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="border-t border-white/10 pt-10 text-center"
                        >
                            <span className="text-sm font-serif italic text-white/40 block mb-2">
                                {item.misfittName}
                            </span>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                                {item.title}
                            </h3>
                            {/* whitespace-pre-line を追加 */}
                            <p className="text-white/70 leading-relaxed mb-8 whitespace-pre-line text-sm md:text-base">
                                {item.description}
                            </p>

                            {item.pricing && (
                                <div className="mb-6 space-y-2">
                                    {item.pricing.map((p, i) => (
                                        <div key={i} className="text-base md:text-lg font-mono tracking-tight text-white/90">
                                            {p}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {item.notes && (
                                <ul className="space-y-1 mb-8">
                                    {item.notes.map((note, i) => (
                                        <li key={i} className="text-xs text-white/40 tracking-wider">
                                            {note}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {item.tagline && (
                                <div className="mt-8 pt-6 border-t border-white/5">
                                    <p className="text-sm italic text-white/50 leading-relaxed whitespace-pre-line">
                                        {item.tagline}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}