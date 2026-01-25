"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { siteContent } from "@/data";
import { FadeIn } from "@/components/animations/FadeIn";

export function FounderSection() {
    const { language } = useLanguage();
    const currentLang = (language === 'en' || language === 'ja') ? language : 'ja';
    const content = siteContent[currentLang].founder;

    return (
        <section className="py-24 bg-black text-white px-6">
            <div className="max-w-3xl mx-auto text-center">
                <FadeIn>
                    <div className="mb-16">
                        <span className="text-xs uppercase tracking-[0.4em] text-white/50 block mb-4">
                            {content.subtitle}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
                            {content.title}
                        </h2>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    {/* whitespace-pre-line を追加 */}
                    <p className="text-lg md:text-xl leading-relaxed text-white/90 whitespace-pre-line font-ja-serif italic">
                        {content.text}
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}